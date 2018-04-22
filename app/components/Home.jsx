import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DateComponent from './DateComponent'
import AddEvent from './AddEvent'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 'April',
      year: 2018,
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      events: [],
      selectedDate: '',
      selectedDateEvents: {},
      redirect: false
    };
    this.makeMonth = this.makeMonth.bind(this);
    this.makeDateCell = this.makeDateCell.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:9001/api/events')
      .then(res => res.data)
      .then(events => {
        events.forEach((event) => { event.date = event.date.slice(0, 10) })
        this.setState({ events })
      })
  }

  makeMonth(len) {
    let month = new Array(5);
    let date = 1;
    for (let i = 0; i < month.length; i++) {
      let week = new Array(7);
      for (let j = 0; j < week.length; j++) {
        week[j] = date < len + 1 ? date : null;
        date++;
      }
      month[i] = week;
    }
    return month;
  }

  makeDateCell(dayNum) {
    if (dayNum) {
      let day = dayNum > 9 ? dayNum : `0${dayNum}`
      let dateStr = `2018-04-${day}`
      let eventNames = [];
      this.state.events.map((event) => {
        if (event.date === dateStr) {
          eventNames.push(event.name)
        }
      })
      return (
        <div>
          <div className='dateNum'>{dayNum}</div>
          {eventNames.map((eventName) =>
            <div className='eventName'>{eventName}</div>
          )}
        </div>
      )
    }
  }

  handleDateClick(selectedDate) {
    if (selectedDate) {
      this.setState({
        selectedDate,
        redirect: true,
      })
    }
  }

  render() {
    const weekDays = this.state.weekDays;
    let month = this.makeMonth(30);
    console.log('state', this.state)
    if (this.state.redirect) {
      return <Redirect push to={`${this.state.month}/${this.state.selectedDate}`} />
    }
    return (
      <div>
        <main>
          <h1>{`${this.state.month} ${this.state.year}`}</h1>
          <table className='calendar-table'>
            <thead>
              <tr>
                {weekDays.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {month.map(week => (
                <tr key={week}>
                  {week.map(date =>
                    <td onClick={(e) => this.handleDateClick(date)} >
                      {this.makeDateCell(date)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}
