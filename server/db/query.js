const mongoDB = require('./connect');

const getProjects = async (query) => {
    try{
        let res = await mongoDB.find('projects' ,query);
        return res;
    }
    catch(err) {
        throw err;
    }
};

const getOrganizations = async (query) => {
    try{
    
        let res = await mongoDB.find('organizations', query);
        return res;
    }
    catch(err) {
        throw err;
    }
};

module.exports = {getOrganizations, getProjects};