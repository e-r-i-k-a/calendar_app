const express = require('express')
const db = require('./db')
const Sequelize = require('sequelize');
const Event = require('./db/models').Event;
const User = require('./db/models').User;

db
  .sync({ force: true })
  .then(() => {
    console.log('planting seeds');
    return User.create(
      {
        name: 'Erika'
      }
    );
  })
  .then(() => {
    console.log('planting more seeds');
    return Event.bulkCreate([
      {
        name: 'Luna',
        date: '2018-04-23 19:30:00',
        userId: '1',
        startTime: '12:00',
        endTime: '',
        description: "we're going to outer space!"
      },
      {
        name: 'Mars',
        date: '2018-04-24',
        userId: '1',
        startTime: '',
        endTime: '',
        description: 'description for Mars event'
      },
      {
        name: 'Terra',
        date: '2018-04-25',
        startTime: '',
        endTime: '',
        description: 'description for Terra event'

      },
      {
        name: 'Titan',
        date: '2018-04-26',
        startTime: '',
        endTime: '',
        description: 'description for Titan event'
      }]
    );
  })
  .then(() => {
    console.log('flowers bloomed');
    db.close();
    return null;
  });
