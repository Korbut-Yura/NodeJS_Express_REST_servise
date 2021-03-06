const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const logger = require('./common/logger');
const {
  NotFoundError,
  ValidationError,
  ForbiddenError,
  UnauthorizedError
} = require('./common/errors');
const { authorization } = require('./common/authorization');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

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

app.use(authorization);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use('/users', userRouter);
app.use('/boards', boardRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.stack);
  if (
    err instanceof NotFoundError ||
    err instanceof ForbiddenError ||
    err instanceof ValidationError ||
    err instanceof UnauthorizedError
  ) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
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
