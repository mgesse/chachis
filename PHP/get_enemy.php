<?php
//include 'conBBDD.php';
$data = json_decode($_REQUEST["q"]);
//print_r($data);
$nivell=$data->nivell;
$id=$data->id;
include  'funcions_login.php';

//$lvl=$data->lvl;
//$type=$data->idChachi;
//print_r($data);
$mov=get_last_four_movs($nivell,$id);
$movs;
for($i=0;$i<count($mov);$i++){
	if($mov[$i]==999){
		
	}else{
		$movs[$i]=asda($mov[$i]);
	}
}
			
			


echo json_encode($movs);

function asda($id){
	$bd=openDB();
			$sql = $bd->prepare("SELECT idmove,moveName, description, idType, PM, power, accuracy, idEffect FROM moves WHERE idmove = ? ;"); //, description, idType, PM, power, accuracy, idEffect
			$sql->bindParam(1, $id, PDO::PARAM_INT);
			$sql->execute();
			$resultat2 = $sql->fetchAll(PDO::FETCH_ASSOC);
			//echo "<br>";
			//print_r($resultat2);
			if($resultat2){
				$max = count($resultat2);
				//echo "VALOE DE CONUNT: ".$max;
				for($index = 0;$index < $max;$index++){
					if($resultat2[$index]["description"]){
						$resultat2[$index]["moveName"] = utf8_encode($resultat2[$index]["moveName"]);
						$resultat2[$index]["description"] = utf8_encode($resultat2[$index]["description"]);
						//echo "<br>VALOR ARRAY?: ".$resultat2[$index]["description"];
					}
					
				}
				return $resultat2;
			}
	
}

?>