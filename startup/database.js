const { MongoClient } = require("mongodb");
const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

const database = config.get("db");

module.exports = function () {
  mongoose
    .connect(database, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => winston.info(`Connected to ${database}`));
};

// const uri = database;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected successfully to server");
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);
