import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home'
import AddEvent from './AddEvent'

export default class DateComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: 2018,
			month: '',
			date: '',
			selectedDate: '',
			events: [],
		};
	}

	componentDidMount() {
		let month = this.props.match.params.month;
		let day = this.props.match.params.date;
		let selectedDate = `2018-04-${day}`
		axios.get('http://localhost:9001/api/events')
			.then(res => res.data)
			.then(events => {
				events.forEach((event) => { event.date = event.date.slice(0, 10) })
				this.setState({ month, day, selectedDate, events })
			})
	}

	render() {
		console.log('state', this.state)
		console.log('props', this.props)
		console.log('events', this.state.events)
		return (
			<div>
				<h1>{`${this.state.month} ${this.state.day}, ${this.state.year}`}</h1>
				{
					this.state.events.map((event) => {
						if (event.date === this.state.selectedDate) {
							let name = event.name;
							let start = event.startTime;
							let end = event.endTime;
							let eventText = start && end ? `${name} (${start}-${end})` : name
							return <ul><li>{eventText}</li></ul>
						}
					})
				}
				<AddEvent selectedDate={this.state.selectedDate} />
			</div>
		)
	}
}
