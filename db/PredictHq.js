const axios = require('axios');
const config = {"Authorization":"Bearer gWxFwg4Ohs4lLCQAgEr9SVsZbIQ7rC"};
const callAPI = () => {
    return axios.get("https://api.predicthq.com/v1/events?within=10km@30.267153,-97.7430608", {headers: config})
    .then(res => {
        return res.data.results;
    })
}

const restructureData = (data) => {
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
        restructured.image = 

        

    });

}

const getData = () => {
    return callAPI().then(data => restructureData(data))
}