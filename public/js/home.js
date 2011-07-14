var userName = 'sboak';
var count = 5;
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

$(document).ready(function()
{
  getTweets(userName, count);
  getPosts(count);
});

function getTweets(userName, count)
{
  $.getJSON(
      'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + userName + '&include_rts=true&count='+ count +'&callback=?', {}, showTweets, 'jsonp'
  );
}

function showTweets(tweets)
{
    var str = '<ul>';
    var i = 0;
    $.each(tweets, function(index,value)
    {
        if(i == count)  return;
        var dt = new Date(value.created_at);
        if (value.retweeted_status) {
          str+= '<li><img src="' + value.retweeted_status.user.profile_image_url + '"/>';
        } else {
          str+= '<li><img src="' + value.user.profile_image_url + '"/>';
        }
        str+= '<p>';
        str+= value.text;
        str+= '</p>';
        str+='<span class="date"><a href="http://www.twitter.com/#!/' + userName + '/status/' + value.id_str + '">';
        str+= jQuery.timeago(dt);
        str+= '</a></span></li>';
        i++;
    });
    str+= '</ul>';
    str+= '<a class="tweets" href="http://www.twitter.com/#!/' + userName + '">All Tweets...</a>';
    $('#tweets').html(str);
    $('#tweets > ul > li:odd').addClass('odd');
    $('#tweets > ul > li:even').addClass('even');
}

function getPosts(count)
{
  $.get('/atom.xml', showPosts);
}

function showPosts(posts)
{
    var str = '<ul>';
    $.each($(posts).find('entry'), function(index,post)
    {
      str+= '<li><a href="' + $(post).find("link").attr("href") + '">';
      str+= $(post).find('title').text();
      str+= '</a></li>';
    });
    str+= '</ul>';
    $('#posts').html(str);
}