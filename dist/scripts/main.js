"use strict";var mtlMurals=function(){function e(){m=new google.maps.Map(document.getElementById("map")),$.when(t()).done(function(){p.html(g),c.html(g),i(),m.addListener("dragend",n),m.addListener("zoom_changed",n)})}function t(){return $.ajax({dataType:"json",cache:!1,url:"https://proxy.hackeryou.com",data:{reqUrl:o,xmlToJSON:!1},success:a})}function a(e){var t=e.features;g=t.length;var a=new google.maps.LatLngBounds;t.forEach(function(e,t){var n=e.properties.latitude,i=e.properties.longitude,o=e.properties.image,l=e.properties.adresse,d=(e.properties.artiste,e.properties.annee,new google.maps.Marker({position:{lat:e.properties.latitude,lng:e.properties.longitude},map:m,title:l,animation:google.maps.Animation.DROP,id:t})),u=new google.maps.LatLng(n,i);a.extend(u),f.push(d),d.addListener("click",function(){r.html(l),s.attr("src",o)})}),m.fitBounds(a)}function n(){var e=m.getBounds();h=0,f.forEach(function(t){e.contains(t.position)?($("[data-index="+t.id+"]").show(),h++):$("[data-index="+t.id+"]").hide()}),p.html(h)}function i(){f.forEach(function(e){var t=document.createElement("li"),a=document.createElement("button");t.classList.add(d),t.setAttribute("data-index",e.id),l[0].appendChild(t),t.appendChild(a),a.classList.add(u),a.innerHTML=e.title})}var o="http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json",r=$(".mural-info__title"),s=$(".mural-info__image"),l=$(".mural-list"),d="mural-list__item",u="mural-list__button",c=$(".mural-count__total"),p=$(".mural-count__visible"),m={},f=[],g=0,h=void 0;return{initMap:e}}();mtlMurals.initMap();