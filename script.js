<<<<<<< HEAD
unction hideInfo(){
  document.getElementById('eurasia').style.display = "none"
  document.getElementById('africa').style.display = "none"
  document.getElementById('northAmerica').style.display = "none"
  document.getElementById('southAmerica').style.display = "none"
  document.getElementById('australia').style.display = "none"
=======
function hideInfo(){
  document.getElementById('news1').style.display = "none"
  document.getElementById('news2').style.display = "none"
  document.getElementById('news3').style.display = "none"
  document.getElementById('news4').style.display = "none"
  document.getElementById('news5').style.display = "none"
>>>>>>> 7c05e63747b94dc381fc6ef39e9ac6cb645dd953

}

function revealInfo(element){
  info = document.getElementById(element);
  allElements = [document.getElementById('news1'),
                document.getElementById('news2'),
                document.getElementById('news3'),
                document.getElementById('news4'),
                document.getElementById('news5'),
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