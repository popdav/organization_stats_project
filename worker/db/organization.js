const mongoose = require('mongoose');

module.exports.Organization = mongoose.model(
    'Organization',
    new mongoose.Schema({
        organizationId: String,
        organizationName: String,
        projects: [{ type: String, ref: 'Project' }]
    }),
);