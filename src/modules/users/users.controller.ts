import { Body, Controller, Get, Post } from "@nestjs/common";
import { ValidationPipe } from "../../core/pipes/validation.pipe";
import { CREATE_USER_SCHEMA, GET_SINGLE_USER_SCHEMA } from "./schemas/create-products.schema";
import { UsersService } from "./users.service";
import { CreateUserDto, GetUserDto } from "./types/create-products.dto";

@Controller('users')
export class UsersController {

  constructor(private productsService: UsersService) {}
  @Post()
  async create(@Body(new ValidationPipe(CREATE_USER_SCHEMA)) dto: CreateUserDto) {
    const user = await this.productsService.getUserByEmail(dto.email);
    if (user) {
      return user;
    }
    return this.productsService.createUser(dto);
  }
  @Get()
  getAll() {
    return this.productsService.getUsers();
  }

  @Get('single')
  getOne(@Body(new ValidationPipe(GET_SINGLE_USER_SCHEMA)) dto: GetUserDto) {
    return this.productsService.getUserByEmail(dto.email);
  }
}
