'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepoSchema = new Schema({
  name: String,
  full_name: String
}, { collection: 'content' });

RepoSchema.statics = {

  list: function(options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    console.log('page', page);
    console.log('limit', limit);
    return this.find(criteria)
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

mongoose.model('Repo', RepoSchema);