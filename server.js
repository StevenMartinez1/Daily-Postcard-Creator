// server.js
// where your node app starts

// init project
const express = require('express');


//Added for DB
const bodyParser = require("body-parser");
const sql = require("sqlite3").verbose();



const app = express();
app.use(express.json());

const url = require('url');
const querystring = require('querystring');


//fs read/write
const fs = require("fs");
const FormData = require("form-data");

//
//DATABASE
//
const db = new sql.Database("postcards.db");

// Actual table creation; only runs if "shoppingList.db" is not found or empty
// Does the database table exist?
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='PostcardTable' ";
db.get(cmd, function (err, val) {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file - creating one");
        createPostcardDB();
    } else {
        console.log("Database file found");
    }
});

function createPostcardDB() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE PostcardTable ( id TEXT PRIMARY KEY UNIQUE, image TEXT, message TEXT, font TEXT, color TEXT)';
  db.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}






// not needed now, but may be useful? 
const assets = require('./assets');

// Multer is a module to read and handle FormData objects, on the server side
const multer = require('multer');

// Make a "storage" object that explains to multer where to store the images...in /images
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')    
  },
  // keep the file's original name
  // the default behavior is to make up a random string
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Use that storage object we just made to make a multer object that knows how to 
// parse FormData objects and store the files they contain
let uploadMulter = multer({storage: storage});

// First, server any static file requests
app.use(express.static('public'));

// Next, serve any images out of the /images directory
app.use("/images",express.static('images'));

// Next, serve images out of /assets (we don't need this, but we might in the future)
app.use("/assets", assets);

// Next, if no path is given, assume we will look at the postcard creation page
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Next, handle post request to upload an image
// by calling the "single" method of the object uploadMulter that we made above
app.post('/upload', uploadMulter.single('newImage'), function (request, response) {
  // file is automatically stored in /images
  // WARNING!  Even though Glitch is storing the file, it won't show up 
  // when you look at the /images directory when browsing your project
  // until later (or unless you open the console (Tools->Terminal) and type "refresh").  
  // So sorry. 
  sendMediaStore("/images/"+request.file.originalname,request,response);
  console.log("Recieved",request.file.originalname,request.file.size,"bytes")
  // the file object "request.file" is truthy if the file exists
  if(request.file) {
    // Always send HTTP response back to the browser.  In this case it's just a quick note. 
    //response.end("Server recieved "+request.file.originalname);
          //Remove Image
      const fs = require('fs')

      const path = "/app/images/"+request.file.originalname;
      //console.log("Deleting",+request.file.originalname);
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
        return
        }
      });
      
  }
  else throw 'error';
});


app.post("/glacier-snapdragon-pancreas/sharePostCard", function(req, res){
  let postCardJSON = JSON.stringify(req.body);
  //console.log(req.body);

  var fs = require('fs');
  
  fs.writeFile('postcardData.json', postCardJSON, function (err) {
    if (err) throw err;
    //console.log('Works!');
  });
  
  let r = randString();
  let image = req.body.image;
  let message = req.body.message; 
  let font = req.body.font;
  let color = req.body.color;
  
  cmd = "INSERT INTO PostcardTable ( id, image, message, font, color) VALUES(?,?,?,?,?) ";
  
  db.run(cmd, r, image, message, font, color, function(err){
    if(err)
    {
      console.log("DB insert error",err.message);
    }
    else
    {
      let newId = r; // the rowid of last inserted item
      res.send(newId);
    }
    
    
  });
  
  //res.end("END");
  
});


function GetJSON(request, response, next) {
  
  var fs = require('fs');
  
  
  let r = request.query.id;
  /*console.log("Before");
  console.log(r);
  console.log("Yes");*/
  
  
  
  
  cmd = "SELECT * FROM PostcardTable WHERE id = ?";
  
  db.get(cmd, r, function(err, val){
    /*console.log("Data: " + val.id);
    console.log("Data: " + val.font);
    console.log("Data: " + val.message);
    console.log("Data: " + val.image);
    console.log("Data: " + val.color);*/
    response.send(val);
  });
  
  /*
  fs.readFile('postcardData.json', function (err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type" : "application/json"});
    response.write(data);
    response.end();
  });*/
    
}

// send the current shopping list to the webpage for GET request with URL /shoppingList
//app.get("/showPostcard?id=jegq86xlk8ebeu44cmkmb", GetJSON);
app.get("/showPostcard", GetJSON);
    //  "/showPostcard?id=jegq86xlk8ebeu44cmkmb"         



// listen for HTTP requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function randString(){
  let r = Math.random().toString(36).substr(2,) + Math.random().toString(36).substr(2,);
  //console.log("random", r);
  //console.log(r.length)
  return r;
}

//
//API Implementation
//

//fs read/write
//const fs = require("fs");
//const FormData = require("form-data");


// Send a fixed file for now
const filename = '/images/tunnel.jpg';

// fire off the file upload if we get this "GET"
app.get("/sendUploadToAPI", function(request, response){
        console.log("Hello");
        //sendMediaStore(filename, request, response);
        });

// function called when the button is pushed
// handles the upload to the media storage API
function sendMediaStore(filename, serverRequest, serverResponse) {
  console.log("In MediaStore");
  let apiKey = process.env.ECS162KEY;
  if (apiKey === undefined) {
    serverResponse.status(400);
    serverResponse.send("No API key provided");
  } else {
    // we'll send the image from the server in a FormData object
    let form = new FormData();
    
    // we can stick other stuff in there too, like the apiKey
    form.append("apiKey", apiKey);
    // stick the image into the formdata object
    form.append("storeImage", fs.createReadStream(__dirname + filename));
    // and send it off to this URL
    form.submit("http://ecs162.org:3000/fileUploadToAPI", function(err, APIres) {
      // did we get a response from the API server at all?
      if (APIres) {
        // OK we did
        console.log("API response status", APIres.statusCode);
        // the body arrives in chunks - how gruesome!
        // this is the kind stream handling that the body-parser 
        // module handles for us in Express.  
        let body = "";
        APIres.on("data", chunk => {
          body += chunk;
        });
        APIres.on("end", () => {
          // now we have the whole body
          if (APIres.statusCode != 200) {
            serverResponse.status(400); // bad request
            serverResponse.send(" Media server says: " + body);
          } else {
            serverResponse.status(200);
            serverResponse.send(body);
          }
        });
      } else { // didn't get APIres at all
        serverResponse.status(500); // internal server error
        serverResponse.send("Media server seems to be down.");
      }
    });
  }
}

// custom 404 message for when no other response worked
app.all("*", function (request, response) { 
  response.status(404);  // the code for "not found"
  response.send("This is not the droid you are looking for"); });

app.listen(8080);
