var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  setTimeout(function() {
    res.render('index', {gateway_id: 'gg'});
  }, 100);
});

module.exports = router;
