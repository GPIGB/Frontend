
var map, infoWindow,heatmap;
var markers_array = [];
var heatmap_array = [];
var paper_heatmap_array = [];
var plastic_heatmap_array = [];
var generalwaste_heatmap_array = [];
var heatmap_enabled = false;
var edit_map = false;
var editing = false;
var map_center = {
  lat: 53.959933,
  lng: -1.087246
};

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
      //var url = markerElem.getAttribute('url');
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
        type: type,
      });
      markers_array.push(marker);
      heatmap_array.push({location: point, weight: fill/100});
      if (type == 'plastic') {
        plastic_heatmap_array.push({location: point, weight: fill/100});
      } else if (type == 'paper') {
        paper_heatmap_array.push({location: point, weight: fill/100});
      } else {
        generalwaste_heatmap_array.push({location: point, weight: fill/100});
      }

      marker.addListener('click', function() {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(19);
      });
    });
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmap_array,
    map: null,
    radius: 20
  });

  map.addListener('click', function(e) {
    if (edit_map == true && editing == false) {
      var marker = new google.maps.Marker({
        map: map,
        position: e.latLng,
      });
      markers_array.push(marker);
      map.setCenter(e.latLng);
      map.setZoom(19);
      openForm();
    }
    //heatmap_array.push({location: e.LatLng, weight: fill/100});
  });
}

function paper_markers() {
  if (heatmap_enabled == true) {
    heatmap.setData(paper_heatmap_array);
  } else {
    for (var i = 0; i < markers_array.length; i++) {
      if (markers_array[i].type == "paper") {
        markers_array[i].setMap(map);
      } else {
        markers_array[i].setMap(null);
      }
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
}

function plastic_markers() {
  if (heatmap_enabled == true) {
    heatmap.setData(plastic_heatmap_array);
  } else {
    for (var i = 0; i < markers_array.length; i++) {
      if (markers_array[i].type == "plastic") {
        markers_array[i].setMap(map);
      } else {
        markers_array[i].setMap(null);
      }
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
}

function general_markers() {
  if (heatmap_enabled == true) {
    heatmap.setData(generalwaste_heatmap_array);
  } else {
    for (var i = 0; i < markers_array.length; i++) {
      if (markers_array[i].type == "general waste") {
        markers_array[i].setMap(map);
      } else {
        markers_array[i].setMap(null);
      }
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
}

function toggleHeatmap() {
  for (var i = 0; i < markers_array.length; i++) {
    if (heatmap_enabled == true) {
      markers_array[i].setMap(map);
    } else {
      markers_array[i].setMap(null);
    }
  }
  map.setCenter(map_center);
  map.setZoom(15);
  heatmap.setData(heatmap_array);
  heatmap.setMap(heatmap_enabled ? null : map);

  if (heatmap_enabled == false) {
    document.getElementById('toggle-heatmap').style.background = "#ddd";
    heatmap_enabled = true;
  } else {
    document.getElementById('toggle-heatmap').style.background = "#fff";
    heatmap_enabled = false;
  }
}

function toggleEdit() {
  if (edit_map == false) {
    document.getElementById('toggle-edit').style.background = "#ddd";
    edit_map = true;
  } else {
    document.getElementById('toggle-edit').style.background = "#fff";
    edit_map = false;
  }
}

function openForm() {
  document.getElementById("editMarkerForm").style.display = "block";
  editing = true;
}

function closeForm() {
  document.getElementById("editMarkerForm").style.display = "none";
  editing = false;
  // var type = "<?php echo $type; ?>";
  // var description = "<?php echo $description; ?>";
  // console.log(type);
  // console.log(description);
  map.setCenter(map_center);
  map.setZoom(15);
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
document.querySelector('#binmap').addEventListener('click',initMap);
