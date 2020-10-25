const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { validateSchema } = require('../../common/validators');
const { boardSchema } = require('./board.schema');
const { NotFoundError } = require('../../common/errors');
const asyncHandler = require('../../common/asyncHandler');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:boardId').get(
  asyncHandler(async (req, res) => {
    const board = await boardsService.get(req.params.boardId);
    if (!board) {
      throw new NotFoundError(`Board ${req.params.boardId} not found`);
    }
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  validateSchema(boardSchema),
  asyncHandler(async (req, res) => {
    const board = await boardsService.add(req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:boardId').put(
  validateSchema(boardSchema),
  asyncHandler(async (req, res) => {
    const board = await boardsService.update(req.params.boardId, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:boardId').delete(
  asyncHandler(async (req, res) => {
    const deletedBoard = await boardsService.remove(req.params.boardId);
    if (!deletedBoard) {
      throw new NotFoundError(`Board ${req.params.boardId} not found`);
    }
    res.status(204).send('The board has been deleted');
  })
);

module.exports = router;
