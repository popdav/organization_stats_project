const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan');
const app = express();
const mongoDB = require('./db/connect');
const indexRouter = require('./routes/index');
const hearbeatRouter = require('./routes/heartbeat_routes');
const port = 3000


mongoDB.connect('mongodb://localhost:27017', 'insidemaps');
    

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/', hearbeatRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})