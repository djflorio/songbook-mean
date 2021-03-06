/*********************
 * Dependencies      *
 *********************/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const sb_env = require("./config/env");
const expressSession = require('express-session');
const users = require('./controllers/users');
const songs = require('./controllers/songs');

/*********************
 * Database          *
 *********************/
mongoose.connect(config.database);

/*********************
 * Initialize App    *
 *********************/
const port = 3000;
const app = express();

/*********************
 * Middleware        *
 *********************/
app.use(cors()); // allows cross-site origin requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // static files
app.use(expressSession({secret: sb_env.session_secret}));

/*********************
 * Routes            *
 *********************/
app.get('/', (req, res) => {
    res.send("Invalid page");
});
// Route all HTTP requests to /users to users controller
app.use('/users', users);
app.use('/songs', songs);

/*********************
 * Initiate Server   *
 *********************/
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});