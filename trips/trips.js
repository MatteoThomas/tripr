var fileTag = document.getElementById("filetag");
var preview = document.getElementById("preview");

var fileLoad = document.getElementById("fileLoad");
var photos = document.getElementById("photos");


// banner

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

let map;

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
}