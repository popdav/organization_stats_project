const axios = require('axios');
const projectModel = require('../db/projects').Project
const organizationModel = require('../db/organization').Organization

const pushToDb = async (projects, organization) => {
    try {
        const arrProjects = await projectModel.insertMany(projects);
        const org = await organizationModel.create(organization);

        return {arrProjects, org};
    }
    catch(err) {
        throw err;
    }
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
        throw err;
    }
}

const getAPIProjects = async (projects, token, organizationId) => {
    console.log('GET all projects by id')
    let res = await axios.all(
        projects.map(projectId => axios.get('https://www.insidemaps.com/api/v2/projects/' + projectId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
    })));
    res = res.map(p => p.data.data);
    await res.forEach((element, i) => {
        res[i].projectId = projects[i];
        res[i].organizationId = organizationId
    });
    return res
}

const getData = async (data) => {
    try {
        const sessionToken = await getAPI( '/sessionToken', data.masterKey);
        const organization = await getAPI('/organizations/' + data.organization, sessionToken);
        const organizationProjects = await getAPI('/organizations/' + data.organization + '/projects?status=all', sessionToken);
        const projects = await getAPIProjects(organizationProjects, sessionToken, organization.id);
        

        const organizationAggregatedBody = {
            organizationId: organization.id,
            organizationName: organization.name,
            projects: organizationProjects
        };

        return await pushToDb(projects, organizationAggregatedBody);
    }
    catch(err) {
        throw err
    }
}

module.exports = {getData}

