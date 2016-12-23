var mtlMurals = (function() {
  const MURAL_URL = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
  const $MURAL_INFO = $('.mural-info__title');
  const $MURAL_IMAGE = $('.mural-info__image');
  const $MURAL_LIST = $('.mural-list');
  const MURAL_LIST_ITEM_CLASS = 'mural-list__item';
  const MURAL_LIST_BUTTON_CLASS = 'mural-list__button';
  const MURAL_LIST_META_CLASS = 'mural-list__meta';
  const MURAL_LIST_IMAGE_CLASS = 'mural-list__image-wrapper';
  const MURAL_LIST_ADDRESS_CLASS = 'mural-list__address';
  const $MODAL_IMAGE = $('.mural-modal__image');
  const $MODAL_HEADING = $('.mural-modal__heading');
  const $MODAL_ARTIST = $('.mural-modal__meta-artist');
  const $MODAL_YEAR = $('.mural-modal__meta-year');
  const $MURAL_TOTAL_COUNT_NODE = $('.mural-count__total');
  const $MURAL_VISIBLE_COUNT_NODE = $('.mural-count__visible');
  const MODAL = $('[data-remodal-id=modal]').remodal();

  let map = {};
  let markers = [];
  let totalCount = 0;
  let visibleCount;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'));
    window.addEventListener('resize', debounce(debouncedResize, 300));

    getMuralData()
      .then(function(data) {
          map.addListener('dragend', updateMap);
          map.addListener('zoom_changed', updateMap);
          map.addListener('resize', updateMap);
          return data;
      })
      .then(plotMarkers)
      .then(populateList)
      .then(function(){
        $MURAL_VISIBLE_COUNT_NODE.html(totalCount); // On init, # of visible markers == total markers.
        $MURAL_TOTAL_COUNT_NODE.html(totalCount);
      });
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
        id: index,
        image: image,
        address: address,
        artist: artist,
        year: year
      });

      let position = new google.maps.LatLng(latitude, longitude);
      bounds.extend(position);
      markers.push(marker);

      marker.addListener('click', openModal);
    });
    map.fitBounds(bounds);
    updateMap();
  }

  function openModal() {
    $MODAL_HEADING.html(this.address);
    $MODAL_ARTIST.html(this.artist);
    $MODAL_YEAR.html(this.year);
    $MODAL_IMAGE.attr('src', this.image);
    MODAL.open();
  };

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
      let markerListMeta = document.createElement('p');
      let markerListAddress = document.createElement('p');
      let markerListImage = document.createElement('div');

      markerListItem.classList.add(MURAL_LIST_ITEM_CLASS);
      markerListItem.setAttribute('data-index', marker.id);
      $MURAL_LIST[0].appendChild(markerListItem);
      markerListItem.appendChild(markerListButton);
      markerListButton.classList.add(MURAL_LIST_BUTTON_CLASS)

      markerListAddress.classList.add(MURAL_LIST_ADDRESS_CLASS)
      markerListAddress.innerHTML = marker.title;
      markerListMeta.appendChild(markerListAddress);
      markerListMeta.classList.add(MURAL_LIST_META_CLASS)


      markerListImage.setAttribute('data-bg', marker.image);
      markerListImage.classList.add('lazyload', MURAL_LIST_IMAGE_CLASS);
      markerListButton.appendChild(markerListImage);
      markerListButton.appendChild(markerListMeta);

      markerListButton.addEventListener('click', openModal.bind(marker));
    });
  }

  function debouncedResize() {
    google.maps.event.trigger(map, 'resize');
  }

  document.addEventListener('lazybeforeunveil', function(e){
    var bg = e.target.getAttribute('data-bg');
    if(bg){
      e.target.style.backgroundImage = 'url(' + bg + ')';
    }
  });


  return {
    initMap: initMap
  }
})();

mtlMurals.initMap();
