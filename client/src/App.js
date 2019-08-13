import React, { Component } from "react";
import MainView from "./components/MainView.js";
import DetailedView from "./components/DetailedView.js";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
// import fetch from 'node-fetch';
import SettingsView from './components/SettingsView'
// import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoadEvents = this.handleLoadEvents.bind(this);
    this.state = {
      isSignedIn: null,
      PORT: 9000,
      userToken: '',
      eventsAll: [
        {
          source_API: "TicketMaster",
          name: "Hayes Carll",
          url:
            "http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472",
          event_id: "Z7r9jZ1Aejbow",
          time_start: "2019-08-11T02:00:00Z",
          time_end: null,
          category: "Music",
          img:
            "https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg",
          venue: "Gruene Hall",
          location: "New Braunfels",
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: "TicketMaster",
          name: "Trevor Cannon",
          url:
            "http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472",
          event_id: "Z7r9jZ1Aejboz",
          time_start: "2019-08-11T02:00:00Z",
          time_end: null,
          category: "Music",
          img:
            "https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg",
          venue: "Gruene Hall",
          location: "New Braunfels",
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: "TicketMaster",
          name: "Hadley Crowl",
          url:
            "http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472",
          event_id: "Z7r9jZ1Aejbot",
          time_start: "2019-08-11T02:00:00Z",
          time_end: null,
          category: "Music",
          img:
            "https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg",
          venue: "Gruene Hall",
          location: "New Braunfels",
          price_min: null,
          price_max: null,
          description: null
        }
      ],
      eventsToday: [],
      eventsTomorrow: [],
      eventsTomorrowPlusPlus: [],
      clickedMicroCard: [],
      today: ''
    };
    this.api = `http://localhost:8000/api/example`;
  }

  componentDidMount() {
    let today = new Date();
    this.setState({ today: Number(String(today.getDate()).padStart(2, 0)) });
    window.addEventListener("GoogleAuthInit", e => {
      const { init, isSignedIn } = e.detail;
      if (init && !isSignedIn) {
        this.loadEventsAnon(isSignedIn);
      }
    });

    window.addEventListener("GoogleAuthChange", e => {
      const { isSignedIn } = e.detail;
      if (!isSignedIn) {
        this.loadEventsAnon(isSignedIn);
      }
    });
  }

  seperateEventsByDate(events) {
    // console.log(events || `testing and didn't get events`); 
    const todayArr = [];
    const tomorrowArr = [];
    const tomorrowPlusPlusArr = [];

    events.forEach(event => {
      if (Number(event.time_start.split("T")[0].split('-')[2]) === this.state.today) { // make sure to remove the minus 2 for development
        todayArr.push(event);
      }
      if (Number(event.time_start.split("T")[0].split('-')[2]) === this.state.today + 1) {
        tomorrowArr.push(event);
      }
      if (Number(event.time_start.split("T")[0].split('-')[2]) === this.state.today + 2) {
        tomorrowPlusPlusArr.push(event);
      }
    })
    this.setState({
      eventsToday: todayArr,
      eventsTomorrow: tomorrowArr,
      eventsTomorrowPlusPlus: tomorrowPlusPlusArr
    })
  }

  handleLoadEvents(data) {
    this.setState({
      eventsAll: data.events,
      user: data.userInfo,
      isSignedIn: true
    });
  }

  loadEventsAnon(isSignedIn) {
    axios
      .get(
        `http://ec2-52-15-83-226.us-east-2.compute.amazonaws.com:${
        this.state.PORT
        }/api/events`
      )
      .then(data =>
        this.setState({
          eventsAll: data.data.events,
          isSignedIn: isSignedIn
        })
      )
      .then(() => {
        this.seperateEventsByDate(this.state.eventsAll)
      })
      .catch();
  }

  render() {
    const { isSignedIn, eventsAll, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, PORT } = this.state;
    return (
      <Router>
        <Navbar
          port={PORT}
          loadEvents={this.handleLoadEvents}
          isSignedIn={isSignedIn}
        />
        <Switch>
<<<<<<< HEAD
          <Route path='/' exact render={() => <MainView events={eventsAll} eventsToday={eventsToday} eventsTomorrow={eventsTomorrow} eventsTomorrowPlusPlus={eventsTomorrowPlusPlus} />} />
          <Route path='/detailed' exact render={() => <DetailedView events={eventsAll} />} />
=======
          <Route path='/' exact render={() => <MainView events={eventsAll} />} />
          <Route path='/detailed' exact render={() => <DetailedView events={eventsAll} eventsToday={eventsToday} eventsTomorrow={eventsTomorrow} eventsTomorrowPlusPlus={eventsTomorrowPlusPlus} />} />
>>>>>>> development
          <Route path='/settings' exact render={() => <SettingsView />} />
        </Switch>
      </Router>
    );
  }
}
