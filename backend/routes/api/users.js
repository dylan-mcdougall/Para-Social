const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Community, Image } = require('../../db/models');
const { S3Client } = require('@aws-sdk/client-s3');
const { uploadS3, deleteS3 } = require('./S3Commands');
const randomImageName = require('./helper');
const dotenv = require('dotenv');
const sharp = require('sharp');

dotenv.config();
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});

const router = express.Router();

router.delete('/:id/images/:imageName', requireAuth, async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Image
      }
    ]
  });

  if (user && user.id !== req.user.id) return res.status(401).json({
    "errors": "Forbidden"
  })

  if (!user) return res.status(404).json({
    "errors": "No user associated with this id exists."
  });

  if ((user && !user.Images.length) || (user && user.Images[0].name !== req.params.imageName)) {
    return res.status(400).json({
      "errors": "This user does not contain the specified image."
    })
  }

  const params = {
    Bucket: bucketName,
    Key: req.params.imageName
  }

  try {
    const response = await deleteS3(params);
    if (response.message === 'Success.') {
      await user.Image[0].destroy();
      return res.json({
        "message": "Image deleted successfully."
      })
    } else throw new Error("There was an error sending the delete command to AWS.")
  } catch (error) {
    console.log("There was an error when attempting to delete image from AWS and the database.")
  }
});

router.post('/:id/images', requireAuth, async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Image
      }
    ]
  });

  if (!user) return res.status(404).json({
    "errors": "No user associated with this id exists."
  });
  if (user && user.id !== req.user.id) {
    return res.status(401).json({
      "errors": "Forbidden"
    })
  }

  const params = {
    Bucket: bucketName,
  }

  if (user.Images.length) {
    try {
      params.Key = user.Images[0].name;
      const response = await deleteS3(params);
      if (response.message && response.message === "Image deleted successfully.") {
        await user.Images[0].destroy();
        console.log("User image successfully destroyed in database and AWS.")
      } else throw new Error("There was an error when attempting to delete the image from AWS.");
    } catch (error) {
      console.log("There was an issue trying to remove the existing image from the database and AWS: ", error);
    }
  }

  const buffer = await sharp(req.file.buffer).resize({ height: 512, width: 512, fit: 'contain' }).toBuffer()
  const imageName = randomImageName();
  params.Key = imageName;
  params.Body = buffer;
  params.ContentType = req.file.mimetype;

  try {
    const dataValues = await uploadS3(params);
    if (dataValues) {
      const payload = await Image.create({
        url: dataValues.url,
        name: dataValues.name,
        imageableId: req.params.id,
        imageableType: "User"
      });
      return res.json(payload);
    }
  } catch (error) {
    console.log('There was an error uploading this image: ', error);
  }
});

router.get('/current', async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      "errors": "No user logged in."
    })
  }
  const detailedUser = await User.findOne({
    where: {
      id: user.id
    },
    include: [
      { 
        model: Community,
        include: [
          { model: Image, as: 'CommunityImage' }
        ]
      }
    ]
  });

  if (!detailedUser) return res.status(404).json({
    "errors": "An error has occurred, no data for this user exists."
  });

  return res.json(detailedUser);
});

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
);

module.exports = router;
