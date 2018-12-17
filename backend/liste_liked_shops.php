<?php 
 require_once("connection.php");
 $id =$_POST["user_id"];
 $req = $conn->prepare("select shops.id,shops.nom,shops.x,shops.y,shops.image_path from shops inner join liked_shops on shops.id=liked_shops.shop_id where liked_shops.user_id= ?");
 $req->execute(array($id));
 $shops=$req->fetchAll();
 echo json_encode($shops); 



?>