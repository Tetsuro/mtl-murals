var mtlMurals = (function() {
  const MURAL_URL = 'https://jsonp.afeld.me/?url=http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
  const $MURAL_INFO = $('.mural-info__title');
  const $MURAL_IMAGE = $('.mural-info__image');

  let map = {};
  let markers = [];

  function getMuralData() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: MURAL_URL,
      success: function(data) {
        plotMarkers(data);
      }
    });
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'));
    getMuralData();

    map.addListener('dragend', updateMap);
  }

  function plotMarkers(data) {
    let muralSpotsArray = data.features;
    let bounds = new google.maps.LatLngBounds();

    muralSpotsArray.forEach(function(muralSpot) {
      let latitude = muralSpot.properties.latitude;
      let longitude = muralSpot.properties.longitude;
      let image = muralSpot.properties.image;
      let address = muralSpot.properties.adresse;

      let marker = new google.maps.Marker({
        position: {lat: muralSpot.properties.latitude, lng: muralSpot.properties.longitude},
        map: map,
        title: address,
        animation: google.maps.Animation.DROP
      });

      let position = new google.maps.LatLng(latitude, longitude);
      bounds.extend(position);

      markers.push(marker);

      marker.addListener('click', function() {
        $MURAL_INFO.html(address);
        $MURAL_IMAGE.attr('src', image);
      });
    });

    map.fitBounds(bounds);
  }

  function updateMap() {
    let newBounds = map.getBounds();

    // Can use Array Filter here later
    markers.forEach(function() {
      // can't access newBounds here.. WHY!
      // if newBounds.contains(marker.position)... bla bla
    });

  }

  return {
    initMap: initMap
  }
})();

mtlMurals.initMap();
