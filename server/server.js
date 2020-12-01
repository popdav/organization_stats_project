const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan');
const app = express()
const {connectToDB} = require('./db/connect')
const indexRouter = require('./routes/index');
const port = 5005

connectToDB('mongodb://localhost:27017/insidemaps')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB error:', err))

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})