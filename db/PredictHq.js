const axios = require('axios');
const config = {"Authorization":"Bearer gWxFwg4Ohs4lLCQAgEr9SVsZbIQ7rC"};
const callAPI = () => {
    return axios.get("https://api.predicthq.com/v1/events?within=10km@30.267153,-97.7430608", {headers: config})
    .then(res => {
        
    })
}

const restructureData = () => {
    let events = [];

}



const getData = () => {
    return callAPI().then(data => restructureData(data))
}




