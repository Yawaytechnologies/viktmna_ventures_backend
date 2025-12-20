import config from "../../config/env.js";
import s3Client from "./s3.client.js";
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import generateS3Key from "./filekey.js";

const bucketName = config.awsS3Bucket;

export async function uploadFileToS3(fileBuffer, mimeType) {
    const s3Key = generateS3Key(mimeType);

    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: mimeType,
    });

    await s3Client.send(putObjectCommand);
    return s3Key;
}
export async function generatePresignedUrl(s3Key, expiresIn = 3600) {
    const getObject = new GetObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
    });
    const url = await getSignedUrl(s3Client, getObject, { expiresIn });
    return url;
}

export async function deleteFileFromS3(s3Key) {
    const deleteObject = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
    });
    await s3Client.send(deleteObject);
}