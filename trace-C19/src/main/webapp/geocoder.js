var markers = {
  lat: "-33.84098643956351",
  lng: "151.2119460728884"
};

window.onload = function () {
  function authHere() {
    var timeStamp = Math.round(new Date().getTime() / 1000);
    timeStamp += 86000;
    var queryString =
      "oauth_consumer_key=k3I2QTpSc0ovY3ulcBrHow&oauth_nonce=HERE-dd5586c7-91c5-4565-b728-1121e9daa731&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" +
      timeStamp +
      "&oauth_version=1.0";
    queryString = encodeURIComponent(queryString);
    var baseString =
      "POST&" +
      encodeURIComponent("https://account.api.here.com/oauth2/token") +
      "&" +
      queryString;
    var hmac = forge.hmac.create();
    hmac.start(
      "sha256",
      "_-NIaZ_sdS3_bD3n1K7CJVxwdvQSH6eDdb9Pnpvqd1iXS0Zo-fmIczNJXeD5vA8xWv2knf3wAkzOSXKCr2ul6g&"
    );
    hmac.update(baseString);
    var signature = hmac.digest().toHex();
    signature = btoa(signature);
    signature = encodeURIComponent(signature);

    var authStr =
      'OAuth oauth_consumer_key="k3I2QTpSc0ovY3ulcBrHow",oauth_nonce="HERE-dd5586c7-91c5-4565-b728-1121e9daa731",oauth_signature="' +
      signature +
      '",oauth_signature_method="HMAC-SHA256",oauth_timestamp="' +
      timeStamp +
      '",oauth_version="1.0"';
    fetch("https://account.api.here.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authStr
      },
      body: {
        grant_type: "client_credentials"
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success function
      showPosition,
      // Error function
      null,
      // Options. See MDN for details.
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  function showPosition(position) {
    temp_latLng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ); //Makes a latlng
    gMap.panTo(temp_latLng);
    marker.setPosition(temp_latLng);
    var lat, lng, address;
    geocoder.geocode({ latLng: marker.getPosition() }, function (
      results,
      status
    ) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = marker.getPosition().lat();
        lng = marker.getPosition().lng();

        document.getElementById("lat").innerHTML = lat;
        document.getElementById("lng").innerHTML = lng;
     
      /** Google API**/
      /** Google API works only this part of the program (Lines 93 - 142) **/
     
		fetch(
         /** "https://maps.googleapis.com/maps/api/geocode/json?address&key=AIzaSyBt_AbMqe-C-wj5B4XMJgLclQ8qTgEtrKE&cal" **/ +
            lat +
            "," +
            lng,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "en-RU,en-US;q=0.9,en;q=0.8",
              Connection: "keep-alive",
              Host: "maps.googleapis.com",
              Origin: "*",
              Referer: "*",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "cross-site",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
            }
          }
        )
          .then((response) => response.json())
          .then((json) => {
            data = json.Response.View[0].Result[0].Location.Address;
            document.getElementById("address").innerHTML = data.Label
              ? data.Label
              : "";
            document.getElementById("country").innerHTML = data.Country
              ? data.Country
              : "";
            document.getElementById("county").innerHTML = data.County
              ? data.County
              : "";
            document.getElementById("state").innerHTML = data.State
              ? data.State
              : "";
            document.getElementById("city").innerHTML = data.City
              ? data.City
              : "";
            document.getElementById("zipcode").innerHTML = data.PostalCode
              ? data.PostalCode
              : "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  var mapOptions = {
    center: new google.maps.LatLng(markers.lat, markers.lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var infoWindow = new google.maps.InfoWindow();
  var latlngbounds = new google.maps.LatLngBounds();
  var geocoder = (geocoder = new google.maps.Geocoder());
  var gMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

  var data = markers;
  var myLatlng = new google.maps.LatLng(data.lat, data.lng);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: gMap,
    draggable: true,
    animation: google.maps.Animation.DROP
  });

  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (document.getElementById(
      "searchTextField"
    )),
    {}
  );
  places = new google.maps.places.PlacesService(gMap);

  autocomplete.addListener("place_changed", onPlaceChanged);

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      document.getElementById("searchTextField").value = "";
      gMap.panTo(place.geometry.location);
      startLocation = place.geometry.location;
      marker.setPosition(
        new google.maps.LatLng(startLocation.lat(), startLocation.lng())
      );
      var lat, lng, address;
      geocoder.geocode({ latLng: marker.getPosition() }, function (
        results,
        status
      ) {
        if (status == google.maps.GeocoderStatus.OK) {
          lat = marker.getPosition().lat();
          lng = marker.getPosition().lng();

          document.getElementById("lat").innerHTML = lat;
          document.getElementById("lng").innerHTML = lng;
          
          /**API**/
          /** If Google API Is Inputted, Address Is Not Automatically Displayed With Long And Lat**/

          fetch(
            "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=aP66JN1Ux8DOVTI7U5nzU_KHIGB52cNNZkFiU3vidEc&mode=retrieveAddresses&prox=" +
              lat +
              "," +
              lng,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-RU,en-US;q=0.9,en;q=0.8",
                Connection: "keep-alive",
                Host: "geocoder.ls.hereapi.com",
                Origin: "*",
                Referer: "*",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
              }
            }
          )
            .then((response) => response.json())
            .then((json) => {
              data = json.Response.View[0].Result[0].Location.Address;
              document.getElementById("address").innerHTML = data.Label
                ? data.Label
                : "";
              document.getElementById("country").innerHTML = data.Country
                ? data.Country
                : "";
              document.getElementById("county").innerHTML = data.County
                ? data.County
                : "";
              document.getElementById("state").innerHTML = data.State
                ? data.State
                : "";
              document.getElementById("city").innerHTML = data.City
                ? data.City
                : "";
              document.getElementById("zipcode").innerHTML = data.PostalCode
                ? data.PostalCode
                : "";
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      document.getElementById("searchTextField").placeholder = "Enter a city";
      document.getElementById("searchTextField").value = "";
    }
  }

  (function (marker, data) {
    google.maps.event.addListener(gMap, "click", function (event) {
      startLocation = event.latLng;
      marker.setPosition(
        new google.maps.LatLng(startLocation.lat(), startLocation.lng())
      );
      var lat, lng, address;
      geocoder.geocode({ latLng: marker.getPosition() }, function (
        results,
        status
      ) {
        if (status == google.maps.GeocoderStatus.OK) {
          lat = marker.getPosition().lat();
          lng = marker.getPosition().lng();

          document.getElementById("lat").innerHTML = lat;
          document.getElementById("lng").innerHTML = lng;

          /**API**/

          fetch(
            "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=aP66JN1Ux8DOVTI7U5nzU_KHIGB52cNNZkFiU3vidEc&mode=retrieveAddresses&prox=" +
              lat +
              "," +
              lng,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-RU,en-US;q=0.9,en;q=0.8",
                Connection: "keep-alive",
                Host: "geocoder.ls.hereapi.com",
                Origin: "*",
                Referer: "*",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
              }
            }
          )
            .then((response) => response.json())
            .then((json) => {
              data = json.Response.View[0].Result[0].Location.Address;
              document.getElementById("address").innerHTML = data.Label
                ? data.Label
                : "";
              document.getElementById("country").innerHTML = data.Country
                ? data.Country
                : "";
              document.getElementById("county").innerHTML = data.County
                ? data.County
                : "";
              document.getElementById("state").innerHTML = data.State
                ? data.State
                : "";
              document.getElementById("city").innerHTML = data.City
                ? data.City
                : "";
              document.getElementById("zipcode").innerHTML = data.PostalCode
                ? data.PostalCode
                : "";
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    google.maps.event.addListener(marker, "dragend", function (e) {
      var lat, lng, address;
      geocoder.geocode({ latLng: marker.getPosition() }, function (
        results,
        status
      ) {
        if (status == google.maps.GeocoderStatus.OK) {
          lat = marker.getPosition().lat();
          lng = marker.getPosition().lng();

          document.getElementById("lat").innerHTML = lat;
          document.getElementById("lng").innerHTML = lng;

          /**API**/
          fetch(
            "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=aP66JN1Ux8DOVTI7U5nzU_KHIGB52cNNZkFiU3vidEc&mode=retrieveAddresses&prox=" +
              lat +
              "," +
              lng,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-RU,en-US;q=0.9,en;q=0.8",
                Connection: "keep-alive",
                Host: "geocoder.ls.hereapi.com",
                Origin: "*",
                Referer: "*",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
              }
            }
          )
            .then((response) => response.json())
            .then((json) => {
              data = json.Response.View[0].Result[0].Location.Address;
              document.getElementById("address").innerHTML = data.Label
                ? data.Label
                : "";
              document.getElementById("country").innerHTML = data.Country
                ? data.Country
                : "";
              document.getElementById("county").innerHTML = data.County
                ? data.County
                : "";
              document.getElementById("state").innerHTML = data.State
                ? data.State
                : "";
              document.getElementById("city").innerHTML = data.City
                ? data.City
                : "";
              document.getElementById("zipcode").innerHTML = data.PostalCode
                ? data.PostalCode
                : "";
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  })(marker, data);
};

