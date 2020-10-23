const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');
const logger = require('../common/logger');

async function connectToDB(cb) {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  const db = mongoose.connection;

  db.on('error', error => {
    logger.error('mongo db failed with error', error);
  });

  db.on('open', () => {
    logger.info('mongo db is connected');
    cb();
  });
}

module.exports = { connectToDB };
