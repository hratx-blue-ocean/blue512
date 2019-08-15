const axios = require("axios");
const Helpers = require("./helpers.js");
const getZipCode = require("latlng-to-zip"); //here for scaling
const zipToCity = require("zipcodes");
const googleImages = require('google-images');
const google = require('google-parser');

const callAPI = () => {
    let dates = Helpers._getDate();

    return axios
        .get(`https://api.predicthq.com/v1/events?active.gte=${dates.currentDateStr}&active.lte=${dates.futureDateStr}&within=10mi@30.267153,-97.7430608`, { headers: { "Authorization": process.env.API_KEY_PREDICTHQ } })
        .then(res => {
            return res.data.results;
        })
        .catch(err => console.log(err))
};

let deleteObj = [];
const findImage = async (term, category, location, venue) => {
    const client = new googleImages('001419127335946044126:kujzldodmpm', 'AIzaSyCm4SMZAvhXi6nsfqSK_wIBbo-yC0_7V-8');
    let newSearch = `${term} ${venue} ${category}`;
    if (category === 'concerts' || category === 'performing-arts') {
        newSearch = `${term} ${location} ${venue}`;
    }
    console.log(newSearch);

    let getRidOfSymbols = newSearch.replace(/[^A-Za-z]/g, " ");
    let condensedSearch = getRidOfSymbols;
    let image = '';

    let results = await google.jpg(newSearch);

    for (let i = 0; i <= Math.floor(results.length / 2); i++) {
        if (!results[i].img.includes('evbuc') && results[i].img !== undefined && !results[i].img.includes('video') && !results[i].img.includes('zoogletools') && !results[i].img.includes('fbsbx.com') && !results[i].img.includes('wixmp.com') && !results[i].img.includes('thedailybeast.com') && !results[i].img.includes('cloudinary.com')) {
            image = results[i].img;
            break;
        }
    }

    if (image === '') {
        let otherResults = await client.search(condensedSearch)
            .then(images => {
                for (let i = 0; i < 5; i++) {
                    if (!images[i].url.includes('evbuc') && images[i].url !== undefined && !images[i].url.includes('video') && !images[i].url.includes('zoogletools') && !images[i].url.includes('fbsbx.com') && images[i].url.includes('wixmp.com') && images[i].url.includes('thedailybeast.com') && !images[i].url.includes('cloudinary.com')) {
                        return images[i].url;
                    }
                }
            })
            .catch(err => {
                deleteObj.push(term);
                return null;
            });
        return otherResults;
    }
    return;
}

const restructureData = data => {

    const eventPromises = data.map(async (event) => {

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
            restructured.image = null;
            const result = await findImage(restructured.name, restructured.category, restructured.location, restructured.venue);
            restructured.image = result;


            // console.log(restructured.image)
            return restructured;
        }
    })

    return Promise.all(eventPromises);

}

const getData = () => {
    return callAPI().then(data => restructureData(data)).then(console.log);
};

getData();
module.exports = { getData };