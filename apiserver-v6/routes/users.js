var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('CRAV API Server: User');
});

module.exports = router;
