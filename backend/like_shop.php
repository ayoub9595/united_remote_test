<?php 
require_once"connection.php";
$user_id = $_POST["user_id"];
$shop_id = $_POST["shop_id"];

$req = $conn->prepare("insert  into liked_shops (user_id,shop_id) values (?,?) ");
$req->execute(array($user_id,$shop_id));
echo "success"; 


?>