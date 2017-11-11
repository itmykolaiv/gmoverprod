document.addEventListener("DOMContentLoaded", function() {
  var news_wrapper = document.querySelector('.js_news-wrapper');
  if (news_wrapper) {
    build_items();
  }
  var news_div = document.getElementById('container');
  if (news_div) {
    display_article();
  }
  var search_button = document.querySelector('#search button');
  search_button.addEventListener('click', function() {
    var game_name = document.querySelector('#search input').value;
    if (game_name) {
      build_items(game_name);
    }
    else {
      alert('Please, enter name of game!');
    }
  })
});