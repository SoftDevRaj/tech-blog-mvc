const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Import sequelize connection
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ /* Your helpers here */ });

// Configure and connect to the session store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Require routes
// Here you will require your routes files when you have created them in next steps
// const routes = require('./controllers/...');
// app.use(routes);

// Add a simple route for testing your application
app.get('/', (req, res) => res.send('Hello World!'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT ' + PORT));
});
