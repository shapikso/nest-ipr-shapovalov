import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException, Param, ParseIntPipe,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import {
  CreateProductsDto,
  FindProductsDto,
  ProductsData,
  } from "./types/create-products.dto";
import { ValidationPipe } from "../../core/pipes/validation.pipe";
import { CREATE_PRODUCT_SCHEMA, GET_PRODUCTS_SCHEMA } from "./schemas/create-products.schema";
import { UsersService } from "../users/users.service";
import { CommentsService } from "../comments/comments.service";

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService, private usersService: UsersService, private commentsService: CommentsService) {}

  @Post()
  async create(@Body(new ValidationPipe(CREATE_PRODUCT_SCHEMA)) dto: CreateProductsDto) {
    const user = await this.usersService.getUserByEmail(dto.userEmail);
    if(!user) {
      throw new BadRequestException('No such user');
    }
    dto.userId = user.id;
    return this.productsService.createProduct(dto);
  }

  @Get()
  getAll(
    @Query(new ValidationPipe(GET_PRODUCTS_SCHEMA)) dto: FindProductsDto,
  ) {
    return this.productsService.getProducts(dto);
  }

  @Get('single-product/:productId')
  async getOne(
    @Param('productId', new ParseIntPipe()) id: number,
  ) {
    const instance = await this.productsService.findProduct(id);
    if (!instance) {
      throw new NotFoundException('Product not found');
    }
    return instance;
  }

  @Put(':productId')
  async updateOne(
    @Param('productId', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe(CREATE_PRODUCT_SCHEMA)) dto: ProductsData,
  ){
    const instance = await this.productsService.findProduct(id);
    if (!instance) {
      throw new NotFoundException('Product not found');
    }

    await instance.update(dto);
    return instance;
  }

  @Delete(':productId')
  async deleteOne(
    @Param('productId', new ParseIntPipe()) id: number,
  ) {
    const instance = await this.productsService.findProduct(id);
    if (!instance) {
      throw new NotFoundException('Product not found');
    }
    await instance.destroy();
  }

  @Get('filters')
  async getFilters(
  ) {
    const items = await this.productsService.getAllProducts();
    return items.reduce((acc, {dataValues}) => {
      return {
        checkBoxes: {
          brand: {...acc.checkBoxes.brand, [dataValues.brand]: acc.checkBoxes.brand[dataValues.brand] ? ++acc.checkBoxes.brand[dataValues.brand] : 1},
          ram: {...acc.checkBoxes.ram, [dataValues.ram]: acc.checkBoxes.ram[dataValues.ram] ? ++acc.checkBoxes.ram[dataValues.ram] : 1},
          screenSize: {...acc.checkBoxes.screenSize, [dataValues.screenSize]: acc.checkBoxes.screenSize[dataValues.screenSize] ? ++acc.checkBoxes.screenSize[dataValues.screenSize] : 1},
        },
        minPrice: acc.minPrice < dataValues.price ? acc.minPrice : dataValues.price,
        maxPrice: acc.maxPrice > dataValues.price ? acc.maxPrice : dataValues.price,
      }
    }, {
      checkBoxes: {
        brand: {},
        ram: {},
        screenSize: {},
      },
      minPrice: Number.MAX_SAFE_INTEGER,
      maxPrice: 0,
    });
  }
}
