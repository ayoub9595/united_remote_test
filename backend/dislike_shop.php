<?php 
require_once"connection.php";
$user_id = $_POST["user_id"];
$shop_id = $_POST["shop_id"];
$date_dislike = $_POST["date_dislike"];

$req = $conn->prepare("insert  into disliked_shops (user_id,shop_id,date_dislike) values (?,?,?) ");
$req->execute(array($user_id,$shop_id,$date_dislike));
echo "success"; 


?>