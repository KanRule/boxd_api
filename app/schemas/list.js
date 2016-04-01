let Schema = require('mongoose').Schema

let listSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  position: {
    type: Number,
    required: true
  }
})

module.exports = listSchema