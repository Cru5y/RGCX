const express = require('express');
const path = require('path');
const app = express();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'r3AbGUX8a6NxpukWapNuWC67TKALIswG',
  issuerBaseURL: 'https://dev-lsam-eu.eu.auth0.com',
  secret: '34b5b0a2a21ba11090d4d129a6d6c075d9959ee252cd9ca9f4ae29e3bd6f44e4'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for root URL
app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.sendFile(__dirname + '/views/index.html'); // send the index.html if authenticated
  } else {
    res.send('Logged out'); // or send a 'Logged out' message
  }
});

app.listen(3000);
console.log('Listening at "http://localhost:3000"');