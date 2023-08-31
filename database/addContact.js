const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  serialNumber: Number, // Add a field for the serial number
});

// Define a function to handle auto-incrementing the serial number
ContactSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // If it's not a new document, don't auto-increment
    return next();
  }

  try {
    const lastContact = await Contact.findOne({}, {}, { sort: { serialNumber: -1 } });
    if (lastContact) {
      this.serialNumber = lastContact.serialNumber + 1;
    } else {
      // If no documents exist yet, start from 1
      this.serialNumber = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
