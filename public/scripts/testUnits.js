"Use strict"

class Unit {
    constructor(unitCode, title, isCore) {
        this._unitCode = unitCode;
        this._title = title;
        this._isCore = isCore;
        this._reviews = [];
        this._avgCourseworkDifficulty = 0;
        this._avgFinalAssessmentDifficulty = 0;
        this._avgCoordinationLevel = 0;
        this._avgRecommendations = 0;
        this._algorithmArray = [];
    }

    get title() {
        return this._title;
    }

    get unitCode() {
        return this._unitCode;
    }

    get avgCourseworkDifficulty() {
        return this._avgCourseworkDifficulty;
    }

    get avgFinalAssessmentDifficulty() {
        return this._avgFinalAssessmentDifficulty;
    }

    get avgCoordinationLevel() {
        return this._avgCoordinationLevel;
    }

    get avgRecommendations() {
        return this._avgRecommendations;
    }

    get isCore() {
        return this._isCore;
    }

    get level() {
        return this._unitCode[3];
    }

    addReview(review) {
        this._reviews.push(review);
        this._calculateMetrics()
    }

    _calculateMetrics() {
        let totalCourseworkDifficulty = 0;
        let totalFinalAssessmentDifficulty = 0;
        let totalCoordintationLevel = 0;
        let totalRecommendations = 0;

        for (let i = 0; i < this._reviews.length; i++) {
            totalCourseworkDifficulty += this._reviews[i]._courseRating;
            totalFinalAssessmentDifficulty += this._reviews[i]._examRating;
            totalCoordintationLevel += this._reviews[i]._runRating;
            totalRecommendations += this._reviews[i]._recommended;
        }

        this._avgCourseworkDifficulty = totalCourseworkDifficulty / this._reviews.length;
        this._avgFinalAssessmentDifficulty = totalFinalAssessmentDifficulty / this._reviews.length;
        this._avgCoordinationLevel = totalCoordintationLevel / this._reviews.length;
        this._avgRecommendations = totalRecommendations / this._reviews.length;
    }
}

class Review {
    constructor(unitCode, courseworkRating, examRating, runRating, recommended, writtenReview) {
        this._unitCode = unitCode;
        this._courseRating = courseworkRating;
        this._examRating = examRating;
        this._runRating = runRating;
        this._recommended = recommended;
        this._writtenReview = writtenReview;
    }   
}

let ABC0001 = new Unit('ABC0001', 'Unit1', true)
let ABC0002 = new Unit('ABC0002', 'Unit2', false)
let ABC0003 = new Unit('ABC0003', 'Unit3', false)

ABC0001.addReview(new Review('ABC0001', 8, 4, 7, true, "Difficult to keep up but enjoyable overall. Reasonably well run."))
ABC0001.addReview(new Review('ABC0001', 6, 9, 2, false, "I failed my exam."))
ABC0001.addReview(new Review('ABC0001', 4, 2, 5, false, "pretty easy HD tbh"))
ABC0002.addReview(new Review('ABC0002', 3, 5, 7, true, "Difficult to keep up but enjoyable overall. Reasonably well run."))
ABC0002.addReview(new Review('ABC0002', 6, 9, 1, true, "I failed my exam."))
ABC0002.addReview(new Review('ABC0002', 3, 5, 4, true, "pretty easy HD tbh"))
ABC0003.addReview(new Review('ABC0003', 9, 3, 9, true, "Difficult to keep up but enjoyable overall. Reasonably well run."))
ABC0003.addReview(new Review('ABC0003', 6, 10, 4, false, "I failed my exam."))
ABC0003.addReview(new Review('ABC0003', 2, 1, 3, true, "pretty easy HD tbh"))

testUnits = [ABC0001, ABC0002, ABC0003];

displayUnits(testUnits, "unitCode");
