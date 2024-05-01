import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { S3Uploader } from "../../core/utils/s3-uploader";
import { S3Service } from "../s3/s3.service";
import { FileInterceptor } from "@nestjs/platform-express";
import getRandomFilename from "../../core/utils/filename-generator";

@Controller('image-upload')
export class ImageUploadsControllerV2 {
    constructor (private readonly s3Service: S3Service) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file')
    )
    async upload (
        @UploadedFile() file: Express.Multer.File,
        // @MulterErrorReason() errorReason: string,
    ) : Promise<string> {

        let filenameBase = file.filename || file.originalname;
        const filenameGenerator = new getRandomFilename('images');

        filenameBase = filenameGenerator.getUniqueFilename(filenameBase);

        const imageName = await S3Uploader.uploadFile(this.s3Service, file, 'images', filenameBase);

        return `https://1337bucket1337.s3.eu-north-1.amazonaws.com/${imageName}`
    }
}
