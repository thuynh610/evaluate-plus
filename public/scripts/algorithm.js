const USER_REVIEWS_KEY = "userreviews"

function findUnit(unitsArray, unitCode){
    for(let index=0; index < unitsArray.length; index++){
        
        if(unitsArray[index].unitCode == unitCode){
            return [true, index]
        }
    }
    return [false,0]
}





function recommendationAlgorithm(){
    /*
    userChoices should be an array of reviews, these reviews are the ones the user has submitted.
    */
   let userChoices = JSON.parse(localStorage.getItem(USER_REVIEWS_KEY))
   
    //adding all the scores to an output array
    let outputArray = [];
    for(let i=0; i < userChoices.length; i++){
        let unit = getUnitData(userChoices[i].unitCode)

        for(let j=0; j < unit.algorithmArray.length; j++){
            let location = findUnit(outputArray, unit.algorithmArray[j].unitCode);

            //if the unit is already in the output array we just add the score to the existing entry
            if(location[0]){

                //Checks if the algorithm should add or subtract the score based on if the user liked the unit or not
                if(userChoices[i].recommended){
                    outputArray[location[1]] += unit.algorithmArray[j].score;
                }
                else{
                    outputArray[location[1]] -= unit.algorithmArray[j].score;
                }
            }

            //if the unit hasn't been added already then we must add the entry
            else{   

                //Checks if the algorithm should add or subtract the score based on if the user liked the unit or not
                if(userChoices[i].recommended){
                    outputArray.push(unit.algorithmArray[j]);
                }
                else{
                    outputArray.push({unitCode: unit.algorithmArray[j].unitCode, score: unit.algorithmArray[j].score * -1});
                }
            }
        }
    }

    outputArray.sort((a,b) => (b.score - a.score));
    outputArray =  outputArray.filter(unit => unit.score > 0)
    let recommendedUnits = []
    for(let i = 0; i< outputArray.length; i++){
        recommendedUnits.push(getUnitData(outputArray[i].unitCode))
    }
    return recommendedUnits

}


function updateAlgorithmArray(){
    /*
        The algorithm array will be a list of objects objects with two properties: score and unit code
    */
    let userChoices = JSON.parse(localStorage.getItem(USER_REVIEWS_KEY))
    let unitsArray = [];
    for(let i=0; i < userChoices.length; i++){
        unitsArray.push(getUnitData(userChoices[i].unitCode))
    }
    
    
        // liked keeps track of if the unit is recommended or not and factor keeps track of if the algorithm array should be increased or decreased
    let liked = 0;
    let factor = 0;
    for(let i=0; i < userChoices.length-1; i++){

        
        if (userChoices[i].recommended){
            liked = 1;
        }
        else{
            liked = -1;
        }

        for(let j=i+1; j < userChoices.length; j++){
            if (userChoices[j].recommended){
                factor = 1 * liked;
            }
            else{
                factor = -1 * liked;
            }

            // This can do with a clever optimisation
            let exists = false
            let k = 0
            while(k < unitsArray[i].algorithmArray.length && !exists){
                if (unitsArray[i].algorithmArray[k].unitCode == userChoices[j].unitCode){
                    unitsArray[i].algorithmArray[k].score += factor
                    exists = true
                }
                k++
            }
            if (!exists){
                let x = unitsArray[i].algorithmArray
                unitsArray[i].algorithmArray.push({unitCode: userChoices[j].unitCode, score: factor})
            }

            exists = false
            k = 0
            while(k < unitsArray[j].algorithmArray.length && !exists){
                if (unitsArray[j].algorithmArray[k].unitCode == userChoices[i].unitCode){
                    unitsArray[j].algorithmArray[k].score += factor
                    exists = true
                }
                k++
            }
            if (!exists){
                unitsArray[j].algorithmArray.push({unitCode: userChoices[i].unitCode, score: factor})
            }
        }
    }

    return unitsArray
}

function getUnitData(unitCode){
    for(let i = 0; i < unitsArrayDB.length; i++){
        if(unitsArrayDB[i].unitCode == unitCode){
            return unitsArrayDB[i]
        }
    }
}

async function getUnitsFromDB() {
    const response = await fetch('/units');
    await response.json().then(data => {
        unitsArrayDB = data;
        console.log("passed")
    });
    
}
let unitsArrayDB = [];
getUnitsFromDB()
