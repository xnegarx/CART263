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
  header("Location:login.php");


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
</head>

<body>
 


<div class = "wrapper">  

<div class="background-image"></div>

  <div class="form-box login" ><div>

  <h2> Login </h2>
  <!-- making a get request. encoded in the url -->
  <!-- dont have to put the script in the same page! action can be put to another script -->
  <!-- everything that is send thorugh the get request is a srting -->
<form method="get" action="login.php"> 
 
<!-- name fields will become your keys -->
<!-- when sumbmit is pressed it gets the key encodes it using "get" and sends it to login.php -->

<div class="input-box">
  <span class="icon"> <ion-icon name="person-circle-outline"></ion-icon>  </span> 
  <input type ="email" size="24" maxlength = "40"  name = "username" required>
  <label>Email address:</label>
</div>
<div class="input-box">
  <span class="icon">  <ion-icon name="eye"></ion-icon> </span> 
  <input type ="password" size="24" maxlength = "40"  name = "password" required>
  <label>Password:</label>
</div>

<div class="remember-forget">
<input type="checkbox"> 
<label> Remember me! </label>
<a href= "#" > Forget Password? </a>
</div>

<div class="login-signup">
<p> <a href= "signup.php" class="register" > Don't have an account? Signup here </a>
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