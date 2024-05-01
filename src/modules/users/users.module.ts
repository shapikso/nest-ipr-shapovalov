import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./users.model";
import { Products } from "../products/products.model";
import { Comments } from "../comments/comments.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([Users,Products,Comments])
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {}
