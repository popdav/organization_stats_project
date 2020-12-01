const io = require('socket.io')();
const fs = require('fs');

let rawdata = fs.readFileSync('config.json');
let organizations = JSON.parse(rawdata);
let organizationIndex = 0;



io.on('connection', client => { 
    console.log('new client');
    client.emit('work', organizations[organizationIndex++]) 
});

console.log('socket.io server working on: http://localhost:3000')
io.listen(3000);