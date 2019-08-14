const axios = require("axios");
const Helpers = require("./helpers.js");

//example query string: https://www.eventbriteapi.com/v3/events/search/?token=${process.env.API_KEY_EVENTBRITE}&location.latitude=30.2671530&location.longitude=-97.7430608&start_date.range_end=2019-08-15T00:00:00Z&expand=ticket_classes,category,venue

const callAPI = () => {
    //Austin lat/long
    let latitude = "30.2671530";
    let longitude = "-97.7430608";
    let futureDate = Helpers._getDate().futureDateStr;

    return axios
        .get(
            `https://www.eventbriteapi.com/v3/events/search/?token=${
            process.env.API_KEY_EVENTBRITE
            }&location.latitude=${latitude}&location.longitude=${longitude}&start_date.range_end=${futureDate}&expand=ticket_classes,venue,category`
        )
        .then(response => {
            return response.data.events;
        })
        .catch(console.log);
};

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

const restructureData = data => {
    let events = [];
    data.forEach(event => {
        // console.log(event)
        let restructured = {};
        restructured.source_API = "Eventbrite";
        const { url, id } = event;
        restructured.name = event.name.text || null;
        restructured.url = url || null;
        restructured.event_id = id;
        restructured.time_start = event.start.local;
        restructured.time_end = event.end.local;
        restructured.category = "undefined";
        if (event.category_id) {
            restructured.category = event.category.short_name;
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
    return events;
};

const getData = () => {
    return callAPI().then(data => restructureData(data));
};
getData()
module.exports = { getData };
