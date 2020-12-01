const axios = require('axios');

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

const getAPIProjects = async (projects, token) => {
    console.log('GET all projects by id')
    let res = await axios.all(
        projects.map(projectId => axios.get('https://www.insidemaps.com/api/v2/projects/' + projectId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
    })));
    res = res.map(p => p.data.data);
    return res
}

const getData = async (data) => {
    try {
        const sessionToken = await getAPI( '/sessionToken', data.masterKey);
        const organization = await getAPI('/organizations/' + data.organization, sessionToken);
        const organizationProjects = await getAPI('/organizations/' + data.organization + '/projects?status=all', sessionToken);
        const projects = await getAPIProjects(organizationProjects, sessionToken);
        

        const organizationAggregatedBody = {
            id: organization.id,
            name: organization.name,
            projects: projects
        };

        return organizationAggregatedBody;
    }
    catch(err) {
        throw err
    }
}

module.exports = {getData}

