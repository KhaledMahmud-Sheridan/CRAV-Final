var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRAV version2', 
                        description: 'This is a testing server.' });
});

module.exports = router;
