/**
 * lib/modules/cron/jobpool.js
 */

'use strict';

const _ = require('lodash');
const schedule = require('node-schedule');

class JobPool {
  constructor() {
    this._pool = {};
    this._workers = {};
  }

  initJobs() {

  }

  addWorker(id, rule, worker) {
    if (id && rule && worker && _.isFunction(worker)) {
      this._workers[id] = {
        rule: rule,
        callback: worker
      }
    }
  }

  removeWorker(id) {
    if (this._pool[id]) {
      this._pool[id].cancel();
      this._pool[id] = null;
    }
    this._workers[id] = null;
  }

  start(id, rule, worker) {
    try {
      if (!this._workers[id]) {
        this.addWorker(id, rule, worker);
      }
      if (!this._pool[id] && this._workers[id]) {
        let job = schedule.scheduleJob(
          this._workers[id].rule,
          this._workers[id].callback
        );
        this._pool[id] = job;
      }
    } catch (err) {
      // handler error
    }
  }

  stop(id) {
    if (id && this._pool[id]) {
      this._pool[id].cancel();
      this._pool[id] = null;
    }
  }

  pause(id) {
    this.stop(id);
  }

  restart(id) {
    if (id && this._pool[id]) {
      let job = schedule.scheduleJob(
        this._workers[id].rule,
        this._workers[id].callback
      );
      this._pool[id] = job;
    }
  }

  startAll() {
    const self = this;
    try {
      Object.keys(self._workers).forEach(function(job) {
        self.start(job, self._workers[job].rule, self._workers[job.callback]);
      })
    } catch (err) {
      // handler error
    }
  }

  stopAll() {
    const self = this;
    Object.keys(self._workers).forEach(function(job) {
      self.stop(self._workers[job]);
    });
  }
}

module.exports = JobPool;