const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  emailAddress: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  access: { type: String, required: true, index: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  address: {
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postCode: { type: String, required: false },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
