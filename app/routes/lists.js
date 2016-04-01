let router = require('express').Router()
let { list, shared } = require('../models')

router.post('/',
  list.createList
)

router.put('/:id',
  list.updateList
)


/*router.delete('/:id', (req, res, next) => {
  Board.findById(req.body.board_id, (err, board) => {
    if (err || !board) return next(err)

    if (!_.find(board.users, { _id: req.user.id })) {
      return next(_.$err('denied'))
    }

    let list = board.lists.pull(req.params.id)

    board.save((err, board) => {
      if (err) return next(err)

      Task.find({ list_id: list._id }).remove((err, tasks) => {
        if (err) return next(err)
        res.json({ data: list })
      })
    })
  })
})*/

module.exports = router