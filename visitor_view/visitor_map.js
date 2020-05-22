var map, infoWindow;
markers_array = [];

var map_center = {
  lat: 53.959933,
  lng: -1.087246
};
function setPaper(){
  document.getElementById('h1').innerHTML='Paper';
}
function setPlastic(){
  document.getElementById('h1').innerHTML='Plastic';
}
function setGeneral(){
  document.getElementById('h1').innerHTML='General';
}

var customLabel = {
  'plastic': {
    url: "/icons/blue-dot.png",
  },
  'paper': {
    url: "/icons/green-dot.png",
  },
  'general waste': {
    url: "/icons/orange-dot.png"
  }
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.959933, lng: -1.087246},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Change this depending on the name of your PHP or XML file
  downloadUrl('/markers.xml', function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function(markerElem) {
      var id = markerElem.getAttribute('id');
      var address = markerElem.getAttribute('address');
      var type = markerElem.getAttribute('type');
      var fill = markerElem.getAttribute('fill');
      var point = new google.maps.LatLng(
          parseFloat(markerElem.getAttribute('lat')),
          parseFloat(markerElem.getAttribute('lng')));
      var url = "https://www.google.com/maps/search/?api=1&query=" + parseFloat(markerElem.getAttribute('lat')) + "," + parseFloat(markerElem.getAttribute('lng'))

      var contentString = '<div id="content"><b>' + type
            + '</b><div id="bodyContent">'+ address
            + '<p>Fill level: ' + fill + '%</p>'
            + '<p><a href=' + url
            + '>View on Google Maps</a></p></div></div>';

      var icon = customLabel[type] || {};
      var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.url,
      });
      markers_array.push(marker);

      marker.addListener('click', function() {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(19);
      });
    });
  });
  processType();
}

function paper_markers() {
  setPaper();
  for (var i = 0; i < markers_array.length; i++) {
    if (markers_array[i].icon == "/icons/green-dot.png") {
      markers_array[i].setMap(map);
    } else {
      markers_array[i].setMap(null);
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
}

function plastic_markers() {
  setPlastic();
  for (var i = 0; i < markers_array.length; i++) {
    if (markers_array[i].icon == "/icons/blue-dot.png") {
      markers_array[i].setMap(map);
    } else {
      markers_array[i].setMap(null);
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
}

function general_markers() {
  setGeneral();
  for (var i = 0; i < markers_array.length; i++) {
    if (markers_array[i].icon == "/icons/orange-dot.png") {
      markers_array[i].setMap(map);
    } else {
      markers_array[i].setMap(null);
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
}

function processType()
{
  var parameters = location.search.substring(1).split("&");

  var temp = parameters[0].split("=");
  wtype = unescape(temp[1]);
  if (wtype=="paper"){
    setPaper();
    paper_markers();
  }
  else if (wtype=="plastic") {
    setPlastic();
    plastic_markers();
  }
  else {
    setGeneral();
    general_markers();
  }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
              'Error: The Geolocation service failed.' :
              'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}
