require('../app/utils/lodash')

let mongoose = require('mongoose')
let config = require('../config')
let { dropDatabase, batchInsert } = require('./seed_db_script')

mongoose.connect(config.dbPath, (err) => {
  dropDatabase()

  batchInsert({ size: {
    projects: 5,
    tasks: 7
  }, log: true }, (err, items) => {
    if (err) return done(err)
    console.log("Database seeding done.\n")
  })
})
