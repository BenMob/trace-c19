class Plot{
    constructor(lat, lng){
        this.lat = lat
        this.lng = lng
    }
    updateLatLng(lat, lng){
        this.lat = lat
        this.lng = lng
    }
}

class Process{
    // ************************ Initalize the map 
    static initMap(){
        let initPoint = new Plot(42.332154, -824.719362)
        let map = new google.maps.Map(document.getElementById('map'),{
            zoom: 5, 
            center: initPoint, 
            mapTypeId: google.maps.MapTypeId.ROADMAP
        })
    }

    // ************************ Given a from, this funtion reads its content
    static readForm(form){
        const formData = new FormData(form);
        const searchParams = new URLSearchParams();

        for(const pair of formData) {
            searchParams.append(pair[0], pair[1]);
        }
        return searchParams
    }
    // ************************ Given an array of points thei function plots them on the map
    static plotCoordinates(coordinates){
        if(coordinates.length == 0){
            console.log('Missing coordinates.')
        }else{
            let map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 15, 
                    center: coordinates[0], 
                    mapTypeId: google.maps.MapTypeId.ROADMAP})

            // Plots each point
            coordinates.forEach((coordinate) => {
                let marker = new google.maps.Marker({position: coordinate, map: map});
            })          
        }
    }

    static submitForm(data){
        fetch('/outLocation', {
            method: 'POST', 
            body: data
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            /*
                TODO verify whether the results come from a single zipcode or multiple zipcodes,
                then display them the screen accordingly
            */
            document.getElementById('current-zip').innerHTML = jsonData[0].zip
            const coordinates = this.getCoordinates(jsonData)
            this.plotCoordinates(coordinates)
        }).catch(function(error) {
            console.error(error);
        })
    }

    static getCoordinates(results){
        let coordinates = []
        results.forEach(location => {
            let coordinate = new Plot(parseFloat(location.latitude), parseFloat(location.longitude))
            coordinates.push(coordinate)                 
        })
        return coordinates
    }
}


/*********************************************************
 *Takes an array of Plot objects and plots them on the map
 */
function plotPoints(points) {
    let map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 15, 
          center: points[0], 
          mapTypeId: google.maps.MapTypeId.ROADMAP}
        )

    points.forEach((point) => {
        let marker = new google.maps.Marker({position: point, map: map});
    })
}

/******************************************
 * Runs after the window has fully loaded
 */
window.onload = function () {
 
    // Initialize the map on the UI
    Process.initMap()

    // Listen to the zip form for a submission
    const zipForm = document.getElementById('zipForm')
    zipForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = Process.readForm(zipForm)
        Process.submitForm(formData)

    }) 

/*
    let initPoint = new Plot(42.332154, -824.719362)
    var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 5, center: initPoint, mapTypeId: google.maps.MapTypeId.ROADMAP});

    // Listening to the form
    const zipForm = document.getElementById('zipForm'); 
    zipForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const formData = new FormData(zipForm);
        const searchParams = new URLSearchParams();

        for(const pair of formData) {
            searchParams.append(pair[0], pair[1]);
        }

        fetch('/outLocation', {
        method: 'POST', 
        body: searchParams
        }).then(function(response) {
            return response.json();

        }).then(function(data) {
            document.getElementById('current-zip').innerHTML = data[0].zip
            let points = []
            data.forEach(location => {
                let point = new Plot(parseFloat(location.latitude), parseFloat(location.longitude))
                points.push(point)                 
            })
            plotPoints(points)
        }).catch(function(error) {
            console.error(error);
        })
    });*/
}