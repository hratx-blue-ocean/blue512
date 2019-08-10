import React, { Component } from 'react';
import Card from './Card.js'
// import fetch from 'node-fetch';


export default class CardContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <>
      <Card />
      <Card />
      <Card />
      </>
    );
  }
}
