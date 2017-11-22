/* eslint-disable */

function validatePostcode() {

}

function requestData() {
    // error - XHR to BE: div with error message
}

function mapInit() {

}

function renderMarkers() {

}

function XHRrequest(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cb(null, xhr.responseText);
        } else {
          var errorMessage = xhr.responseText;
          cb("Error " + url + " " + errorMessage);
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }