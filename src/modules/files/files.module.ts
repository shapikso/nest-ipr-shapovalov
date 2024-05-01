import { Module } from '@nestjs/common';
import { ImageUploadsControllerV2 } from './image-uploads.controller';
import { S3Service } from "../s3/s3.service";

@Module({
    providers: [
        S3Service,
    ],
    controllers: [
        ImageUploadsControllerV2,
    ],
})
export class FilesModule { }
