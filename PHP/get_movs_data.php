<?php
include 'conBBDD.php';
$bd=openDB();
$data = json_decode($_REQUEST["q"]);

$movs= Array();//=$data->movs;
//echo "--> ".$movs;

//consulta y extraccion de todos los datos
//recogemos los movs pedidos
			$sql = $bd->prepare("SELECT idMov_1, idMov_2, idMov_3, idMov_4  FROM chachisGame WHERE idchachisGame = ? ;");
			$sql->bindParam(1, $data->idChachi, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				foreach ($resultat as $fila){
					if($fila['idMov_1']!=999){						
						$dades[0] = get_mov_2($fila['idMov_1']);						
					}
					if($fila['idMov_2']!=999){						
						$dades[1] = get_mov_2($fila['idMov_2']);						
					}
					if($fila['idMov_3']!=999){						
						$dades[2] = get_mov_2($fila['idMov_3']);						
					}
					if($fila['idMov_4']!=999){						
						$dades[3] = get_mov_2($fila['idMov_4']);						
					}
				}
			}	
$response = Array();
if($dades){
	$response['txt'] = $dades;
	//echo "hola";
}else{
	$response['txt'] = "FAIL";
}
$bd=null;
//print_r($movs);
//print_r($response);
//$data->movs=$movs;


echo json_encode($response);

function get_mov($id){
	$bd=openDB();
	$sql = $bd->prepare("SELECT * FROM moves WHERE idmove = ? ;");
	$sql->bindParam(1, $id, PDO::PARAM_INT);
	$sql->execute();
	$resultat2 = $sql->fetchAll(PDO::FETCH_ASSOC);
	//echo "<br>";
	//print_r($resultat2);
	if($resultat2){
		foreach ($resultat as $fila){
			$res=$fila;
		}
	}
	return $res;
}

function get_mov_2($id){
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
	}else{
		return 0;
	}
	
}
?>