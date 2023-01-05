const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
  if (req.apiUser._id && req.apiUser.access === 'admin') {
    if (!validator.isEmail(req.body.emailAddress)) {
      return res.status(401).json({ status: 'Failed', message: 'Please enter a valid email address.' });
    }
    User.findOne({ emailAddress: req.body.emailAddress })
      .then((user) => {
        if (user) {
          res.status(401).json({ status: 'Failed', message: 'The email address already exist.' });
        } else {
          req.body.password = bcrypt.hashSync(req.body.password, salt);
          const user = new User(req.body);
          user
            .save()
            .then((data) => {
              data.password = '***************';
              res.status(200).json({ status: 'Success', message: 'The new user was added successfully.', data });
            })
            .catch((err) => res.status(401).json({ status: 'Failed', message: 'Failed to add user.', error: err }));
        }
      })
      .catch((err) => res.status(401).json({ status: 'Failed', message: 'Failed to add user.', error: err }));
  } else {
    res.status(401).json({ status: 'Failed', message: 'Only admin can create a new user' });
  }
};

// =================================================================================

exports.login = (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress })
    .then((user) => {
      if (user == null) {
        res.status(400).json({ status: 'Failed', message: 'Email address not found.' });
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let accessToken = jwt.sign(
            {
              _id: user._id,
              access: user.access,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '8h' }
          );
          user.password = '***************';
          res.status(200).json({ status: 'Success', message: 'Logged in successfully!', token: accessToken, data: user });
        } else {
          res.status(400).json({ status: 'Failed', message: 'Wrong password.' });
        }
      }
    })
    .catch((err) => res.json('Error: ' + err));
};

// =================================================================================

exports.authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  try {
    req.apiUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch {
    res.status(401).json({ status: 'Failed', message: 'Token has expired, please log in again' });
  }
};

// =================================================================================

exports.getList = (req, res) => {
  if (req.apiUser._id && req.apiUser.access === 'admin') {
    User.find()
      .select({ password: 0 })
      .then((data) => {
        console.log(data);
        res.status(200).json({ status: 'Success', message: 'Successfully grabbed all user data', data });
      })
      .catch((err) => res.status(408).json({ status: 'Failed', message: 'Error getting user list. Please try again later.', error: err }));
  } else {
    res.status(401).json({ status: 'Failed', message: 'User permission not granted!' });
  }
};

// =================================================================================

exports.deleteUser = (req, res) => {
  if (req.apiUser._id && req.apiUser.access === 'admin') {
    if (req.apiUser._id === req.params.id) {
      res.json({ status: 'Failed', message: 'You cannot delete your own account.' });
    } else {
      User.findByIdAndDelete(req.params.id)
        .select({ password: 0 })
        .then((data) => {
          res.status(200).json({ status: 'Success', message: 'The user account was successfully deleted.', data });
        })
        .catch((err) => res.status(400).json({ status: 'Failed', message: 'The user id was not found.', error: err }));
    }
  } else {
    res.status(401).json({ status: 'Failed', message: 'Only admins can delete an account. Please contact your admin.' });
  }
};

// =================================================================================

exports.updateUser = (req, res) => {
  if (req.body.emailAddress || req.body.username) {
    res.json({ status: 'Failed', message: 'You are not allowed to update the email address and username' });
  } else {
    if (req.apiUser._id && req.apiUser._id === req.params.id) {
      User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => {
          data.password = '***************';
          res.json({ status: 'Success', message: 'User data updated successfully', data });
        })
        .catch((err) => res.status(408).json({ status: 'Failed', message: 'User data NOT updated.', error: err }));
    } else {
      res.status(401).json({ status: 'Failed', message: 'You areonly allowed to update your own account' });
    }
  }
};

// =================================================================================
