var userName = 'sboak';
var count = 5;

$(document).ready(function() {

  $('#portfolio .project-link').click(function(e) {
    $('html, body').addClass('overlay');
    $("#project-container").empty();
    $("#project-container").load("/" + e.target.id);
    return false;
  });
  $('#portfolio .project-link .title').click(function(e) {
    return false;
  });

  $("#main-nav-toggle").click(function(){
    $('#main-nav-list').toggleClass('visible');
  });
  $(".gallery").click(function(){
    $('#main-nav-list').removeClass('visible');
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('html, body').removeClass('overlay');
      $("#project-container").empty();
    }
  });
  $('.overlay-close').click(function(){
    $('html, body').removeClass('overlay');
    $("#project-container").empty();
    return false;
  });

  $('.scroller').click(function(event) {
    //prevent the default action for the click event
    event.preventDefault();
    $('#main-nav-list').removeClass('visible');
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
  });

  getPosts(count);

  var socialText = $('#social_networks').text();
  $('.social_link').mouseenter(function(e){
    console.log(e.target);
    var newText = socialText + ' <span class="network">' + this.title + "</span>";
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

  $("#tweets .body-text").each(function (index, tweet) {
    $(tweet).html(linkify($(tweet).html()));
  });
});

function getPosts(count)
{
  $.get('/atom.xml', showPosts);
}

function showPosts(posts)
{
    var i = 0;
    var str = '<ul>';
    $.each($(posts).find('entry'), function(index, post)
    {
      if(index >= count + 1) return;
      var postdate = new Date($(post).find("updated").text());
      str+= '<li><h5><a href="' + $(post).find("link").attr("href") + '">';
      str+= $(post).find('title').text();
      str+= '</a></h5><span class="date">' + jQuery.timeago(postdate) + '</span></li>';
    });
    str+= '</ul>';
    $('#posts').html(str);
}

///////////////////////////////////////////////////////////
// INSTAGRAM //////////////////////////////////////////////
///////////////////////////////////////////////////////////

$.ajax({
  type: "GET",
  dataType: "jsonp",
  cache: false,
  url: 'https://api.instagram.com/v1/users/559599/media/recent/?client_id=cd2b29d40b0041f08cbbaee41bc50b87',
  success: function(res) {
    var limit = 8;

    for(var i = 0; i < limit; i++) {
      $('#instagram').append(createPhotoElement(res.data[i]));
    }
  }
});

function createPhotoElement(photo) {
  var caption = photo.caption ? '<span class="caption">' + photo.caption.text + '</span>' : '<span class="caption">No Caption</span>';
  return $('<a>' + caption)
    .attr('target', '_blank')
    .attr('href', photo.link)
    .append(
      $('<img>').addClass('instagram-image').attr('src', photo.images.low_resolution.url)
    );
}

function linkify(text){
        // modified from TwitterGitter by David Walsh (davidwalsh.name)
        // courtesy of Jeremy Parrish (rrish.org)
        return text.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a target="_blank" href="$1">$1</a>')
                   .replace(/(^|\W)@(\w+)/g, '$1<a target="_blank" href="http://twitter.com/$2">@$2</a>')
                   .replace(/(^|\W)#(\w+)/g, '$1#<a target="_blank" href="http://search.twitter.com/search?q=%23$2">$2</a>');
}





