"Use strict"
const PAGE_LIMIT = 20;

function displayUnits(sortType, pageNum, units = unitsArray) {

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
        onclick="displayUnits('unitCode', 1)">
            Unit Code
        </th>
        <th id="courseworkDifficultyHead" style="text-align:center" onclick="displayUnits('courseworkDifficulty', 1)">
            Coursework Difficulty
        </th>
        <th id="finalAssessmentDifficultyHead" style="text-align:center" onclick="displayUnits('finalAssessmentDifficulty', 1)">
            Final Assessment Difficulty
        </th>
        <th id="coordinationLevelHead" style="text-align:center" onclick="displayUnits('coordinationLevel', 1)">
            Coordination Level
        </th>
        <th id="recommendationsHead" style="text-align:center" onclick="displayUnits('recommendations', 1)">
            Recommendations
        </th>
    </tr>`

    /* GENERATING PAGING BAR */
    let pagingBarRef = document.getElementById("pagingBar");
    pagingBarRef.innerHTML = "";
    const NUMBER_OF_PAGES = Math.ceil(units.length / PAGE_LIMIT);
    // for page numbers: 1,2,3
    if ([1, 2, 3].includes(pageNum)) {
        for (let i = 1; i < Math.min(NUMBER_OF_PAGES + 1, pageNum + 4); i++) {
            if (i === pageNum) {
                pagingBarRef.innerHTML += `<li class="active">${i}</li>`;
            }
            else {
                pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${i})">${i}</li>`;
            }
        }
        if (NUMBER_OF_PAGES > pageNum + 4) {
            pagingBarRef.innerHTML += `<li>...</li>`;
            pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${NUMBER_OF_PAGES - 1})">${NUMBER_OF_PAGES - 1}</li>`;
            pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${NUMBER_OF_PAGES})">${NUMBER_OF_PAGES}</li>`;
        }
    }
    // for page numbers: 4, 5, ..., num pages - 6, num pages - 5
    else if (pageNum > 3 && pageNum < NUMBER_OF_PAGES - 4) {
        pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', 1)">1</li>`;
        pagingBarRef.innerHTML += `<li>...</li>`;
        for (let i = pageNum - 2; i < Math.min(NUMBER_OF_PAGES + 1, pageNum + 4); i++) {
            if (i === pageNum) {
                pagingBarRef.innerHTML += `<li class="active">${i}</li>`;
            }
            else {
                pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${i})">${i}</li>`;
            }
        }
        if (NUMBER_OF_PAGES > pageNum + 4) {
            pagingBarRef.innerHTML += `<li>...</li>`;
            pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${NUMBER_OF_PAGES - 1})">${NUMBER_OF_PAGES - 1}</li>`;
            pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${NUMBER_OF_PAGES})">${NUMBER_OF_PAGES}</li>`;
        }
    }
    // for page numbers: num pages - 4, num pages - 3, ..., num pages - 1, num pages
    else {
        pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', 1)">1</li>`;
        pagingBarRef.innerHTML += `<li>...</li>`;
        for (let i = pageNum - 2; i < NUMBER_OF_PAGES + 1; i++) {
            if (i === pageNum) {
                pagingBarRef.innerHTML += `<li class="active">${i}</li>`;
            }
            else {
                pagingBarRef.innerHTML += `<li onclick="ascModifiers['${sortType}Asc'] *= -1; displayUnits('${sortType}', ${i})">${i}</li>`;
            }
        }
    }

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



    for (let i = (pageNum - 1) * PAGE_LIMIT; i < units.length && i < pageNum * PAGE_LIMIT; i++) {
        function notZero(param) {
            if (units[i].reviews.length) {
                return (param / units[i].reviews.length).toFixed(2)
            } else {
                return 0
            }
        }
        tableBodyRef.innerHTML += 
        `<tr onclick="openUnit('${units[i].unitCode}')">
            <td class="mdl-data-table__cell--non-numeric">${units[i].unitCode}</td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgCourseworkDifficulty/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgFinalAssessmentDifficulty/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgCoordinationLevel/Math.max(units[i].reviews.length, 1)).toFixed(2)}/10
                </div>
            </td>
            <td>
                <div style="text-align:center">
                    ${(units[i].avgRecommendations/Math.max(units[i].reviews.length, 1)).toFixed(2)*100}%
                </div>
            </td>
        </tr>`;
    }
}

function searchUnits() {
    /*
        searchString is a string which the user has input as the serch term        
        This function otherwise is just modified from the displayUnits function to perform a search instead.
    */

    let searchString = document.getElementById("searchbox").value.toUpperCase();
    let unit_search = !document.getElementById("unitcode-search").classList.contains("off")
    let title_search = !document.getElementById("title-search").classList.contains("off")

    // Searching the units array for matches
    let units = []
    for (let i = 0; i < unitsArray.length; i++) {
        if (unit_search && title_search) {
            if (unitsArray[i].unitCode.toUpperCase().includes(searchString) || unitsArray[i].title.toUpperCase().includes(searchString)) {
                units.push(unitsArray[i])
            }
        } else if (unit_search) {
            if (unitsArray[i].unitCode.toUpperCase().includes(searchString)) {
                units.push(unitsArray[i])
            }
        } else {
            if (unitsArray[i].title.toUpperCase().includes(searchString)) {
                units.push(unitsArray[i])
            }
        }
    }
    ascModifiers['unitCodeAsc'] *= -1
    displayUnits("unitCode", 1, units)
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

function toggleSearchOption(type) {
    let other = "";
    if (type == "unitcode") {
        other = "title"
    } else {
        other = "unitcode"
    }

    let x = document.getElementById(type + "-search").classList
    let y = document.getElementById(other + "-search").classList

    if (x.contains("off")) {
        if (!y.contains("off")) {
            x.remove("off")
        }
    } else {
        if (!y.contains("off")) {
            x.add("off")
        } else {
            x.add("off")
            y.remove("off")
        }
    }
    ascModifiers['unitCodeAsc'] *= -1;
    displayUnits('unitCode', 1)
}

function openUnit(unitCode) {
    window.location = `/subjects/${unitCode}`
}

async function getData() {
    const response = await fetch('/units');
    await response.json().then(data => {
        unitsArray = data;
        displayUnits("unitCode", 1);
    });
}
let unitsArray = [];

getData()