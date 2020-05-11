var map, infoWindow;

var customLabel = {
  'recycling': {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  },
  'general waste': {
    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
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
  downloadUrl('markers_test.xml', function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function(markerElem) {
      var id = markerElem.getAttribute('id');
      var address = markerElem.getAttribute('address');
      var type = markerElem.getAttribute('type');
      var point = new google.maps.LatLng(
          parseFloat(markerElem.getAttribute('lat')),
          parseFloat(markerElem.getAttribute('lng')));
      var url = markerElem.getAttribute('url');

      var contentString = '<div id="content"><b>' + type
            + '</b><div id="bodyContent">'+ address
            + '<p><a href=' + url
            + '>View on Google Maps</a></p></div></div>';

      var icon = customLabel[type] || {};
      var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.url,
      });
      marker.addListener('click', function() {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(19);

      });
    });
  });
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