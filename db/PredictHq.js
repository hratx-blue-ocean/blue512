const axios = require('axios');
const { _getDate, _categorize, _findImage } = require('./helpers.js');

const callAPI = () => {
  let dates = _getDate();

  return axios
    .get(
      `https://api.predicthq.com/v1/events?active.gte=${
        dates.currentDateStr
      }&active.lte=${dates.futureDateStr}&within=10mi@30.267153,-97.7430608`,
      { headers: { Authorization: process.env.API_KEY_PREDICTHQ } }
    )
    .then(res => {
      return res.data.results;
    })
    .catch(err => console.log(err));
};

const restructureData = data => {
  const eventPromises = data.map(async event => {
    if (event.state === 'active') {
      let restructured = {};

      restructured.source_API = 'predictHQ';
      const { title } = event;

      restructured.name = title || null;
      restructured.url = null;

      restructured.event_id = event.id;
      restructured.time_start = event.start;
      restructured.time_end = null;
      if (event.end) {
        restructured.time_end = event.end;
      }

      restructured.venue = null;
      if (event.entities[0]) {
        restructured.venue = event.entities[0].name;
      }
      restructured.location = 'Austin'; //here until we can scale
      restructured.price_min = null;
      restructured.price_max = null;
      restructured.description = null;
      if (event.description !== '') {
        restructured.description = event.description;
      }

      const result = await _findImage(
        restructured.name,
        event.category,
        restructured.location,
        restructured.venue
      );
      restructured.image = result;

      restructured.category = 'Other';
      if (event.category) {
        restructured.category = _categorize(event.category);
      }

      return restructured;
    }
  });

  return Promise.all(eventPromises);
};

const getData = () => {
  return callAPI().then(data => restructureData(data));
};

module.exports = { getData };
