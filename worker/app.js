const io = require('socket.io')();
const Child = require('./child')

let config_path = './config.json'
if(process.argv.length >= 3)
    config_path = process.argv[2];
    
const cp = new Child(config_path);

io.on('connection', client => { 
    console.log('new client');
    client.on('getorg', () => {    
        client.emit('work', cp.getNextOrganisation());
    })

    client.on('isLive', () => {
        client.emit('yesLive', {'live': true});
    })

});

io.listen(5005);

console.log('socket.io server working on: http://localhost:5005')

setTimeout(cp.startChildProcess, 1000*60);

