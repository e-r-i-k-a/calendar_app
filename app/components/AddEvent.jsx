import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './Home'

export default class AddEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: 2018,
			month: '',
			date: '',
			inputName: '',
			inputStartTime: '',
			inputEndTime: '',
			inputDescription: '',
			redirect: false
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		this.setState({ [e.target.id]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		axios.post('/api/events', {
			name: this.state.inputName,
			date: this.props.selectedDate,
			startTime: this.state.inputStartTime,
			endTime: this.state.inputEndTime,
			description: this.state.inputDescription,
		})
			.then(() => {
				this.setState({redirect: true})
			})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/' />
		}
		return (
			<div>
				<form onSubmit={e => this.handleSubmit(e)}>
					<fieldset>
					<h3>Add and Event:</h3>
						<div>
							<label>Event Name</label>
							<div>
								<input
									type='text'
									id='inputName'
									onChange={this.handleInput} />
							</div>
						</div>
						<label>Start Time</label>
						<div>
							<input
								type='time'
								id='inputStartTime'
								onChange={this.handleInput} />
						</div>
						<label>End Time</label>
						<div>
							<input
								type='time'
								id='inputEndTime'
								onChange={this.handleInput} />
						</div>
						<label>Description</label>
						<div>
							<input
								type='text'
								id='inputDescription'
								onChange={this.handleInput} />
						</div>
						<div>
							<button type='submit'>
								Submit
            </button>
						</div>
					</fieldset>
				</form>
			</div>
		)
	}
}
