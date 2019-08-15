const axios = require("axios");
const Helpers = require("./helpers.js");
const getZipCode = require("latlng-to-zip"); //here for scaling
const zipToCity = require("zipcodes");
const googleImages = require('google-images');


const callAPI = () => {
    let dates = Helpers._getDate();

    return axios
        .get(`https://api.predicthq.com/v1/events?active.gte=${dates.currentDateStr}&active.lte=${dates.futureDateStr}&within=10mi@30.267153,-97.7430608`, { headers: { "Authorization": process.env.API_KEY_PREDICTHQ } })
        .then(res => {
            return res.data.results;
        })
        .catch(err => console.log(err))
};


const findImage = async (term, category) => {
    const client = new googleImages('001419127335946044126:kujzldodmpm', 'AIzaSyAWqMcWfisUQs-BOvqjkwnalUJpvzkf-x4');
    let combinedTerm = term + '' + category;
    let searchTerm = combinedTerm.replace(/[^A-Za-z]/g, " ");
    console.log(searchTerm)
    let results = await client.search(searchTerm)
        .then(images => {
            return images[0].url
        })
        .catch(err => {
            return 'no image'
        });

    return results

}

const restructureData = data => {

    let events = [];

    data.forEach(async (event) => {

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

            const result = await findImage(restructured.name, restructured.category);
            restructured.images = result;

            console.log(restructured.images)

            events.push(restructured)

        }
    })
    console.log(events);
    return events
}

const getData = () => {
    return callAPI().then(data => restructureData(data));
};

getData();
module.exports = { getData };