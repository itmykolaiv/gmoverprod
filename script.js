function showSubscribeAlert() {
  prompt("What is your email: ");
}

var config = {
  baseUrl: 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/gmoverprod',
  app_key: 'db13960f716ed8847edfaa64dad63ac7d63f7e1a'
}

//Send request
function send_request(command, query, cb) {
  var baseUrl = 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/gmoverprod';
  
  fetch(baseUrl + '/' + command + '/?api_key=db13960f716ed8847edfaa64dad63ac7d63f7e1a&format=json&' + query)
      .then(function(response) {
          return response.json();
      })
      .then(cb)
      .catch( function() {
          
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