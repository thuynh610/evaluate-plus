"use strict";

const COLOR_SCHEME_KEY = "colour scheme";


function toggleDarkMode() {
    let mode = localStorage.getItem(COLOR_SCHEME_KEY);
    if (mode == "dark") {
        localStorage.setItem(COLOR_SCHEME_KEY, "light");
        applyLightMode();
    } else {
        localStorage.setItem(COLOR_SCHEME_KEY, "dark");
        applyDarkMode();
    }
    document.querySelector(".mdl-layout").MaterialLayout.toggleDrawer();
}

function applyDarkMode() {
    document.getElementsByTagName('body')[0].style.backgroundColor = "#0F4339";
    let x = document.getElementsByClassName('toggle-text-color');
    for (let i = 0; i < x.length; i++) {
        x[i].style.color = "floralwhite";
    }

    let y = document.getElementsByClassName('toggle-background-color'); 
    for (let i = 0; i < y.length; i++) {
        y[i].style.backgroundColor = "rgb(0,150,136)"
    }

    let z = document.getElementsByClassName('toggle-element-color');
    for (let i = 0; i < z.length; i++) {
        z[i].style.backgroundColor = "white"
    }
}

function applyLightMode() {
    document.getElementsByTagName('body')[0].style.backgroundColor = "#E4F9F5";
    let x = document.getElementsByClassName('toggle-text-color');
    for (let i = 0; i < x.length; i++) {
        x[i].style.color = "black";
    }

    let y = document.getElementsByClassName('toggle-background-color'); 
    for (let i = 0; i < y.length; i++) {
        y[i].style.backgroundColor = "floralwhite"
    }

    let z = document.getElementsByClassName('toggle-element-color');
    for (let i = 0; i < z.length; i++) {
        z[i].style.backgroundColor = "black"
    }
}

if (!localStorage.getItem(COLOR_SCHEME_KEY)) {
    localStorage.setItem(COLOR_SCHEME_KEY, "light");
}

let mode = localStorage.getItem(COLOR_SCHEME_KEY);
if (mode == "dark") {
    applyDarkMode();
    document.getElementById("dark-mode").setAttribute("CHECKED", true);
} else {
    applyLightMode();
    document.getElementById("dark-mode").removeAttribute("CHECKED")
}

/*
function retrieveUnitByName(unitName){
    let output = []
    const response = await fetch('/units');
    await response.json().then(data=> {
       let unitsArray = data;
        for(let i = 0; i < unitsArray.length; i++){
            if (data[i].title == unitName){
                output.push(data[i])
            }
        }
    });
    return output
}

function retrieveUnitByCode(unitCode){
    let output = []
    const response = await fetch('/units');
    await response.json().then(data=> {
        unitsArray = data;
        for(let i = 0; i < unitsArray.length; i++){
            if (data[i].unitCode == unitCode){
                output.push(data[i])
            }
        }
    });
    return output
}

function retrieveCourse(courseTitle){
    let output = []
    const response = await fetch('/courses');
    await response.json().then(data);

    for(let i = 0; i < data.length; i++){
        if (data[i].course_title == courseTitle){
            output.push(data[i])
        }
    }
    return output
}
*/