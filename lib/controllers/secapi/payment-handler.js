/**
 * lib/controllers/secapi/payment-handler.js
 */

'use strict';

const _ = require('lodash');

const Handler = module.exports = {};

Handler.create = async function(header, payload) {
  console.log(payload);
};

Handler.retrieve = async function(header, payload) {
  console.log(payload);
};

Handler.list = async function(header, payload) {
  console.log(payload);
};