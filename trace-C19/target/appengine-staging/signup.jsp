<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style-signup.css">
  </link>

  <title>TRACE-C19</title>

</head>

<body class="signup-body">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">TRACE-C19 🌍 </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="signup.html">Log In/Sign Up</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" target="_">Contribute</a>
        </li>
      </ul>
    </div>
  </nav>

    <div class="signup">
      <header class="signup__header">

        <span class="signup__icon"> 🌍</span>
        <h1 class="signup__title">Sign Up</h1>
        <br>
        <p class="signup__description">Fill out the form to join the community. Together we could make a difference.</p>
      </header>

      <form class="form" action="add-user" method="POST">

    <%
        if(request.getAttribute("error") != null) {
            %>
            <h4><%= request.getAttribute("error") %></h4>
            <%
        }
    %>
        <div class="form__group">
          <input type="text" placeholder="Username" class="form__input" name="NewUser" />
        </div>

        <div class="form__group">
          <input type="email" placeholder="Email" class="form__input" name="NewEmail" />
        </div>

        <div class="form__group">
          <input type="password" placeholder="Password" class="form__input" name="NewPass" />
        </div>

        <div class="form__group">
          <input type="password" placeholder="Password" class="form__input" name="NewPassConfirmation" />
        </div>

        <button class="btn" type="submit">Register</button>
      </form>
    </div>

    <p class="signup__link">Have an account? <a href="login.jsp" class="signup__clickedlink">Login</a></p>

    <br>
     <footer class="py-3 bg-dark footer-copyright">
    <div class="container">
      <p class="text-center text-white">made with ❤️ by students who care</p>
    </div>
  </footer>
    <!-- <footer class="py-3 bg-dark footer-copyright">
      <div class="container">
        <p class="text-center text-white">made with ❤️ by students who care</p>
      </div>

    </footer> -->

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- Javascript -->
    <script src="js/signup.js"></script>
  </body>

</html>