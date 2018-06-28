/**
 * lib/models/nosql/image-store.js
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  size: {
    type: Number
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  time_created: {
    type: Date
  },
  last_visit: {
    type: Date
  },
  visits: {
    type: Number,
    default: 0
  },
  has_thumb: {
    type: Boolean,
    default: false
  },
  thumb: {
    type: Buffer
  },
  data: {
    type: Buffer,
    required: true
  }
});