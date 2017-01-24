"use strict";function debounce(e,t,a){var n;return function(){var i=this,r=arguments,o=function(){n=null,a||e.apply(i,r)},l=a&&!n;clearTimeout(n),n=setTimeout(o,t),l&&e.apply(i,r)}}var mtlMurals=function(){function e(){y=new google.maps.Map(document.getElementById("map")),window.addEventListener("resize",debounce(o,300)),t().then(function(e){return y.addListener("dragend",i),y.addListener("zoom_changed",i),y.addListener("resize",i),e}).then(a).then(r).then(function(){b.html(E),v.html(E)})}function t(){return new Promise(function(e,t){$.ajax({dataType:"json",cache:!1,url:"https://proxy.hackeryou.com",data:{reqUrl:l,xmlToJSON:!1},success:e,error:t})})}function a(e){var t=e.features;E=t.length;var a=new google.maps.LatLngBounds;t.forEach(function(e,t){var i=e.properties.latitude,r=e.properties.longitude,o=e.properties.image,l=e.properties.adresse,s=e.properties.artiste,d=e.properties.annee,u=new google.maps.Marker({position:{lat:e.properties.latitude,lng:e.properties.longitude},map:y,title:l,animation:google.maps.Animation.DROP,id:t,image:o,address:l,artist:s,year:d}),m=new google.maps.LatLng(i,r);a.extend(m),w.push(u),u.addListener("click",n)}),y.fitBounds(a),i()}function n(){f.html(this.address),h.html(this.artist),_.html(this.year),g.attr("src",this.image),L.open()}function i(){var e=y.getBounds();x=0,w.forEach(function(t){e.contains(t.position)?($("[data-index="+t.id+"]").show(),x++):$("[data-index="+t.id+"]").hide()}),b.html(x)}function r(){w.forEach(function(e){var t=document.createElement("li"),a='\n        <li class="'+d+'" data-index="'+e.id+'">\n          <button class="'+u+'">\n            <div data-bg="'+e.image+'" class="lazyload '+c+'"></div>\n            <p class='+m+'>\n              <p class="'+p+'">'+e.title+"</p>\n            </p>\n          </button>\n        </li>\n      ";t.innerHTML=a;var i=$(t).find("."+u)[0];s[0].appendChild(t),i.addEventListener("click",n.bind(e))})}function o(){google.maps.event.trigger(y,"resize")}var l="http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json",s=($(".mural-info__title"),$(".mural-info__image"),$(".mural-list")),d="mural-list__item",u="mural-list__button",m="mural-list__meta",c="mural-list__image-wrapper",p="mural-list__address",g=$(".mural-modal__image"),f=$(".mural-modal__heading"),h=$(".mural-modal__meta-artist"),_=$(".mural-modal__meta-year"),v=$(".mural-count__total"),b=$(".mural-count__visible"),L=$("[data-remodal-id=modal]").remodal(),y={},w=[],E=0,x=void 0;return document.addEventListener("lazybeforeunveil",function(e){var t=e.target.getAttribute("data-bg");t&&(e.target.style.backgroundImage="url("+t+")")}),document.addEventListener("closed",".remodal",function(e){console.log("Clogins")}),{initMap:e}}();mtlMurals.initMap();