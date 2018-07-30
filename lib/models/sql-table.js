/**
 * lib/models/sql-table.js
 * This is a knex wrapper
 */

'use strict';

const _ = require('lodash');
const Exception = require('../common/exception');

class SqlTable {
  constructor(db) {
    this.db = db;
    this.name = null;
    this.sql = null;
  }

  find(conditions, options) {
    const self = this;
    if (this.sql) {
      if (conditions) {
        if (conditions.condition) {
          this.sql.where(conditions.condition);
        }
        if (conditions.and && _.isArray(conditions.and)) {
          conditions.and.forEach(function(cond) {
            self.sql.andWhere(cond);
          });
        }
        if (conditions.or && _.isArray(conditions.or)) {
          conditions.or.forEach(function(cond) {
            self.sql.orWhere(cond);
          })
        }
        if (conditions.in && _.isArray(conditions.in) &&
          conditions.in.length == 2) {
          this.sql.whereIn(conditions.in[0], conditions.in[1]);
        }
        if (conditions.notIn && _.isArray(conditions.notIn) &&
          conditions.notIn.length == 2) {
          this.sql.whereNotIn(conditions.notIn[0], conditions.notIn[1]);
        }
        if (conditions.null) {
          this.sql.whereNull(conditions.null);
        }
        if (conditions.notNull) {
          this.sql.whereNotNull(conditions.notNull);
        }
        if (conditions.between && _.isArray(conditions.between) &&
          conditions.between.length == 2) {
          this.sql.whereBetween(
            conditions.between[0],
            conditions.between[1]
          );
        }
        if (conditions.notBetween && _.isArray(conditions.notBetween) &&
          conditions.notBetween.length == 2) {
          this.sql.whereNotBetween(
            conditions.notBetween[0],
            conditions.notBetween[1]
          );
        }
        if (conditions.raw && _.isArray(conditions.raw) &&
          conditions.raw.length == 2) {
          this.sql.whereRaw(
            conditions.raw[0],
            conditions.raw[1]
          );
        }
      }

      if (options) {
        if (options.orderBy) {
          this.sql.orderBy(options.orderBy);
        }
        if (options.groupBy) {
          this.sql.groupBy(options.groupBy);
        }
        if (options.offset) {
          this.sql.offset(options.offset);
        }
        if (options.limit) {
          this.sql.limit(options.limit);
        }
      }
    }
    return this;
  }

  timeout(ms, options) {
    this.sql && this.sql.timeout(ms, options);
    return this;
  }

  select(columns) {
    this.sql && this.sql.select(columns);
    return this;
  }

  column(columns) {
    this.sql && this.sql.column(columns);
    return this;
  }

  from(builder) {
    if (this.sql && _.isFunction(builder)) {
      this.sql.from(builder);
    }
    return this;
  }

  with(alias, builder) {
    if (this.sql && _.isFunction(builder)) {
      this.sql.with(alias, builder);
    }
    return this;
  }

  withRaw(alias, raw, args) {
    if (this.sql && _.isString(raw)) {
      this.sql.with(alias, knex.raw(raw, args));
    }
    return this;
  }

  as(name) {
    this.sql && this.sql.as(name);
    return this;
  }

  where(condition) {
    this.sql && this.sql.where(condition);
    return this;
  }

  andWhere(condition) {
    this.sql && this.sql.andWhere(condition);
    return this;
  }

  orWhere(condition) {
    this.sql && this.sql.orWhere(condition);
    return this;
  }

  whereNot(condition) {
    this.sql && this.sql.whereNot(condition)
    return this;
  }

  andWhereNot(condition) {
    this.sql && this.sql.andWhereNot(condition);
    return this;
  }

  orWhereNot(condition) {
    this.sql && this.sql.orWhereNot(condition);
    return this;
  }

  whereIn(column, range) {
    this.sql && this.sql.whereIn(column, range);
    return this;
  }

  whereNotIn(column, range) {
    this.sql && this.sql.whereNotIn(column, range);
    return this;
  }

  whereNull(columns) {
    this.sql && this.sql.whereNull(columns);
    return this;
  }

  orWhereNull(columns) {
    this.sql && this.sql.orWhereNull(columns);
    return this;
  }

  whereNotNull(columns) {
    this.sql && this.sql.whereNotNull(columns);
    return this;
  }

  orWhereNotNull(columns) {
    this.sql && this.sql.orWhereNotNull(columns);
    return this;
  }

  whereExists(builder) {
    this.sql && this.sql.whereExists(builder);
    return this;
  }

  whereNotExists(builder) {
    this.sql && this.sql.whereNotExists(builder);
    return this;
  }

  whereBetween(column, range) {
    this.sql && this.sql.whereBetween(column, range);
    return this;
  }

  whereNotBetween(column, range) {
    this.sql && this.sql.whereBetween(column, range);
    return this;
  }

  whereRaw(query, bindings) {
    this.sql && this.sql.whereRaw(query, bindings);
    return this;
  }

  distinct(columns) {
    this.sql && this.sql.distinct(columns);
    return this;
  }

  groupBy(fields) {
    this.sql && this.sql.groupBy(fields);
    return this;
  }

  orderBy(fields) {
    this.sql && this.sql.orderBy(fields);
    return this;
  }

  offset(value) {
    this.sql && this.sql.offset(value);
    return this;
  }

  limit(value) {
    this.sql && this.sql.limit(value);
    return this;
  }

  insert(data, returning) {
    if (this.sql) {
      if (returning) {
        this.sql.returning(returning);
      }
      this.sql.insert(data);
    }
    return this;
  }

  update(data, returning) {
    if (this.sql) {
      if (returning) {
        this.sql.returning(returning);
      }
      this.sql.update(data);
    }
    return this;
  }

  del() {
    this.sql && this.sql.del();
    return this;
  }

  count(columns) {
    this.sql && this.sql.count(columns);
    return this;
  }

  countDistinct(columns) {
    this.sql && this.sql.countDistinct(columns);
    return this;
  }

  min(column) {
    this.sql && this.sql.min(column);
    return this;
  }

  max(column) {
    this.sql && this.sql.max(column);
    return this;
  }

  sum(column) {
    this.sql && this.sql.sum(column);
    return this;
  }

  sumDistinct(column) {
    this.sql && this.sql.sumDistinct(column);
    return this;
  }

  avg(column) {
    this.sql && this.sql.avg(column);
    return this;
  }

  avgDistinct(column) {
    this.sql && this.sql.avgDistinct(column);
    return this;
  }

  increment(column, amount) {
    this.sql && this.sql.increment(column, amount);
    return this;
  }

  decrement(column, amount) {
    this.sql && this.sql.decrement(column, amount);
    return this;
  }

  first(columns) {
    this.sql && this.sql.first(columns);
    return this;
  }

  debug(enabled) {
    this.sql && this.sql.debug(enabled);
    return this;
  }

  options(opts) {
    this.sql && this.sql.options(opts);
    return this;
  }

  async execute(options) {
    const self = this;
    let result = null;
    if (this.sql) {
      if (options) {
        if (options.toString) {
          result = await this.sql.toString();
        } else if (options.toSQL) {
          result = await this.sql.toSQL();
        }
      } else {
        await this.sql
          .then(function(rows) {
            result = rows;
          })
          .catch(function(err) {
            if (err && err.message) {
              throw new Exception.DatabaseError({
                code: err.code,
                message: err.message
              })
            } else {
              throw new Exception.DatabaseError({
                message: 'Unspecified database error'
              });
            }
          });
      }
      this._reset();
    }
    return result;
  }

  _reset() {
    this.sql = this.db(this.name);
  }

  _verify() {

  }

}

module.exports = SqlTable;