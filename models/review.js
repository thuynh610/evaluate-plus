const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    unitCode: {
        type: String,
        required: true
    },
    yearCompleted: {
        type: Number,
        required: true
    },
    enjoymentRating: {
        type: Number,
        required: true
    },
    courseworkRating: {
        type: Number,
        required: true
    },
    examRating: {
        type: Number,
        required: true
    },
    unitStructureRating: {
        type: Number,
        required: true
    },
    recommended: {
        type: String,  // need the form to output boolean then can change this to boolean.
        required: true
    },
    // The writen review is required and should just be an empty string if it is not filled in
    writtenReview: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;