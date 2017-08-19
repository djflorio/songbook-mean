var sb_env = require("./env");

var mongoDB = 'mongodb://' + sb_env.mongo_user + ':' + sb_env.mongo_pass + '@ds139428.mlab.com:39428/sb';

module.exports = {
    database: mongoDB
}