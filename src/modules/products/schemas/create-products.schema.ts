import * as Joi from "joi";
import { ASC_SOR, DESC_SORT } from "../../../core/constants";

const schemaMap: Joi.SchemaMap = {
    brand: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    productImage: Joi.string().required(),
    price: Joi.number().required(),
    ram: Joi.number().required(),
    screenSize: Joi.string().required(),
    userEmail: Joi.string().required(),
};

const schemaQueryMap: Joi.SchemaMap = {
    brand: Joi.array().items(Joi.string()),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    ram: Joi.array().items(Joi.number()),
    screenSize: Joi.array().items(Joi.string()),
    searchText: Joi.string().allow(null, ''),
    limit: Joi.number(),
    offset: Joi.number(),
    sortOrder: Joi.string().valid(ASC_SOR, DESC_SORT),
};

const schemaDeleteQueryMap: Joi.SchemaMap = {
    productId: Joi.number().required(),
};

export const CREATE_PRODUCT_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaMap);

export const GET_PRODUCTS_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaQueryMap);

export const DELETE_PRODUCT_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaDeleteQueryMap);
