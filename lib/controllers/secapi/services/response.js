/**
 * lib/services/response.js
 */



class Response {
  constructor(payload) {
    this._header = null;
    this._payload = payload || null;
  }

  setPayload(payload) {
    this._payload = payload;
  }

  pack() {

  }
}

module.exports = Response;