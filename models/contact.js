const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers/handleMongooseError")

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, );

contactSchema.post("save", handleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": `missing required email field` }),
  phone: Joi.string()
    .required()
        .messages({ "any.required": `missing required phone field` }),
  favorite: Joi.boolean(),
});

const updateFavoritesSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
    contactAddSchema,
    updateFavoritesSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};