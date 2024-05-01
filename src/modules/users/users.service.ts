import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./users.model";
import { CreateUserDto } from "./types/create-products.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersRepository: typeof Users) {
  }

  async createUser(dto: CreateUserDto) {
    return await this.usersRepository.create(dto);
  }

  async getUsers() {
    return await this.usersRepository.findAll({include: {all: true}});
  }
  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email
      }
    });
  }
}
