const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Community, Room, Membership, Image } = require('../../db/models');
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

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})

const router = express.Router();

router.patch('/:id/members/:userId/approve', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (req.user.id !== community.creator_id) return res.status(401).json({
        "errors": "Forbidden"
    });
    const targetMembership = await Membership.findOne({
        where: {
            user_id: req.params.userId,
            community_id: req.params.id
        }
    });
    if (!targetMembership) return res.status(400).json({
        "errors": "User has not requested to join this community."
    });
    if (targetMembership.status !== 'pending') return res.status(400).json({
        "errors": "User is already a member of this community."
    });

    await targetMembership.update({ status: 'member' }, {
        where: {
            status: 'pending'
        }
    });

    return res.json(targetMembership);
})

router.delete('/:id/members/:userId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (req.user.id !== parseInt(req.params.userId) && req.user.id !== community.creator_id) {
        return res.status(401).json({
            "errors": "Forbidden."
        });
    }
    if (parseInt(req.params.userId) === community.creator_id) return res.status(400).json({
        "errors": "Cannot currently delete membership of community creator."
    })
    const membership = await Membership.findOne({
        where: {
            user_id: req.params.userId,
            community_id: req.params.id
        }
    });
    if (!membership) return res.status(400).json({
        "errors": "User is not currently a member of this group."
    });

    await membership.destroy();
    return res.json({
        "message": "Membership successfully deleted."
    });
})

router.post('/:id/members/:userId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    const membership = await Membership.findOne({
        where: {
            user_id: req.params.userId,
            community_id: req.params.id
        }
    });
    if (membership) return res.status(400).json({
        "errors": "User is already a member or has requested to join this group."
    });

    const payload = await Membership.create({
        user_id: req.params.userId, community_id: req.params.id, status: 'pending'
    });
    if (payload) {
        return res.json(payload)
    } else return res.status(500).json({
        "errors": "Could not create membership for this user."
    })
})

router.post('/:id/rooms/new', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden"
        });
    }
    const { name, classification } = req.body;
    if (!name) return res.status(400).json({
        "errors": "Please include a valid room name in the request body"
    });

    const payload = await Room.create({ community_id: req.params.id, name: name, classification: classification });
    return res.json(payload);
})

router.delete('/:id/rooms/:roomId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden."
        });
    }
    const targetRoom = await Room.findByPk(req.params.roomId);
    if (!targetRoom) return res.status(404).json({
        "errors": "Room associated with this id does not exist."
    })
    if (targetRoom.community_id !== parseInt(req.params.id)) {
        return res.status(400).json({
            "errors": "Room associated with this id does not belong to the specified community."
        })
    }

    await targetRoom.destroy();
    return res.json({
        "message": "Room successfully deleted."
    })
})

router.patch('/:id/rooms/:roomId', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden."
        });
    }
    const targetRoom = await Room.findByPk(req.params.roomId);
    if (!targetRoom) return res.status(404).json({
        "errors": "Room associated with this id does not exist."
    })
    if (targetRoom.community_id !== parseInt(req.params.id)) {
        return res.status(400).json({
            "errors": "Room associated with this id does not belong to the specified community."
        })
    }
    const { name, classification } = req.body;
    if (!name) return res.status(400).json({
        "errors": "Please include a valid room name in the request body."
    });

    await targetRoom.update({ name: name, classification: classification });
    return res.json(targetRoom);
})

router.get('/:id/rooms', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });

    const targetRooms = await Room.findAll({
        where: {
            community_id: req.params.id
        }
    });

    if (!targetRooms) return res.status(404).json({
        "errors": "Designated Community currently has no rooms."
    })

    return res.json(targetRooms);
});

router.delete('/:id/images/:imageName', requireAuth, async (req, res) => {
    const community = await Community.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Image, as: 'CommunityImage'
            }
        ]
    });
    
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });

    if ((community && !community.Images.length) || (community && community.Images[0].name !== req.params.imageName)) {
        return res.status(400).json({
            "errors": "This community does not contain the specified image."
        })
    }
    
    const params = {
        Bucket: bucketName,
        Key: req.params.imageName
    }

    try {
        const response = await deleteS3(params);
        if (response.message === 'Success.') {
            await community.CommunityImage.destroy();
            return res.json({
                "message": "Image deleted successfully."
            })
        } else throw new Error("There was an error sending the delete command to AWS.")
    } catch (error) {
        console.log("There was an error when attempting to delete image from AWS and the database.")
    }
});

router.post('/:id/image-preview', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);

    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community && community.creator_id !== req.user.id) return res.json({
        "errors": "Forbidden"
    });

    const params = {
        Bucket: bucketName,
    }

    const buffer = await sharp(req.file.buffer).resize({ height: 512, width: 512, fit: 'contain' }).toBuffer()
    const imageName = randomImageName();
    params.Key = imageName;
    params.Body = buffer;
    params.ContentType = req.file.mimetype;
    
    try {
        const dataValues = await uploadS3(params);
        if (dataValues) {
            return res.json(dataValues);
        }
    } catch (error) {
        console.log('There was an error uploading this image: ', error);
    }
});

router.post('/:id/images', requireAuth, async (req, res) => {
    const community = await Community.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Image, as: 'CommunityImage'
            }
        ]
    });
    
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community && community.creator_id !== req.user.id) return res.status(401).json({
        "errors": "Forbidden"
    })
    
    const params = {
        Bucket: bucketName,
    }

    if (community.CommunityImage && community.CommunityImage.name) {
        try {
            params.Key = community.CommunityImage.name;
            const response = await deleteS3(params);
            if (response.message && response.message === "Success.") {
                await community.CommunityImage.destroy();
                console.log("Community image successfully destroyed in database and AWS.")
            } else throw new Error("There was an error when attempting to delete the image from AWS.");
        } catch (error) {
            console.log("There was an issue trying to remove the existing image from the database and AWS: ", error);
        }
    }

    console.log('Image confirm body: ', req.body);
    
    const payload = await Image.create({
        url: req.body.url,
        name: req.body.name,
        imageableId: req.params.id,
        imageableType: "Community"
    });

    if (payload) return res.json(payload);
});

router.patch('/:id', requireAuth, async (req, res) => {
    const { name, description, privacy, price } = req.body;
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden"
        });
    }

    await community.update({
        name,
        description,
        private: privacy,
        price
    });

    return res.json(community)
})

router.delete('/:id', requireAuth, async (req, res) => {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({
        "errors": "No community associated with this id exists."
    });
    if (community.creator_id !== req.user.id) {
        return res.status(401).json({
            "errors": "Forbidden"
        });
    }

    await community.destroy();
    return res.json({
        "message": "Community successfully deleted."
    })
})

router.get('/:id', requireAuth, async (req, res) => {
    const community = await Community.findOne({
        where: { id: req.params.id },
        include: [
            { model: User, as: 'Members' },
            { model: User, as: 'Creator' },
            { model: Room, as: 'Rooms' },
            { model: Image, as: 'CommunityImage' }
        ],
    });
    return res.json(community);
})

router.post('/', requireAuth, async (req, res) => {
        const { name, description, private, price } = req.body;
        const creator_id = req.user.id;
        const community = await Community.create({ creator_id, name, description, private, price });
        if (!community) {
            return res.status(500).json({
                "errors": "An error occurred when creating your community, try again."
            });
        }
        const membership = await Membership.create({ user_id: creator_id, community_id: community.id, status: 'creator' });
        if (!membership) return res.status(500).json({
            "errors": "An error occurred when assigning a membership between you and the created community, please contact an admin."
        });

        return res.json(community);
    }
);

router.get('/', async (req, res) => {
    const communityList = await Community.findAll({
        include: [{
            model: Image, as: "CommunityImage"
        }]
    })
    return res.json({
        communityList
    })
}
);

module.exports = router;
