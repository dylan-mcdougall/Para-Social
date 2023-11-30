const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');


dotenv.config();
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

const uploadS3 = async (params) => {
    const { Key, Bucket } = params;
    const command = new PutObjectCommand(params);

    try {
        await s3.send(command);
        
        return {
            url: `https://${Bucket}.s3.amazonaws.com/${Key}`,
            name: Key
        };
    } catch (error) {
        console.log("There was an issue uploading this image to AWS: ", error)
    }
}

const deleteS3 = async (params) => {
    const command = new DeleteObjectCommand(params);

    try {
        await s3.send(command);
        return {
            message: "Success."
        }
    } catch (error) {
        console.log("There was an error deleting this image from AWS: ", error);
    }
}

module.exports = {
    uploadS3,
    deleteS3
};
