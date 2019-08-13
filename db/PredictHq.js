const axios = require('axios');
const config = { "Authorization": "Bearer gWxFwg4Ohs4lLCQAgEr9SVsZbIQ7rC" };
const getZipCode = require('latlng-to-zip'); //here for scaling 
const zipToCity = require('zipcodes');


const _getDate = () => {
    let currentDate = new Date
    let futureDate = new Date()

    let currentDay = currentDate.getDate()
    let currentMonth = currentDate.getMonth() + 1
    let currentYear = currentDate.getFullYear()

    futureDate.setDate(futureDate.getDate() + 3)
    let futureDay = futureDate.getDate()
    let futureMonth = futureDate.getMonth() + 1
    let futureYear = futureDate.getFullYear()

    let dates = {
        currentDateStr: currentYear + '-' + currentMonth + '-' + currentDay + 'T00:00:00Z',
        futureDateStr: futureYear + '-' + futureMonth + '-' + futureDay + 'T00:00:00Z'
    }

    return dates;
}
let dates = _getDate();


const callAPI = () => {
    return axios.get(`https://api.predicthq.com/v1/events?active.gte=${dates.currentDateStr}&active.lte=${dates.futureDateStr}&within=10mi@30.267153,-97.7430608`, { headers: config })
        .then(res => {
            return res.data.results;
        })
}

const restructureData = async (data) => {
    let events = [];
    data.forEach(event => {

        if (event.state === 'active') {
            let restructured = {};

            restructured.source_API = 'predictHQ';
            const { title, url } = event;

            restructured.name = title || null;
            restructured.url = url || null;

            restructured.event_id = event.id;
            restructured.time_start = event.start;
            restructured.time_end = null;
            if (event.end) {
                restructured.time_end = event.end;
            }
            restructured.category = 'undefined';
            if (event.category) {
                restructured.category = event.category;
            }
            restructured.image = null;
            restructured.venue = null;
            if (event.entities[0]) {
                restructured.venue = event.entities[0].name;
            }
            restructured.location = 'Austin'; //here until we can scale
            restructured.price_min = null;
            restructured.price_max = null;
            restructured.description = null;
            events.push(restructured);
        }

    });
    console.log(events)
    return events;
}

const getData = () => {
    return callAPI().then(data => restructureData(data))
}
getData();

module.exports = { getData };
