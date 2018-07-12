var sys = require('util')
var exec = require('child_process');
const Promise = require('bluebird');
const sh = require('shelljs');

function exec_command(command) {
  var output = exec.execSync(command).toString('utf8');
  return output;
};

function exec_status_command(command) {
  var output = exec.execSync(command).toString('utf8');
  // ## echo "[*] Test lora_gateway"
  // # ./lora_gateway/libloragw/test_loragw_spi
  // # if value 48, spi works
  if (output == 'Unit lora_gateway.service could not be found.') {
    return {"output": output, "status": "not_found"}
  }
  var active = output.split('\n')[2].replace(/ /g,'');
  var status = active.substring(
    active.indexOf("Active:") + 7,
    active.indexOf("(")
  );

  return {"output": output, "status": status, "active": active}
};

function execAsync(cmd, opts={}) {
  return new Promise(function(resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    sh.exec(cmd, opts, function(code, stdout, stderr) {
      if (code != 0) return reject(new Error(stderr));
      return resolve(stdout);
    });
  });
};

module.exports = {
  run_command: function (command) {
      return exec_command(command);
  },
  run_status_command: function (command) {
      return exec_status_command(command);
  },
  exec_async: function (command) {
      return execAsync(command, {});
  }
};
