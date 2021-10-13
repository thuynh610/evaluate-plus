"Use strict"

//import {recommendationAlgorithm} from '/algorithm.js';
let addressArray = window.location.href.split("/");
let unique_id = addressArray[addressArray.length-2].substring(1, addressArray[addressArray.length-2].length);
let selectedCourse = localStorage.getItem('selectedCourse');

const POSSIBLE_COURSES = ['aerospace', 'biomedical', 'chemical', 'civil', 'electricalAndComputerSystems', 'environmental', 'materials', 'mechanical', 'resourcesAndMining', 'resourcesAndRenewableEnergy', 'roboticsAndMechatronics_ai', 'roboticsAndMechatronics_auto', 'software', 'software_ibl'];

function displayUnits(sortType) {

    let units = unitsArray;

    upArrowHtml = `<i class="material-icons">
                                arrow_upward
                            </i>`;
    downArrowHtml = `<i class="material-icons">
                                arrow_downward
                            </i>`;

    ascModifiers[sortType + "Asc"] *= -1; // changes the sort preference for the selected column (i.e. turn from asc to desc and vice versa)
    for (const key in ascModifiers) {
        if (key !== sortType + "Asc") {
            ascModifiers[key] = -1; // resets all columns to default in ascending order
        }
    }
    units = units.sort(sortFunctions[sortType + "Sort"]); // sorts the provided units according to the selected sorting criteria

    /* GENERATING THE TABLE HEADERS */
    tableHeadRef = document.getElementById("tableHead");
    tableHeadRef.innerHTML = `
        <tr>
            <th id="unitCodeHead" class="mdl-data-table__cell--non-numeric style="text-align:center""
            onclick="displayUnits('unitCode')">
                Unit Code
            </th>
            <th id="courseworkDifficultyHead" style="text-align:center" onclick="displayUnits('courseworkDifficulty')">
                Coursework Difficulty
            </th>
            <th id="finalAssessmentDifficultyHead" style="text-align:center" onclick="displayUnits('finalAssessmentDifficulty')">
                Final Assessment Difficulty
            </th>
            <th id="coordinationLevelHead" style="text-align:center" onclick="displayUnits('coordinationLevel')">
                Coordination Level
            </th>
            <th id="recommendationsHead" style="text-align:center" onclick="displayUnits('recommendations')">
                Recommendations
            </th>
            <th></th>
        </tr>`;

    /* ADD RELEVANT SORT ARROW */
    columnHeadRef = document.getElementById(sortType + "Head");
    if (ascModifiers[sortType + "Asc"] === 1) {
        columnHeadRef.innerHTML += upArrowHtml;
    }
    else {
        columnHeadRef.innerHTML += downArrowHtml;
    }

    /* GENERATING TABLE BODY */
    tableBodyRef = document.getElementById("tableBody");
    tableBodyRef.innerHTML = '';

    let courseObject = {};
    for (let i = 0; i < courseArray.length; i++) {
        if (courseArray[i].course_title === selectedCourse) {
            courseObject = courseArray[i];
            break;
        }
    }

    for (let i = 0; i < units.length; i++) {
        let unit = units[i];
        if (courseObject.elective_units.includes(unit.unitCode)) {
            function notZero(param) {
                if (units[i].reviews.length) {
                    return (param / units[i].reviews.length).toFixed(2)
                } else {
                    return 0
                }
            }
            tableBodyRef.innerHTML += 
        `<tr>
            <td onclick="openUnit('${units[i].unitCode}')" class="mdl-data-table__cell--non-numeric">${units[i].unitCode}</td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgCourseworkDifficulty/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgFinalAssessmentDifficulty/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgCoordinationLevel/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgRecommendations/Math.max(units[i].reviews.length, 1)).toFixed(2)*100}%
                </div>
            </td>
            <td>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect row-button" onclick="addElective('${unit.unitCode}', '${unique_id}')">
                    <i class="material-icons">add</i>
                </button>
            </td>
        </tr>`;
        }
    }
}

function searchUnits(sortType) {
    /*
        searchString is a string which the user has input as the serch term
        searchType is either the string "unitCode" or "unitTitle"
        
        This function otherwise is just modified from the displayUnits function to perform a search instead.
    */
    let units = []
    let searchString = getElementById(searchString)
    let searchType = getElementById(searchType)

    upArrowHtml =  `<i class="material-icons">
                        arrow_upward
                    </i>`;
    downArrowHtml = `<i class="material-icons">
                        arrow_downward
                    </i>`;

    
    for (const key in ascModifiers) {
            ascModifiers[key] = -1; // resets all columns to default in ascending order
    }
    
    // Searching the units array for matches
    for(let i=0; i<length(unitsArray); i++){
        if(searchType == "unitTitle"){
            if(unitsArray[i].title.contains(searchString)){
                units.push(unitsArray[i])
            }
        }
        else{
            if(unitsArray[i].unitCode.contains(searchString)){
                units.push(unitsArray[i])
            }
        }
    }

    /* GENERATING THE TABLE HEADERS */
    tableHeadRef = document.getElementById("tableHead");
    tableHeadRef.innerHTML = `
    <tr>
        <th id="unitCodeHead" class="mdl-data-table__cell--non-numeric style="text-align:center""
        onclick="displayUnits('unitCode')">
            Unit Code
        </th>
        <th id="courseworkDifficultyHead" style="text-align:center" onclick="displayUnits('courseworkDifficulty')">
            Coursework Difficulty
        </th>
        <th id="finalAssessmentDifficultyHead" style="text-align:center" onclick="displayUnits('finalAssessmentDifficulty')">
            Final Assessment Difficulty
        </th>
        <th id="coordinationLevelHead" style="text-align:center" onclick="displayUnits('coordinationLevel')">
            Coordination Level
        </th>
        <th id="recommendationsHead" style="text-align:center" onclick="displayUnits('recommendations')">
            Recommendations
        </th>
    </tr>`

    /* ADD RELEVANT SORT ARROW */
    columnHeadRef = document.getElementById(sortType + "Head");
    if (ascModifiers[sortType + "Asc"] === 1) {
        columnHeadRef.innerHTML += upArrowHtml;
    }
    else {
        columnHeadRef.innerHTML += downArrowHtml;
    }
    
    /* GENERATING TABLE BODY */
    tableBodyRef = document.getElementById("tableBody");
    tableBodyRef.innerHTML = '';

    for (let i = 0; i < units.length; i++) {
        tableBodyRef.innerHTML += 
        `<tr onclick="openUnit('${units[i].unitCode}')">
            <td class="mdl-data-table__cell--non-numeric">${units[i].unitCode}</td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgCourseworkDifficulty/units[i].reviews.length).toFixed(2)}/10
                </div>
            </td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgFinalAssessmentDifficulty/units[i].reviews.length).toFixed(2)}/10
                </div>
            </td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgCoordinationLevel/units[i].reviews.length).toFixed(2)}/10
                </div>
            </td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgRecommendations/units[i].reviews.length).toFixed(2)*100}%
                </div>
            </td>
        </tr>`;
    }
}

function sugestestedUnits() {
    /*  
    Input: userChoices should be an array of reviews, these reviews are the ones the user has submitted.

    This function calls the algorithm function and returns the suggested units in order
    */

    let ticked = document.getElementById("recommended").checked
    
    // calling the algorithm to return the user choices
    let units = recommendationAlgorithm()

    /* GENERATING THE TABLE HEADERS */
    tableHeadRef = document.getElementById("tableHead");
    tableHeadRef.innerHTML = `
    <tr>
        <th id="unitCodeHead" class="mdl-data-table__cell--non-numeric style="text-align:center""
        onclick="displayUnits('unitCode')">
            Unit Code
        </th>
        <th id="courseworkDifficultyHead" style="text-align:center" onclick="displayUnits('courseworkDifficulty')">
            Coursework Difficulty
        </th>
        <th id="finalAssessmentDifficultyHead" style="text-align:center" onclick="displayUnits('finalAssessmentDifficulty')">
            Final Assessment Difficulty
        </th>
        <th id="coordinationLevelHead" style="text-align:center" onclick="displayUnits('coordinationLevel')">
            Coordination Level
        </th>
        <th id="recommendationsHead" style="text-align:center" onclick="displayUnits('recommendations')">
            Recommendations
        </th>
    </tr>`

    
    /* GENERATING TABLE BODY */
    tableBodyRef = document.getElementById("tableBody");
    tableBodyRef.innerHTML = '';

    for (let i = 0; i < units.length; i++) {
        tableBodyRef.innerHTML += 
        `<tr>
            <td class="mdl-data-table__cell--non-numeric">${units[i].unitCode}</td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgCourseworkDifficulty/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgFinalAssessmentDifficulty/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgCoordinationLevel/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td onclick="openUnit('${units[i].unitCode}')">
                <div style="text-align:center">
                    ${(units[i].avgRecommendations/Math.max(units[i].reviews.length, 1)).toFixed(2)*100}%
                </div>
            </td>
            <td>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect row-button" onclick="addElective('${units[i].unitCode}', '${unique_id}')">
                    <i class="material-icons">add</i>
                </button>
            </td>
        </tr>`;
    }
}

function toggleSwitch(){
    if(document.getElementById("recommended").checked){
        sugestestedUnits()
    }
    else{
        displayUnits("unitCode")
    }
}

// Stores the various sort functions using the HTML column ids + "Sort" as the keys
const sortFunctions = {
    unitCodeSort: function (unit1, unit2) {
        if (unit1.unitCode > unit2.unitCode) {
            return 1 * ascModifiers.unitCodeAsc;
        }
        else {
            return -1 * ascModifiers.unitCodeAsc;
        }
    },

    courseworkDifficultySort: function (unit1, unit2) {
        if (unit1.reviews.length && unit2.reviews.length) {
            if (unit1.avgCourseworkDifficulty / unit1.reviews.length > unit2.avgCourseworkDifficulty / unit2.reviews.length) {
                return 1 * ascModifiers.courseworkDifficultyAsc;
            }
            else {
                return -1 * ascModifiers.courseworkDifficultyAsc;
            }
        }
        else if (unit1.reviews.length) {
            if (unit1.avgCourseworkDifficulty / unit1.reviews.length > unit2.avgCourseworkDifficulty) {
                return 1 * ascModifiers.courseworkDifficultyAsc;
            }
            else {
                return -1 * ascModifiers.courseworkDifficultyAsc;
            }
        }
        else if (unit2.reviews.length) {
            if (unit1.avgCourseworkDifficulty > unit2.avgCourseworkDifficulty / unit2.reviews.length) {
                return 1 * ascModifiers.courseworkDifficultyAsc;
            }
            else {
                return -1 * ascModifiers.courseworkDifficultyAsc;
            }
        }
        else {
            return -1 * ascModifiers.courseworkDifficultyAsc;
        }
    },

    finalAssessmentDifficultySort: function (unit1, unit2) {
        if (unit1.reviews.length && unit2.reviews.length) {
            if (unit1.avgFinalAssessmentDifficulty / unit1.reviews.length > unit2.avgFinalAssessmentDifficulty / unit2.reviews.length) {
                return 1 * ascModifiers.finalAssessmentDifficultyAsc;
            }
            else {
                return -1 * ascModifiers.finalAssessmentDifficultyAsc;
            }
        }
        else if (unit1.reviews.length) {
            if (unit1.avgFinalAssessmentDifficulty / unit1.reviews.length > unit2.avgFinalAssessmentDifficulty) {
                return 1 * ascModifiers.finalAssessmentDifficultyAsc;
            }
            else {
                return -1 * ascModifiers.finalAssessmentDifficultyAsc;
            }
        }
        else if (unit2.reviews.length) {
            if (unit1.avgFinalAssessmentDifficulty > unit2.avgFinalAssessmentDifficulty / unit2.reviews.length) {
                return 1 * ascModifiers.finalAssessmentDifficultyAsc;
            }
            else {
                return -1 * ascModifiers.finalAssessmentDifficultyAsc;
            }
        }
        else {
            return -1 * ascModifiers.finalAssessmentDifficultyAsc;
        }
    },

    coordinationLevelSort: function (unit1, unit2) {
        if (unit1.reviews.length && unit2.reviews.length) {
            if (unit1.avgCoordinationLevel / unit1.reviews.length > unit2.avgCoordinationLevel / unit2.reviews.length) {
                return 1 * ascModifiers.coordinationLevelAsc;
            }
            else {
                return -1 * ascModifiers.coordinationLevelAsc;
            }
        }
        else if (unit1.reviews.length) {
            if (unit1.avgCoordinationLevel / unit1.reviews.length > unit2.avgCoordinationLevel) {
                return 1 * ascModifiers.coordinationLevelAsc;
            }
            else {
                return -1 * ascModifiers.coordinationLevelAsc;
            }
        }
        else if (unit2.reviews.length) {
            if (unit1.avgCoordinationLevel > unit2.avgCoordinationLevel / unit2.reviews.length) {
                return 1 * ascModifiers.coordinationLevelAsc;
            }
            else {
                return -1 * ascModifiers.coordinationLevelAsc;
            }
        }
        else {
            return -1 * ascModifiers.coordinationLevelAsc;
        }
    },

    recommendationsSort: function (unit1, unit2) {
        if (unit1.reviews.length && unit2.reviews.length) {
            if (unit1.avgRecommendations / unit1.reviews.length > unit2.avgRecommendations / unit2.reviews.length) {
                return 1 * ascModifiers.recommendationsAsc;
            }
            else {
                return -1 * ascModifiers.recommendationsAsc;
            }
        }
        else if (unit1.reviews.length) {
            if (unit1.avgRecommendations / unit1.reviews.length > unit2.avgRecommendations) {
                return 1 * ascModifiers.recommendationsAsc;
            }
            else {
                return -1 * ascModifiers.recommendationsAsc;
            }
        }
        else if (unit2.reviews.length) {
            if (unit1.avgRecommendations > unit2.avgRecommendations / unit2.reviews.length) {
                return 1 * ascModifiers.recommendationsAsc;
            }
            else {
                return -1 * ascModifiers.recommendationsAsc;
            }
        }
        else {
            return -1 * ascModifiers.recommendationsAsc;
        }
    },
}

// Stores whether a column is set to ascending or descending order using the HTML column ids + "Asc" for the keys
const ascModifiers = {
    unitCodeAsc: -1, // 1 for asc, -1 for desc
    courseworkDifficultyAsc: -1, // 1 for asc, -1 for desc
    finalAssessmentDifficultyAsc: -1, // 1 for asc, -1 for desc
    coordinationLevelAsc: -1, // 1 for asc, -1 for desc
    recommendationsAsc: -1, // 1 for asc, -1 for desc
}

function openUnit(unitCode) {
    window.location = `/subjects/:${unitCode}`;
}

async function getUnitData() {
    const response = await fetch('/units');
    await response.json().then(data => {
        unitsArray = data;
        getCourseData()
    });
}
let unitsArray = [];
let courseArray = [];
getUnitData()

async function getCourseData() {
    const response = await fetch(`/courses`);
    await response.json().then(data => {
        courseArray = data;
        displayUnits("unitCode");
    });
}

function addElective(unitCode, positionID) {
    localStorage.setItem('electiveData', [unitCode, positionID]);
    window.location = "/electives-planning";
}

// need to get the key for where userChoices is stored in local memory
//sugestestedUnits(userChoices)