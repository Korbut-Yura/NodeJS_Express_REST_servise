const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { validateSchema, processNotFound } = require('../../common/validators');
const { boardSchema } = require('./board.schema');

router.route('/').get(async (req, res, next) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
  next();
});

router.route('/:boardId').get(
  processNotFound(async (req, res, next) => {
    const user = await boardsService.get(req.params.boardId);
    res.json(Board.toResponse(user));
    next();
  })
);

router.route('/').post(validateSchema(boardSchema), async (req, res, next) => {
  const board = await boardsService.add(new Board(req.body));
  res.json(Board.toResponse(board));
  next();
});

router.route('/:boardId').put(
  validateSchema(boardSchema),
  processNotFound(async (req, res, next) => {
    const board = await boardsService.update(req.params.boardId, req.body);
    res.json(Board.toResponse(board));
    next();
  })
);

router.route('/:boardId').delete(
  processNotFound(async (req, res, next) => {
    await boardsService.remove(req.params.boardId);
    res.status(204).send('The board has been deleted');
    next();
  })
);

module.exports = router;
