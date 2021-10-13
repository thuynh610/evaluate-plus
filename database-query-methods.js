// define package
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Unit = require('./models/Unit');
const Review = require('./models/review.js');

// connection to database
const dbURI = 'mongodb+srv://FIT2101:FIT2101@mongodb.rbol2.mongodb.net/Evaluate+?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })


/*
Take note that the mongodb query returns an array, need use result[0] before processing
*/

/*
// pull all data from chosen collection
Review.find( {unitCode: "ENG2801"} )
    .then((result) => {
        for (let index = 0; index < result.length; index++) {
            const temp1 = JSON.stringify(result[index]); // convert mongodb doc into JSON format
            const temp2 = JSON.parse(temp1); // convert JSON format into readable format
            //console.log(temp1); // outputs JSON
            console.log(temp2.name);  // outputs converted format
        }
    });
*/

/* update data from chosen
Review.findOneAndUpdate({unitCode: "ENG2801"}, {name: 'newName'}, (error, data) => {
    if(error){
        console.log(error)
    }
})
*/

/*
var newObject = {unitCode:'ENG1001', score:5};

Unit.findOneAndUpdate({unitCode: "ENG2005"}, { $push: { algorithmArray: newObject } }, (error, data) => {
    if(error){
        console.log(error)
    }
})
*/