const axios = require('axios');
const { _getDate, _categorize } = require('./helpers.js');

//example query string: https://www.eventbriteapi.com/v3/events/search/?token=${process.env.API_KEY_EVENTBRITE}&location.latitude=30.2671530&location.longitude=-97.7430608&start_date.range_end=2019-08-15T00:00:00Z&expand=ticket_classes,category,venue

//takes in page number and return request string
const _createReqStr = (page = 1) => {
  //Austin lat/long
  let latitude = '30.2671530';
  let longitude = '-97.7430608';
  let futureDate = _getDate().futureDateStr;

  let reqStr = `https://www.eventbriteapi.com/v3/events/search/?token=${
    process.env.API_KEY_EVENTBRITE
    }&location.latitude=${latitude}&location.longitude=${longitude}&start_date.range_end=${futureDate}&page=${page}&expand=ticket_classes,venue,category`;

  return reqStr;
};

//calculates number of pages of API results
const _getPageCount = async () => {
  return await axios.get(_createReqStr()).then(response => {
    return response.data.pagination.page_count;
  });
};

const callAPI = async () => {
  let pages = await _getPageCount();
  let reqPromises = [];
  let events = [];

  for (let i = 1; i <= pages; i++) {
    reqPromises.push(
      axios
        .get(_createReqStr(i))
        .then(response => {
          return response.data.events;
        })
        .catch(console.log)
    );
  }

  events = await Promise.all(reqPromises);

  return events;
};

//finds and returns lowest and highest prices
const _getPrices = tickets => {
  let prices = {
    min: null,
    max: null
  };
  if (tickets[0].cost) {
    let min = parseFloat(tickets[0].cost.major_value);
    let max = parseFloat(tickets[0].cost.major_value);

    for (let i = 1; i < tickets.length; i++) {
      if (tickets[i].cost) {
        if (parseFloat(tickets[i].cost.major_value) < min) {
          min = parseFloat(tickets[i].cost.major_value);
        } else if (parseFloat(tickets[i].cost.major_value) > max) {
          max = parseFloat(tickets[i].cost.major_value);
        }
      }
    }
    prices.min = min;
    prices.max = max;
  }

  return prices;
};

//converts API data to format required by the database
const restructureData = data => {
  let events = [];

  for (let i = 0; i < data.length; i++) {
    data[i].forEach(event => {
      let restructured = {};
      restructured.source_API = 'Eventbrite';
      const { url, id } = event;
      restructured.name = event.name.text || null;
      restructured.url = url || null;
      restructured.event_id = id;
      restructured.time_start = event.start.local;
      restructured.time_end = event.end.local;
      restructured.category = 'Other';
      if (event.category_id) {
        restructured.category = _categorize(event.category.short_name);
      }
      restructured.image = null;
      if (event.logo) {
        restructured.image = event.logo.original.url;
      }
      restructured.venue = event.venue.name;
      restructured.location = event.venue.address.city;
      prices = _getPrices(event.ticket_classes);
      restructured.price_min = prices.min;
      restructured.price_max = prices.max;
      restructured.description = null;
      if (event.description) {
        restructured.description = event.description.text;
      }
      events.push(restructured);
    });
  }

  return events;
};

const getData = () => {
  return callAPI().then(data => restructureData(data));
};
getData()
module.exports = { getData };
