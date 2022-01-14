const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session'); 

require('./models/db');
const indexRouter = require('./routes');

app.use(express.static(__dirname + '/client_build'));
app.use(session({secret:'ssssjsjs'}));
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',indexRouter);

const server = app.listen(process.env.PORT || 3000);
require('./chat')(app,server);