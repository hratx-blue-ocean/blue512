function getData(id_token, calendar_items) {
	console.log(calendar_items)
  axios
    .post("http://localhost:8000/api/events", {
			token: id_token,
			calendar_items,
      limit: null,
      day: null
    })
    .then(res => console.log(res.data))
    .catch(console.log);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}

function onSuccess(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;	
	getCalData((data) => {
		getData(id_token, data.result.items);
	});
}

function onFailure(error) {
	console.log(error);
}

function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email https://www.googleapis.com/auth/calendar.readonly",
    width: 100,
    height: 30,
    longtitle: false,
    theme: "light",
    onsuccess: onSuccess,
    onfailure: onFailure
  });
}

function getCalData(cb) {
  gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    })
    .then(response => {
      cb(response)
    });
}

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: "AIzaSyDmu5hSQp6rUq7TY-iAmNpndsF0Sjh4C9o",
    clientId:
      "931463011413-0bvf50njv2b3jpesej2psig60gpeb079.apps.googleusercontent.com",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ],
    scope: "https://www.googleapis.com/auth/calendar.readonly"
	});
}