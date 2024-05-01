import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ValidationPipe } from "../../core/pipes/validation.pipe";
import { CommentsService } from "./comments.service";
import { UsersService } from "../users/users.service";
import { CREATE_COMMENT_SCHEMA } from "./schemas/create-products.schema";
import { CreateCommentDto } from "./types/create-products.dto";

@Controller('comments')
export class CommentsController {

  constructor(private commentsService: CommentsService, private usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe(CREATE_COMMENT_SCHEMA)) dto: CreateCommentDto) {
    const user = await this.usersService.getUserByEmail(dto.userEmail);
    if(!user) {
      throw new BadRequestException('No such user');
    }
    dto.userCommentId = user.id;
    return this.commentsService.createComment(dto);
  }
  @Get()
  getAll() {
    return this.commentsService.getComment();
  }

  @Get(':productId')
  getCommentsByProduct(
    @Param('productId', new ParseIntPipe()) id: number,
  ) {
    return this.commentsService.getCommentsByProduct(id);
  }
}
