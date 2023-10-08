const Jimp = require('jimp');
const { HttpError } = require('./HttpError');

const avatarResize = async (avatarPath) => {
  try {
    const avatar = await Jimp.read(avatarPath);
    avatar.resize(250, 250);
    await avatar.writeAsync(avatarPath);
  } catch (error) {
    HttpError(500, 'An error occurred while processing the image.');
  }
};

module.exports = avatarResize;