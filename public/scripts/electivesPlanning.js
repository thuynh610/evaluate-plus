/* COURSES FOR USER TO SELECT -------------------------------------------------------------------------------------------------------- */
let courseList = ["Aerospace Engineering", "Biomedical Engineering", "Chemical Engineering", "Civil Engineering", 
                    "Electrical and Computer System Engineering", "Environmental Engineering", "Materials Engineering", 
                    "Mechanical Engineering", "Robotics and Mechatronics - AI Engineering", 
                    "Robotics and Mechatronics - Automation Engineering", 
                    "Software Engineering", "Software Engineering - Industry Based Learning"];

for (let i = 0; i < courseList.length; i++) {
    const element = courseList[i];
    document.getElementById('courseList').innerHTML += "<option id=" + element + ">" + element + "</option>";
}

/* FUNCTION FOR DRAG AND DROPPING FEATURES ------------------------------------------------------------------------------------------- */
function allowDrop(ev) {
    ev.preventDefault();
}
 
function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
 
function dragDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

/* COLLAPSEABLE BOX ------------------------------------------------------------------------------------------------------------------ */
let coll = document.getElementsByClassName("collapse_button");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

/* PAGE FUNCTIONNALITY --------------------------------------------------------------------------------------------------------------- */
const POSSIBLE_COURSES = ['aerospace', 'biomedical', 'chemical', 'civil', 'electricalAndComputerSystems', 'environmental', 
                            'materials', 'mechanical', 'roboticsAndMechatronics_ai', 'roboticsAndMechatronics_auto', 
                            'software', 'software_ibl'];

let selectedCourse = localStorage.getItem('selectedCourse');
let displayedUnits = localStorage.getItem('displayedUnitsKey');
let isNewData = false;

/* HAPPENS EVERYTIME ON PAGE LOAD */
if (selectedCourse != null) {
    //if the variable is not null meaning it is NOT the first time the page load so we will use the data from local storage
    if (localStorage.getItem('electiveData') != null) {
        //if the user select an elective from pickUnit page isNewData = true; so that later, the process is difference 
        isNewData = true;
    }
    //display the last selected course from local storage to the user
    let index = POSSIBLE_COURSES.indexOf(selectedCourse);
    document.getElementById('searchBoxText').innerText = "Viewing: " + courseList[index];
    let x = document.getElementsByClassName("collapse_button");
    for (let i = 0; i < x.length; i++) {
        x[i].click();
    }
    //display all the unit
    getUnitData();
}

//This function is triggered when the user select a course and click the SHOW button
function selectACourse() {
    // get the course the user select
    userChosenCourse = document.getElementById("courseInputField").value;
    let index = courseList.indexOf(userChosenCourse);
    selectedCourse = POSSIBLE_COURSES[index];
    getUnitData();
}

// This function will get the data of all the units from the database
let unitsArray = [];
async function getUnitData() {
    const response = await fetch('/units');
    await response.json().then(data => {
        unitsArray = data;
        fetchCourseData()
    });
}

//This function will get the data of the course that the user select from the database i.e., it will return a course object
let courseObject;
async function fetchCourseData() {
    const response = await fetch(`/courses`);
    await response.json().then(data => { 
        for (let i = 0; i < data.length; i++) {
            // look for the course the user select
            if (data[i].course_title == selectedCourse) {
                courseObject = data[i];
            }
        }
        displayData();
    });
}

//This function will display the units into the corresponding year and semester
function displayData() {
    let unique_block_id = 0;
    let electivePosition;
    let electiveUnitCode;
    let prefillArray;
    if (isNewData) {
        displayedUnits = localStorage.getItem('displayedUnitsKey');
        tempArray = displayedUnits.split(',');
        prefillArray = [];
        for (let i = 0; i < 8; i++) {
            prefillArray.push(tempArray.slice(4*i, 4*(i+1)));
        }
        electiveData = localStorage.getItem("electiveData").split(',');
        electiveUnitCode = electiveData[0];
        electivePosition = Number(electiveData[1]);
        //prefillArray[Math.floor(electivePosition/4)][electivePosition%4] = `${electiveUnitCode} REMOVEABLE`;
        isNewData = false;
    }
    else {
        prefillArray = courseObject.prefillArray;
        electiveUnitCode = '';
        electivePosition = -1;
    }
    for (let i = 0; i < prefillArray.length; i++) {
        let collapse_box_id = `sem_${i + 1}`;
        //choosing which year - semester to fill
        let box_to_fill = document.getElementById(collapse_box_id);
        let curr_sem_units = prefillArray[i];
        box_to_fill.innerHTML = "";
        //filling the units for that year - semester
        for (let j = 0; j < curr_sem_units.length; j++) {
            if (i*4 + j == electivePosition) // if it's an elective we've just added
            {
                let index = unitsArray.findIndex(unit => unit.unitCode == electiveUnitCode);
                let unit_title = unitsArray[index].title;
                //add a block containing the unit code and title 
                box_to_fill.innerHTML +=
                `<p class="boxed" id=${unique_block_id} draggable="false" ondragstart="dragStart(event)" onclick="removeElective(${unique_block_id})">${electiveUnitCode} (Click to change)<br>${unit_title}</p>`;
                prefillArray[i][j] = `${electiveUnitCode} REMOVEABLE`;
                localStorage.setItem('electiveData', ['',-1]);
            }
            else if (curr_sem_units[j].includes('REMOVEABLE')) // if it's an elective we've added previously
            {
                let unit_code = curr_sem_units[j].substring(0,7);
                let index = unitsArray.findIndex(unit => unit.unitCode == unit_code);
                let unit_title = unitsArray[index].title;
                //add a block containing the unit code and title 
                box_to_fill.innerHTML +=
                `<p class="boxed" id=${unique_block_id} draggable="false" ondragstart="dragStart(event)" onclick="removeElective(${unique_block_id})">${unit_code} (Click to change)<br>${unit_title}</p>`;
            }
            else if (curr_sem_units[j] != "ELECTIVE") // if it's a core subject
            {
                let unit_code = curr_sem_units[j];
                let index = unitsArray.findIndex(unit => unit.unitCode == unit_code);
                let unit_title = unitsArray[index].title;
                //add a block containing the unit code and title 
                box_to_fill.innerHTML +=
                `<p class="boxed" id=${unique_block_id} draggable="false" ondragstart="dragStart(event)">${unit_code}<br>${unit_title}</p>`;
            } 
            else // if it's an elective spot
            {
                //add a button if the spot is an elective
                box_to_fill.innerHTML += 
                `<a onClick="window.location ='/pick-unit/:${unique_block_id}/:${selectedCourse}'" class="button1">Click to select an elective</a>`;
            }
            //update the block id
            unique_block_id += 1;
        }   
    }
    if (localStorage.getItem('selectedCourse') == null) {
        let x = document.getElementsByClassName("collapse_button");
        for (let i = 0; i < x.length; i++) {
            x[i].click();
        }
    }
    if (selectedCourse != undefined) {
        localStorage.setItem('selectedCourse', selectedCourse);
    }
    localStorage.setItem('displayedUnitsKey', prefillArray);
}

function removeElective(electiveId) {
    displayedUnits = localStorage.getItem('displayedUnitsKey').split(',');
    displayedUnits[electiveId] = "ELECTIVE";
    localStorage.setItem('displayedUnitsKey', displayedUnits);
    isNewData = true;
    displayData();
}