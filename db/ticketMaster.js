const axios = require("axios");



const callAPI = () => {
  return axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=HpN96WzAyrvtyuExzzl2Jvg9AM7sR8Ci&latlong=30.2671530,-97.7430608&radius=50&unit=miles&locale=*&startDateTime=2019-08-13T05:00:00Z&endDateTime=2019-08-18T04:00:00Z&size=100`
    )
    .then(response => {
      return response.data._embedded.events;
    })
    .catch(console.log);
};

const restructureData = data => {
  let events = [];
  data.forEach(event => {
    let restructured = {};
    restructured.source_API = "TicketMaster";
    const { name, url } = event;
    restructured.name = name || null;
    restructured.url = url || null;
    restructured.event_id = event.id;
    restructured.time_start = event.dates.start.dateTime;
    restructured.time_end = null;
    if (event.dates.end) {
      restructured.time_end = event.dates.end.dateTime;
    }
    restructured.category = "undefined";
    if (event.classifications) {
      restructured.category = event.classifications[0].segment.name;
    }
    restructured.image = event.images[0].url;
    restructured.venue = event._embedded.venues[0].name;
    restructured.location = event._embedded.venues[0].city.name;
    restructured.price_min = null;
    restructured.price_max = null;
    if (event.priceRanges) {
      restructured.price_min = event.priceRanges[0].min;
      restructured.price_max = event.priceRanges[0].max;
    }
    restructured.description = null;
    if (event.description) {
      restructured.description = event.description;
    }
    events.push(restructured);
  });

  return events;
};

const getData = () => {
  return callAPI().then(data => restructureData(data));
};

module.exports = { getData };
