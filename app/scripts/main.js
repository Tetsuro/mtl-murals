var mtlMurals = (function() {
  const MURAL_URL = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
  const $MURAL_INFO = $('.mural-info__title');
  const $MURAL_IMAGE = $('.mural-info__image');
  const $MURAL_LIST = $('.mural-list');
  const MURAL_LIST_ITEM_CLASS = 'mural-list__item';
  const MURAL_LIST_BUTTON_CLASS = 'mural-list__button';
  const $MURAL_TOTAL_COUNT_NODE = $('.mural-count__total');
  const $MURAL_VISIBLE_COUNT_NODE = $('.mural-count__visible');

  let map = {};
  let markers = [];
  let totalCount = 0;
  let visibleCount;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'));

    // $.when(getMuralData()).done(function(){
    getMuralData()
      .then(function(data) {
          map.addListener('dragend', updateMap);
          map.addListener('zoom_changed', updateMap);
          return data;
      })
      .then(plotMarkers)
      .then(populateList);
    $MURAL_VISIBLE_COUNT_NODE.html(totalCount); // On init, # of visible markers == total markers.
    $MURAL_TOTAL_COUNT_NODE.html(totalCount);


    // populateList();
    // map.addListener('dragend', updateMap);
    // map.addListener('zoom_changed', updateMap);
    // map.addListener('bounds_changed', updateMap);

    // });
  }

  function getMuralData() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        dataType: 'json',
        cache: false,
        url: 'https://proxy.hackeryou.com',
        data: {
          reqUrl: MURAL_URL,
          xmlToJSON: false
        },
        success: resolve,
        error: reject
      });
    });
  }

  function plotMarkers(data) {
    let muralSpotsArray = data.features;
    totalCount = muralSpotsArray.length;
    let bounds = new google.maps.LatLngBounds();

    muralSpotsArray.forEach(function(muralSpot, index) {
      let latitude = muralSpot.properties.latitude;
      let longitude = muralSpot.properties.longitude;
      let image = muralSpot.properties.image;
      let address = muralSpot.properties.adresse;
      let artist = muralSpot.properties.artiste;
      let year = muralSpot.properties.annee;

      let marker = new google.maps.Marker({
        position: {lat: muralSpot.properties.latitude, lng: muralSpot.properties.longitude},
        map: map,
        title: address,
        animation: google.maps.Animation.DROP,
        id: index
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
    updateMap();
  }

  function updateMap() {

    let newBounds = map.getBounds();
    visibleCount = 0;
    // Can use Array Filter here later
    markers.forEach(function(marker) {
      if (newBounds.contains(marker.position)) {
        $('[data-index=' + marker.id +']').show();
        visibleCount++;
      } else {
        $('[data-index=' + marker.id +']').hide();
      }
    });
    $MURAL_VISIBLE_COUNT_NODE.html(visibleCount);
  }

  function populateList() {
    markers.forEach(function(marker) {
      let markerListItem = document.createElement('li');
      let markerListButton = document.createElement('button');
      markerListItem.classList.add(MURAL_LIST_ITEM_CLASS);
      markerListItem.setAttribute('data-index', marker.id);
      $MURAL_LIST[0].appendChild(markerListItem);
      markerListItem.appendChild(markerListButton);
      markerListButton.classList.add(MURAL_LIST_BUTTON_CLASS)
      markerListButton.innerHTML = marker.title;
    });
  }

  return {
    initMap: initMap
  }
})();

mtlMurals.initMap();
