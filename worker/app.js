const io = require('socket.io')();
const fs = require('fs');
const {spawn} = require('child_process');

let rawdata = fs.readFileSync('config.json');
let organizations = JSON.parse(rawdata);
let organizationIndex = 0;


io.on('connection', client => { 
    console.log('new client');
    client.emit('work', organizations[organizationIndex++]);
});

console.log('socket.io server working on: http://localhost:3000')
io.listen(3000);

for (let i=0; i<organizations.length; i++) {
    let child = spawn('node', ['./worker_instance/index.js'])

    child.stdout.on('data', function (data) {
        console.log('child'+i+' stdout: ' + data.toString());
    });
      
    child.stderr.on('data', function (data) {
        console.log('child'+i+' stderr: ' + data.toString());
    });
    
    child.on('exit', function (code) {
        console.log('child'+i+' process exited with code ' + code.toString());
    });
}