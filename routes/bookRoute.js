var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController');

router.get('/', bookController.list);
router.post('/', bookController.create);

module.exports = router;