/***************************************************************
 * Objects of this class serve to hold map coordinates (lat/lng) 
 */
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
/*********************************************************************
 * This class contains static methods that manipulate the zip form and 
 * the Map
 */

class Process{
    /* Display the map on the UI and center it in the United States */
    static initMap(){
        let initPoint = new Plot(42.332154, -824.719362)
        let map = new google.maps.Map(document.getElementById('map'),{
            zoom: 4, 
            center: initPoint, 
            mapTypeId: google.maps.MapTypeId.ROADMAP
        })
    }

   /*****************************************************************
    * Given a from, this function reads its content and returns them
    *  @param: form
    *  @returns: searchParams
    */
    static readForm(form){
        const formData = new FormData(form);
        const searchParams = new URLSearchParams();

        for(const pair of formData) {
            searchParams.append(pair[0], pair[1]);
        }
        return searchParams
    }
   /***************************************************************************
    * Given an array of lat/lng objects this function adds markers on based on
    * each lat/lng object in the array
    */
    static plotCoordinates(coordinates){
        if(coordinates.length == 0){
            console.log('Missing coordinates.')
        }else{
            let map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 12, 
                    center: coordinates[0], 
                    mapTypeId: google.maps.MapTypeId.ROADMAP})

            // Plots each point
            coordinates.forEach((coordinate) => {
                let marker = new google.maps.Marker({position: coordinate, map: map});
            })          
        }
    }
    /********************************************************************
     * This methods sends a POST request to the server with a zip code 
     * and get coordinates data as a response 
     * @param: data (zip, lat, lng, date) 
     */
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
            let zipCode = document.getElementById('current-zip')
            if(jsonData.length > 0){
                zipCode.innerHTML = jsonData[0].zip
                const coordinates = this.getCoordinates(jsonData)
                this.plotCoordinates(coordinates)
            }else{
                zipCode.innerHTML = 'No Result Found!'
            }
        }).catch(function(error) {
            console.error(error);
        })
    }
    /****************************************************************
     * This method extracts lat/lngs from the server response object
     * @param: results
     * @returns: coordinates
     */
    static getCoordinates(results){
        let coordinates = []
        results.forEach(location => {
            let coordinate = new Plot(parseFloat(location.latitude), parseFloat(location.longitude))
            coordinates.push(coordinate)                 
        })
        return coordinates
    }
}

/******************************************
 * Start
 */
window.onload = function () {
    
    // Displays the Map on the screen centered in the USA
    Process.initMap()

    // Listen to the zip form for a submission
    const zipForm = document.getElementById('zipForm')
    zipForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = Process.readForm(zipForm)
        Process.submitForm(formData)

    }) 
}