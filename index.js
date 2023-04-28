import {darkModeStyle} from '/constants.js'
// import {imagesLocation1} from '/constants.js'
// import {imagesLocation2} from '/constants.js'
// import {imagesLocation3} from '/constants.js'



// Initialize
let map;
let openInfoWindow = null;

async function initMap() {
  // Coordinates of start position (0, 0) to center the world map at the world "center"
  const startPosition = { lat: 0, lng: 0 };
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at (0, 0)
  map = new Map(document.getElementById("map"), {
    zoom: 2.85,
    center: startPosition,
    styles: darkModeStyle,
    disableDefaultUI: true,
    minZoom: 2.5
  });

  //
  // Marker #1 - Copper Mountain, Colorado - 39.4790° N, -106.1613° W
  //
  createMap(imagesLocation1, { lat: 39.479, lng: -106.1613 })

  //
  // Marker #2 - Moab, Utah - 38.5733155, -109.5498395
  //
  createMap(imagesLocation2, { lat: 38.57, lng: -109.549 })  

  //
  // Marker #3 - Los Angeles, California
  //
  createMap(imagesLocation3, { lat: 34.0522342, lng: -118.2436849 })  

  
}

//
// Create a function that will be called for each marker.
// This method takes in two parameters, the list of images for that market and the coordinates of that marker.
//
function createMap(imageList, coordinates) {
  // Create the slideshow
  const slideshowContainer = $('<div class="map-info-window">');
  const slideshowImage = $('<img>');
  let currentIndex = 0;

  // Create "next" and "previous" buttons for the slideshow
  const nextButton = $('<button class="next-button"></button>');
  const prevButton = $('<button class="prev-button"></button>');
  nextButton.click(() => {
    currentIndex = (currentIndex + 1) % imageList.length;
    slideshowImage.attr('src', imageList[currentIndex]);
  });
  prevButton.click(() => {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    slideshowImage.attr('src', imageList[currentIndex]);
  });

  // Add the buttons and first image to the slideshow container
  slideshowContainer.append(prevButton, nextButton, slideshowImage);

  const infowindow = new google.maps.InfoWindow();

  // Create a new marker at the first location position.
  var marker = new google.maps.Marker({
    position: coordinates,
    map,
    title: "Start coordinate",
  });

  // Add click listener to the marker to open the info window with the slideshow
  marker.addListener("click", () => {
    // If an info window is already open, close it
    if (openInfoWindow !== null) {
      openInfoWindow.close();
    }

    // Set the initial image
    slideshowImage.attr('src', imageList[currentIndex]);

    // Open the info window with the slideshow
    infowindow.setContent(slideshowContainer[0]);
    infowindow.open({
      anchor: marker,
      map,
    });

    // Set the current open info window
    openInfoWindow = infowindow;
  });
}

initMap();