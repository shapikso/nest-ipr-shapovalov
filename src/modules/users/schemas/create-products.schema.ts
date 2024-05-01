import * as Joi from "joi";

const schemaUserMap: Joi.SchemaMap = {
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    role: Joi.string().required(),
};

const schemaSingleUserMap: Joi.SchemaMap = {
    email: Joi.string().email({ tlds: { allow: false } }).required(),
};


export const CREATE_USER_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaUserMap);
export const GET_SINGLE_USER_SCHEMA: Joi.ObjectSchema = Joi.object().keys(schemaSingleUserMap);
