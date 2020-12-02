const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan');
const app = express();
const mongoDB = require('./db/connect');
const indexRouter = require('./routes/index');
const hearbeatRouter = require('./routes/heartbeat_routes');

const url = require('./url.json')

const port = url.port;


mongoDB.connect(url.mongoDB, url.dbName);
    

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../client/public_build')));
app.use('/', indexRouter);
app.use('/', hearbeatRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})