const { query } = require('express');
const {getOrganizations, getProjects, getProjectsAggregation} = require('../db/query')

const getAllOrganizations = async () => {
    try {
        return await getOrganizations({}, {});
    }
    catch(err) {
        throw err;
    }
}


const getAllProjects = async (body) => {
    try {
        let {query, paging} = buildQuery(body);
        return await getProjects(query, paging);
    }
    catch(err) {
        throw err;
    }
}

const getAvgSmartTag = async (body) => {
    try {
        let {query, paging} = buildQuery(body);
        let avgQuery = [
            {
                $match: query,
            },
            {
                $group:
                    {
                        _id: null,
                        avgSmartTag: { $avg: "$smartTagsCount" }
                    }
            }
          ]
        return await getProjectsAggregation(avgQuery);
    }
    catch(err) {
        throw err;
    }
}

const buildQuery = (body) => {
    let query = {};
    let paging = {};
    const limit = 20;

    if (body.organizationName !== '') {
        query['organizationId'] = body.organizationName.organizationId;
    }

    if (body.projectsType.finished) {
        query['completed'] = true;
    }

    if (body.projectsType.unfinished) {
        query['completed'] = false;
    }

    if (body.projectsSub.paid) {
        query['paid'] = true;
    }

    if (body.projectsSub.unpaid) {
        query['paid'] = false;
    }

    paging.limit = limit;
    paging.skip = (body.page - 1) * limit;

    return {query, paging};
}

module.exports = {getAllOrganizations, getAllProjects, getAvgSmartTag};
