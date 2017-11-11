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
      /*.catch( function() {
          
      });
      */
}
//https://www.giantbomb.com/api/games/?api_key=db13960f716ed8847edfaa64dad63ac7d63f7e1a&format=json&limit=10&sort=original_release_date:desc

function build_items(game, offset) {
    //search query=name_game
    var query = '';
    if (offset) {
        query = '&offset=' + offset; 
    }
    var news_wrapper = document.querySelector('.js_news-wrapper');
    news_wrapper.innerHTML = '';
    send_request('games', '&limit=20&sort=number_of_user_reviews:desc&field_list=name,id,deck,image' + query, function(data) {
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
        build_pagenator(data.number_of_total_results, offset);
        }
    });
}

function creator_item() {
  var div = document.createElement('div');
  //add another attributes to div var.
}

function build_pagenator(total, pageNum) {
    pageNum = pageNum || 0;
    pageNum = pageNum/20;
    var page = document.querySelector('.js_pagenator');
    page.innerHTML = '';
    var countP = parseInt(total/20);
    if (pageNum > 12 && pageNum < countP - 12)  {
        var iter_start =  pageNum - 11;
        var iter_end =  pageNum + 11;
        var button = document.createElement('button');
        button.value = 0;
        button.innerHTML = 1;
        button.className = 'js_next_page';
        page.append(button);
        page.innerHTML += ' ... ';
    }
    else if (pageNum < 12) {
        var iter_start = 0;
        var iter_end = 23;
    }
    else {
        var iter_start =  countP - 23;
        var iter_end =  countP;
        var button = document.createElement('button');
        button.value = 0;
        button.innerHTML = 1;
        button.className = 'js_next_page';
        page.append(button);
        page.innerHTML += ' ... ';
    }
    
    for (var i = iter_start; i < iter_end; i++) {
        var button = document.createElement('button');
        button.value = 20 * i;
        button.innerHTML = i + 1;
        button.className = 'js_next_page';
        if (pageNum == i ) {
            button.className += ' active';
        }
        page.append(button);
    }
    if ((pageNum > 12 && pageNum < countP - 12) || pageNum < 12)  {
        page.innerHTML += ' ... ';
        var button = document.createElement('button');
        button.value = 20 * (countP - 1);
        button.innerHTML = countP;
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
                this.className += ' active';
           });
        }
    }
}
function display_article() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var news_div = document.getElementById('container');
    news_div.innerHTML = '';
    send_request('game/' + id, '', function(data){
      var img = document.createElement('img');
      img.src = data.results.image.screen_url;
      img.width = "480";
      img.height = "290"; 
      img.className = "newsImg"
      var div_img = document.createElement('div');
//      div_img.className = "newsImg";
      div_img.append(img);

      var b_descr = document.createElement('b');
      b_descr.innerHTML = data.results.name;

      var p_descr = document.createElement('p');
      p_descr.innerHTML = data.results.description || data.results.deck;

      p_descr.innerHTML = p_descr.innerHTML.replace(/href\=\"(\/.*?)\"?/gi, 'href="https://www.giantbomb.com$1');
      p_descr.innerHTML = p_descr.innerHTML.replace(/href\=\"\.\.\/\.\.(\/.*?)\"?/gi, 'href="https://www.giantbomb.com$1');

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