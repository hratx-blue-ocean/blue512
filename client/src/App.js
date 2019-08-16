import React, { Component } from 'react';
import MainView from './components/MainView.js';
import DetailedView from './components/DetailedView.js';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
// import fetch from 'node-fetch';
import SettingsView from './components/SettingsView';
// import './App.css';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoadEvents = this.handleLoadEvents.bind(this);
    this.state = {
      path: window.location.pathname,
      isSignedIn: null,
      PORT: 9000,
      userToken: '',
      eventsAll: [
        {
          source_API: 'TicketMaster',
          name: 'Hayes Carll',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbow',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Trevor Cannon',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejboz',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Hadley Crowl',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbot',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        }
      ],
      eventsToday: [
        {
          source_API: 'TicketMaster',
          name: 'Hayes Carll',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbow',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Trevor Cannon',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejboz',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Hadley Crowl',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbot',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        }
      ],
      eventsTomorrow: [
        {
          source_API: 'TicketMaster',
          name: 'Hayes Carll',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbow',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Trevor Cannon',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejboz',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Hadley Crowl',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbot',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        }
      ],
      eventsTomorrowPlusPlus: [
        {
          source_API: 'TicketMaster',
          name: 'Hayes Carll',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbow',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Trevor Cannon',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejboz',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        },
        {
          source_API: 'TicketMaster',
          name: 'Hadley Crowl',
          url:
            'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
          event_id: 'Z7r9jZ1Aejbot',
          time_start: '2019-08-11T02:00:00Z',
          time_end: null,
          category: 'Music',
          img:
            'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
          venue: 'Gruene Hall',
          location: 'New Braunfels',
          price_min: null,
          price_max: null,
          description: null
        }
      ],
      clickedMicroCard: {},
      today: '',
      loaded: false,
      selectedDaysEvents: [],
      openModal: false,
    };
    this.api = `http://localhost:8000/api/example`;
    this.seperateEventsByDate = this.seperateEventsByDate.bind(this);
    this.handleMicroCardClick = this.handleMicroCardClick.bind(this);
    this.changeDetailsDay = this.changeDetailsDay.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCardActionClick = this.handleCardActionClick.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }

  componentDidMount() {
    let today = new Date();
    this.setState({ today: Number(String(today.getDate()).padStart(2, 0)) });
    window.addEventListener('GoogleAuthInit', e => {
      const { init, isSignedIn } = e.detail;
      if (init && !isSignedIn) {
        this.loadEventsAnon(isSignedIn);
      }
    });

    window.addEventListener('GoogleAuthChange', e => {
      const { isSignedIn } = e.detail;
      if (!isSignedIn) {
        this.loadEventsAnon(isSignedIn);
      }
    });
  }

  changeDetailsDay(event) {
    console.log('changeDetailsDay:', event.target.textContent)
    if (event.target.textContent === 'Today') {
      this.setState({ selectedDaysEvents: this.state.eventsToday });
    }
    else if (event.target.textContent === "Tomorrow") {
      this.setState({ selectedDaysEvents: this.state.eventsTomorrow })
    }
    else {
      this.setState({ selectedDaysEvents: this.state.eventsTomorrowPlusPlus })

    }
  }

  handleMicroCardClick(event) {
    this.setState({ clickedMicroCard: event, openModal: true })
  }

  closeModal() {
    this.setState({ openModal: false })
  };

  seperateEventsByDate(allEvents) {


    // console.log(events || `testing and didn't get events`);
    // '2019-08-16T00:00:00.000Z'
    const todayArr = [],
      tomorrowArr = [],
      tomorrowPlusPlusArr = [];

    allEvents.forEach(event => {
      // event.time_start = event.time_start.substr(0, event.time_start.length - 1);
      // console.log(event.time_start)
      let parsedTimeStart = new Date(event.time_start).getDate();

      if (parsedTimeStart === this.state.today) {
        // make sure to remove the minus 2 for development
        todayArr.push(event);
      }
      if (parsedTimeStart === this.state.today + 1) {
        tomorrowArr.push(event);
      }
      if (parsedTimeStart === this.state.today + 2) {
        tomorrowPlusPlusArr.push(event);
      }
    });
    this.setState({
      eventsToday: todayArr,
      eventsTomorrow: tomorrowArr,
      eventsTomorrowPlusPlus: tomorrowPlusPlusArr,
      selectedDaysEvents: todayArr,
      eventsAll: allEvents
    });
  }

  handleLoadEvents(token, calendar_items) {
    axios
      .post('/api/events', {
        token,
        calendar_items,
        limit: null,
        day: null
      })
      .then(({ data }) => {
        this.seperateEventsByDate(data.events);
        this.setState({
          eventsAll: data.events,
          user: data.userInfo,
          isSignedIn: true,
          userToken: token,
          loaded: true
        });
      })
      .catch(console.log);
  }

  loadEventsAnon(isSignedIn) {
    axios
      .get(`/api/events`)
      .then(data => {
        this.seperateEventsByDate(data.data.events);
        this.setState({
          eventsAll: data.data.events,
          isSignedIn: isSignedIn,
          loaded: true,
          userToken: null,
          user: null
        });
      })
      .catch();
  }

  handlePageClick(path) {
    this.setState({ path: path });
  }

  handleCardActionClick(item, add) {
    if (add === true) {
      this.addToCalendar(item);
    } else if (this.state.userToken !== '') {
      axios.post(`/api/user_event/${item.id}`, { token: this.state.userToken })
        .then(this.removeEvent(item));
    } else {
      this.removeEvent(item);
    }
  }

  addToCalendar(item) {
    let eventStart = new Date(item.time_start);
    let eventEnd;
    if (item.time_end) {
      eventEnd = new Date(item.time_end);
    } else {
      eventEnd = new Date(eventStart)
      eventEnd.setHours(eventEnd.getHours() + 2);
    }
    const gCalEvent = {
      summary: item.name,
      start: {
        dateTime: eventStart
      },
      end: {
        dateTime: eventEnd
      }
    };
    // console.log(gCalEvent)
    let request = window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: gCalEvent
    });
    let context = this
    request.execute(function (event) {
      console.log('event successfully added')
      context.removeEvent(item);
      //Add notification or toast
      // console.log(event.htmlLink);
    });
  }

  removeEvent(item) {
    console.log(item);
    const allEvents = [...this.state.eventsAll];
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].experience_api_id === item.experience_api_id) {
        allEvents.splice(i, 1)
        break;
      }
    }
    this.seperateEventsByDate(allEvents)
  }

  render() {
    const {
      loaded,
      isSignedIn,
      eventsAll,
      eventsToday,
      eventsTomorrow,
      eventsTomorrowPlusPlus,
      selectedDaysEvents,
      clickedMicroCard,
      user,
      PORT,
      path,
      openModal
    } = this.state;
    return (
      <Router>
        <Navbar
          port={PORT}
          loadEvents={this.handleLoadEvents}
          isSignedIn={isSignedIn}
          path={path}
          handlePageClick={this.handlePageClick}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <MainView
                name={user}
                loaded={loaded}
                events={eventsAll}
                eventsToday={eventsToday}
                eventsTomorrow={eventsTomorrow}
                eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
                handleCardActionClick={this.handleCardActionClick}
              />
            )}
          />
          <Route
            path="/detailed"
            exact
            render={() => (
              <DetailedView
                clickedMicroCard={clickedMicroCard}
                events={eventsAll}
                eventsToday={eventsToday}
                eventsTomorrow={eventsTomorrow}
                selectedDaysEvents={selectedDaysEvents}
                changeDetailsDay={this.changeDetailsDay}
                handleMicroCardClick={this.handleMicroCardClick}
                eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
                closeModal={this.closeModal}
                openModal={openModal}
                handleCardActionClick={this.handleCardActionClick}
              />
            )}
          />
          <Route
            path="/settings"
            exact
            render={() => (
              <SettingsView
                user={this.state.user}
                userToken={this.state.userToken}
                loadEvents={this.handleLoadEvents}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
