import React, { Component } from 'react';
import fetch from 'node-fetch';
// import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seaCreatures: []
    };
    this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {
    fetch(this.api)
      .then(res => res.json())
      .then(seaCreatures => {
        this.setState({ seaCreatures: seaCreatures.data });
      });
  }

  render() {
    return (
      <>
        <h1>Welcome to Blue Ocean!</h1>
        <ul>
          {this.state.seaCreatures.map((creature, index) => (
            <li key={index}>{creature}</li>
          ))}
        </ul>
      </>
    );
  }
}
