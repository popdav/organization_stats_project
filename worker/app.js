const io = require('socket.io')();
const fs = require('fs');

let rawdata = fs.readFileSync('config.json');
let organizations = JSON.parse(rawdata);
const organization = organizations[0];



io.on('connection', client => { 
    console.log('new client');
    client.emit('work', organization) 
});

console.log('socket.io server working on: http://localhost:3000')
io.listen(3000);