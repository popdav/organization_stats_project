const socket = require('socket.io-client')('http://localhost:3000');
const axios = require('axios');
const {getData} = require('../services/index')
const fs = require('fs');

socket.on('connect', () => {console.log('connected to server')});

socket.on('work', async (data) => {
    try {
        let aggregatedData = await getData(data);
        let aggregatedDataString = JSON.stringify(aggregatedData);
        fs.writeFileSync('./object-' + aggregatedData.name + '.json', aggregatedDataString);
        console.log("Got data!")
    }
    catch(err) {
        console.log(err);
        throw err
    }
    
});

socket.on('disconnect', ()=>{console.log('disconnected from server')});