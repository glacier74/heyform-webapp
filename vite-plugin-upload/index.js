const Uploader = require("@hpnp/qiniu-uploader");

function uploadPlugin(options) {
  return {
    name: "upload-plugin",
    apply: "build",
    closeBundle() {
      new Uploader(options);
    },
  };
}

module.exports = uploadPlugin;
