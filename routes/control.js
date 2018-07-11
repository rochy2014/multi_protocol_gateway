var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  setTimeout(function() {
    res.render('control', {control: 'control'});
  }, 100);
});

module.exports = router;
