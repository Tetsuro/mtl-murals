"use strict";var mtlMurals=function(){function e(){$.ajax({dataType:"json",cache:!1,url:n,success:function(e){a(e)}})}function t(){console.log("initMapping");var t={lat:45.5017,lng:-73.5673};r=new google.maps.Map(document.getElementById("map"),{zoom:13,center:t}),e()}function a(e){var t=e.features;t.forEach(function(e){var t=(e.properties.latitude,e.properties.longitude,e.properties.image),a=e.properties.adresse,n=new google.maps.Marker({position:{lat:e.properties.latitude,lng:e.properties.longitude},map:r,title:a});n.addListener("click",function(){console.log(this),o.html(this.title),i.attr("src",t)})})}var n="https://jsonp.afeld.me/?url=http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json",o=$(".mural-info__title"),i=$(".mural-info__image"),r={};return{initMap:t}}();mtlMurals.initMap();