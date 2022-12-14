const { MongoClient } = require("mongodb-legacy");
const DB = process.env.MONGODB_URL;
const client = new MongoClient(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _DB;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (DB) {
        _DB = db.db("bookstore");
        console.log("Successfully connected to MongoDB");
      }
      return callback(err);
    });
  },
  getDb: () => {
    return _DB;
  },
};
