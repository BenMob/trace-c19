<%@ page import="com.tracecovid.entities.UserModel" %> 
<%@ page import="com.tracecovid.helpers.HtmlHelper" %> 
<% UserModel user = (UserModel)request.getSession().getAttribute("user"); %>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  </link>

  <title>TRACE-C19</title>

</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">TRACE-C19 🌍 </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <%= HtmlHelper.NavBar(request) %>
  </nav>
  <div class="container" id="about">
    <div class="row align-items-center">
      <div class="col headline"> <br>
        <h1 class="title">TRACE-C19 <span class="point"> 🌍</span></h1>
        <h3 class="description"><em>A web-application made for the community.</em></h3>
        <br>
        <h5 class="question"><strong>What is this?</strong></h5>
        <p class="mission">A community-led contact trace for COVID-19 patients. Also, this is to help users be aware of their surroundings and inform those about the risky places they must be avoided especially during the pandemic. By marking a pin with our custom map, it will help more and save lives. Protect yourself, your family, and your neighbors.</p>
        <br>
      </div>
    </div>
  </div>
  <br>
  <br>

  <div class="image">
    <img src="https://image.freepik.com/free-vector/woman-avoid-cover-mouth-with-paper-cartoon-covid-19-coronavirus-pandemic-prevention_24640-62047.jpg" alt="COVID-19" width="500" height="500">
  </div>
  <br>

  <footer class="py-3 bg-dark footer-copyright">
    <div class="container">
      <p class="text-center text-white">made with ❤️ by students who care</p>
    </div>
  </footer>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script src="script.js"></script>
</body>

</html>