import React, { Component } from 'react';
import CardMaker from './CardMaker.js';
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
      <CardMaker />
      <CardMaker />
      <CardMaker />
      </>
    );
  }
}
