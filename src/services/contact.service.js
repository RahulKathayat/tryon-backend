// controllers/contactController.js

const { Contact } = require('../models'); // Make sure to use the correct path to your models folder

const createContact = async (contactBody) => {
  const data = await Contact.create(contactBody);
  return data;
};

const getAllContact = async () => {
  const contacts = await Contact.findAll({
    order: [['updatedAt', 'DESC']]
  }); // Use findAll instead of findAndCountAll if you only need the data
  return contacts;
};

module.exports = {
  createContact,
  getAllContact
};
