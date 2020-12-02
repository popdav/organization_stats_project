const cron = require('node-cron');
const url = require('../url.json');
const {connectToDB} = require('../db/connect')
const {getData} = require('../services/index')

const socket = require('socket.io-client')(url.worker);

connectToDB(url.mongoDB + url.dbName)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.log('MongoDB error:', err);
        process.exit(1);
    });

socket.on('connect', () => {
    console.log('connected to server');
    socket.emit('getorg')
});

socket.on('work', async (data) => {
    try {
        await getData(data);
        console.log("Got data!")
        cron.schedule('0 */45 * * * *', async () => {
            await getData(data);
            console.log("Got data!")
        });
    }
    catch(err) {
        console.log(err);
    }
    
});

socket.on('disconnect', ()=>{console.log('disconnected from server')});