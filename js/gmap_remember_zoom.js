/******
 * create cookie to remember our center and zoom level when we 
 * navigate back to the map page
 * */

(function ($) {
  Drupal.behaviors.gmapsavepos = { 
    attach: function(context, settings) {

      if (typeof Drupal.gmap != 'undefined') {

        Drupal.gmap.addHandler('gmap', function(elem) {
          var obj = this;
          obj.bind("maptypechange", function () {
            var map = obj.map;
            window.setTimeout(function() {
              var cookiename = 'gmapsavedpos_' + location.pathname;      
              var pos = $.cookie(cookiename);
              if (pos != null) {
                var posJSON = JSON.parse(pos);
                map.setCenter(new google.maps.LatLng(posJSON.latitude, posJSON.longitude));
                map.setZoom(posJSON.zoom);
              }
              $('body').addClass('gmapsavedpos');
            }, 2000);
          });

          function saveposition() {
            if ($('body').hasClass('gmapsavedpos')) {
              var map = obj.map;
              var centerJSON = {
                'latitude': obj.vars.latitude,
                'longitude': obj.vars.longitude,
                'zoom': obj.vars.zoom
              };
              var cookiename = 'gmapsavedpos_' + location.pathname;      
              $.cookie(cookiename, JSON.stringify(centerJSON), {expires: 1/48});
            }
          } 
          obj.bind('move', saveposition);
          obj.bind('zoom', saveposition); 
        });
      }
    }
  };
})(jQuery);
