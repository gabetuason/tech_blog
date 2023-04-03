// Importing required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); // handlebars
const routes = require('./controllers'); // routing
const helpers = require('./utils/helpers'); // auth and date format helper

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); // Initialize express application
const PORT = process.env.PORT || 3001; // http://localhost:3001

const hbs = exphbs.create({ helpers });

// Configuring session for middleware 
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 200000, // 3 minutes and 20 seconds
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
// Uses the session middleware with the above configuration
app.use(session(sess));

// Setting up handlebars
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Uses the routes defined in the './controllers' module
app.use(routes);

// Sync the Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening! http://localhost:3001/ '));
})