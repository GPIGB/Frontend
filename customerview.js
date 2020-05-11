function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    status.textContent = '';
    mapLink.href = `https://www.google.com/maps/@${latitude},${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    //enter gmap api code here, gps coordinates in variables
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}
function setPaper(){
  document.getElementById('h1').innerHTML='Paper';
}
function setPlastic(){
  document.getElementById('h1').innerHTML='Plastic';
}
function setGeneral(){
  document.getElementById('h1').innerHTML='General';
}
document.querySelector('#paper').addEventListener('click',setPaper);
document.querySelector('#general').addEventListener('click',setGeneral);
document.querySelector('#plastic').addEventListener('click',setPlastic);
document.querySelector('#find-me').addEventListener('click', geoFindMe);
