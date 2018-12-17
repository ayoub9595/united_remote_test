<?php 
 require_once("connection.php");
 $req = $conn->prepare("select * from shops");
 $req->execute();
 $shops=$req->fetchAll();
 echo json_encode($shops);



?>