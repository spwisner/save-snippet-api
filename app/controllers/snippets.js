'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Snippet = models.snippet;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Snippet.find({ _owner: req.user._id })
    .then(snippets => res.json({
      snippets: snippets.map((e) =>
        e.toJSON({ virtuals: false, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    snippet: req.snippet.toJSON({ virtuals: false, user: req.user }),
  });
};

const create = (req, res, next) => {
  let snippet = Object.assign(req.body.snippet, {
    _owner: req.user._id,
  });
  Snippet.create(snippet)
    .then(snippet =>
      res.status(201)
        .json({
          snippet: snippet.toJSON({ virtuals: false, user: req.user }),
        }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;
  req.snippet.update(req.body.snippet)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.snippet.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Snippet), only: ['show'] },
  { method: setModel(Snippet, { forUser: true }), only: ['update', 'destroy'] },
], });
