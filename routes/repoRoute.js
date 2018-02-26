var express = require('express');
var router = express.Router();
var repoController = require('../controllers/repoController');

router.get('/', repoController.index);
// router.post('/', repoController.create);

module.exports = router;