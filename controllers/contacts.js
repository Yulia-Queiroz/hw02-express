const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../utils');

const getAllContacts = async (req, res, next) => {
  console.log(req.query);
  const { _id: owner } = req.user;

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const excludedFields = ['page', 'limit'];

  const queryObj = { ...req.query };
  excludedFields.forEach((field) => delete queryObj[field]);

  const result = await Contact.find({ ...queryObj, owner })
    .skip(skip)
    .limit(limit);

  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json('Deleted successfully');
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
