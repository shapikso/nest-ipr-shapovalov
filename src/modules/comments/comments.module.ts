import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersService } from "../users/users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "../users/users.model";
import { Comments } from "./comments.model";
import { UsersModule } from "../users/users.module";
import { Products } from "../products/products.model";

@Module({
  providers: [CommentsService, UsersService],
  controllers: [CommentsController],
  imports:[
    SequelizeModule.forFeature([Users, Comments, Products]),
    UsersModule
  ],
  exports: [CommentsService]
})
export class CommentsModule {}
