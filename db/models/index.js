const db = require('../../db')
const Sequelize = require('sequelize');

let Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
	},
	date: {
		type: Sequelize.DATE,
		allowNull: false
	},
	startTime: {
		type: Sequelize.STRING,
		defaultValue: new Date().toTimeString().split(' ')[0].slice(0, -3)
	},
	endTime: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.TEXT,
		defaultValue: 'lorem ipsum...'
	}
})

let User = db.define('user', {
	name: {
		type: Sequelize.STRING
	}
})

// associations:
User.hasOne(Event);
User.hasMany(Event);
Event.belongsTo(User);
	//UserID added to Event table

module.exports = {Event, User}
