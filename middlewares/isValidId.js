const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../utils');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not valid`));
  }
  next();
};

module.exports = isValidId;
