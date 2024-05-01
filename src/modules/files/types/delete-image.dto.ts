import { ApiProperty } from "@nestjs/swagger";

export class DeleteImageDto {
    @ApiProperty()
    link: string;
}
