import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Products } from "./products.model";
import { CreateProductsDto, FindProductsDto } from "./types/create-products.dto";
import { FindOptions, Op } from "sequelize";
import { DEFAULT_LIMIT, DEFAULT_OFFSET, DESC_SORT } from "../../core/constants";
import { Users } from "../users/users.model";
import { Comments } from "../comments/comments.model";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Products) private productRepository: typeof Products) {
  }

  async createProduct(dto: CreateProductsDto) {
    return await this.productRepository.create(dto);
  }

  async getProducts(dto: FindProductsDto) {

    const {minPrice, maxPrice, ram, screenSize, brand, searchText, limit, sortOrder, offset} = dto;
    const options: FindOptions<Products> = {
      order: [
        [
          'price',
          sortOrder || DESC_SORT,
        ]
      ],
      where: {}
    };

    if (minPrice && maxPrice) {
      options.where = {
        ...options.where,
        price: {
          [Op.between]: [minPrice, maxPrice]
        },
      };
    }

    if (ram) {
      options.where = {
        ...options.where,
        ram: {
          [Op.or]: ram,
        },
      };
    }

    if (screenSize) {
      options.where = {
        ...options.where,
        screenSize: {
          [Op.or]: screenSize,
        },
      };
    }

    if (brand) {
      options.where = {
        ...options.where,
        brand: {
          [Op.or]: brand
        },
      };
    }

    if (searchText) {
      options.where = {
        ...options.where,
        [Op.or]: [
          { title: { [Op.like]: `%${searchText}%` } },
          { description: { [Op.like]: `%${searchText}%` } }
        ]
      };
    }

    const productsData = await this.productRepository.findAll(options);
    const newLimit = limit || DEFAULT_LIMIT;
    const newOffset = offset || DEFAULT_OFFSET;
    const products = {
      data: productsData.slice(newOffset, newOffset + newLimit),
      count: productsData.length };
    return new Promise((resolve) => resolve(products));
  }

  async getAllProducts() {
    return await this.productRepository.findAll();
  }
  async findProduct(id: number) {
    return await this.productRepository.findOne( {where: {id},include: {
      model: Comments,
      include: [Users] }});
  }
}
