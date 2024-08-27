'use strict'

const mongoose = require('mongoose');
const AuthService = require('../services/authService');

module.exports.up = async function (next) {

  try {
    await AuthService.createUser('admin@admin.com', 'admin9999', 'admin');
    await AuthService.createUser('user@user.com', 'user9999', 'user');

    next();
  } catch (error) {
    console.error('Error creating users:', error);
    next(error);
  }
};

module.exports.down = async function (next) {
  try {
    await mongoose.model('User').deleteMany({
      email: { $in: ['admin@admin.com', 'user@user.com'] }
    });

    next();
  } catch (error) {
    console.error('Error deleting users:', error);
    next(error);
  }
};
