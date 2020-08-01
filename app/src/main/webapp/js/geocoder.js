/***********************************************************************************************
    Objects of this class hold arguments that are expected by the fetchMapsApiPublic() function
    @constructor: lat, lng, zipcode(optional), date(optional)
    
    If action is display: The method will fetch the API and display the results on the screen
    If action is submit: The methol will fetch the API and submit the results to the server
 */
class PlotData{
    constructor(lat, lng, date = null, zip = null){
        this.lat = lat
        this.lng = lng
        this.zip = zip
        this.date = date
        this.action = 'display' // default
    }
    setAction(action){
        if (action !== 'display' && action !== 'submit'){
            console.log(action + ' is an invalid argument in PlotData.setAction()')
            return false
        }else{
            this.action = action
            return true
        }
    }
    setZip(zipCode){
        // TODO exception handling
        this.zip = zipCode
    }
    setDate(date){
        // TODO exception handling
        this.date = date
    }
    forSubmit(){
        return (this.date !== null && 
                this.zip !== null &&
                this.action === 'submit')
    }
    forDisplay(){
       return (this.action === 'display') 
    }
}


/*****************************************************
 * Given location data, this function updates the UI
 */
function displayResult(data){
    //TODO: Data type exception handling
    document.getElementById("address").innerHTML = data.Label
        ? data.Label
        : "";
}

/******************************************************************
* This method makes a POST request to the server at '/inLocation'
*/
function submitData(plotData){
    // TODO: Data type exception handling

    let formData = new FormData()
    formData.append('zip', plotData.zip)
    formData.append('latitude', plotData.lat)
    formData.append('longitude', plotData.lng)
    formData.append('date',plotData.date) 

    let parameters = new URLSearchParams
    for(const pair of formData) {
        parameters.append(pair[0], pair[1]);
    }

    fetch('/inLocation',{
       method:'POST',
       body: parameters
    }).then(() => {
       console.log('Location saved successfully!')
    }).catch((error) => {
       console.log(error)
    })
}

/******************************************************************
* This method request a location to the Maps API given lat/long
*/
function fetchMapsApiPrivate(lat, lng){
    const apiLink = 'https://maps.googleapis.com/maps/api/geocode/json?address&key=KEY&cal' + lat + ',' + lng
    const configuration = {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "en-RU,en-US;q=0.9,en;q=0.8",
              Connection: "keep-alive",
              Host: "maps.googleapis.com",
              Origin: "*",
              Referer: "*",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "cross-site",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
            }
    }
    
    fetch(apiLink, configuration)
        .then((response) => response.json())
        .then((json) => {
            const result = json.Response.View[0].Result[0].Location.Address
            plotData.setZip(result.PostalCode)
            if (plotData.forSubmit()) { // Data is to be submitted to the server
                submitData(plotData)

            } else if(plotData.forDisplay()){  // Data is to be displayed on the screen
                displayResult(result)

            } else {
                throw 'Oups!!! Cannot save data. "action" not set to "submit" or missing zip/date in plotData'
            }
        })
        .catch((error) => console.error(error))  
}

/*********************************************************
 *  This method fetches GoogleMaps API using a Public key
 */
 function fetchMapsApiPublic(plotData){
     console.log("Data " + JSON.stringify(plotData))
    const apiLink = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=aP66JN1Ux8DOVTI7U5nzU_KHIGB52cNNZkFiU3vidEc&mode=retrieveAddresses&prox=' + 
                    plotData.lat + ',' + plotData.lng
    const configuration = {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "en-RU,en-US;q=0.9,en;q=0.8",
              Connection: "keep-alive",
              Host: "maps.googleapis.com",
              Origin: "*",
              Referer: "*",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "cross-site",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
            }
    }
   fetch(apiLink, configuration)
        .then((response) => response.json())
        .then((json) => {
            const result = json.Response.View[0].Result[0].Location.Address
            plotData.setZip(result.PostalCode)
            if (plotData.forSubmit()) { // Data is to be submitted to the server 
                submitData(plotData)

                document.getElementById("searchTextField").placeholder = "Address ...";
                document.getElementById("searchTextField").value = "";

                document.getElementById('date').placeholder = 'Date ...'
                document.getElementById('date').value = ''

            } else if(plotData.forDisplay()){  // Data is to be displayed on the screen
                displayResult(result)

            } else {
                throw 'Oups!!! Cannot save data. "action" not set to "submit" or missing zip/date in plotData'
            }
        })
        .catch((error) => console.error(error))  
 }

let markers = {lat: "-33.84098643956351", lng: "151.2119460728884"};


/******************************************
 * Runs after the window has fully loaded
 */
window.onload = function () {
  function authHere() {
    var timeStamp = Math.round(new Date().getTime() / 1000);
    timeStamp += 86000;
    var queryString =
      "oauth_consumer_key=k3I2QTpSc0ovY3ulcBrHow&oauth_nonce=HERE-dd5586c7-91c5-4565-b728-1121e9daa731&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" +
      timeStamp +
      "&oauth_version=1.0";
    queryString = encodeURIComponent(queryString);
    var baseString =
      "POST&" +
      encodeURIComponent("https://account.api.here.com/oauth2/token") +
      "&" +
      queryString;
    var hmac = forge.hmac.create();
    hmac.start(
      "sha256",
      "_-NIaZ_sdS3_bD3n1K7CJVxwdvQSH6eDdb9Pnpvqd1iXS0Zo-fmIczNJXeD5vA8xWv2knf3wAkzOSXKCr2ul6g&"
    );
    hmac.update(baseString);
    var signature = hmac.digest().toHex();
    signature = btoa(signature);
    signature = encodeURIComponent(signature);

    var authStr =
      'OAuth oauth_consumer_key="k3I2QTpSc0ovY3ulcBrHow",oauth_nonce="HERE-dd5586c7-91c5-4565-b728-1121e9daa731",oauth_signature="' +
      signature +
      '",oauth_signature_method="HMAC-SHA256",oauth_timestamp="' +
      timeStamp +
      '",oauth_version="1.0"';
    fetch("https://account.api.here.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authStr
      },
      body: {
        grant_type: "client_credentials"
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success function
      showPosition,
      // Error function
      null,
      // Options. See MDN for details.
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  function showPosition(position) {
    temp_latLng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ); //Makes a latlng
    gMap.panTo(temp_latLng);
    marker.setPosition(temp_latLng);
    var lat, lng, address;
    geocoder.geocode({ latLng: marker.getPosition() }, function (
      results,
      status
    ) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = marker.getPosition().lat();
        lng = marker.getPosition().lng();
     
        /** Google API**/
        /** Google API works only this part of the program  **/
        let plotData = new PlotData(lat, lng) 
        fetchMapsApiPublic(plotData)
      }
    });
  }

  var mapOptions = {
    center: new google.maps.LatLng(markers.lat, markers.lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var infoWindow = new google.maps.InfoWindow();
  var latlngbounds = new google.maps.LatLngBounds();
  var geocoder = (geocoder = new google.maps.Geocoder());
  var gMap = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

  var data = markers;
  var myLatlng = new google.maps.LatLng(data.lat, data.lng);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: gMap,
    draggable: true,
    animation: google.maps.Animation.DROP
  });

  var autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (document.getElementById("searchTextField")),{})


  places = new google.maps.places.PlacesService(gMap);
  autocomplete.addListener("place_changed", onPlaceChanged);

 /*******************************************************
  * This chunck of code collects data from the address form
  * and process it to be submitted to the server by calling
  * fetchMapsApiPublic()
  */
  const addressForm = document.getElementById('addressForm')
  addressForm.addEventListener('submit', (e) => {
      e.preventDefault()
      var place = autocomplete.getPlace()
      if (place.geometry){
///////////////////////////////// TODO: Extract this chunk in its own function to avoid redundancy ///////////////////////////
          gMap.panTo(place.geometry.location);
          startLocation = place.geometry.location;

          // Setting current marker position
          marker.setPosition(
            new google.maps.LatLng(startLocation.lat(), startLocation.lng())
          );
          geocoder.geocode({ latLng: marker.getPosition() }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                    const lat = marker.getPosition().lat();
                    const lng = marker.getPosition().lng();
                    const date = document.getElementById('date').value

                    let plotData = new PlotData(lat, lng)
                    plotData.setDate(date)
                    plotData.setAction('submit')
                    
                    /**Fetch API**/
                    fetchMapsApiPublic(plotData)
              } else {
                    console.error('Oups!!! google.maps.GeocoderStatus not OK.')
            }
         });
//////////////////////////////////////////////////////////////////////////////////////////////////   
      }else{
          console.error('Oups!!! cannot Submit: place.geometry is false.')
      }  
  })

  function onPlaceChanged() {
    var place = autocomplete.getPlace();  // The place entered in the input box
    if (place.geometry) {
///////////////////////////////// TODO: Extract this chunk in its own function to avoid redundancy ///////////////////////////    
      //document.getElementById("searchTextField").value = "";
      gMap.panTo(place.geometry.location);
      startLocation = place.geometry.location;

     // Setting current marker position
      marker.setPosition(
        new google.maps.LatLng(startLocation.lat(), startLocation.lng())
      );

      var lat, lng
      geocoder.geocode({ latLng: marker.getPosition() }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = marker.getPosition().lat();
            lng = marker.getPosition().lng();
            
            /**Fetch API**/
            /** If Google API Is Inputted, Address Is Not Automatically Displayed With Long And Lat **/
            let plotData = new PlotData(lat, lng) 
            fetchMapsApiPublic(plotData)
        }
      });
//////////////////////////////////////////////////////////////////////////////////////////////////
    } else {
      document.getElementById("searchTextField").placeholder = "Enter a city";
      document.getElementById("searchTextField").value = "";
    }
  }

  (function (marker, data) {
    google.maps.event.addListener(gMap, "click", function (event) {
      startLocation = event.latLng;
      marker.setPosition(
        new google.maps.LatLng(startLocation.lat(), startLocation.lng())
      );
      var lat, lng, address;
      geocoder.geocode({ latLng: marker.getPosition() }, function (
        results,
        status
      ) {
        if (status == google.maps.GeocoderStatus.OK) {
          lat = marker.getPosition().lat();
          lng = marker.getPosition().lng();

          document.getElementById("lat").innerHTML = lat;
          document.getElementById("lng").innerHTML = lng;

          /**Fetch API**/
          let plotData = new PlotData(lat, lng) 
          fetchMapsApiPublic(plotData)
        }
      });
    });

    google.maps.event.addListener(marker, "dragend", function (e) {
      var lat, lng, address;
      geocoder.geocode({ latLng: marker.getPosition() }, function (
        results,
        status
      ) {
        if (status == google.maps.GeocoderStatus.OK) {
          lat = marker.getPosition().lat();
          lng = marker.getPosition().lng();

          /**Fetch API**/
          let plotData = new PlotData(lat, lng) 
          fetchMapsApiPublic(plotData)
        }
      });
    });
  })(marker, data);
};



