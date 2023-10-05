const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const {
  addSchema,
  contactUpdateSchema,
  updateFavoriteSchema,
} = require('../../models/contact');

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(addSchema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(contactUpdateSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
