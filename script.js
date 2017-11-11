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
        alert("Congratulate! You have subscribed :)")
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
  //https://www.giantbomb.com/api/games/?api_key=db13960f716ed8847edfaa64dad63ac7d63f7e1a&format=json&limit=10&sort=original_release_date:desc
  //game

  fetch(baseUrl + '/' + command + '/?api_key=db13960f716ed8847edfaa64dad63ac7d63f7e1a&format=json' + query)
      .then(function(response) {
          return response.json();
      })
      .then(cb)
      /*.catch( function() {
          
      });
      */
}

function build_items(game, offset) {
    var query = '';
    if (offset) {
        query = '&offset=' + offset; 
    }
    var news_wrapper = document.querySelector('.js_news-wrapper');
    news_wrapper.innerHTML = '';
    send_request('games', '&limit=20&sort=id:desc' + query, function(data) {
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
        
        p_descr.innerHTML = data.results[i].deck && data.results[i].deck.length > 160 ? data.results[i].deck.substr(0, 155) + '...' : data.results[i].deck;
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
        if (!offset) {
            build_pagenator(data.number_of_total_results);
        }
        }
    });
}
function creator_item () {
  var div = document.createElement('div');
  //add another attributes to div var.
}

function build_pagenator(total) {
    var page = document.querySelector('.js_pagenator');
    page.innerHTML = '';
    var countP = parseInt(total/20);
    for (var i = 1; i <= countP; i++) {
        var button = document.createElement('button');
        button.value = i;
        button.innerHTML = i;
        button.className = 'js_next_page';
        page.append(button);
    }
    var page_buttons = document.querySelectorAll('.js_next_page');
    if (page_buttons) {
        for (var i = 0; i < page_buttons.length; i++) {
            page_buttons[i].addEventListener('click', function() {
                var pageN = this.value;
                build_items(null, pageN);
                var active_button = document.querySelector('.js_pagenator button.active');
                if (active_button) {
                    active_button.classList.remove('active');
                }
                this.className = 'active';
           });
        }
    }
}