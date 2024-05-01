import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Products } from "./products.model";
import { Users } from "../users/users.model";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { Comments } from "../comments/comments.model";
import { CommentsService } from "../comments/comments.service";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, CommentsService],
  imports: [
    SequelizeModule.forFeature([Products, Users, Comments]),
    UsersModule
  ]
})
export class ProductsModule {}
