import React, { Component } from 'react';
import fetch from 'node-fetch';
import MainView from './components/MainView.js'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsPlaceHolder: [
        {
          source_API: 'TicketMaster',
          name: 'Hayes Carll',
          url: 'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbow',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          image: 'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Trevor Cannon',
          url: 'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejboz',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          image: 'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Hadley Crowl',
          url: 'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbot',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          image: 'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        }
      ]
    };
    this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {

    //This will be a post request, that expects location and returns cardData
    // fetch(this.api)
    //   .then(res => res.json())
    //   .then(events => {
    //     this.setState({ eventsPlaceHolder: events.data });
    //   });

  }

  routeMainView() {
    return <MainView events={this.state.eventsPlaceHolder} />
  }

  routeTest() {
    return <h1>Test of alt route</h1>
  }

  render() {
    return (
      <>

        <h1>Welcome to Blue Ocean!</h1>
        <Navbar />
        <MainView events={this.state.eventsPlaceHolder} />
      </>
    );
  }
}
