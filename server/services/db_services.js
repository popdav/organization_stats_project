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

const getAvgProcessingTime = async (body) => {
    try {
        let {query, paging} = buildQuery(body);
        query.completed = true;
        query.completedAt = { $exists: true }
        let avgQuery = [
            {
                $match: query,
            },
            {
                $group:
                    {
                        _id: null,
                        avgProcessingTIme: { $avg: {
                            "$subtract": [
                              { "$ifNull": [ "$completedAt", 0 ] },
                              { "$ifNull": [ "$submittedAt", 0 ] }
                            ]
                          }}
                    }
            }
          ]
        return await getProjectsAggregation(avgQuery);
    }
    catch(err) {
        throw err;
    }
}

const getProjectCountForEachScanner = async (body) => {
    try {
        let {query, paging} = buildQuery(body);
        let avgQuery = [
            {
                $match: query,
            },
            {
                $group:
                    {
                        _id: "$scannerId",
                        "count": { "$sum": 1 }
                    }
            }
          ]
        return await getProjectsAggregation(avgQuery);
    }
    catch(err) {
        throw err;
    }
}

const getTotalAreaScanned = async (body) => {
    try {
        let {query, paging} = buildQuery(body);
        let avgQuery = [
            {
                $match: query,
            },
            {
                $group:
                    {
                        _id: "$organizationId",
                        "count": { "$sum": "$areaTotal" }
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

    const firstDay = new Date(body.year, body.month, 1);
    const lastDay = new Date(body.year, body.month + 1, 0);

    query.updatedAt = {
        $lte: lastDay,
        $gte: firstDay
    }

    paging.limit = limit;
    paging.skip = (body.page - 1) * limit;


    return {query, paging};
}

module.exports = {
    getAllOrganizations, 
    getAllProjects, 
    getAvgSmartTag, 
    getAvgProcessingTime, 
    getProjectCountForEachScanner, 
    getTotalAreaScanned};
