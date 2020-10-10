const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { validateSchema } = require('../../common/moddlewares');
const { boardSchema } = require('./board.schema');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await boardsService.get(req.params.id);
    res.json(Board.toResponse(user));
  } catch (e) {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(validateSchema(boardSchema), async (req, res) => {
  const board = await boardsService.add(new Board(req.body));
  res.json(Board.toResponse(board));
});

router.route('/:id').put(validateSchema(boardSchema), async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send('Board not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(204).send('The board has been deleted');
  } catch (e) {
    res.status(404).send('board not found');
  }
});

module.exports = router;