const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const { validateSchema } = require('../../common/moddlewares');
const { taskSchema } = require('./task.schema');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(task);
  } catch (e) {
    res.status(404).send('Task not found');
  }
});

router
  .route('/:boardId/tasks')
  .post(validateSchema(taskSchema), async (req, res) => {
    const task = await tasksService.add(
      new Task({ ...req.body, boardId: req.params.boardId })
    );

    res.json(Task.toResponse(task));
  });

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params.taskId, {
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send('User not found');
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.taskId);
    res.status(204).send('The task has been deleted');
  } catch (e) {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
