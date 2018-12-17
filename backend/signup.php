<?php 
require_once("connection.php");
$email = $_POST["email"];
$password = $_POST["password"];
$cordX = $_POST["cordX"];
$cordY = $_POST["cordY"];

$req = $conn->prepare("select * from users where email=? ");
$req->execute(array($email));
$emails = $req->fetchAll();
if (count($emails)>0)
   echo "failure";
else {
    $req = $conn->prepare("insert  into users (email,password,x,y) values (?,?,?,?) ");
    $req->execute(array($email,md5($password),$cordX,$cordY));
    $req = $conn->prepare("select * from users where email = ?");
    $req->execute(array($email));
    $user = $req->fetchAll();
    echo json_encode($user);
}   



?>