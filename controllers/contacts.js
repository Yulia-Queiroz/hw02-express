const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../utils');

const getAllContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json('Deleted successfully');
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await contacts.updateContact(contactId, req.body);
  console.log(result);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
