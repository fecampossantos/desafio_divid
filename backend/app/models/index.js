const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// tables in the db
db.user = require("../models/user.models")(mongoose)
db.repository = require("../models/repository.models")(mongoose);

require("../models/user.models")
require("../models/repository.models")



module.exports = db;