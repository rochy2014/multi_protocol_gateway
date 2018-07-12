var express = require('express');
var router = express.Router();
var run = require('./command');
var fs = require('fs');

router.get('/', function(req, res, next) {
  var lora_path = '/usr/share/lora_gateway';
  var lora = false;

  var ble_path = '/usr/share/ble_gateway';
  var ble = false;

  if (fs.existsSync(lora_path)) {
      lora = true;
  }
  if (fs.existsSync(ble_path)) {
      ble = true;
  }

  setTimeout(function() {
    res.render('index', {lora: lora, ble: ble});
  }, 100);
});

router.post('/install', function(req, res, next) {
  var gateway = req.body.gateway;
  var result = '';

  if (gateway == 'lora') {
    var path = '/usr/share/lora_gateway';

    if (fs.existsSync(path)) {
        result= 'Already installed!';
    }

    run.exec_async('./configs/install_lora.sh');
    result= 'Installing lora gateway!';
  }

  else if (gateway == 'ble') {
    var path = '/usr/share/ble_gateway';

    if (fs.existsSync(path)) {
        result= 'Already installed!';
    }

    run.exec_async('./configs/install_ble.sh');
    result= 'Installing ble gateway!';
  }

  else {
      result= 'Gateway doesn\'t exists!';
  }

  setTimeout(function() {
    res.json({result: result});
  }, 100);
});

router.post('/delete', function(req, res, next) {
  var gateway = req.body.gateway;
  var result = '';

  if (gateway == 'lora') {
      run.run_command('./configs/delete_lora.sh');
      result= 'Deleting lora gateway!';
  }
  else if (gateway == 'ble') {
      run.run_command('./configs/delete_ble.sh');
      result= 'Deleting ble gateway!';
  }
  else {
      result= 'Gateway doesn\'t exists!';
  }

  setTimeout(function() {
    res.json({result: result});
  }, 100);
});

module.exports = router;
