var userName = 'sboak';
var count = 5;

$(document).ready(function()
{
  
  $('.scroller').click(function(event) {
    //prevent the default action for the click event
    event.preventDefault();
    //get the full url - like mysitecom/index.htm#home
    var full_url = this.href;
    //split the url by # and get the anchor target name - home in mysitecom/index.htm#home
    var parts = full_url.split("#");
    var trgt = parts[1];
    //get the top offset of the target anchor
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
    //goto that anchor by setting the body scroll top to anchor top
    $('html, body').animate({scrollTop:target_top}, 500);
    setTimeout(function(){window.location = full_url;}, 600);
  });
  
  getTweets(userName, count);
  getPosts(count);
  
  var socialText = $('#social_networks').text();
  $('.social_link').mouseenter(function(){
    var newText = socialText + '<span class="network">' + this.title + "</span>";
    $('#social_networks').html(newText);
  });
  $('.social_link').mouseleave(function(){
    $('#social_networks').text(socialText);
  });
  
  var divname = "#btn_to_top";
  floatScroll = function (){
    if ($(document).scrollTop() < 300) {
      $(divname).fadeOut("fast");
    } else {
      $(divname).fadeIn("fast");
    }
  }
  $(window).bind('scroll', floatScroll);
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
        var linkedText = linkify(value.text);
        var dt = new Date(value.created_at);
        if (value.retweeted_status) {
          str+= '<li><img src="' + value.retweeted_status.user.profile_image_url + '"/>';
        } else {
          str+= '<li><img src="' + value.user.profile_image_url + '"/>';
        }
        str+= '<p>';
        str+= linkedText;
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

function linkify(text){
        // modified from TwitterGitter by David Walsh (davidwalsh.name)
        // courtesy of Jeremy Parrish (rrish.org)
        return text.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
                   .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
                   .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>');
}