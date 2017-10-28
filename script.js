function hideInfo(){
  document.getElementById('news1').style.display = "none"
  document.getElementById('news2').style.display = "none"
  document.getElementById('news3').style.display = "none"
  document.getElementById('news4').style.display = "none"
  document.getElementById('news5').style.display = "none"
}

function revealInfo(element){
  info = document.getElementById(element);
  allElements = [document.getElementById('news1'),
                document.getElementById('news2'),
                document.getElementById('news3'),
                document.getElementById('news4'),
                document.getElementById('news5')];

if (info.style.display == "none"){
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.display = "none"
  }
  info.style.display = "block";
}

var el = document.getElementById('subscribe')
el.addEventListener('click', function() {
 prompt("what is your email:", "");
 };