
<?php
// 1:: Start the session
session_start();
?>


<?php

//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'GET')
$theMessage ="";
{
// need to process

// by default when making a request it is a get request 

// $request = $_SERVER['REQUEST_URI']; // THE WHOLE URL (with queries)
// echo("the request: ".$request);
 
if(isset($_GET['username'])){
    // there is a page reload everytime
    echo("<br>form is being processed ");
    $user = $_GET['username'];
    $pass = $_GET['password'];

    $_SESSION["username"] = $user;
    $_SESSION["password"] = $pass;
  
    // output something with these values::
 
 // <!-- everything that is send thorugh the get request is a srting -->
 // if(intval($fnum>60)){
 //   $theMessage = "You chose a number greater than 60";
 // }
 // else
 // {
 //     $theMessage = "You chose a number less than 60";
 // }

//   if u put this here it will clear the data but it also wont send the message so u need to use sessions to maintain a state of users input and actions
$_SESSION['message'] = $theMessage;
  
header("Location:signup.php");


 
  }
}
?>





<!DOCTYPE html>
<html>
<head>
<title>INPUT to GET in php</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Acme&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="main.css">


<script>
    function checkPassword() {
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
      var error = document.getElementById('error');

      if (password !== confirmPassword) {
        error.textContent = 'Passwords do not match!';
      } else {
        error.textContent = '';
      }
    }

    </script>
</head>


<body>
 


<div class = "wrapper">  

<div class="background-image"></div>

  <div class="form-box sign up" ><div>

  <h2> Signup </h2>
  <!-- making a get request. encoded in the url -->
  <!-- dont have to put the script in the same page! action can be put to another script -->
  <!-- everything that is send thorugh the get request is a srting -->
<form method="get" action="signup.php"> 
 
<!-- name fields will become your keys -->
<!-- when sumbmit is pressed it gets the key encodes it using "get" and sends it to signup.php -->

<div class="input-box">
  <span class="icon"> <ion-icon name="person-circle-outline"></ion-icon>  </span> 
  <input type ="email" size="24" maxlength = "40"  name = "username" required>
  <label>Email address:</label>
</div>

<div class="input-box">
  <span class="icon">  <ion-icon name="eye"></ion-icon> </span> 
  <input type ="password" size="24" maxlength = "40"  name = "password" id="password" required oninput="checkPassword()">
  <label>Password:</label>
</div>

<div class="input-box">
  <span class="icon"> <ion-icon name="eye"></ion-icon>  </span> 
  <input type ="password" size="24" maxlength = "40"  name = "confirmPassword" id="confirmPassword" required oninput="checkPassword()">
  <label>Confirm password:</label>
</div>

<div id="error" style="color: red;"></div>

<div class="remember-forget">
<input type="checkbox"> 
<label> I agree to the terms & conditions </label>
</div>

<div class="login-signup">
<p> <a href= "login.php" class="register" > Already have an account? Login here </a>
</div>
  
<button type = "submit" class="btn" name = "submit" value = "send"  id =buttonS > Submit </button>
</form>

<div style = "background:rgba(149, 0, 153,0.75);color:white";><?php echo($theMessage)?> </div>

</div>

<script src= "script.js"> </script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

</body>
</html>



<!-- should the client side be doing this or the server side -->