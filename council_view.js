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

function showTimeline(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="block";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#about-text').style.display="none";
}
function goHome(){
  document.querySelector('#homescreen').style.display="inline-block";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#about-text').style.display="none";
}
function showQRcodes(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#qr-codes').style.display="inline-block";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#about-text').style.display="none";
}
function contactUs(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#contact-text').style.display="inline-block";
  document.querySelector('#about-text').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
}
function aboutUs(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#about-text').style.display="inline-block";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#location-maps').style.display="none";
}
function showCertificate(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#certificate-form').style.display="inline-block";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#certificate-img').style.display="block";
}
function showMap(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#location-maps').style.display="inline-block";
}
function pritCert() {
  window.location.href = '/icons/certificate.png';
}
function reload(){
    var container = document.getElementById("certificate-img");
    var content = container.innerHTML;
    container.innerHTML= content;

   //this line is to watch the result in console , you can remove it later
    console.log("Refreshed");
}
document.querySelector('#uploadcert').addEventListener('click',reload);
document.querySelector('#certificate-img').addEventListener('click',pritCert);
document.querySelector('#about').addEventListener('click',aboutUs);
document.querySelector('#certificate').addEventListener('click',showCertificate);
document.querySelector('#contact').addEventListener('click',contactUs);
document.querySelector('#timeline').addEventListener('click',showTimeline);
document.querySelector('#home').addEventListener('click',goHome);
document.querySelector('#qr').addEventListener('click',showQRcodes);
Plotly.newPlot(document.getElementById('timegraph'), [
  { name: 'Paper', y: [1, 2, 4, 8, 16]},
  { name: 'Plastic', y: [1, 3, 7, 10, 11]}],
  { title: 'Rates of recycling by material',
    xaxis:{title: 'Days since the start of the month'},
    yaxis:{title: 'Kilograms of waste recycled'}});

document.querySelector('#binmap').addEventListener('click',showMap);
document.querySelector('#paper').addEventListener('click',setPaper);
document.querySelector('#general').addEventListener('click',setGeneral);
document.querySelector('#plastic').addEventListener('click',setPlastic);
