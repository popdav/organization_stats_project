const socket = require('socket.io-client')('http://localhost:3000');
const axios = require('axios');
const {getSessionToken} = require('../services/index')

let sessionToken = ''

socket.on('connect', () => {console.log('connected to server')});

socket.on('work', async (data) => {
    console.log(data)
    try {
        let sessionToken = await getSessionToken(data.masterKey);
        console.log(sessionToken)
    }
    catch(err) {
        console.log(err);
        throw err
    }
    
});

socket.on('disconnect', ()=>{console.log('disconnected from server')});