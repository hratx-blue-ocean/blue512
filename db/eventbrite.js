const axios = require('axios');

//https://www.eventbriteapi.com/v3/events/search/?token=54HPNTYMHA4EVXWDU73B&location.address=Austin&start_date.range_end=2019-08-15T00:00:00

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

    return axios.get(`https://www.eventbriteapi.com/v3/events/search/?token=${process.env.API_KEY_EVENTBRITE}&location.latitude=${latitude}&location.longitude=${longitude}&start_date.range_end=${date}`)
    .then(response => {
        return response.data.events
    })
    .catch(console.log)
}

const restructureData= (data) => {
    let events = [];
    data.forEach(event => {
        let restructured = {};
        restructured.source_API = 'Eventbrite';
        const { url } = event;
        restructured.name = event.name.text || null;
        restructured.url = url || null;
        restructured.event_id = event.id;
        restructured.time_start = event.dates.start.dateTime;
        restructured.time_end = null;
        if(event.dates.end) {
            restructured.time_end = event.dates.end.dateTime;
        }
        restructured.category = 'undefined';
        if(event.classifications) {
            restructured.category = event.classifications[0].segment.name;
        }
        restructured.image = event.images[0].url;
        restructured.venue = event._embedded.venues[0].name;
        restructured.location = event._embedded.venues[0].city.name;
        restructured.price_min = null;
        restructured.price_max = null;
        if(event.priceRanges) {
            restructured.price_min = event.priceRanges[0].min;
            restructured.price_max = event.priceRanges[0].max;
        }
        restructured.description = null;
        if(event.description) {
            restructured.description = event.description
        }
        events.push(restructured);
    })

    return events;
}

const getData = () => {
    return callAPI().then(data => restructureData(data))
}

module.exports = { getData }