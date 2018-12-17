<?php 
 require_once("connection.php");
 $id =$_POST["user_id"];
 $req = $conn->prepare("select shops.id,shops.nom,shops.x,shops.y,shops.image_path,disliked_shops.date_dislike from shops inner join disliked_shops on shops.id=disliked_shops.shop_id where disliked_shops.user_id= ?");
 $req->execute(array($id));
 $shops=$req->fetchAll();
 echo json_encode($shops); 



?>