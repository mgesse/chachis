<?php
	include('conBBDD.php');
	//Fitxer connexió a BBDD amb el MAPA 
	//get the q parameter from URL
	$qObj=json_decode($_REQUEST["q"]);
	$idGame = $qObj->game;
	$idMap = $qObj->map;
	$numCerca = $qObj->request;
	//$idGame = 1;
	//$idMap = 1;
	//$numCerca = 1;
	//lookup all hints from array if length of q>0
	if($numCerca == 1){	//
		$hint=true;	
		//Construim la sentencia SQL
		$codiSql = 'SELECT ge.idEvent, ge.idEventState, repeatedBox FROM gameevents AS ge INNER JOIN events AS ev ON ge.idEvent = ev.idEvent WHERE ge.idGame = ? AND ev.idMap = ?;';	
		//$codiSql = 'SELECT idmove, moveName, description, idType, PM, power, accuracy, idEffect FROM moves WHERE idmove = ? ;';	//DE ELI
		//Cridem a la funció per a demanar les dades.
		$hint = getDadesEventsUsuari($codiSql,$idGame,$idMap);
		
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


	function getDadesEventsUsuari($codiSql,$idGame,$idMap){
		
		$connexio = openDB();
		
		if($connexio){
			$var = 1;
			$consulta = $connexio->prepare($codiSql);
			//$consulta->bindParam(1,$var, PDO::PARAM_INT);
			$consulta->bindParam(1,$idGame, PDO::PARAM_STR);
			$consulta->bindParam(2,$idMap, PDO::PARAM_STR);
			$consulta->execute();	
			$resultat = $consulta->fetchAll(PDO::FETCH_ASSOC);
			
			$valors;
			$i=0;
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
