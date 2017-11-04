document.addEventListener("DOMContentLoaded", function() {
  var news_wrapper = document.querySelector('.js_news-wrapper');
  if (news_wrapper) {
    build_items(news_wrapper, 'games', '&limit=10&sort=original_release_date:desc');
  }

});