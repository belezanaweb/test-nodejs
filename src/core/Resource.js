const fs = require('fs');
const path = require('path');

module.exports = class Resource {

  list(callback) {
    try {
      let resources = new Object();
      let resourcePath = path.resolve('./src/resource');
      fs.readdir(resourcePath, (err, files) => {
        if (err) throw err;
        files.forEach(filename => {
          let name = filename.replace(/^(.*)\.js$/, '$1');
          let path = `${resourcePath}/${name}`;
          resources[name] = path;
        });
        if (callback instanceof Function) {
          callback(resources);
        }
      });
    } catch (err) {
      throw err;
    }
  }

}
