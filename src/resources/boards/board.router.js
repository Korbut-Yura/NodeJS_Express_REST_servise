const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { validateSchema, processNotFound } = require('../../common/validators');
const { boardSchema } = require('./board.schema');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(
  processNotFound(async (req, res) => {
    const user = await boardsService.get(req.params.boardId);
    res.json(Board.toResponse(user));
  })
);

router.route('/').post(validateSchema(boardSchema), async (req, res) => {
  const board = await boardsService.add(new Board(req.body));
  res.json(Board.toResponse(board));
});

router.route('/:boardId').put(
  validateSchema(boardSchema),
  processNotFound(async (req, res) => {
    const board = await boardsService.update(req.params.boardId, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:boardId').delete(
  processNotFound(async (req, res) => {
    await boardsService.remove(req.params.boardId);
    res.status(204).send('The board has been deleted');
  })
);

module.exports = router;
