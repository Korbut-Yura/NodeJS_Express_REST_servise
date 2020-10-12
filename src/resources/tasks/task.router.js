const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { validateSchema, processNotFound } = require('../../common/validators');
const { taskSchema } = require('./task.schema');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(
  processNotFound(async (req, res) => {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(task);
  })
);

router.route('/').post(validateSchema(taskSchema), async (req, res) => {
  const task = await tasksService.add(
    new Task({ ...req.body, boardId: req.params.boardId })
  );

  res.json(Task.toResponse(task));
});

router.route('/:taskId').put(
  validateSchema(taskSchema),
  processNotFound(async (req, res) => {
    const task = await tasksService.update(req.params.taskId, {
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:taskId').delete(
  processNotFound(async (req, res) => {
    await tasksService.remove(req.params.boardId, req.params.taskId);
    res.status(204).send('The task has been deleted');
  })
);

module.exports = router;
