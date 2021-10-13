const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_title: {  // e.g. Aerospace
        type: String
    },
    core_units: {  // e.g. [ENG1000, ENG1001]
        type: Array
    },
    elective_units: {  // e.g. [ENG2001,ENG2002]
        type: Array
    }
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;