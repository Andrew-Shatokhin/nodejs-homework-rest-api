const express = require('express');

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contact");
const { validateBody, isValidId, isValidStatus } = require("../../decorators");

const router = express.Router();



router.get("/", contactsController.listContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put(
  "/:id",
isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:id/favorite",
  isValidStatus,
  validateBody(schemas.updateFavoritesSchema),
  contactsController.updateStatusContact
);

router.delete("/:id", isValidId, contactsController.removeContact);

module.exports = router
