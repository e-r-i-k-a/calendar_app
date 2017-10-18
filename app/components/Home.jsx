import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      campuses: []
    };

    this.func1 = this.func1.bind(this)
    this.func2 = this.func2.bind(this)
  }

	componentDidMount () {
		axios.get('api/campuses')
		.then(res => res.data)
		.then(campuses => this.setState({campuses}))
	}

  func1() {
    this.setState({
      answered: false,
    })
  }

  func2() {
    this.setState({
      answered: true
    })
  }

  render() {
    // if (!this.state) { return null }
    // const {joke, answered} = this.state
   const campuses=(this.state.campuses)
    return (

      <div>
        <h1>hello world</h1>
        <div id="home-campuses">
          {campuses.map(campus => {
            return <img key={campus.id} src={campus.image}/>}
           )}


          {/* <Link to = {'/campuses/:id'}>
            <img src={this.state.campuses.image}/>
          </Link>
          <Link to = {'/campuses/:id'}>
          <img src={this.state.campuses.image}/>
          </Link>
          <Link to = {'/campuses/:id'}>
          <img src={this.state.campuses.image}/>
          </Link>
          <Link to = {'/campuses/:id'}>
          <img src={this.state.campuses.image}/>
          </Link> */}
        </div>
      </div>
    )
  }
}