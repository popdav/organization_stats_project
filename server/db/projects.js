const mongoose = require('mongoose');

module.exports.Project = mongoose.model(
    'Project',
    new mongoose.Schema({
        projectId: String,
        organizationId: { type: String, ref: 'Organization' },
        name: String,
		status: String,
		package: String,
		street: String,
		city: String,
		state: String,
		zip: String,
		country: String,
		type: String,
		propertyInfo: {
			propertyId: String,
			amenityId: Array
		},
		geoLocation: {
			__type: String,
			latitude: Number,
			longitude: Number
		},
		scannerId: String,
		completed: Boolean,
		createdAt: Date,
		submittedAt: Date,
		completedAt: Date,
		updatedAt: Date,
		areaLivable: Number,
		areaTotal: Number,
		paid: Boolean,
		deleted: Boolean,
		floorCount: Number,
		roomCount: Number,
		smartTagsCount: Number,
		agentInfo: Map,
		walkthrough: Map,
		hybridWalkthrough: Map,
		model: Map,
		listing : Map,
		uploadStatistics: Map
    }),
);