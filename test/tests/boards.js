describe('CREATE /boards', () => {
  it('should create board', (done) => {

    let { seedProject, seedUser } = util.getObjAndUser('project')

    let boardData = {
      title: 'Board title',
      project_id: seedProject.id
    }

    request.post('/boards')
      .set(util.token(seedUser))
      .send(boardData)
      .expect(200)
      .expect(res => {
        let board = res.body.data.board
        expect(board.title).to.contain('Board title')
        expect(board.users).to.be.an('array').and.not.be.empty
        expect(board.users[0]._id).to.equal(seedUser.id)
        expect(board.users[0].admin).to.be.true
        expect(board.archieved).to.be.false
      }).end(done)
  })
})

describe('GET /board/:id', () => {
  it('should return single board with project, lists, tasks and users', (done) => {

    let { seedBoard, seedUser } = util.getObjAndUser('board')

    request.get('/boards/'+seedBoard.id)
      .set(util.token(seedUser))
      .expect(200)
      .expect(res => {
        let data = res.body.data
        expect(data.board._id).to.equal(seedBoard.id)
        expect(data.project).to.be.an('object').and.not.be.empty
        expect(data.lists).to.be.an('array').and.not.be.empty
        expect(data.tasks).to.be.an('array').and.not.be.empty
        expect(data.users).to.be.an('array').and.not.be.empty
      }).end(done)
  })
})

describe('PUT /boards/:id', () => {
  it('should NOT update board when user is not admin', (done) => {

    let { seedBoard, seedUser } = util.getObjAndUser('board', false)

    request.put('/boards/'+seedBoard.id)
      .set(util.token(seedUser))
      .send({})
      .expect(403)
      .end(done)
  })

  it('should remove current user from board even if user is not admin', (done) => {

    let { seedBoard, seedUser } = util.getObjAndUser('board', false, true)

    request.put('/boards/'+seedBoard.id)
      .set(util.token(seedUser))
      .send({ remove_user: seedUser.id })
      .expect(200)
      .expect(res => {
        let user = _.find(res.body.data.board.users, { _id: seedUser.id })
        expect(user).to.not.exist
      })
      .end(done)
  })

  it('should update board when user is admin', (done) => {

    let { seedBoard, seedUser } = util.getObjAndUser('board', true, true)

    let updateData = {
      title: 'updated',
      update_label: {
        _id: seedBoard.labels[0]._id,
        title: 'Updated Label Title'
      },
      remove_user: seedUser.id
    }

    request.put('/boards/'+seedBoard.id)
      .set(util.token(seedUser))
      .send(updateData)
      .expect(200)
      .expect(res => {
        let { board } = res.body.data
        expect(board.title).to.contain('updated')
        expect(board.labels[0].title).to.contain('Updated Label Title')
        seedUser = _.find(board.users, { _id: seedUser.id })
        expect(seedUser).to.not.exist
      }).end(done)
  })
})
