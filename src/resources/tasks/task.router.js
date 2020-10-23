const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { validateSchema } = require('../../common/validators');
const { NotFoundError } = require('../../common/errors');
const { taskSchema } = require('./task.schema');
const asyncHandler = require('../../common/asyncHandler');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const tasks = await tasksService.getAll({ boardId: req.params.boardId });
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:taskId').get(
  asyncHandler(async (req, res) => {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    if (!task) {
      throw new NotFoundError(`Task ${req.params.taskId} not found`);
    }
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  validateSchema(taskSchema),
  asyncHandler(async (req, res) => {
    const task = await tasksService.add({
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:taskId').put(
  validateSchema(taskSchema),
  asyncHandler(async (req, res) => {
    const task = await tasksService.update(req.params.taskId, {
      ...req.body,
      boardId: req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:taskId').delete(
  asyncHandler(async (req, res) => {
    const deletedTask = await tasksService.remove(
      req.params.boardId,
      req.params.taskId
    );
    if (!deletedTask) {
      throw new NotFoundError(`Task ${req.params.taskId} not found`);
    }
    res.status(204).send('The task has been deleted');
  })
);

module.exports = router;
