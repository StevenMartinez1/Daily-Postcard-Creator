 // Always include at top of Javascript file
"use strict";
//
//API Implementation
//

//let uploadButton = document.getElementById("sharecard");
//uploadButton.addEventListener("click", sendGetRequest);

function showMsg(elmtId, returnedText, otherOne) {
        //let msg = document.getElementById(elmtId);
        //msg.textContent = msg.textContent.trim()+returnedText;
        //msg.className = "visible";
        
        // you can only push the button once
        let uploadButton = document.getElementById("sharecard");
        uploadButton.removeEventListener("click", sendGetRequest);
}

// sends an AJAX request asking the server 
function sendGetRequest() {
  let xhr = new XMLHttpRequest;
  // it's a GET request, it goes to URL /seneUploadToAPI
  xhr.open("GET","sendUploadToAPI");
  
  // Add an event listener for when the HTTP response is loaded
  xhr.addEventListener("load", function() {
    console.log("Waiting");
      if (xhr.status == 200) {  // success
        console.log("Good");
        showMsg("goodMessage",xhr.responseText);
      } else { // failure
          console.log("Bad");
        showMsg("badMessage",xhr.responseText);
      }
  });
  
  // Actually send request to server
  xhr.send();
}





//
//script.js
//

document.getElementById("sharecard").addEventListener("click", shareCard);

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function shareCard(){
  
  
  var xhr = new XMLHttpRequest();
  var theUrl = "/glacier-snapdragon-pancreas/sharePostCard";
  xhr.open("POST",theUrl);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
  let image = document.getElementById("serverImage").src;
  let message = document.getElementsByClassName("text")[0].innerText;
  let font = getComputedStyle(document.getElementsByClassName("text")[0]).fontFamily;
  let color = getComputedStyle(document.getElementsByClassName("card")[0]).backgroundColor;
  
  xhr.send(JSON.stringify({image: image, message: message, font: font, color: color}));
  
  xhr.onloadend = function(e){
    let r = xhr.responseText.toString();
    console.log(r);
    console.log("Response Recieved");
    
    let link = document.getElementById("link-text");
    
    link.innerText = "https://glacier-snapdragon-pancreas.glitch.me/display.html?id=" + r;
    
    link.setAttribute("href", link.innerText);
    
    
    
  }
}


// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
  
    // get the file chosen by the file dialog control
    const selectedFile = document.getElementById('fileChooser').files[0];

    //const image_box = document.getElementById('upload-image');

    var replace = document.getElementById("replace");
    var upload_image = document.getElementById("upload-image");
    var line = document.getElementById("line");

    replace.style.display = "inline";
    upload_image.style.display = "none";
    line.style.display = "inline";

    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);

    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "/upload", true);
  
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        // now that the image is on the server, we can display it!
        let newImage = document.getElementById("serverImage");
        newImage.src = "http://ecs162.org:3000/images/emartinezgonzalez/" + selectedFile.name; //"../images/"+selectedFile.name;
    }
  
  
    // actually send the request
    xhr.send(formData);
}


// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change",uploadFile);

//current postcard color and class
let currentColor = "#e6e2cf";
let currentClass = "e6e2cf";

document.getElementById("e6e2cf").addEventListener("mouseover", mouseOver);
document.getElementById("e6e2cf").addEventListener("mouseout", mouseOut);

document.getElementById("dbcaac").addEventListener("mouseover", mouseOver1);
document.getElementById("dbcaac").addEventListener("mouseout", mouseOut);

document.getElementById("c9cbb3").addEventListener("mouseover", mouseOver2);
document.getElementById("c9cbb3").addEventListener("mouseout", mouseOut);

document.getElementById("bbc9ca").addEventListener("mouseover", mouseOver3);
document.getElementById("bbc9ca").addEventListener("mouseout", mouseOut);

document.getElementById("a6a5b5").addEventListener("mouseover", mouseOver4);
document.getElementById("a6a5b5").addEventListener("mouseout", mouseOut);

document.getElementById("b5a6ab").addEventListener("mouseover", mouseOver5);
document.getElementById("b5a6ab").addEventListener("mouseout", mouseOut);

document.getElementById("eccfcf").addEventListener("mouseover", mouseOver6);
document.getElementById("eccfcf").addEventListener("mouseout", mouseOut);

document.getElementById("eceeeb").addEventListener("mouseover", mouseOver7);
document.getElementById("eceeeb").addEventListener("mouseout", mouseOut);

document.getElementById("bab9b5").addEventListener("mouseover", mouseOver8);
document.getElementById("bab9b5").addEventListener("mouseout", mouseOut);


//Change colors and border of postcard when hovering
function mouseOver() {
    if(currentColor == "#e6e2cf")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#e6e2cf";
    document.getElementById("e6e2cf").style.border = "dashed";
    document.getElementById("e6e2cf").style.borderWidth = "thin";
}
function mouseOver1() {
    if(currentColor == "#dbcaac")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#dbcaac";
    document.getElementById("dbcaac").style.border = "dashed";
    document.getElementById("dbcaac").style.borderWidth = "thin";
}
function mouseOver2() {
    if(currentColor == "#c9cbb3")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#c9cbb3";
    document.getElementById("c9cbb3").style.border = "dashed";
    document.getElementById("c9cbb3").style.borderWidth = "thin";
}
function mouseOver3() {
    if(currentColor == "#bbc9ca")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#bbc9ca";
    document.getElementById("bbc9ca").style.border = "dashed";
    document.getElementById("bbc9ca").style.borderWidth = "thin";
}
function mouseOver4() {
    if(currentColor == "#a6a5b5")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#a6a5b5";
    document.getElementById("a6a5b5").style.border = "dashed";
    document.getElementById("a6a5b5").style.borderWidth = "thin";
}
function mouseOver5() {
    if(currentColor == "#b5a6ab")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#b5a6ab";
    document.getElementById("b5a6ab").style.border = "dashed";
    document.getElementById("b5a6ab").style.borderWidth = "thin";
}
function mouseOver6() {
    if(currentColor == "#eccfcf")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#eccfcf";
    document.getElementById("eccfcf").style.border = "dashed";
    document.getElementById("eccfcf").style.borderWidth = "thin";
}
function mouseOver7() {
    if(currentColor == "#eceeeb")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#eceeeb";
    document.getElementById("eceeeb").style.border = "dashed";
    document.getElementById("eceeeb").style.borderWidth = "thin";
}
function mouseOver8() {
    if(currentColor == "#bab9b5")
        return;
    document.getElementsByClassName("card")[0].style.backgroundColor = "#bab9b5";
    document.getElementById("bab9b5").style.border = "dashed";
    document.getElementById("bab9b5").style.borderWidth = "thin";
}

function mouseOut() {
    document.getElementsByClassName("card")[0].style.backgroundColor = currentColor;
    document.getElementById("e6e2cf").style.border = "none";
    document.getElementById("dbcaac").style.border = "none";
    document.getElementById("c9cbb3").style.border = "none";
    document.getElementById("bbc9ca").style.border = "none";
    document.getElementById("a6a5b5").style.border = "none";
    document.getElementById("b5a6ab").style.border = "none";
    document.getElementById("eccfcf").style.border = "none";
    document.getElementById("eceeeb").style.border = "none";
    document.getElementById("bab9b5").style.border = "none";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}


//Change color of postcard when clicking
document.getElementById("e6e2cf").addEventListener("click", click);

document.getElementById("dbcaac").addEventListener("click", click1);

document.getElementById("c9cbb3").addEventListener("click", click2);

document.getElementById("bbc9ca").addEventListener("click", click3);

document.getElementById("a6a5b5").addEventListener("click", click4);

document.getElementById("b5a6ab").addEventListener("click", click5);

document.getElementById("eccfcf").addEventListener("click", click6);

document.getElementById("eceeeb").addEventListener("click", click7);

document.getElementById("bab9b5").addEventListener("click", click8);

function click(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#e6e2cf";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "e6e2cf";
    currentColor = "#e6e2cf";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click1(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#dbcaac";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "dbcaac";
    currentColor = "#dbcaac";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click2(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#c9cbb3";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "c9cbb3";
    currentColor = "#c9cbb3";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click3(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#bbc9ca";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "bbc9ca";
    currentColor = "#bbc9ca";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click4(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#a6a5b5";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "a6a5b5";
    currentColor = "#a6a5b5";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click5(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#b5a6ab";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "b5a6ab";
    currentColor = "#b5a6ab";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click6(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#eccfcf";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "eccfcf";
    currentColor = "#eccfcf";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click7(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#eceeeb";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "eceeeb";
    currentColor = "#eceeeb";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}
function click8(){
    document.getElementsByClassName("card")[0].style.backgroundColor = "#bab9b5";
    document.getElementById(currentClass).style.border = "none";
    currentClass = "bab9b5";
    currentColor = "#bab9b5";
    document.getElementById(currentClass).style.border = "solid";
    document.getElementById(currentClass).style.borderWidth = "thin";
}


//chanage the fonts on click
let currentFont = "Indie Flower";
let currentFontClass = "indie-font";
let currentFontClass2 = "indie-font2";

document.getElementById("indie-font").addEventListener("click", clickFlower);
document.getElementById("dancing-font").addEventListener("click", clickDancing);
document.getElementById("cang-font").addEventListener("click", clickCang);
document.getElementById("apple-font").addEventListener("click", clickApple);


function clickFlower(){
    if (currentFont == "Indie Flower")
        return;
    document.getElementsByClassName("text")[0].style.fontFamily = "Indie Flower";

    document.getElementById(currentFontClass2).style.display = "none";
    document.getElementById(currentFontClass).style.display = "block";

    currentFont = "Indie Flower";
    currentFontClass = "indie-font";
    currentFontClass2 = "indie-font2";


    document.getElementById("indie-font").style.display = "none";
    document.getElementById("indie-font2").style.display = "block";
}
function clickDancing(){
    if (currentFont == "Dancing Script")
        return;

    document.getElementsByClassName("text")[0].style.fontFamily = "Dancing Script";

    document.getElementById(currentFontClass2).style.display = "none";
    document.getElementById(currentFontClass).style.display = "block";

    currentFont = "Dancing Script";
    currentFontClass = "dancing-font";
    currentFontClass2 = "dancing-font2";

    document.getElementById("dancing-font").style.display = "none";
    document.getElementById("dancing-font2").style.display = "block";

}
function clickCang(){
    if (currentFont == "Long Cang")
        return;

    document.getElementsByClassName("text")[0].style.fontFamily = "Long Cang";

    document.getElementById(currentFontClass2).style.display = "none";
    document.getElementById(currentFontClass).style.display = "block";

    currentFont = "Long Cang";
    currentFontClass = "cang-font";
    currentFontClass2 = "cang-font2";

    document.getElementById("cang-font").style.display = "none";
    document.getElementById("cang-font2").style.display = "block";
}
function clickApple(){
    if (currentFont == "Homemade Apple")
        return;
    document.getElementsByClassName("text")[0].style.fontFamily = "Homemade Apple";

    document.getElementById(currentFontClass2).style.display = "none";
    document.getElementById(currentFontClass).style.display = "block";

    currentFont = "Homemade Apple";
    currentFontClass = "apple-font";
    currentFontClass2 = "apple-font2";

    document.getElementById("apple-font").style.display = "none";
    document.getElementById("apple-font2").style.display = "block";
}




