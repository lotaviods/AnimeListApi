const express = require('express');
const serverless = require('serverless-http')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/AnimeController')(app);

module.exports.handler = serverless(app)
