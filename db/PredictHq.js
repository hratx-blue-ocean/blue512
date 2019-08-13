const axios = require("axios");
const Helpers = require("./helpers.js");
const getZipCode = require("latlng-to-zip"); //here for scaling
const zipToCity = require("zipcodes");

const callAPI = () => {
  let dates = Helpers._getDate();

  return axios
    .get(
      `https://api.predicthq.com/v1/events?active.gte=${
        dates.currentDateStr
      }&active.lte=${dates.futureDateStr}&within=10mi@30.267153,-97.7430608`,
      { headers: { Authorization: proccess.env.API_KEY_PREDICTHQ } }
    )
    .then(res => {
      return res.data.results;
    });
};

const restructureData = async data => {
  let events = [];
  data.forEach(event => {
    if (event.state === "active") {
      let restructured = {};

      restructured.source_API = "predictHQ";
      const { title } = event;

      restructured.name = title || null;
      restructured.url = null;

      restructured.event_id = event.id;
      restructured.time_start = event.start;
      restructured.time_end = null;
      if (event.end) {
        restructured.time_end = event.end;
      }
      restructured.category = "undefined";
      if (event.category) {
        restructured.category = event.category;
      }
      restructured.image = null;
      restructured.venue = null;
      if (event.entities[0]) {
        restructured.venue = event.entities[0].name;
      }
      restructured.location = "Austin"; //here until we can scale
      restructured.price_min = null;
      restructured.price_max = null;
      restructured.description = null;
      if (event.description !== "") {
        restructured.description = event.description;
      }
      events.push(restructured);
    }
  });
  return events;
};

const getData = () => {
  return callAPI().then(data => restructureData(data));
};

module.exports = { getData };
