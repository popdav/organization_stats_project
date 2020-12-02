const axios = require('axios');
const url = require('../url.json');
const {pushToDb, pushToDbOrganization, pushToDbProject} = require('../db/query')

const delay = (t, val) => {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
 }

const getAPI = async (api, token) => {
    console.log('GET ' + api)
    try{
        const res = await axios.get('https://www.insidemaps.com/api/v2' + api, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }); 
        return res.data.data
    }
    catch(err) {
        console.log(err);
    }
}

const getAPIProjects = async (projects, token, organizationId) => {
    console.log('GET all projects by id')
    
    for (let i=0; i< projects.length; i++) {
        console.log('GET https://www.insidemaps.com/api/v2/projects/'  + projects[i]);
        try {
        await delay(url.apiDelay, 1);
        let res = await axios.get('https://www.insidemaps.com/api/v2/projects/' + projects[i], {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
            });
        res = res.data.data;
        res.projectId = projects[i];
        res.organizationId = organizationId;
        pushToDbProject(res);
        }
        catch(err) {
            console.log(err);
        }
    }
}

const getData = async (data) => {
    try {
        const sessionToken = await getAPI( '/sessionToken', data.masterKey);
        const organization = await getAPI('/organizations/' + data.organization, sessionToken);
        const organizationProjects = await getAPI('/organizations/' + data.organization + '/projects?status=all&updatedSince=1970-1-1', sessionToken); 
        

        const organizationAggregatedBody = {
            organizationId: organization.id,
            organizationName: organization.name,
            projects: organizationProjects
        };

        await pushToDbOrganization(organizationAggregatedBody);
        await getAPIProjects(organizationProjects, sessionToken, organization.id);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {getData}

