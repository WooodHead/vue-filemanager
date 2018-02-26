'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Repo = mongoose.model('Repo');
const assign = Object.assign;

exports.index = function(req, res) {
  console.log('req.query.page', req.query.page);
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = parseInt((req.query.limit > 0 ? req.query.limit : 10));

  const _id = req.query.item;
  const options = {
    limit: limit,
    page: page
  };

  if (_id) options.criteria = {
    _id
  };

  Repo.count().then(function(count) {
    Repo.list(options).then(function(repos) {
      var obj = {
        page: page + 1,
        pages: count,
        limit: limit,
        repos: repos,
        count: count
      };

      res.json(obj);
    });

  });

};