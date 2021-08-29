const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());


module.exports = app;
