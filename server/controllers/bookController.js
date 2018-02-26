const { Book } = require('../models');

function list(req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const id = req.query.id;
  const limit = 10;
  const options = {
    limit: limit,
    page: page
  };

  if (id) options.where = {
    id: id
  };

  Book.findAll(options).then(function(books) {
    res.send(books);
  });
}

function create(req, res) {
  Book.create(req.body)
    .then(function(book) {
      res.send(book.dataValues);
    });
}

module.exports = {
  list,
  create
};