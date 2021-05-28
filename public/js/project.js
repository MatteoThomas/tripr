var fileTag = document.getElementById("filetag");
var preview = document.getElementById("preview");
var fileLoad = document.getElementById("fileLoad");
var photos = document.getElementById("photos");

//cloudinary image storage

// end cloudinary

// banner
fileTag.addEventListener("click", function () {
    bannerShow();
});

function bannerShow() {
    var b = document.getElementById("preview");
    b.style.display = "block";
    var btn = document.getElementById("bannerBtn");
    btn.style.display = "none";

}


fileTag.addEventListener("change", function () {
    changeImage(this);
});

function changeImage(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }

}

// end banner

// gallery
window.onload = function () {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");
        filesInput.addEventListener("change", function (event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image'))
                    continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    var div = document.createElement("div");
                    div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                        "title='" + picFile.name + "'/>";
                    output.insertBefore(div, null);
                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        });
    } else {
        console.log("Your browser does not support File API");
    }
}

// end gallery

// map
let map;
/*
initMap();

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 39,
            lng: -105.5
        },
        zoom: 7,
        mapId: '82dee93d7d2d0b7d',
        mapTypeControl: true,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        }

    });
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
    });
}
*/
initMap();

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 39,
            lng: -105.5
        },
        zoom: 7,
        mapId: '82dee93d7d2d0b7d',

    });

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}


// end map