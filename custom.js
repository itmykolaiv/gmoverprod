document.addEventListener("DOMContentLoaded", function() {
  var news_wrapper = document.querySelector('.js_news-wrapper');
  if (news_wrapper) {
    build_items();
  }
  var news_div = document.getElementById('container');
  if (news_div) {
    display_article();
  }
  var news_wrapper = document.querySelector('.js_item-container');
});