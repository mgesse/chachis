<?php
include 'conBBDD.php';
$data = json_decode($_REQUEST["q"]);
//print_r($data);
$id=$data->id;
$res;
$bd=openDB();
			$sql = $bd->prepare("SELECT idenemy, idChachi, level FROM fixedenemies WHERE idenemy= ? ;");
			$sql->bindParam(1, $id, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				foreach ($resultat as $fila){
					$res=$fila;
				}	
			}else{
				$res=null;
			}	
			
$bd=null;

echo json_encode($res);

?>