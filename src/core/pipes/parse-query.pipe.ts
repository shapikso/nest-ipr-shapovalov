import { Injectable, PipeTransform } from '@nestjs/common';

interface ParseQueryPipeInitDto {
    omitFields?: string[];
}

@Injectable()
export class ParseQueryPipe implements PipeTransform {
    private omitFields?: string[];

    constructor(dto?: ParseQueryPipeInitDto) {
        if (dto && dto.omitFields) {
            this.omitFields = dto.omitFields;
        }
    }

    public transform (value: any) {
        for (const key in value) {
            if (this.omitFields && this.omitFields.includes(key)) {
                continue;
            }
            try {
                value[key] = JSON.parse(value[key]);
            } catch (exc) { }
        }
        return value;
    }
}
