(function($){
    // collapse
    $('.button-collapse').sideNav();
    
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  
    function rotate(sentences, element) {
      function print() {
        var counter = Math.floor(Math.random()*sentences.length);
        element.children().fadeOut().remove();
        element
            .children()
            .fadeOut()
            .remove();
        element
            .append($('<span>' + sentences[counter] + '</span>').fadeIn())
      }
      print();
      setInterval(print, 10000);
    }

    // quote rotation
    rotate([
        "Nos rêves ne rentrent pas dans vos urnes",
        "Nous ne rentrerons pas chez nous",
        "Le jour : à bout, la nuit : debout",
        "Partout en Europe, levons-nous !",
        "Ils pourront couper les fleurs, ils n'arrêteront pas le printemps",
        "Ne plus perdre sa vie à la gagner",
        "C'est un grand printemps qui se lève",
        "Je reviendrai et serai des millions",
        "Que nul n'entre ici s'il n'est révolté"
    ], $('.nd_header__quote small'));

    // bambuser
//     $.ajax({
//       url: 'http://api.nuitdebout.fr/api/bambuser',
//       success: function (resp, status, jqxhr) {
//         resp = JSON.parse(resp);

//         if (resp && resp.result) {
//           $('<iframe />');  // Create an iframe element
//           $('<iframe />', {
//             src: 'https://embed.bambuser.com/broadcast/' + resp.result[0].vid,
//             width: '100%',
//             height: '260px',
//             frameborder: 'none'
//           }).appendTo('#livestream');
//           }
//       }
//     });

//     // get facebook feed
//     $.ajax({
//       url: 'http://api.nuitdebout.fr/api/facebook',
//       success: function (resp, status, jqxhr) {
//         var filteredPost = _.reject(resp.data, function (val) {
//           return !val.message && !val.caption || !val.full_picture || !val.link;
//         });



//         $('#news .card').each(function (index, value) {
//           $(value).parents('a').attr('href', filteredPost[index].link);
//           $(value).find('.card-content p').html(filteredPost[index].message || filteredPost[index].caption)
//           .succinct({
//             size: 120,
//             ignore: false
//           });

//           $(value).find('.card-image').html('<img src="' + filteredPost[index].full_picture + '"/>');

//         });

//       }
//     });


//     // tweet rotation
//     // get twitter feed

//     $.ajax({
//       url: 'http://api.nuitdebout.fr/api/twitter',
//       success: function (resp, status, jqxhr) {

//         var tweets = [];
//         _.each(resp, function (element, index, list) {

//           tweets.push('<a href="https://twitter.com/nuitdebout/status/'+element.id_str+'" target="_blank">'+element.text+'</a>')
//         })
//         rotate(tweets, $('.nd_tweet_feed'));
//       }
//     });

    // Smooth scroll when going to an anchor
    // this snippet was taken from http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
    $('body').on('click', 'nav:not(.collapsible) a[href^="#"]', function (e) {
        e.preventDefault();
        var target = this.hash.replace(/\./g, '\\.');
        var $target = $(target);
        
        $(".drag-target").click();
        
        smoothTo( $target, function () {
            
        });
    });
    window.smoothTo = function smoothTo( el, cb )
    {
        var top = typeof el == 'number' ? el : $(el).offset().top - 20 - $('[role=navigation]').height();
        $('html, body').stop().animate({
            'scrollTop': top
        }, 900, 'swing', function () {
            cb && cb( el );
        });
    }

    // masonry for cards smoother "flux"

    $(".masonry-container").masonry();

    var d = new Date();
    var today = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('-');

    // Set OpenAgenda date to today
    var oaQuery = '?oaq[from]=' + today + '&oaq[to]=' + today;
    $('.cibulFrame.cbpgbdy').attr('src', $('.cibulFrame.cbpgbdy').attr('src') + oaQuery);

})(jQuery);
