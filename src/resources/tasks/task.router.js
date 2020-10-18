const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { validateSchema, processNotFound } = require('../../common/validators');
const { taskSchema } = require('./task.schema');

router.route('/').get(async (req, res, next) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
  next();
});

router.route('/:taskId').get(
  processNotFound(async (req, res, next) => {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(task);
    next();
  })
);

router.route('/').post(validateSchema(taskSchema), async (req, res, next) => {
  const task = await tasksService.add(
    new Task({ ...req.body, boardId: req.params.boardId })
  );

  res.json(Task.toResponse(task));
  next();
});

router.route('/:taskId').put(
  validateSchema(taskSchema),
  processNotFound(async (req, res, next) => {
    const task = await tasksService.update(req.params.taskId, {
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
    next();
  })
);

router.route('/:taskId').delete(
  processNotFound(async (req, res, next) => {
    await tasksService.remove(req.params.boardId, req.params.taskId);
    res.status(204).send('The task has been deleted');
    next();
  })
);

module.exports = router;
