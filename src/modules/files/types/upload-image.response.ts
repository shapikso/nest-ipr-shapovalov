import { ApiProperty } from "@nestjs/swagger";

export class UploadImageResponse {
    @ApiProperty()
    link: string;
}

export class UploadImageResponseV2 {
    @ApiProperty()
    link: string;

    @ApiProperty()
    mock: string;

    @ApiProperty()
    fullLink: string;
}
