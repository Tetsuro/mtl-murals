var mtlMurals = (function() {
  const MURAL_URL = 'https://jsonp.afeld.me/?url=http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
  const $MURAL_INFO = $('.mural-info__title');
  const $MURAL_IMAGE = $('.mural-info__image');
  let map = {};

  function getMuralData() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: MURAL_URL,
      success: function(data) {
        plotMarkers(data);
      }
    });
  };

  function initMap() {
    console.log("initMapping")
    let montreal = {lat: 45.5017, lng: -73.5673};

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: montreal
    });

    getMuralData();
  }

  function plotMarkers(data) {
    let muralSpotsArray = data.features;

    muralSpotsArray.forEach(function(muralSpot) {
      let latitude = muralSpot.properties.latitude;
      let longitude = muralSpot.properties.longitude;
      let image = muralSpot.properties.image;
      let address = muralSpot.properties.adresse;

      let marker = new google.maps.Marker({
        position: {lat: muralSpot.properties.latitude, lng: muralSpot.properties.longitude},
        map: map,
        title: address
      });

      marker.addListener('click', function() {
        console.log(this);
        $MURAL_INFO.html(this.title);
        $MURAL_IMAGE.attr('src', image);
      });
    });
  }

  return {
    initMap: initMap
  }
})();

mtlMurals.initMap();

// google.load('maps', '3', {'other_params': 'sensor=false','callback': mtlMurals.initMap });
