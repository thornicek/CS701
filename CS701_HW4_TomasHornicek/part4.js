const DB_NAME = 'Fruit Prices';
const DB_VERSION = 1;
const DB_STORE_NAME = 'fruit';

var db;

window.onload = init;

function init(){
    createDb();
    var buttonAdd = document.getElementById("addButton");
    buttonAdd.onclick = insertIntoDb;

}

function createDb() {
    console.log("createDb ...");
   
    var request = window.indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onsuccess = function (evt) {
      db = request.result;
      console.log("createDb DONE");
      logMessage("createDb DONE");
    };
    
    request.onerror = function (evt) {
      console.error("createDb ERROR:", evt.target.errorCode);
      logMessage("createDb ERROR: " + evt.target.errorCode);
    };
    request.onupgradeneeded = function (evt) {
    console.log("createDb.onupgradeneeded ...");
    console.log(DB_STORE_NAME);
    var store = db.createObjectStore(
      DB_STORE_NAME, { keyPath: 'fruit'});
      console.log(`store is ${store}`);
    store.createIndex('fruitIndex',       
                      'fruit',       { unique: true });
    store.createIndex('priceIndex',     
                      'price',     { unique: false });
   };
}

  function insertIntoDb() {
    
    var result = document.getElementById("result");
    // result.innerHTML = "";

    if (!db)
      return;
  console.log(db);
    var transaction = db.transaction(DB_STORE_NAME, "readwrite");
    console.log("Hello");
    var store = transaction.objectStore(DB_STORE_NAME);                    
    
    var fruit = document.getElementById("key").value;
    var price = document.getElementById("value").value;

   
      
      var request = store.add({
        "fruit": fruit,
        "price": price
  
      });

      request.onsuccess = function(e) {
        console.log("Added", fruit);
        result.innerHTML = result.innerHTML + "<br/>" + 
                            "Added " + fruit; 
      };
      
      request.onerror = function(e) {
        console.log("Error", e.target.error.message);
        result.innerHTML = result.innerHTML + "<br/>" +
          "Error " +  e.target.error.message
      };
    
    
  }

  function displayDb() {
    var result = document.getElementById("result");
    result.innerHTML = "";
    
    if (db) {
      try {
        var store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        
        var request = store.openCursor();
        
        request.onsuccess = function(evt) {  
          var cursor = evt.target.result;  
          if (cursor) {
            var course = cursor.value;
            var jsonStr = JSON.stringify(course);
            result.innerHTML = result.innerHTML + "<br/>" + jsonStr;         
            cursor.continue();  
          }  
        };

        request.onerror = function (evt) {
          console.error("displayDB ERROR:", evt.target.errorCode);
        };

      } catch (e) {
        console.log(e);
        logMessage(e);
      }
    }

  }
  function logMessage(msg) {
    var result = document.getElementById("result");
    result.innerHTML = '<b>' + msg + '<b>';
 }
