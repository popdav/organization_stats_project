const socket = require('socket.io-client')('http://localhost:3000');
const axios = require('axios');
const {connectToDB} = require('../db/connect')
const {getData} = require('../services/index')
const fs = require('fs');

connectToDB('mongodb://localhost:27017/insidemaps')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB error:', err))

socket.on('connect', () => {console.log('connected to server')});

socket.on('work', async (data) => {
    try {
        let {aggregatedOrg, aggregatedProj} = await getData(data);
        console.log("Got data!")
    }
    catch(err) {
        console.log(err);
        throw err
    }
    
});

socket.on('disconnect', ()=>{console.log('disconnected from server')});