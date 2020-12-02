const express = require('express');
const router = express.Router();

const {
    getAllOrganizations, 
    getAllProjects, 
    getAvgSmartTag, 
    getAvgProcessingTime, 
    getProjectCountForEachScanner,
    getTotalAreaScanned,
    getProjectCountForEachPackage,
    getAllProjectsStats
} = require('../services/db_services');



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
    
    try {
        let proj = await getAllProjects(body);
        res.send(proj)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/projectsstats', async (req, res) => {
    let body = req.body;
    
    try {
        let proj = await getAllProjectsStats(body);
        res.send(proj)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/smarttag', async (req, res) => {
    let body = req.body;
    
    try {
        let avg = await getAvgSmartTag(body);
        
        res.send(avg)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/processingtime', async (req, res) => {
    let body = req.body;
    
    try {
        let avg = await getAvgProcessingTime(body);
        
        res.send(avg)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/projectcount', async (req, res) => {
    let body = req.body;
    
    try {
        let avg = await getProjectCountForEachScanner(body);
        
        res.send(avg)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/projectcountpackage', async (req, res) => {
    let body = req.body;
    
    try {
        let avg = await getProjectCountForEachPackage(body);
        
        res.send(avg)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

router.post('/totalarea', async (req, res) => {
    let body = req.body;
    
    try {
        let avg = await getTotalAreaScanned(body);
        
        res.send(avg)
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('error')
       
    }
})

module.exports = router;