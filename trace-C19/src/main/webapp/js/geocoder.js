(function () {
  var placesAutocomplete = places({
    container: document.querySelector("#input-map"),
    type: "address"
  });

  var map = L.map("map-example-container", {
    scrollWheelZoom: false,
    zoomControl: true
  });

  var osmLayer = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      minZoom: 1,
      maxZoom: 18,
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }
  );

  var markers = [];

  map.setView(new L.LatLng(0, 0), 1);
  map.addLayer(osmLayer);

  placesAutocomplete.on("suggestions", handleOnSuggestions);
  placesAutocomplete.on("cursorchanged", handleOnCursorchanged);
  placesAutocomplete.on("change", handleOnChange);
  placesAutocomplete.on("clear", handleOnClear);

  function handleOnSuggestions(e) {
    markers.forEach(removeMarker);
    markers = [];

    if (e.suggestions.length === 0) {
      map.setView(new L.LatLng(0, 0), 1);
      return;
    }

    e.suggestions.forEach(addMarker);
    findBestZoom();
  }

  function handleOnChange(e) {
    markers.forEach(function (marker, markerIndex) {
      if (markerIndex === e.suggestionIndex) {
        markers = [marker];
        marker.setOpacity(1);
        findBestZoom();
      } else {
        removeMarker(marker);
      }
    });
    console.log("e", e);
    document.querySelector("#form-full-address").value =
      e.suggestion.value || "";
    document.querySelector("#form-latitude").value =
      e.suggestion.latlng.lat || "";
    document.querySelector("#form-longitude").value =
      e.suggestion.latlng.lng || "";
    document.querySelector("#form-type").value = e.suggestion.type || "";
  }

  function handleOnClear() {
    map.setView(new L.LatLng(0, 0), 1);
    markers.forEach(removeMarker);
  }

  function handleOnCursorchanged(e) {
    markers.forEach(function (marker, markerIndex) {
      if (markerIndex === e.suggestionIndex) {
        marker.setOpacity(1);
        marker.setZIndexOffset(1000);
      } else {
        marker.setZIndexOffset(0);
        marker.setOpacity(0.5);
      }
    });
  }

  function addMarker(suggestion) {
    var marker = L.marker(suggestion.latlng, { opacity: 0.4 });
    marker.addTo(map);
    markers.push(marker);
  }

  function removeMarker(marker) {
    map.removeLayer(marker);
  }

  function findBestZoom() {
    var featureGroup = L.featureGroup(markers);
    map.fitBounds(featureGroup.getBounds().pad(0.5), { animate: false });
  }
})();
