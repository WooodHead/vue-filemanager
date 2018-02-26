var express = require('express');
var router = express.Router();
var songController = require('../controllers/songController');
var bookRoute = require('./bookRoute');
var repoRoute = require('./repoRoute');
var fs = require('fs');
var nodePath = require('path');
var fileSize = require('filesize');
var formidable = require('formidable');
var path = require('path');

var basePath = nodePath.join(__dirname, '../public');

router.get('/files', function(req, res, next) {
  var queryPath = req.query.path;
  var pathArr = queryPath.split('/');
  console.log('pathArr', pathArr);
  var realPath = nodePath.join(basePath, queryPath);
  console.log('realPath', realPath);
  fs.readdir(realPath, function(err, files) {

    var arr = files.map(file => {
      var stat = fs.statSync(nodePath.join(realPath, file));
      var isDir = stat.isDirectory();
      var isFile = stat.isFile();
      var sizeRedable = fileSize(stat.size);
      var type = isDir ? 'dir' : (isFile ? 'file' : 'other');
      var date = stat.mtime;
      // var full_path = path.join(queryPath, file);
      var full_path = '/' + pathArr.join('/') + '/' + file;
      full_path = full_path.replace(/\/(\/)+/, '/');

      console.log('full_path', full_path);

      return {
        model: {
          name: file,
          type: type,
          size: sizeRedable,
          date: date,
          full_path: full_path
        }
      };
    });

    res.send({
      files: arr
    });
  });

});

router.post('/upload', function(req, res) {
  console.log('req', req);
  var form = new formidable.IncomingForm();
  form.multiples = true;

  form.on('file', function(field, file) {
    console.log('field', field);
    console.log('file', file);
    // fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    console.log('end');
    res.end('success');
  });
  form.parse(req);

  // res.send('end');
});

router.get('/upload/cancel', function(req, res) {
  res.send('canceled');
});

router.use('/repos', repoRoute);
router.use('/books', bookRoute);
router.post('/register', function(req, res) {
  res.send('register');
});

router.get('/songs', songController.index);
router.post('/songs', songController.post);

module.exports = router;