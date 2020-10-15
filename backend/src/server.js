const express = require('express');

const cors = require('cors');

require('express-async-errors');
require('./database/connection');

const routes = require('./routes');
const errorHandler = require('./errors/handler');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333);