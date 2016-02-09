<?php
	include('conBBDD.php');
	//Fitxer connexió a BBDD amb el MAPA 
	//get the q parameter from URL
	$qObj=json_decode($_REQUEST["q"]);
	
	//>>>>>>>>>>>>>>>>>>>>>>>>> ATENCIÓ - IMPORTANT <<<<<<<<<<<<<<<<<<<<<<< : Per no canviar noms, idUser conté en realitat el idGame!!!!!!!
								$idUser = $qObj->pnj;	
	//$idUser = 1;
	
	if($idUser){	//
		$hint=true;	
		//Construim la sentencia SQL
		/*$codiSql = 'SELECT ga.spritePosX, ga.spritePosY, ga.mapPosX, ga.mapPosY, ga.idMap
					FROM game AS ga
					WHERE ga.idGame = (SELECT us.idGame FROM user AS us WHERE idUser = ?);';*/
		$codiSql = 'SELECT ga.spritePosX, ga.spritePosY, ga.mapPosX, ga.mapPosY, ga.idMap
					FROM game AS ga
					WHERE ga.idGame = ?;';
		//Cridem a la funció per a demanar les dades.
		$hint = getDadesPartida($codiSql,$idUser);
		
	}

	//Set output to "no suggestion" if no hint were found
	//or to the correct values
	$response = Array();
	if ($hint == false){
		$response['txt']="no suggestion";
	}else if($hint === 4){
		$response['txt']= "CON EST";
	}else if($hint === 5){
		$response['txt']= "CON EST - RES FAIL";
	}else if($hint){
		//print_r($hint); echo "<br>";
		$response['txt']= $hint;
		//$response['txt']= "CON EST - RES OK - VIS FAIL";
	}

	//output the response
	echo json_encode($response);


	function getDadesPartida($codiSql,$idUser){
		
		$connexio = openDB();
		
		if($connexio){
			$var = 1;
			$consulta = $connexio->prepare($codiSql);
			$consulta->bindParam(1,$idUser, PDO::PARAM_INT);			
			$consulta->execute();	
			$resultat = $consulta->fetchAll(PDO::FETCH_ASSOC);
			
			$valors;
			$i=0;
			$connexio = null;
			if($resultat){
				return $resultat;
			}else if(!$resultat){
				return 5;
			}else if($connexio){
				return 4;
			}else{
				return false;
			}
		}
	}
?>