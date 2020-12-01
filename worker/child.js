const fs = require('fs');
const {spawn} = require('child_process');

class Child {
    constructor(file) {
        let rawdata = fs.readFileSync(file);
        this.organizations = JSON.parse(rawdata);
        this.organizationIndex = 0;
    }

    getNextOrganisation = () => {
        if (this.organizationIndex >= this.organizations.length)
            return null;

        return this.organizations[this.organizationIndex++];
    }

    startChildProcess = () => {
        for (let i=0; i<this.organizations.length; i++) {
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
    }
}

module.exports = Child;