const express = require('express');
const router = express.Router();

const {getAllOrganizations, getAllProjects} = require('../services/db_services');

router.get('/hello', (req, res) => {
    res.send('Hello World!')
})

router.get('/organizations', async (req, res) => {
    try {
        let org = await getAllOrganizations();
        res.send(org)
    }
    catch(err) {
        console.log(err)
        res.status(500).send('error')
    }
})

router.get('/projects', async (req, res) => {
    try {
        let proj = await getAllProjects();
        res.send(proj)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

module.exports = router;