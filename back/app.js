const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./components/routes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.load({ path: '.env' });

/** Middlewares */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Rutas */

app.use(routes);

module.exports = app;
