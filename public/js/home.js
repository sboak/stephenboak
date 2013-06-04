var userName = 'sboak';
var count = 5;

$(document).ready(function() {

  var hash = (window.location.hash.substring(1));
  if (window.location.hash && document.getElementById("overlay_" + hash)) {
    $("#content_" + hash).load("/" + hash);
    $("#overlay_" + hash).addClass("open");
    $("#overlay_" + hash).fadeIn("fast");
    $('html').css("overflow","hidden");
  }

  $("#main-nav-toggle").click(function(){
    $('#main-nav-list').toggleClass('visible');
  });
  $(".gallery").click(function(){
    $('#main-nav-list').removeClass('visible');
  });

  $(".ui-widget-overlay").click(function(){
    history.pushState("", document.title, window.location.pathname);
    $(".open").fadeOut("fast");
    $(".open").removeClass("open");
    $('html').css("overflow","auto");
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      history.pushState("", document.title, window.location.pathname);
      $(".open").fadeOut("fast");
      $(".open").removeClass("open");
      $('html').css("overflow","auto");
    }
  });

  $(window).bind('hashchange', function() {
    var hash = (window.location.hash.substring(1));
    if (document.getElementById("overlay_" + hash)) {
      $("#content_" + hash).load("/" + hash);
      $("#overlay_" + hash).addClass("open");
      $("#overlay_" + hash).fadeIn("fast");
      $('html').css("overflow","hidden");
    }
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
        if(index >= count)  return;
        var linkedText = linkify(value.text);
        var dt = new Date(value.created_at);
        if (value.retweeted_status) {
          str+= '<li><img src="' + value.retweeted_status.user.profile_image_url + '"/>';
        } else {
          str+= '<li><img src="' + value.user.profile_image_url + '"/>';
        }
        str+= linkedText;
        str+=' – <a target="_blank" href="http://www.twitter.com/#!/' + userName + '/status/' + value.id_str + '">';
        str+= jQuery.timeago(dt);
        str+= '</a><span class="clearfix"></span></li>';
        i++;
    });
    str+= '</ul>';
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
  url: 'https://api.instagram.com/v1/users/559599/media/recent/?access_token=559599.1fb234f.e70ae04287a84b7ebb8105678e2293e8',
  success: function(res) {
    var limit = 8;

    for(var i = 0; i < limit; i++) {
      $('#instagram').append(createPhotoElement(res.data[i]));
    }
  }
});

function createPhotoElement(photo) {
  var caption = photo.caption ? '<span class="caption">' + photo.caption.text + '</span>': "";
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
        return text.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
                   .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
                   .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>');
}




///////////////////////////////////////////////////////////
// GALLERY JS /////////////////////////////////////////////
///////////////////////////////////////////////////////////

(function(){function j(a,c){return[].slice.call((c||document).querySelectorAll(a))}if(window.addEventListener){var g=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(c){return}var i=a.href||a.getAttribute("data-href"),f=i.replace(/[^\/]+$/,""),j=(/^[a-z]{3,10}:/.exec(f)||[""])[0],k=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(f)||[""])[0],h=/^([^?]*)\??/.exec(i)[1],n=a.parentNode,e=new XMLHttpRequest,b;e.onreadystatechange=function(){4===e.readyState&&
b()};b=function(){var c=e.responseText;if(c&&a.parentNode&&(!e.status||400>e.status||600<e.status)){c=g.fix(c,!0,a);if(f)var c=c.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(a,c,b){return/^([a-z]{3,10}:|#)/i.test(b)?a:/^\/\//.test(b)?'url("'+j+b+'")':/^\//.test(b)?'url("'+k+b+'")':/^\?/.test(b)?'url("'+h+b+'")':'url("'+f+b+'")'}),b=f.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),c=c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+b,"gi"),"$1");b=document.createElement("style");b.textContent=
c;b.media=a.media;b.disabled=a.disabled;b.setAttribute("data-href",a.getAttribute("href"));n.insertBefore(b,a);n.removeChild(a);b.media=a.media}};try{e.open("GET",i),e.send(null)}catch(r){"undefined"!=typeof XDomainRequest&&(e=new XDomainRequest,e.onerror=e.onprogress=function(){},e.onload=b,e.open("GET",i),e.send(null))}a.setAttribute("data-inprogress","")},styleElement:function(a){if(!a.hasAttribute("data-noprefix")){var c=a.disabled;a.textContent=g.fix(a.textContent,!0,a);a.disabled=c}},styleAttribute:function(a){var c=
a.getAttribute("style"),c=g.fix(c,!1,a);a.setAttribute("style",c)},process:function(){j('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);j("style").forEach(StyleFix.styleElement);j("[style]").forEach(StyleFix.styleAttribute)},register:function(a,c){(g.fixers=g.fixers||[]).splice(void 0===c?g.fixers.length:c,0,a)},fix:function(a,c,i){for(var f=0;f<g.fixers.length;f++)a=g.fixers[f](a,c,i)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,g){return g.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};setTimeout(function(){j('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)}})();
(function(j){function g(d,b,c,e,f){d=a[d];d.length&&(d=RegExp(b+"("+d.join("|")+")"+c,"gi"),f=f.replace(d,e));return f}if(window.StyleFix&&window.getComputedStyle){var a=window.PrefixFree={prefixCSS:function(d,b){var c=a.prefix;-1<a.functions.indexOf("linear-gradient")&&(d=d.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(a,d,b,c){return d+(b||"")+"linear-gradient("+(90-c)+"deg"}));d=g("functions","(\\s|:|,)","\\s*\\(","$1"+c+"$2(",d);d=g("keywords","(\\s|:)","(\\s|;|\\}|$)",
"$1"+c+"$2$3",d);d=g("properties","(^|\\{|\\s|;)","\\s*:","$1"+c+"$2:",d);if(a.properties.length)var e=RegExp("\\b("+a.properties.join("|")+")(?!:)","gi"),d=g("valueProperties","\\b",":(.+?);",function(a){return a.replace(e,c+"$1")},d);b&&(d=g("selectors","","\\b",a.prefixSelector,d),d=g("atrules","@","\\b","@"+c+"$1",d));d=d.replace(RegExp("-"+c,"g"),"-");return d=d.replace(/-\*-(?=[a-z]+)/gi,a.prefix)},property:function(d){return(a.properties.indexOf(d)?a.prefix:"")+d},value:function(d){d=g("functions",
"(^|\\s|,)","\\s*\\(","$1"+a.prefix+"$2(",d);return d=g("keywords","(^|\\s)","(\\s|$)","$1"+a.prefix+"$2$3",d)},prefixSelector:function(d){return d.replace(/^:{1,2}/,function(d){return d+a.prefix})},prefixProperty:function(d,b){var c=a.prefix+d;return b?StyleFix.camelCase(c):c}},c={},i=[],f=getComputedStyle(document.documentElement,null),p=document.createElement("div").style,k=function(a){if("-"===a.charAt(0)){i.push(a);var a=a.split("-"),b=a[1];for(c[b]=++c[b]||1;3<a.length;)a.pop(),b=a.join("-"),
StyleFix.camelCase(b)in p&&-1===i.indexOf(b)&&i.push(b)}};if(0<f.length)for(var h=0;h<f.length;h++)k(f[h]);else for(var n in f)k(StyleFix.deCamelCase(n));var h=0,e,b;for(b in c)f=c[b],h<f&&(e=b,h=f);a.prefix="-"+e+"-";a.Prefix=StyleFix.camelCase(a.prefix);a.properties=[];for(h=0;h<i.length;h++)n=i[h],0===n.indexOf(a.prefix)&&(e=n.slice(a.prefix.length),StyleFix.camelCase(e)in p||a.properties.push(e));"Ms"==a.Prefix&&(!("transform"in p)&&!("MsTransform"in p)&&"msTransform"in p)&&a.properties.push("transform",
"transform-origin");a.properties.sort();e=function(a,b){r[b]="";r[b]=a;return!!r[b]};b={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};b["repeating-linear-gradient"]=b["repeating-radial-gradient"]=b["radial-gradient"]=b["linear-gradient"];h={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",
flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display"};a.functions=[];a.keywords=[];var r=document.createElement("div").style,l;for(l in b)k=b[l],f=k.property,k=l+"("+k.params+")",!e(k,f)&&e(a.prefix+k,f)&&a.functions.push(l);for(var m in h)f=h[m],!e(m,f)&&e(a.prefix+m,f)&&a.keywords.push(m);l=function(a){s.textContent=a+"{}";return!!s.sheet.cssRules.length};m={":read-only":null,":read-write":null,":any-link":null,"::selection":null};e={keyframes:"name",viewport:null,
document:'regexp(".")'};a.selectors=[];a.atrules=[];var s=j.appendChild(document.createElement("style")),q;for(q in m)b=q+(m[q]?"("+m[q]+")":""),!l(b)&&l(a.prefixSelector(b))&&a.selectors.push(q);for(var t in e)b=t+" "+(e[t]||""),!l("@"+b)&&l("@"+a.prefix+b)&&a.atrules.push(t);j.removeChild(s);a.valueProperties=["transition","transition-property"];j.className+=" "+a.prefix;StyleFix.register(a.prefixCSS)}})(document.documentElement);