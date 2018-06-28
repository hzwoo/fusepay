/**
 * lib/models/nosql-model.js
 */

'use strict';

const mongoose = require('mongoose');

module.exports = {
  ImageStore: mongoose.model('ImageStore', require('./nosql/image-store'))
};