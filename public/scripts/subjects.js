async function getData(unit_code) {
    const response = await fetch('/units/' + unit_code)
    const data = await response.json()
    
    const unit_data = data[0];

    for (let i = 0; i < Object.keys(unit_data).length; i++) {
        const key = Object.keys(unit_data)[i];
        try {
            if (typeof unit_data[key] == "number") {
                if (unit_data.reviews.length && key != "avgRecommendations") {
                    document.getElementById(key).innerHTML = Math.floor(unit_data[key] * 10 / unit_data.reviews.length)
                } 
                else if (unit_data.reviews.length) {
                    document.getElementById(key).innerHTML = Math.floor(unit_data[key] * 100 / unit_data.reviews.length)
                }
                else {
                    document.getElementById(key).innerHTML = 0
                }

            } else {
                document.getElementById(key).innerHTML = unit_data[key] 
            }
        } catch (e) {}
    }
    
    let outputStr = "";
    let arr = unit_data.algorithmArray.sort((a, b) => b.score - a.score);

    let max = 4;
    if (arr.length <= 4) {max = arr.length}
    for (let i = 0; i < max; i++) {
        const element = arr[i];
        if (element.score >= 0) {
            outputStr += `
            <li class="mdl-list__item suggested-unit">
                <span class="mdl-list__item-primary-content" onclick="openUnit('` + element.unitCode + `')">
                <i class="mdl-list__item-icon material-icons">thumb_up</i>
                    ` + element.unitCode + `
                </span>
            </li>`;
        }
    }
    document.getElementById("avgRecommendations").innerHTML += "%"
    if (outputStr != "") {document.getElementById("algorithm_list").innerHTML = outputStr}
    getReviews(unit_data);
    document.getElementById("handbook_button").href = "https://handbook.monash.edu/2022/units/" + unit_data["unitCode"]
}

function generateList(reviewList) {
    let outputStr = ""

    for (let i = 0; i < reviewList.length; i++) {
        const review = reviewList[i];
        if (review.writtenReview != ""){
            let name = ""
            if (review.name == "") {
                name = "Anonymous"
            } else {
                name = review.name
            }
            outputStr += `
                <li class="mdl-list__item review mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <span>` + name + `</span>
                        <span class="mdl-list__item-text-body">
                            ` + review.writtenReview + `
                        </span>
                    </span>
                </li>`;
        }
    }
    if (outputStr != "") {document.getElementById('written-reviews').innerHTML = outputStr}
}

async function getReviews(unit_data) {
    let review_string = ""
    for (let i = 0; i < unit_data.reviews.length; i++) {
        review_string += unit_data.reviews[i] + "-";
    }

    const response = await fetch("/reviews/" + review_string)
    await response.json().then(data => {
        generateList(data)
    })

}

function openUnit(unitCode) {
    window.location.href = "/subjects/" + unitCode
}

let unit_code = window.location.href.slice(-7);
getData(unit_code)