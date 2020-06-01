function goHome() {  
  homeScreen.style.display = "block";
  binMapScreen.style.display = "none";
  timelineScreen.style.display = "none";
  QRScreen.style.display = "none";
  certificateScreen.style.display = "none";
  aboutScreen.style.display = "none";
  contactScreen.style.display = "none";
  
  
  }
  
function goBinMap() {
  homeScreen.style.display = "none";
  binMapScreen.style.display = "block";
  timelineScreen.style.display = "none";
  QRScreen.style.display = "none";
  certificateScreen.style.display = "none";
  aboutScreen.style.display = "none";
  contactScreen.style.display = "none";
  
  }
  
 function goTimeline() {
  homeScreen.style.display = "none";
  binMapScreen.style.display = "none";
  timelineScreen.style.display = "block";
  QRScreen.style.display = "none";
  certificateScreen.style.display = "none";
  aboutScreen.style.display = "none";
  contactScreen.style.display = "none";
  }
  
 function goQR() {
  homeScreen.style.display = "none";
  binMapScreen.style.display = "none";
  timelineScreen.style.display = "none";
  QRScreen.style.display = "block";
  certificateScreen.style.display = "none";
  aboutScreen.style.display = "none";
  contactScreen.style.display = "none";
  }
  
 function goCertificate() {
  homeScreen.style.display = "none";
  binMapScreen.style.display = "none";
  timelineScreen.style.display = "none";
  QRScreen.style.display = "none";
  certificateScreen.style.display = "block";
  aboutScreen.style.display = "none";
  contactScreen.style.display = "none";
  }
  
 function goAbout() {
  homeScreen.style.display = "none";
  binMapScreen.style.display = "none";
  timelineScreen.style.display = "none";
  QRScreen.style.display = "none";
  certificateScreen.style.display = "none";
  aboutScreen.style.display = "block";
  contactScreen.style.display = "none";
  }
  
  function goContact() {
  homeScreen.style.display = "none";
  binMapScreen.style.display = "none";
  timelineScreen.style.display = "none";
  QRScreen.style.display = "none";
  certificateScreen.style.display = "none";
  aboutScreen.style.display = "none";
  contactScreen.style.display = "block";
  }
  
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

function processType()
{
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  wtype = unescape(temp[1]);
  wtype=wtype.toLowerCase();
  console.log("check");
  if (wtype=="certificate"){
    console.log("cert=true");
    showCertificate();
  }
}
processType();

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