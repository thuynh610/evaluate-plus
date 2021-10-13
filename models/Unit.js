const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    unitCode: {
        type: String
    },
    title: {
        type: String
    },
    reviews: {
        type: Array
    },
    avgCourseworkDifficulty: {
        type: Number
    },
    avgFinalAssessmentDifficulty: {
        type: Number
    },
    avgCoordinationLevel: {
        type: Number
    },
    avgRecommendations: {
        type: Number
    },
    avgRating: {
        type: Number
    },
    algorithmArray: {
        type: Array
    }

}, { timestamps: true });

const Unit = mongoose.model('Unit', UnitSchema);
module.exports = Unit;