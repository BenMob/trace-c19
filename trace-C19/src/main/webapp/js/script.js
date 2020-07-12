/*
TODO: Use fetch() to send a POST request at "/outLocation" with a ZIP Code as paramter and 
you should reive a Json Object with all the locations (lat/long) matching that zip code.
*/

//  const myForm = document.getElementById('zipForm'); 

//  zipForm.addEventListener('submit', function(e) {

//      e.preventDefault();

//      const formData = new FormData(this);
//      fetch('OutgoingLocationServlet.java', {
//          method: 'post',
//          body: formData
//          .then(function(response) {
//              return response.text();

//          }) .then(function(text) {
//              console.log(text);

//          }) .catch(function(error) {
//             console.error(error);
//          })
         
     
//      });
//  })


const myForm = document.getElementById('zipForm'); 

myForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for(const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch('http://localhost:8080/outLocation', {
    method: 'post', 
    body: searchParams
     }).then(function(response) {
         return response.text();

     }).then(function(text) {
         console.log(text);
     }).catch(function(error) {
         console.error(error);
     })

});