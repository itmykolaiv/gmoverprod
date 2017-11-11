function showSubscribeAlert() {
    var sign = prompt("What is your email: ");
    var check = 'No'
    for (i=0; i < sign.length; i++){
        if (sign[i] == "@"){
            check = 'Yes'
        }
    }
    if (check == "No"){
        alert("Enter your email correctly")
        showSubscribeAlert()
    }
    if (check == "Yes"){
        alert("Congratulations! You have subscribed :)")
    }
}

function showNewsAlert() {
	var name_news = prompt("What news do you want to offer: ");
	if (name_news == "") {
		return showNewsAlert();
	}
    if (name_news == null) {
        return
    }
	var content = prompt("What are your news about: ");
	if (content == "") {
		return showNewsAlert();
	}
   if (content == null) {
       return
    }
	var time = prompt("When did it happen: ");
	if (time == "") {
		return showNewsAlert();
	}
    if (time == null) {
        return
    }    
	alert(name_news + "\n" + content + "\n" + time);
}

//Send request
function send_request(command, query, cb) {
  var baseUrl = 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/gmoverprod';

    fetch(baseUrl + '/' + command + '/?api_key=db13960f716ed8847edfaa64dad63ac7d63f7e1a&format=json' + query)
      .then(function(response) {
          return response.json();
      })
      .then(cb)
      .catch(function(){
          
      });
}

function build_items(news_wrapper, command, query) {
  news_wrapper.innerHTML = '';
  send_request(command, query, function(data) {
    for(var i = 0; i < data.results.length; i++) {
      var img = document.createElement('img');
      img.src = data.results[i].image.small_url;
      img.width = "150";
      img.height = "110";
      var a_img = document.createElement('a');
      a_img.href = 'item.html?id=' + data.results[i].id;
      a_img.append(img);
      var div_img = document.createElement('div');
      div_img.className = "teaser-image";
      div_img.append(a_img);
      
      var b_descr = document.createElement('b');
      b_descr.innerHTML = data.results[i].name;
      var p_descr = document.createElement('p');
      
      p_descr.innerHTML = data.results[i].deck.length > 160 ? data.results[i].deck.substr(0, 155) + '...' : data.results[i].deck;
      var a_read = document.createElement('a');
      a_read.href = 'item.html?id=' + data.results[i].id;
      a_read.className = 'button';
      a_read.innerHTML = 'Read more...';
      var div_descr = document.createElement('div');
      div_descr.className = "teaser-description";
      div_descr.append(b_descr);
      div_descr.append(p_descr);
      div_descr.append(a_read);
      var div_one = document.createElement('div');
      div_one.className = "one-news clear";
      div_one.append(div_img);
      div_one.append(div_descr);
      news_wrapper.append(div_one);
    }
  });
}

function creator_item() {
  var div = document.createElement('div');
  //add another attributes to div var.
}

function display_article() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var news_div = document.getElementById('container');
    news_div.innerHTML = '';
    send_request('game/' + id, '', function(data){
      var img = document.createElement('img');
      img.src = data.results.image.small_url;
      img.width = "480";
      img.height = "290"; 
      img.className = "newsImg"
      var div_img = document.createElement('div');
//      div_img.className = "newsImg";
      div_img.append(img);

      var b_descr = document.createElement('b');
      b_descr.innerHTML = data.results.name;

      var p_descr = document.createElement('p');
      p_descr.innerHTML = data.results.deck;

      var div_descr = document.createElement('div');
      div_descr.className = "newsDescr";
      div_descr.append(b_descr);
      div_descr.append(p_descr);

      var div_one = document.createElement('div');
      div_one.className = "one-news clear";
      div_one.append(div_img);
      div_one.append(div_descr);
      news_div.append(div_one);
    });
}