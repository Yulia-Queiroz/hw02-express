const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const {
  addSchema,
  contactUpdateSchema,
  updateFavoriteSchema,
} = require('../../models/contact');

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
