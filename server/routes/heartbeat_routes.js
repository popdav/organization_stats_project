const socket = require('socket.io-client')('http://localhost:5005');
const express = require('express');
const router = express.Router();

let connectedToWorker = false;

socket.on('connect', () => {
    connectedToWorker = true;
    console.log('Connected to worker!');
});

socket.on('disconnect', () => {
    connectedToWorker = false;
    console.log('Disconnected from worker!');
});

router.get('/checkworker', (req, res) => {
    res.send({live: connectedToWorker});
})

module.exports = router;