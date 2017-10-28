unction hideInfo(){
  document.getElementById('eurasia').style.display = "none"
  document.getElementById('africa').style.display = "none"
  document.getElementById('northAmerica').style.display = "none"
  document.getElementById('southAmerica').style.display = "none"
  document.getElementById('australia').style.display = "none"

}

function revealInfo(element){
  info = document.getElementById(element);
  allElements = [document.getElementById('eurasia'),
                document.getElementById('africa'),
                document.getElementById('northAmerica'),
                document.getElementById('southAmerica'),
                document.getElementById('australia'),
                document.getElementById('choosing')];

if (info.style.display == "none"){
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.display = "none"
  }
  info.style.display = "block";
};
}






var el = document.getElementById('subscribe')
el.addEventListener('click', function() {
 prompt("what is your email");
 };