const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const Review = require('./models/Review');
const Unit = require('./models/Unit');
const Course = require('./models/Course');
const { response } = require('express');
const { result, update } = require('lodash');
const { info } = require('console');
const port = process.env.PORT || "9000";

const dbURI = 'mongodb+srv://FIT2101:FIT2101@mongodb.rbol2.mongodb.net/Evaluate+?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

// express app
const app = express();
app.use("/", express.static(`./public`));

// middleware
app.use(express.urlencoded({extended:true}));


// mongoose and mongo sandbox routes
app.get('/add-unit', (req, res) => {
    const newUnit = ({
        unitCode: 'FIT3000',
        title: 'Undefined',
        reviews: ["I like this unit.", "I don't like this unit."],
        avgCourseworkDifficulty: 5,
        avgFinalAssessmentDifficulty: 6,
        avgCoordinationLevel: 3,
        avgRating: 9,
        algorithmArray: []
    });

    newUnit.save()
    .then((result) => {
        res.send(result); // display in the html response
    })
    .catch((err) => {
        console.log(err); // display error log in console
    });
})

app.get('/get-all-subjects'), (req, res) => {
    Unit.find({}, "unitCode")
    .then((result) => {
        res.json(result)
    })
}


// post request 
app.post('/submit-reviews', (req, res) => {
    
    let data = req.body
    let subjects = data.subjects.split(', ')
    let reviewList = []
    for (let i = 0; i < subjects.length-1; i++) {
        const unitCode = subjects[i];
        
        const newReview = new Review({
            name: data["name"],
            unitCode: unitCode,
            yearCompleted: data["YEAR_" + unitCode],  // need the form to remove the _Title
            enjoymentRating: data["SLD_1_" + unitCode],
            courseworkRating: data["SLD_2_" + unitCode],
            examRating: data["SLD_3_" + unitCode],
            unitStructureRating: data["SLD_4_" + unitCode],
            recommended: data["REC_" + unitCode],
            writtenReview: data["REVIEW_" + unitCode]
        });
        reviewList.push(newReview);
        newReview.save();
    }    
    
    for (let i = 0; i < reviewList.length; i++) {
        const review = reviewList[i];
        let int = review.recommended == "1"
        Unit.findOneAndUpdate(
            {unitCode: review.unitCode}, 
            {
                "$push": {reviews: review._id.toString()},
                "$inc": {
                    avgCoordinationLevel: review.unitStructureRating,
                    avgCourseworkDifficulty: review.courseworkRating,
                    avgFinalAssessmentDifficulty: review.examRating,
                    avgRating: review.enjoymentRating,
                    avgRecommendations: int,
                }
            }, 
            {'new': true}, (err, info) => {
            if (err) {
                console.error(err)
            }
        });
    }

    res.redirect('/review')
});

app.get("/api/test/:unit_code/:array", (req, res) => {
    let unit_code = req.params.unit_code;
    let array = JSON.parse(req.params.array)
    
    console.log(array)

    Unit.findOneAndUpdate({unitCode: unit_code}, {
        "$set": {algorithmArray: array}
        }, {"new": true}, (err, info) => {
            if (err) {
                console.error(err)
            }
        }
    )
})

// routes
app.get('/', (req, res) => {
    //res.send('<p>Home Page</p>');
    res.sendFile('./templates/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./templates/about.html', { root: __dirname });
});

app.get('/review', (req, res) => {
    res.sendFile('./templates/survey.html', { root: __dirname});
});

app.get('/units', (req, res) => {
    Unit.find()
    .then((result) => {
        res.json(result)
    })
});

app.get('/courses', (req, res) => {
    Course.find()
    .then((result) => {
        res.send(result)
    })
});

app.get('/reviews/:ids', (req, res) => {
    let idList = req.params.ids.split("-").slice(0,-1);

    Review.find({'_id': { "$in": idList}})
    .then((result) => {
        res.json(result)
    });
});

app.get('/pick-unit/:unique_id/:selected_course', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates" , 'pickUnit.html'))
});

app.get('/search-units', (req, res) => {
    res.sendFile('./templates/searchUnits.html', { root: __dirname})
});

app.get('/electives-planning', (req, res) => {
    res.sendFile('./templates/electivesPlanning.html', { root: __dirname})
});

app.get('/units/:unit_code', (req, res) => {
    unit_code = req.params.unit_code;
    Unit.find({unitCode: unit_code})
    .exec()
    .then((result) => {
        res.json(result)
    })
});

app.get('/api/update-unit/:unit_code', (req, res) => {

    unit_code = req.params.unit_code;
    Unit.find({unitCode: unit_code})
    .exec()
    .then((result) => {
        res.json(result)
    })
});


app.get("/api/reset-defaults", (req,res) => {

    let lst = Unit.find().then( (array) => {
        for (let i = 0; i < lst.length; i++) {
            const element = lst[i];    
            Unit.findOneAndUpdate(
                {unitCode: element.unitCode}, 
                {
                    "$set": { 
                        avgCoordinationLevel: 0,
                        avgCourseworkDifficulty: 0,
                        avgFinalAssessmentDifficulty: 0,
                        avgRating: 0,
                        avgRecommendations: 0,
                        algorithmArray: [],
                        reviews: []      
                    }
                }, 
                {'new': true}, (err, info) => {
                    if (err) {
                        console.error(err)
                    }
                }
            )
        }
    })
});


app.get("/api/remove-review/:id", (req,res) => {
    id = req.params.id
    Review.remove({"_id": id})
});


app.get('/subjects/:unit_code', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates", "subjects.html"))
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./templates/404.html', { root: __dirname });
});

//app.listen(3000)

app.post('/update-unit-algorithmArray/:unit_code/:update', (req, res) => {
    unit_code = req.params.unit_code;
    atributeUpdate = JSON.parse(req.params.update);
    Unit.findOneAndUpdate({unitCode: `${unit_code}`}, { $push: { algorithmArray: atributeUpdate } }, (error, data) => {
        if(error){
            console.log(error)
        }
    })
} )

app.post('/update-unit-averageCourseworkDifficulty/:unit_code/:update', (req, res) => {
    unit_code = req.params.unit_code;
    atributeUpdate = JSON.parse(req.params.update);
    Unit.findOneAndUpdate({unitCode: `${unit_code}`}, { $push: { averageCourseworkDifficulty: atributeUpdate } }, (error, data) => {
        if(error){
            console.log(error)
        }
    })
} )
app.post('/update-unit-avgFinalAssessmentDifficulty/:unit_code/:update', (req, res) => {
    unit_code = req.params.unit_code;
    atributeUpdate = JSON.parse(req.params.update);
    Unit.findOneAndUpdate({unitCode: `${unit_code}`}, { $push: { avgFinalAssessmentDifficulty: atributeUpdate } }, (error, data) => {
        if(error){
            console.log(error)
        }
    })
} )
app.post('/update-unit-avgCoordinationLevel/:unit_code/:update', (req, res) => {
    unit_code = req.params.unit_code;
    atributeUpdate = JSON.parse(req.params.update);
    Unit.findOneAndUpdate({unitCode: `${unit_code}`}, { $push: { avgCoordinationLevel: atributeUpdate } }, (error, data) => {
        if(error){
            console.log(error)
        }
    })
} )
app.post('/update-unit-avgRecommendations/:unit_code/:update', (req, res) => {
    unit_code = req.params.unit_code;
    atributeUpdate = JSON.parse(req.params.update);
    Unit.findOneAndUpdate({unitCode: `${unit_code}`}, { $push: { avgRecommendations: atributeUpdate } }, (error, data) => {
        if(error){
            console.log(error)
        }
    })
} )
app.post('/update-unit-avgRating/:unit_code/:update', (req, res) => {
    unit_code = req.params.unit_code;
    atributeUpdate = JSON.parse(req.params.update);
    Unit.findOneAndUpdate({unitCode: `${unit_code}`}, { $push: { avgRating: atributeUpdate } }, (error, data) => {
        if(error){
            console.log(error)
        }
    })
})