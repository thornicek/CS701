var currentPolitician;

window.addEventListener('DOMContentLoaded', (event) => {
    fetch('/partyList.json')
    .then(response => response.json())
    .then(data => {
        var senatorArray = data.senators;
        senatorArray.forEach(element => {
        window.localStorage.setItem(element.name, JSON.stringify(element));            
        });

    });
    Object.keys(localStorage).forEach(function(key){
        console.log(localStorage.getItem(key));
        var senatorList = document.getElementById("politiciansList");
        var listItem = document.createElement("li");
        listItem.setAttribute("draggable","true");
        var senatorObject = JSON.parse(localStorage.getItem(key));
        
       
        
        listItem.innerHTML = senatorObject.name;
        // console.log(listItem);
        // console.log(senatorList);
        senatorList.append(listItem);

        if(senatorObject.voted) {
            var republicansList = document.getElementById("republicans");
            var democratsList = document.getElementById("democrats");
            var listItemCopy = document.createElement("li");
            listItemCopy.setAttribute("draggable","true");
            listItemCopy.innerHTML = senatorObject.name;
            if(senatorObject.party == "R"){
                console.log("inside republican if");
                republicansList.append(listItemCopy);
            } else if(senatorObject.party == "D"){
                console.log("inside democrat if");
                democratsList.append(listItemCopy);
            }
        }
     });
     loadDemo();

});


function loadDemo() {
    var republicansList = document.getElementById("republicans");
    var democratsList = document.getElementById("democrats");

    // our target lists get handlers for drag enter, leave, and drop
    var lists = [republicansList, democratsList];
    [].forEach.call(lists, function(list) {
        list.addEventListener("dragenter", handleDragEnter, false);
        list.addEventListener("drop", handleDrop, false);
    });

    // each target list gets a particular dragover handler
    republicansList.addEventListener("dragover", handleDragOverRepublicans, false);
    democratsList.addEventListener("dragover", handleDragOverDemocrats, false);

  

    // each draggable member gets a handler for drag start and end
    var politicians = document.querySelectorAll("#politiciansList li");
    [].forEach.call(politicians, function(politician) {
        politician.addEventListener("dragstart", handleDragStart, false);
        politician.addEventListener("dragend", handleDragEnd, false);
    });

    var republicanFieldset = document.getElementById("republicanField");
    republicanFieldset.addEventListener("dragover", handleDragOverOuterRepublican, false);

    var democratFieldset = document.getElementById("democratField");
    democratFieldset.addEventListener("dragover", handleDragOverOuterDemocrat, false);

}
// called at the beginning of any drag
function handleDragStart(evt) {
    // evt.stopPropagation();
   
    
    var republicansList = document.getElementById("republicans");
    var democratsList = document.getElementById("democrats");
    // our drag only allows copy operations
    evt.effectAllowed = "copy";

    evt.dataTransfer.setData("text/plain", evt.target.textContent);
    console.log(`evt.target.textContent = ${evt.target.textContent}`);
    currentPolitician = evt.target.textContent;
    
    var politicianName = evt.srcElement.innerHTML;

    var politicianJSON = window.localStorage.getItem(politicianName);
    // console.log(politicianName);
    // console.log(typeof politicianName);
    // console.log(politicianJSON);
    politicianJSON = JSON.parse(politicianJSON);
    // console.log(politicianJSON);
    //console.log(window.localStorage.getItem("Tom Cotton"));
    // highlight the potential drop targets
    if (politicianJSON.party == "R"){
        republicansList.className = "validtarget";
    }
    else if(politicianJSON.party == "D"){
    democratsList.className = "validtarget";
    }
}

// stop propagation and prevent default drag behavior
// to show that our target lists are valid drop targets
function handleDragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}



function handleDrop(){

}

function handleDragOverRepublicans(evt){
    console.log("handleDragOverRepublicans");

    var republicansList = document.getElementById("republicans");
   

    evt.dataTransfer.dropEffect = "copy";
    evt.stopPropagation();
    evt.preventDefault();
    var politicianJSON = localStorage.getItem(currentPolitician);
    politicianJSON = JSON.parse(politicianJSON);
    // console.log(politicianJSON);
    if (politicianJSON == null) return;
    // console.log(politicianJSON.party);
    if (politicianJSON.party != null && politicianJSON.party == "R"){
        republicansList.className = "highlighted";
    }
    
}

function handleDragOverDemocrats(evt){
    console.log("handleDragOverDemocrats");
   
    var democratsList = document.getElementById("democrats");

    evt.dataTransfer.dropEffect = "copy";
    evt.stopPropagation();
    evt.preventDefault();

    var politicianJSON = localStorage.getItem(currentPolitician);
    politicianJSON = JSON.parse(politicianJSON);
    if (politicianJSON == null) return;
    if (politicianJSON.party != null && politicianJSON.party == "D"){
        democratsList.className = "highlighted";
    }
}

// when the user drops on a target list, transfer the data
function handleDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var dropTarget = evt.target;
    console.log(dropTarget);
    // use the text flavor to get the name of the dragged item
    var text  = evt.dataTransfer.getData("text/plain");
    console.log(text);
    var politician = localStorage.getItem(text);
    politician = JSON.parse(politician);
    console.log(politician);
    if(politician.party == "R" && dropTarget.id == "republicans" && !politician.voted){
        var childElement = document.createElement("li");
        childElement.innerHTML = politician.name;
        var republicansList = document.getElementById("republicans");
        republicansList.append(childElement);
        politician.voted = true;
        localStorage.setItem(text,JSON.stringify(politician));
    }else if (politician.party == "D" && dropTarget.id == "democrats" && !politician.voted ){
        var childElement = document.createElement("li");
        childElement.innerHTML = politician.name;
        var democratsList = document.getElementById("democrats");
        democratsList.append(childElement);
        politician.voted = true;
        localStorage.setItem(text,JSON.stringify(politician));
    }

}

function handleDragEnd(evt){
    var republicansList = document.getElementById("republicans");
    var democratsList = document.getElementById("democrats");

    republicansList.className = null;
    democratsList.className = null;
}


function handleDragOverOuterRepublican(evt) {
    var politicianJSON = localStorage.getItem(currentPolitician);
    politicianJSON = JSON.parse(politicianJSON);

    if (politicianJSON.party == "R") {
        var republicansList = document.getElementById("republicans");
        republicansList.className = "validtarget";
    }
}

function handleDragOverOuterDemocrat(evt) {
    var politicianJSON = localStorage.getItem(currentPolitician);
    politicianJSON = JSON.parse(politicianJSON);

    if (politicianJSON.party == "D") {
        var democratList = document.getElementById("democrats");
        democratList.className = "validtarget";
    }
}