import * as sharp from 'sharp';
import * as fs from "fs";

export class S3Uploader {
    constructor () {}

    static async uploadFile (
        s3Service,
        file: Express.Multer.File,
        folderName: string,
        filename?: string,
    ): Promise<string> {
        const finalFilename = filename || file.filename;
        const folderPrefix = folderName ? `${folderName}/` : '';
        const s3FileName = `${folderPrefix}${finalFilename}`;
        await s3Service.uploadFile(file, s3FileName);

        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        return s3FileName;
    }
    static async sharpAndUpload (
        s3Service,
        key: string,
        newKey: string,
        width?: number,
        height?: number,
        fit?,
    ): Promise<void> {
        const originalKey = key.replace(/\\/g, '/');

        const originalBuffer = await s3Service.getFile(originalKey);

        const resizedBuffer = await sharp(originalBuffer).resize({ width, height, fit }).webp().toBuffer();

        const file: Express.Multer.File = {
            fieldname: 'file',
            originalname: newKey,
            encoding: '7bit',
            mimetype: 'image/webp',
            buffer: resizedBuffer,
            size: resizedBuffer.length,
            stream: null,
            destination: null,
            filename: newKey,
            path: newKey,
        };

        await S3Uploader.uploadFile(s3Service, file, '');
    }
}
