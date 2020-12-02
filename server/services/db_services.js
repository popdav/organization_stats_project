const {getOrganizations, getProjects, getOrganizationsPopulate} = require('../db/query')

const getAllOrganizations = async () => {
    try {
        return await getOrganizations({});
    }
    catch(err) {
        throw err;
    }
}


const getAllProjects = async () => {
    try {
        return await getProjects({});
    }
    catch(err) {
        throw err;
    }
}

module.exports = {getAllOrganizations, getAllProjects};
