import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';
import * as sharp from 'sharp';
import * as fs from "fs";
import { config } from "../../../config";

@Injectable()
export class S3Service {
    private region: string;
    private s3: S3;

    constructor () {
        this.region = config.aws.s3.region;
        this.s3 = new S3({
            accessKeyId: config.aws.s3.accessKey,
            secretAccessKey: config.aws.s3.secretAccessKey,
            region: this.region,
        });
    }

    async getFile (key: string): Promise<Buffer> {
        const bucket = config.aws.s3.bucketName;
        const params = {
            Bucket: bucket,
            Key: key.replace(/\\/g, '/'),
        };

        try {
            const data = await this.s3.getObject(params).promise();
            if (data.Body) {
                return data.Body as Buffer;
            }

            throw new Error('File not found in S3!');
        } catch (err) {
            throw err;
        }
    }

    async uploadFile (file: Express.Multer.File, key: string): Promise<string> {
        const bucket = config.aws.s3.bucketName;
        const isImage = file.mimetype.startsWith('image');
        let imageBuffer;

        if (!file.buffer) {
            if (isImage) {
                try {
                    imageBuffer = await sharp(file.path).toBuffer();
                } catch (sharpError) {
                    throw new Error(`Error processing image: ${sharpError.message}`);
                }
            } else {
                if (fs.existsSync(file.path)) {
                    imageBuffer = await fs.promises.readFile(file.path);
                } else {
                    throw new Error(`File not found at path: ${file.path}`);
                }
            }
        }

        const params = {
            Body: imageBuffer || file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        try {
            const response = await this.s3.upload(params).promise();
            console.log(response);
            if (response) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }
            throw new Error('File not saved in S3!');
        } catch (err) {
            throw err;
        }
    }

    async deleteFile (key: string): Promise<void> {
        const bucket = config.aws.s3.bucketName;

        const params = {
            Bucket: bucket,
            Key: key,
        };

        try {
            await this.s3.deleteObject(params).promise();
            console.log(`File deleted successfully from S3: ${key}`);
        } catch (err) {
            throw err;
        }
    }

    async renameFile (oldKey: string, newKey: string): Promise<void> {
        const bucket = config.aws.s3.bucketName;

        const copyParams = {
            Bucket: bucket,
            CopySource: `/${bucket}/${oldKey}`,
            Key: newKey,
            ACL: 'public-read',
        };

        const deleteParams = {
            Bucket: bucket,
            Key: oldKey,
        };

        try {
            await this.s3.copyObject(copyParams).promise();

            await this.s3.deleteObject(deleteParams).promise();

            console.log(`File renamed successfully in S3: ${oldKey} -> ${newKey}`);
        } catch (err) {
            throw err;
        }
    }
}
