const express = require('express');
const Joi = require("joi");
const contactsService = require("../../models/contacts-models");
const {HttpError} = require("../../helpers")

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
  res.json(result)
  
}
  catch (error) {
    next(error);
} 
})

router.get("/:id", async (req, res, next) => {
  // res.json({ message: 'template message id' })
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404);
      }

    res.json(result);
  } catch (error) {
    next(error)
  }

});




router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message remove' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
