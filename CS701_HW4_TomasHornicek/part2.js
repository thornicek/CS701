window.onload = init;
var myWorker0 = new Worker("computeWorker.js");
var myWorker1 = new Worker("computeWorker.js");
var myWorker2 = new Worker("computeWorker.js");
var myWorker3 = new Worker("computeWorker.js");
var myWorker4 = new Worker("computeWorker.js");
function init(){
    var sendButton = document.getElementById("sendButton");
    sendButton.onclick = sendNumToWorker;
    var resultsArray = [];
    localStorage.setItem("results",resultsArray);
    myWorker0.onmessage = handleReceipt;
    myWorker1.onmessage = handleReceipt;
    myWorker2.onmessage = handleReceipt;
    myWorker3.onmessage = handleReceipt;
    myWorker4.onmessage = handleReceipt;
    sendNumToWorker(1,1000,myWorker0);
    sendNumToWorker(1001,2000,myWorker1);
    sendNumToWorker(2001,3000,myWorker2);
    sendNumToWorker(3001,4000,myWorker3);
    sendNumToWorker(4001,5000,myWorker4);
}


// Handle messages received from the Web Worker
function handleReceipt(event) {
    var itemsList = document.getElementById("itemsList");
    var item = document.createElement("li");
    item.innerHTML = event.data.result;
    itemsList.appendChild(item);
    var resultsString = localStorage.getItem("results");
    var resultsArray = resultsString.split(",");
    console.log(`resultsArray is ${resultsArray}`);
    // console.log(typeof resultsArray);
    resultsArray.push(event.data.result);
    localStorage.setItem("results",resultsArray);
}
// send messages to the Web Worker
function sendNumToWorker(num1,num2,worker) {
	// var num1 = document.getElementById("num1").value;
    // var num2 = document.getElementById("num2").value;
    worker.postMessage({'start': num1, 'end':num2});
}