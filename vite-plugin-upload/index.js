const Uploader = require("@hpnp/qiniu-uploader");

function uploadPlugin(options) {
  return {
    name: "upload-plugin",
    apply: "build",
    closeBundle() {
      new Uploader(options).start();
    },
  };
}

exports.UploaderZone = Uploader.zone;
exports.default = uploadPlugin;
module.exports = uploadPlugin;
