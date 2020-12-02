const express = require('express');
const router = express.Router();

const {getAllOrganizations, getAllProjects, getAvgSmartTag} = require('../services/db_services');

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

router.post('/projects', async (req, res) => {
    let body = req.body;
    console.log(body);
    try {
        let proj = await getAllProjects(body);
        res.send(proj)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/smarttag', async (req, res) => {
    let body = req.body;
    console.log(body);
    try {
        let avg = await getAvgSmartTag(body);
        console.log(avg);
        res.send(avg)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

module.exports = router;