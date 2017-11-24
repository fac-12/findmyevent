/* eslint-disable */
var mapDiv = document.getElementById('map');
var form = document.getElementById('form');
var postcodeInput = document.getElementById('postcode');
var categoryInput = document.getElementById('cat-list');
var postcodeError = document.getElementById('postcode-error');
var categoryError = document.getElementById('cat-error');
var button = document.getElementById('submit');
var eventData = [];

/* INTITIALISE PAGE */
window.onload = function() {
    button.disabled = true;
}


/* NEED TO WRITE THIS */
function displayAPIError(error) {
    console.log(error)
}

function displayPostcodeError(error) {
    //postcodeError.innerText = error
    //postcodeError.className = "error";
}

function displayCatError(error) {
    //categoryError.innerText = error;
    //categoryError.className = "error";
}

/* GENERAL HELPER FUNCTIONS */
function noSpacesPostcode(postcode) {
    return postcode.replace(/ /g, '')
}

function checkValues(obj, value) {
    var bool = false;
    obj.category.forEach(function(item) {
        if (value === item.name) {
            bool = true;
        }
    })
    return bool;
}

function mapCategoryNametoID(obj, name) {
    var result = "";
    obj.category.forEach(function(item) {
        if (name === item.name) {
            result += item.id;
        }
    })
    return result
}

function dataInfo(data) {
    var results = [];
    data.forEach(function(item) {
        results.push(['<div class="info_content"><h3>' + item[0] + '</h3></div>'])
    })
    return results;
}

/* ONLY ALLOW SUBMIT ON VALID FORM */
function postcodeValid(postcode) {
    var regex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})/
    var postcode = noSpacesPostcode(postcodeInput.value);
    if (regex.test(postcode)) {
        //categoryError.innerText = ""
        //categoryError.className = "hidden";
        return true
    } else {
        throw new Error('Please enter a valid postcode')
    }
}

function categoryValid() {
    var catValue = categoryInput.value.replace("&", "&amp;")
    if (checkValues(fullCategoryList, catValue)) {
        //postcodeError.innerText = ""
        //postcodeError.className = "hidden";
        return true
    } else {
        throw new Error('Please enter a valid category')
    }
}

postcodeInput.addEventListener("input", function() {
    try {
        postcodeValid()
    } catch (err) {
        displayPostcodeError(err)
    }
})

categoryInput.addEventListener("input", function() {
    try {
        categoryValid()
    } catch (err) {
        displayCatError(err)
    }
})

form.addEventListener('input', function() {
    try {
        if (categoryValid() && postcodeValid()) {
            button.disabled = false;
        }
    } catch (err) {
        console.log(err);
    }
})


/* ONCE SUBMIT ENABLED, CHECK POSTCODE AGAINST API AND MAKE REQUEST TO BACKEND */

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var postcode = noSpacesPostcode(postcodeInput.value)
    var url = "http://api.postcodes.io/postcodes/" + postcode + "/validate"
    XHRrequest(url, postcodeResponse);
})


function postcodeResponse(err, data) {
    if (err) {
        displayAPIError(err)
    } else {
        if (data.result === false) {
            displayPostcodeError("Sorry, that postcode doesn't exist.")
        } else if (data.result === true) {
            var postcode = noSpacesPostcode(postcodeInput.value)
            var catValue = categoryInput.value.replace("&", "&amp;");
            var category = mapCategoryNametoID(fullCategoryList, catValue);
            var url = "/results?postcode=" + postcode + "&category=" + category;
            button.disabled = true;

            XHRrequest(url, updateMap)
        }
    }
}

/* MAP RELATED CODE */
function updateMap(error, data) {
    if (error) {
        displayAPIError(error);
    } else {
        eventData = data;
        console.log(eventData)
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAN-niE68mI4o5hcMnb_-jWgI-pjeP-jWY&callback=newMap";
        document.body.appendChild(script);
    }
}

function newMap() {
    var bounds = new google.maps.LatLngBounds();
    var options = {
        zoom: 13
    };
    var map = new google.maps.Map(mapDiv, options);

    //Gives Event title to Google Map
    var infoWindowContent = dataInfo(eventData);

    //Display the markers on the map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;

    //Gives Event markers to Google Map
    for (var i = 0; i < eventData.length; i++) {
        var position = new google.maps.LatLng(eventData[i][1], eventData[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: eventData[i][0]
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
    }
    //Centre the map within the screen
    map.fitBounds(bounds);
}


/* XHR REQUEST */

function XHRrequest(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(null, JSON.parse(xhr.responseText));
            } else {
                var errorMessage = JSON.parse(xhr.responseText);
                cb("Error " + url + " " + errorMessage);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}