import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <nav>
          <Link to={'/'}>
            <button>Home</button>
          </Link>
        </nav>
      </div>
    )
  }
}
