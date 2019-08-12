const axios = require('axios');

//https://www.eventbriteapi.com/v3/events/search/?token=54HPNTYMHA4EVXWDU73B&location.address=Austin&start_date.range_end=2019-08-15T00:00:00

const eventbriteCategories = {
    103: "Music",
    101: "Business", 
    110: "Food & Drink", 
    113: "Community", 
    105: "Arts", 
    104: "Film & Media", 
    108: "Sports & Fitness", 
    107: "Health", 
    102: "Science & Tech", 
    109: "Travel & Outdoor", 
    111: "Charity & Causes", 
    114: "Spirituality", 
    115: "Family & Education", 
    116: "Holiday", 
    112: "Government", 
    106: "Fashion", 
    117: "Home & Lifestyle", 
    118: "Auto, Boat & Air", 
    119: "Hobbies", 
    199: "Other", 
    120: "School Activities"
}

const eventbriteVenues = {}

const getDate = () => {
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

    return dates
}

const callAPI = () => {
    //Austin lat/long
    let latitude = '30.2671530'
    let longitude = '-97.7430608'
    let futureDate = getDate().futureDateStr

    return axios.get(`https://www.eventbriteapi.com/v3/events/search/?token=${process.env.API_KEY_EVENTBRITE}&location.latitude=${latitude}&location.longitude=${longitude}&start_date.range_end=${date}&expand=ticket_classes,venue,category`)
    .then(response => {
        return response.data.events
    })
    .catch(console.log)
}


const getPrices = (tickets) => {
    let min = parseFloat(tickets[0].cost.major_value)
    let max = parseFloat(tickets[0].cost.major_value)

    for (let i=1; i<tickets.length; i++) {
        if (parseFloat(tickets[i].cost.major_value) < min) {
            min = parseFloat(tickets[i].cost.major_value)
        } else if (parseFloat(tickets[i].cost.major_value) > max) {
            max = parseFloat(tickets[i].cost.major_value)
        }
    }

    let prices = {
        min: min,
        max: max
    }

    return prices
}

const restructureData= (data) => {
    let events = [];
    data.forEach(event => {
        let restructured = {};
        restructured.source_API = 'Eventbrite';
        const { url, id } = event;
        restructured.name = event.name.text || null;
        restructured.url = url || null;
        restructured.event_id = id;
        restructured.time_start = event.start.local;
        restructured.time_end = event.end.local;
        restructured.category = event.category.short_name || 'undefined';
        restructured.image = event.logo.original.url;
        restructured.venue = event.venue.name;
        restructured.location = event._embedded.venues[0].city.name;
        restructured.price_min = null;
        restructured.price_max = null;
        if(event.ticket_classes) {
            prices = getPrices(event.ticket_classes)
            restructured.price_min = prices.min;
            restructured.price_max = prices.max;
        }
        restructured.description = null;
        if(event.description) {
            restructured.description = event.description.text;
        }
        events.push(restructured);
    })

    return events;
}

const getData = () => {
    return callAPI().then(data => restructureData(data))
}

module.exports = { getData }