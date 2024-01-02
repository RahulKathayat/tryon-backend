const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');
const httpStatus = require('http-status');
const createContact = catchAsync(async (req, res) => {
  let contactBody = req.body;
  const data = await contactService.createContact(contactBody);
  if (data) {
    await res.status(200).send({ message: 'Contact created successfully' });
  } else {
    await res.status(404).send({ message: 'Contact not created' });
  }
});

const getAllContact = catchAsync(async (req, res) => {
  const data = await contactService.getAllContact();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Contact data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

module.exports = {
  createContact,
  getAllContact
};
