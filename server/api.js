'use strict'
const api = require('express').Router()
const db = require('../db/models')
const Event = db.Event;
const User = db.User;

//GET:
api.get('/events', (req, res, next) => {
  db.Event.findAll({include: [{all: true}]})
  .then(allEvents => {
    res.json(allEvents);
  })
  .catch(next)
})

//POST:
api.post('/events', function (req, res, next) {
  db.Event.create(req.body)
  .then ((events) => {
    res.status(201).json(events);
  })
  .catch(next);
})

//DELETE:
api.delete('/events/:id', (req, res, next) => {
  let id = Number(req.params.id);
  db.Event.destroy({
    where: {id}
  })
  .then(()=>res.sendStatus(202))
  .catch(next)
});

// PUT:
api.put('/events/:id', (req, res, next) => {
  const id = Number(req.params.id);
  db.Event.findOne({
		include: [{model: User}],
		where: {id}
	})
	.then(eventToUpdate => {
    eventToUpdate.update({
      name: req.body.newName,
      date: req.body.newDate,
    })
  })
  .then((updatedEvent) => {
    res.status(200).json(updatedEvent)
  })
  .catch(next);
})

module.exports = api
