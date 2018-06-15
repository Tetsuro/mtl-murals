'use strict';

var mtlMurals = function () {
  var MURAL_URL = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
  var $MURAL_INFO = $('.mural-info__title');
  var $MURAL_IMAGE = $('.mural-info__image');
  var $MURAL_LIST = $('.mural-list');
  var MURAL_LIST_ITEM_CLASS = 'mural-list__item';
  var MURAL_LIST_BUTTON_CLASS = 'mural-list__button';
  var MURAL_LIST_META_CLASS = 'mural-list__meta';
  var MURAL_LIST_IMAGE_CLASS = 'mural-list__image-wrapper';
  var MURAL_LIST_ADDRESS_CLASS = 'mural-list__address';
  var $MURAL_TOTAL_COUNT_NODE = $('.mural-count__total');
  var $MURAL_VISIBLE_COUNT_NODE = $('.mural-count__visible');

  var map = {};
  var markers = [];
  var totalCount = 0;
  var visibleCount = void 0;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'));
    window.addEventListener('resize', debounce(debouncedResize, 300));

    getMuralData().then(function (data) {
      map.addListener('dragend', updateMap);
      map.addListener('zoom_changed', updateMap);
      map.addListener('resize', updateMap);
      return data;
    }).then(plotMarkers).then(populateList).then(function () {
      $MURAL_VISIBLE_COUNT_NODE.html(totalCount); // On init, # of visible markers == total markers.
      $MURAL_TOTAL_COUNT_NODE.html(totalCount);
    });
  }

  function getMuralData() {
    return new Promise(function (resolve, reject) {
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
    var muralSpotsArray = data.features;
    totalCount = muralSpotsArray.length;
    var bounds = new google.maps.LatLngBounds();

    muralSpotsArray.forEach(function (muralSpot, index) {
      var latitude = muralSpot.properties.latitude;
      var longitude = muralSpot.properties.longitude;
      var image = muralSpot.properties.image;
      var address = muralSpot.properties.adresse;
      var artist = muralSpot.properties.artiste;
      var year = muralSpot.properties.annee;

      var marker = new google.maps.Marker({
        position: { lat: muralSpot.properties.latitude, lng: muralSpot.properties.longitude },
        map: map,
        title: address,
        animation: google.maps.Animation.DROP,
        id: index,
        image: image,
        artist: artist,
        year: year
      });

      var position = new google.maps.LatLng(latitude, longitude);
      bounds.extend(position);
      markers.push(marker);

      marker.addListener('click', function () {
        // $MURAL_INFO.html(address);
        // $MURAL_IMAGE.attr('src', image);
      });
    });
    map.fitBounds(bounds);
    updateMap();
  }

  function updateMap() {
    var newBounds = map.getBounds();
    visibleCount = 0;
    // Can use Array Filter here later
    markers.forEach(function (marker) {
      if (newBounds.contains(marker.position)) {
        $('[data-index=' + marker.id + ']').show();
        visibleCount++;
      } else {
        $('[data-index=' + marker.id + ']').hide();
      }
    });
    $MURAL_VISIBLE_COUNT_NODE.html(visibleCount);
  }

  function populateList() {
    markers.forEach(function (marker) {
      var markerListItem = document.createElement('li');
      var markerListButton = document.createElement('button');
      var markerListMeta = document.createElement('p');
      var markerListAddress = document.createElement('p');
      var markerListArtist = document.createElement('span');
      var markerListYear = document.createElement('span');
      var markerListImage = document.createElement('div');

      markerListItem.classList.add(MURAL_LIST_ITEM_CLASS);
      markerListItem.setAttribute('data-index', marker.id);
      $MURAL_LIST[0].appendChild(markerListItem);
      markerListItem.appendChild(markerListButton);
      markerListButton.classList.add(MURAL_LIST_BUTTON_CLASS);

      markerListAddress.classList.add(MURAL_LIST_ADDRESS_CLASS);
      markerListAddress.innerHTML = marker.title;
      markerListMeta.appendChild(markerListAddress);
      markerListMeta.classList.add(MURAL_LIST_META_CLASS);

      markerListArtist.innerHTML = marker.artist;
      markerListYear.innerHTML = ' (' + marker.year + ')';

      markerListImage.setAttribute('data-bg', marker.image);
      markerListImage.classList.add('lazyload', MURAL_LIST_IMAGE_CLASS);
      markerListButton.appendChild(markerListImage);
      markerListButton.appendChild(markerListMeta);
      markerListMeta.appendChild(markerListArtist);
      markerListMeta.appendChild(markerListYear);
    });
  }

  function debouncedResize() {
    google.maps.event.trigger(map, 'resize');
  }

  document.addEventListener('lazybeforeunveil', function (e) {
    var bg = e.target.getAttribute('data-bg');
    if (bg) {
      e.target.style.backgroundImage = 'url(' + bg + ')';
    }
  });

  return {
    initMap: initMap
  };
}();

mtlMurals.initMap();
//# sourceMappingURL=main.js.map
