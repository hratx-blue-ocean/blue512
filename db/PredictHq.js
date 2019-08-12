const axios = require('axios');
const config = {"Authorization":"Bearer gWxFwg4Ohs4lLCQAgEr9SVsZbIQ7rC"};
const getZipCode = require('latlng-to-zip'); //here for scaling 
const zipToCity = require('zipcodes');

const callAPI = () => {
    return axios.get("https://api.predicthq.com/v1/events?within=10km@30.267153,-97.7430608", {headers: config})
    .then(res => {
        return res.data.results;
    })
}

const restructureData = async (data) => {
    let events = [];
    data.forEach(event => {
        let restructured = {};
        
        restructured.source_API = 'predictHQ';
        const { title, url } = event;
        restructured.name = title || null;
        restructured.url = url || null;

        restructured.event_id = event.id;
        restructured.time_start = event.start;
        restructured.time_end = null;
        if(event.end){
            restructured.time_end = event.end;
        }
        restructured.category = 'undefined';
        if(event.category){
            restructured.category = event.category;
        }
        restructured.image = null;
        restructured.venue = event.entities[0].name;
        
        restructured.location = 'Austin'; 

        restructured.price_min = null;
        restructured.price_max = null;
        restructured.description = null;
        event.push(restructured);
    });
    return events;

}

const getPredictData = () => {
    return callAPI().then(data => restructureData(data))
}

module.exports = { getPredictData };