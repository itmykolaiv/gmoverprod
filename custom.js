document.addEventListener("DOMContentLoaded", function() {
  var news_wrapper = document.querySelector('.js_news-wrapper');
  if (news_wrapper) {
    news_wrapper.innerHTML = '';
    send_request('games', '&limit=10&sort=original_release_date:desc', function(data) {
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
  
});