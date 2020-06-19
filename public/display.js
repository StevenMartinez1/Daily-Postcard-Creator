// Always include at top of Javascript file
"use strict";

window.onload = function(){
  
  let r = window.location.search; //"jegq86xlk8ebeu44cmkmb";
  
  console.log(window.location.search);
  
  let theUrl = "/showPostcard" + r;
  let xhr = new XMLHttpRequest;
  console.log("pre Success");
  xhr.open("GET",theUrl);
  // Next, add an event listener for when the HTTP response is loaded
  xhr.addEventListener("load", function() {
      if (xhr.status == 200) {  // success? 
        let responseStr = xhr.responseText;  // get the JSON string 
        let JSONdata = JSON.parse(responseStr);  // turn it into an object
        console.log(JSONdata);
        console.log(JSONdata.color);
        
        document.getElementById("serverImage").src = JSONdata.image;
        document.getElementsByClassName("text")[0].innerText = JSONdata.message;
        document.getElementsByClassName("text")[0].style.fontFamily = JSONdata.font;
        document.getElementsByClassName("card")[0].style.backgroundColor = JSONdata.color;
        
      } else { // failure? 
        console.log(xhr.responseText);
      }
  });
  // Actually send request to server
  xhr.send();
}