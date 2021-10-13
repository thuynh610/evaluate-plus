function delSubject(id) {
    document.getElementById(id).remove()
    var index = completedSubjects.indexOf(id);
    if (index > -1) {
      completedSubjects.splice(index, 1);
    }
    checkEmptySubjects();
    amntSubjects();
}

function checkSubject() {
    let data = document.getElementById('subjectsInput').value.trim().toUpperCase();

    // This list should include all subjects offered
    let x = document.getElementById('completedSubjects')
    let num = x.getElementsByTagName('span');
    let arr = [];

    for (let i = 0; i < num.length; i++) {
        arr.push(num[i].id);  
    }

    if(subjectList.includes(data) & !completedSubjects.includes(data)) {
        completedSubjects.push(data);
        document.getElementById('completedSubjects').innerHTML += `<span class="subject" id="` + data + `" onclick="delSubject('` + data + `')">` + data + `</span>`;
        document.getElementById('subjectsInput').value = "";
        addOne(data);
    }
    
}

// Creates a Box where the User reviews a subject
function addOne(title) {
    // title is the UNIT CODE

    let outputStr = `<div class="aspect mdl-shadow--2dp">
                            <span class="mainheading">` + title + `</span><br><br>
                            
                            <!-- Year Completed -->
                            <span class="heading">Year Completed: </span>
                            <input class="year" type="number" name="YEAR_` + title + `" maxlength="4" placeholder="XXXX" min="2010" max="2021" REQUIRED><br><br>

                            <!-- Slider for Enjoyment -->
                            <span class="heading">How much did you enjoy ` + title + `?</span><br><br>
                            <div style="width: 80%; margin: auto;">
                                <input class="mdl-slider mdl-js-slider mdl-slider__discrete" type="range" name="SLD_1_` + title + `" min="0" max="10" value="5" step="1">
                                <span class="left">Hated it</span>
                                <span class="right">Loved it</span>
                            </div><br><br><br>

                            <!-- Slider for coursework difficulty -->
                            <span class="heading">How difficult for the coursework?</span><br><br>
                            <div style="width: 80%; margin: auto;">
                                <input class="mdl-slider mdl-js-slider mdl-slider__discrete" type="range" name="SLD_2_` + title + `" min="0" max="10" value="5" step="1">
                                <span class="left">Easy</span>
                                <span class="right">Impossible</span>
                            </div><br><br><br>

                            <!-- Slider for exam difficulty -->
                            <span class="heading">How difficult was the exam?</span><br><br>
                            <div style="width: 80%; margin: auto;">
                                <input class="mdl-slider mdl-js-slider mdl-slider__discrete" type="range" name="SLD_3_` + title + `" min="0" max="10" value="5" step="1">
                                <span class="left">Easy</span>
                                <span class="right">Impossible</span>
                            </div><br><br><br>

                            <!-- Slider for How well run -->
                            <span class="heading">Overall, how well was the unit run?</span><br><br>
                            <div style="width: 80%; margin: auto;">
                                <input class="mdl-slider mdl-js-slider mdl-slider__discrete" type="range" name="SLD_4_` + title + `" min="0" max="10" value="5" step="1">
                                <span class="left">Awfully</span>
                                <span class="right">Perfectly</span>
                            </div><br><br><br>

                            <!-- RadioButton Reccomendation -->
                            <span class="heading">Do you recommend this subject?*</span><br><br>
                            <div>&emsp;
                                <input id="REC_` + title + `" name="REC_` + title + `" type="radio" value="1" REQUIRED> Yes&emsp;
                                <input name="REC_` + title + `" type="radio" value="0"> No
                            </div><br><br>

                            <!-- Textbox for review of subject -->
                            <span class="heading">Leave a review! <sup>(optional)</sup></span><br>
                            <div>
                                <textarea class="textfield" type="text" rows="3" id="review" name="REVIEW_` + title + `" placeholder="Aa..."></textarea>
                            </div>
                        </div>`;
    checkEmptySubjects();
    document.getElementById('expandable').innerHTML += outputStr;
}


function amntSubjects() {
    let x = document.getElementById('completedSubjects')
    let num = x.getElementsByTagName('span');

    document.getElementById('expandable').innerHTML = "";
    
    for (let i = 0; i < num.length; i++) {
        const title = num[i].id;
        addOne(title);
    }
}

function resizeForm() {
    if (document.getElementsByTagName('body')[0].clientWidth < 711) {
        document.getElementById('container').style.width = '90%';
    } else {
        document.getElementById('container').style.width = '640px';
    }
}

function checkEmptySubjects() {
    document.getElementById("subjects").value = ""
    completedSubjects.forEach(element => {     
        document.getElementById("subjects").value += element + ", ";
    });

    let x = document.getElementById('hint');
    if (completedSubjects.length != 0) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function submitForm(){
    /*
    This function should submit the form saving the user's reviews to the database as well as saving a copy locally
    */

    let subjects = document.getElementById("subjects").value.split(", ")
    subjects.pop()

    let userChoices = []
    for(let i = 0; i < subjects.length; i++){
        let unitCode = subjects[i];
        
        // let temp = document.getElementsByName("YEAR_" + unitCode)
        // temp = temp[0].value
        
        let review = {
            name: "",
            unitCode: unitCode,
            yearCompleted: document.getElementsByName("YEAR_" + unitCode)[0].value,  
            enjoymentRating: document.getElementsByName("SLD_1_" + unitCode)[0].value,
            courseworkRating: document.getElementsByName("SLD_2_" + unitCode)[0].value,
            examRating: document.getElementsByName("SLD_3_" + unitCode)[0].value,
            unitStructureRating: document.getElementsByName("SLD_4_" + unitCode)[0].value,
            recommended: document.getElementById("REC_" + unitCode).checked,
            writtenReview: document.getElementsByName("REVIEW_" + unitCode)[0].value
        }
        userChoices.push(review)
    }
    localStorage.setItem(USER_REVIEWS_KEY, JSON.stringify(userChoices))
    let updatedUnits = updateAlgorithmArray();

    for(let i = 0; i < updatedUnits.length; i++){
        const element = updatedUnits[i]
        //storeArray(element.unitCode, JSON.stringify(element.algorithmArray))
        fetch("/api/test/" + element.unitCode + "/" + JSON.stringify(element.algorithmArray))
    }
    document.getElementsByTagName('form')[0].submit();
}

async function getData() {
    const response = await fetch('/units');
    await response.json().then(data => {
        subjectList = data.map( y => y["unitCode"])  
    });
}

async function sampleSubmit(unitcode) {
    const response = await fetch('/units/' + unitcode)
    await response.json().then( data => {
        console.log(data[0]);
    })
}

let completedSubjects = []
let subjectList = []
getData().then( () => {
    
    for (let i = 0; i < subjectList.length; i++) {
        const element = subjectList[i];
        document.getElementById('subjectsList').innerHTML += '<option id="' + element + '">' + element + ' </option>';
    }

});