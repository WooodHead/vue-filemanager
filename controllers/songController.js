const { Song } = require('../models');

module.exports = {
  index(req, res) {
    Song.findAll({
      // limit: 10
    }).then(function(songs) {
      res.send(songs);
    });

  },
  async post(req, res) {
    const song = await Song.create(req.body);
    res.send(song);
  }
};