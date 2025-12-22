import dotenv from 'dotenv';

dotenv.config();

const config = {
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    databaseUrl: process.env.MONGO_URI,
    port: process.env.PORT,
    awsS3Bucket: process.env.AWS_S3_BUCKET,
};

export default config;