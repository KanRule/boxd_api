let router = require('express').Router()
let { task, shared: $ } = require('../models')

router.post('/',
  $.getItem('list'),
  $.getItem('board', '$.list.board_id'),
  $.validateAccess(),
  task.validateListAccess,
  task.getBoardID,
  $.createItem('task'),
  $.respond('omit:board:list')
)

router.get('/',
  task.setBoardQueryArgs, $.getItems('board'),
  task.searchTasks,
  $.respond('omit:boards')
)

router.get('/:id',
  $.getItem('task'),
  $.getItem('board', '$.task.board_id'),
  $.validateAccess(),
  task.getUserIDs, $.getItems('user'),
  task.parseDescMarkdown,
  $.respond('omit:board')
)

router.put('/:id',
  $.getItem('task'),
  $.getItem('board', '$.task.board_id'),
  $.validateAccess(),
  $.getItem('list', 'body.list_id', 'notRequired'),
  task.validateListAccess,
  $.updateItem('task', 'omit:board_id:users:labels:comments:comments_count'),
  task.updateArrays,
  $.saveItem('task'),
  task.parseDescMarkdown,
  $.respond('omit:board:list')
)

module.exports = router
