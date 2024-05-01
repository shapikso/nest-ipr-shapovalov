import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Comments } from "./comments.model";
import { CreateCommentDto } from "./types/create-products.dto";
import { Users } from "../users/users.model";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments) private commentsRepository: typeof Comments) {
  }

  async createComment(dto: CreateCommentDto) {
    const data = await this.commentsRepository.create(dto);
    return await this.commentsRepository.findByPk(data.dataValues.id, {include: [Users]});
  }

  async getComment() {
    return await this.commentsRepository.findAll({include: {all: true}});
  }
  async getCommentsByProduct(productId: number) {
    return await this.commentsRepository.findAll({
      where: {
        productId
      },
      include: {all: true}
    });
  }
}
