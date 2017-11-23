/* eslint-disable */
var mapDiv = document.getElementById('map');
var form = document.getElementById('form');
var postcodeInput = document.getElementById('postcode');
var categoryInput = document.getElementById('cat-list');
var errorDiv = document.getElementById('error');
var button = document.getElementById('submit');

/* INTITIALISE PAGE */
window.onload = function() {
    initMap(51.515419, -0.141099, 13);
    button.disabled = true;
}

/* NEED TO WRITE THIS */
function displayError(error) {
    console.log(error)
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

/* ONLY ALLOW SUBMIT ON VALID FORM */
function postcodeValid(postcode) {
    var regex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})/
    var postcode = noSpacesPostcode(postcodeInput.value);
    if (regex.test(postcode)) {
        return true
    } else {
        throw new Error('Please enter a valid postcode')
    }
}

function categoryValid() {
    var catValue = categoryInput.value.replace("&", "&amp;")
    if (checkValues(fullCategoryList, catValue)) {
        return true
    } else {
        throw new Error('Please enter a valid category')
    }
}

postcodeInput.addEventListener("input", function() {
    try {
        postcodeValid()
    } catch (err) {
        displayError(err)
    }
})

categoryInput.addEventListener("input", function() {
    try {
        categoryValid()
    } catch (err) {
        displayError(err)
    }
})

form.addEventListener('input', function() {
    try {
        if (categoryValid() && postcodeValid()) {
            button.disabled = false;
        }
    } catch (err) {
        displayError(err)
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
        displayError(err)
    } else {
        if (data.result === false) {
            displayError("Sorry, that postcode doesn't exist.")
        } else if (data.result === true) {
            var postcode = noSpacesPostcode(postcodeInput.value)
            var catValue = categoryInput.value.replace("&", "&amp;");
            var category = mapCategoryNametoID(fullCategoryList, catValue);
            var url = "/results?postcode=" + postcode + "&category=" + category;
            XHRrequest(url, updateMap)
        }
    }
}

/* MAP RELATED CODE */

function initMap(lat, lng, zoom) {
    var options = { center: { lat: lat, lng: lng }, zoom: zoom };
    var map = new google.maps.Map(mapDiv, options);
}
// function updateMap(lat, lon, responseArr) {
//     initMap(lat, lng);
//     renderMarkers(responseArr);
// }

// function renderMarkers(responseArr) {
//     // add markers to map
// }


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