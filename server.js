// server.js
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Import database connection from config folder
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import custom middleware
const withAuth = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up sessions with cookies
const sess = {
  secret: 'Your Secret', // replace with your own secret
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js as the default template engine
const hbs = exphbs.create({}); // You can add custom handlebar helpers or configurations if needed
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Turn on routes
const routes = require('./controllers'); // this will require an index.js file in your controllers directory that handles your route definitions
app.use(routes);

// Sync sequelize models to the database and then start Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
