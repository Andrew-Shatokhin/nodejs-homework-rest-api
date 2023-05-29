const express = require('express');

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contact");
const {
  validateBody,
  isValidId,
  isValidStatus,
  authenticate,
} = require("../../decorators");

const router = express.Router();



router.get("/", authenticate, contactsController.listContacts);

router.get("/:id", authenticate, isValidId, contactsController.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidStatus,
  validateBody(schemas.updateFavoritesSchema),
  contactsController.updateStatusContact
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsController.removeContact
);

module.exports = router
