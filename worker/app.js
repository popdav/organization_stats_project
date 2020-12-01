const io = require('socket.io')();
const fs = require('fs');

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

io.on('connection', client => { console.log('new client') });

io.listen(3000);