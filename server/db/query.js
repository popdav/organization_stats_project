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

const getProjectsStats = async (query) => {
    try{
        let all = await mongoDB.count('projects', query);

        query.completed = true;
        let finished = await mongoDB.count('projects', query);

        query.completed = false;
        let notFinished = await mongoDB.count('projects', query);
        
        delete query.completed;

        query.deleted = true;
        let deleted = await mongoDB.count('projects', query);
        delete query.deleted;

        query.paid = true;
        let paid = await mongoDB.count('projects', query);

        query.paid = false;
        let unpaid = await mongoDB.count('projects', query);

        let body = {
            all: all,
            finished: finished,
            unfinished: notFinished,
            deleted: deleted,
            paid: paid,
            unpaid: unpaid
        }
        return body;
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

module.exports = {getOrganizations, getProjects, getProjectsAggregation, getProjectsStats};