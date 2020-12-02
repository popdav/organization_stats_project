const projectModel = require('../db/projects').Project
const organizationModel = require('../db/organization').Organization

const pushToDbProject = async (project) => {
    try {

        await projectModel.findOneAndUpdate({projectId:project.projectId}, project, {upsert: true, new: true})

    }
    catch(err) {
        console.log(err);
    }
}

const pushToDbOrganization = async (organization) => {
    try {
        await organizationModel.findOneAndUpdate({organizationId: organization.organizationId}, 
                                                                organization, 
                                                                {upsert: true, new: true});
    }
    catch(err) {
        console.log(err);
    }
}

const pushToDb = async (projects, organization) => {
    try {
        await organizationModel.findOneAndUpdate({organizationId: organization.organizationId}, 
                                                                organization, 
                                                                {upsert: true, new: true});

        await projects.forEach(async (project) => {
            await projectModel.findOneAndUpdate({projectId:project.projectId}, project, {upsert: true, new: true})
        })

    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {pushToDb, pushToDbOrganization, pushToDbProject};