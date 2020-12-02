const mongoDB = require('./connect');

const getProjects = async (query, paging) => {
    try{
        let res = await mongoDB.find('projects', query, paging);
        return res;
    }
    catch(err) {
        throw err;
    }
};

const getOrganizations = async (query, paging) => {
    try{
    
        let res = await mongoDB.find('organizations', query, paging);
        return res;
    }
    catch(err) {
        throw err;
    }
};

const getProjectsAggregation = async (query) => {
    try{
    
        let res = await mongoDB.aggregate('projects', query);
        return res;
    }
    catch(err) {
        throw err;
    }
};

module.exports = {getOrganizations, getProjects, getProjectsAggregation};