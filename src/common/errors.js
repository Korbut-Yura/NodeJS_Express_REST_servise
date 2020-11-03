class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
    this.message = message || 'Not Found';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.message = message || 'Bad request';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
    this.message = 'Forbidden';
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
    this.message = 'Unauthorized';
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError
};
