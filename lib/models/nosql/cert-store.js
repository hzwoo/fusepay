/**
 * lib/models/nosql/cert-store.js
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
  private_key: {
    type: Buffer
  },
  public_key: {
    type: Buffer
  }
});