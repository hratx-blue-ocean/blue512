function onSuccess(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  window.getCalData(id_token);
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
