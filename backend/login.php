<?php 
 require_once("connection.php");
 $email = $_POST["email"];
 $password = $_POST["password"];
 $req = $conn->prepare("select * from users where email=? and password=? limit 1 ");
 $req->execute( array($email, md5($password)) );
 $users = $req->fetchAll();

 echo json_encode($users);
 

?>