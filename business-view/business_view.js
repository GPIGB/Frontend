
function showTimeline(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="block";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#cert-title').style.display="none";
  document.querySelector('#about-text').style.display="none";
  document.querySelector('#time-title').style.display="block";
}
function goHome(){
  document.querySelector('#homescreen').style.display="inline-block";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#cert-title').style.display="none";
  document.querySelector('#about-text').style.display="none";
  document.querySelector('#time-title').style.display="none";
}
function showQRcodes(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#qr-codes').style.display="inline-block";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#certificate-img').style.display="none";
  document.querySelector('#cert-title').style.display="none";
  document.querySelector('#about-text').style.display="none";
  document.querySelector('#time-title').style.display="none";
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
  document.querySelector('#cert-title').style.display="none";
  document.querySelector('#time-title').style.display="none";
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
  document.querySelector('#cert-title').style.display="none";
  document.querySelector('#time-title').style.display="none";
}
function showCertificate(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="none";
  document.querySelector('#qr-codes').style.display="none";
  document.querySelector('#certificate-form').style.display="none";
  document.querySelector('#contact-text').style.display="none";
  document.querySelector('#location-maps').style.display="none";
  document.querySelector('#about-text').style.display="none";
  document.querySelector('#certificate-img').style.display="block";
  document.querySelector('#cert-title').style.display="block";
  document.querySelector('#time-title').style.display="none";
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

