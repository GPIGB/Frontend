function showTimeline(){
  document.querySelector('#homescreen').style.display="none";
  document.querySelector('#timegraph').style.display="block";
}
function goHome(){
  document.querySelector('#homescreen').style.display="inline-block";
  document.querySelector('#timegraph').style.display="none";
}

document.querySelector('#timeline').addEventListener('click',showTimeline);
document.querySelector('#home').addEventListener('click',goHome);
