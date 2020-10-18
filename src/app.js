const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(
    `
    url ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}
    query params ${JSON.stringify(req.query)}
    body ${JSON.stringify(req.body)}
    `
  );
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

boardRouter.use('/:boardId/tasks', taskRouter);

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(500).send('Internal Server Error');
});

process.on('uncaughtException', err => {
  logger.error(err.stack);
});

process.on('unhandledRejection', err => {
  logger.error(err.stack);
});

// throw Error('Oops!');
// Promise.reject(new Error('Oops!'));
module.exports = app;
