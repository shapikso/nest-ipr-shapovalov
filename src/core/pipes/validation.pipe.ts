import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor (
        private readonly schema: Joi.SchemaLike,
    ) { }

    transform (value: any) {
        const { error } = Joi.validate(value, this.schema);
        if (error) {
            throw new BadRequestException(error.details ? error.details[0].message : error.message);
        }
        return value;
    }
}
