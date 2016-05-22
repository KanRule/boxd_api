'use strict';

var Schema = require('mongoose').Schema;
var userAdminSchema = require('./userAdmin');

var boardSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  background: {
    type: String,
    maxlength: 500,
    trim: true
  },

  project_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  users: {
    type: [userAdminSchema],
    validate: {
      validator: function validator(arr) {
        return !!_.find(arr, { admin: true });
      },

      message: 'You can\'t remove all admins from a board.'
    }
  },

  archieved: {
    type: Boolean,
    default: false,
    required: true
  }
});

boardSchema.index({ 'project_id': 1 });

module.exports = boardSchema;