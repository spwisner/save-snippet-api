'use strict';

const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  library: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});

snippetSchema.virtual('length').get(function length() {
  return this.text.length;
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
