function showSubscribeAlert() {
  prompt("What is your email: ");
}

function showNewsAlert() {
	var name_news = prompt("What news do you want to offer: ");
	if (name_news == "") {
		return showNewsAlert();
	}
	var content = prompt("What is your news about: ");
	if (content == "") {
		return showNewsAlert();
	}
	var time = prompt("When did it happen: ");
	if (time == "") {
		return showNewsAlert();
	}
	alert(name_news + "\n" + content + "\n" + time);
}


var config = {
  baseUrl: 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/gmoverprod',
  app_key: 'db13960f716ed8847edfaa64dad63ac7d63f7e1a'
}

//Send request
function send_request(command, query) {
  fetch(config.baseUrl + '/'+command+'/?api_key='+config.app_key+'&format=json'+query)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch( function() {
      console.log("Somthing wrong!!!");
    });
}

function build_items () {
  var cont = document.querySelector('.js_items-container');
  //Fill our container
}

function creator_item () {
  var div = document.createElement('div');
  //add another attributes to div var.
}