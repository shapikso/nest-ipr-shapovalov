import { Injectable, PipeTransform } from "@nestjs/common";
import { ClassType } from "class-transformer/ClassTransformer";
import { plainToClass } from "class-transformer";

@Injectable()
export class TransformBodyPipe<T> implements PipeTransform {
    constructor (
        private readonly type: ClassType<T>,
    ) { }

    public transform (value: any) : T {
        return plainToClass(this.type, [value])[0];
    }
}
