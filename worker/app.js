const io = require('socket.io')();
const Child = require('./child')

const cp = new Child('config.json');

io.on('connection', client => { 
    console.log('new client');
    client.on('getorg', () => {    
        client.emit('work', cp.getNextOrganisation());
    })

    client.on('isLive', () => {
        client.emit('yesLive', {'live': true});
    })

});

io.listen(3000);

console.log('socket.io server working on: http://localhost:3000')

setTimeout(cp.startChildProcess, 1000);

