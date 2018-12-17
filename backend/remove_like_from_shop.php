<?php 

require_once("connection.php");
$user_id = $_POST["user_id"];
$shop_id = $_POST["shop_id"];
$req = $conn->prepare("delete from liked_shops where user_id = ? and shop_id = ? ");
$req->execute(array($user_id,$shop_id));
echo "success"

?>