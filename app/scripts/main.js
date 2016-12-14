var mtlMurals = (function() {
  const MURAL_URL = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
  const $MURAL_INFO = $('.mural-info__title');
  const $MURAL_IMAGE = $('.mural-info__image');
  const $MURAL_TOTAL_COUNT_NODE = $('.mural-count__total');
  const $MURAL_VISIBLE_COUNT_NODE = $('.mural-count__visible');

  let map = {};
  let markers = [];
  let totalCount = 0;
  let visibleCount;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'));

    $.when(getMuralData()).done(function(){
      console.timeStamp('After getMuralData');
      console.log('After getMuralDat(): ' + totalCount);

      $MURAL_VISIBLE_COUNT_NODE.html(totalCount); // On init, # of visible markers == total markers.
      $MURAL_TOTAL_COUNT_NODE.html(totalCount);

      map.addListener('dragend', updateMap);
      map.addListener('zoom_changed', updateMap);
      // map.addListener('bounds_changed', updateMap);
    });
  }

  function getMuralData() {
    return $.ajax({
      dataType: 'json',
      cache: false,
      url: 'https://proxy.hackeryou.com',
      data: {
        reqUrl: MURAL_URL,
        xmlToJSON: false
      },
      success: plotMarkers
    });
  }

  function plotMarkers(data) {
    let muralSpotsArray = data.features;
    totalCount = muralSpotsArray.length;
    console.timeStamp('Inside PlotMarkers');
    console.log('Inside plotMarkers() ' + totalCount)
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
    visibleCount = 0;
    // Can use Array Filter here later
    markers.forEach(function(marker) {
      if (newBounds.contains(marker.position)) {
        visibleCount++;
      }
    });
    // debugger
    $MURAL_VISIBLE_COUNT_NODE.html(visibleCount);
    console.log(visibleCount);
  }

  return {
    initMap: initMap
  }

})();


console.log('hello');
$(document).ready(function() {
  console.log('ready')
  mtlMurals.initMap();
});
