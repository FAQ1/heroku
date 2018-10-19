// Initialises firebase
// TODO: fill in firebase config information
var config = {
    apiKey: "AIzaSyA0HFhqDzWdmXoolwCbNHWfIBJL9E3HGog",
    authDomain: "my-project-1538539533705.firebaseapp.com",
    databaseURL: "https://my-project-1538539533705.firebaseio.com",
    projectId: "my-project-1538539533705",
    storageBucket: "my-project-1538539533705.appspot.com",
    messagingSenderId: "1012301261874"
  };

firebase.initializeApp(config);
var messaging = firebase.messaging();

// On load register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
      // Successfully registers service worker
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      messaging.useServiceWorker(registration);
    })
    .then(() => {
      // Requests user browser permission
      return messaging.requestPermission();
    })
    .then(() => {
      // Gets token
      return messaging.getToken();
    })
    .then((token) => {
      // Simple ajax call to send user token to server for saving
      $.ajax({
        type: 'POST',
        url: '/api/setToken',
        dataType: 'json',
        data: JSON.stringify({token: token}),
        contentType: 'application/json',
        success: (data) => {
          console.log('Success ', data);
        },
        error: (err) => {
          console.log('Error ', err);
        }
      })
    })
    .catch((err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
  }
