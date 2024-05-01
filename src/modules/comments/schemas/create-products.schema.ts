import * as Joi from "joi";

const schemaUserMap: Joi.SchemaMap = {
    userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
    commentText: Joi.string().required(),
    productId: Joi.number().required(),
};

const schemaSingleUserMap: Joi.SchemaMap = {
    email: Joi.string().email({ tlds: { allow: false } }).required(),
};


export const CREATE_COMMENT_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaUserMap);
export const GET_SINGLE_USER_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaSingleUserMap);