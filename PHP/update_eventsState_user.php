<?php
	include('conBBDD.php');
	//Fitxer connexió a BBDD amb el MAPA 
	//get the q parameter from URL
	$qObj=json_decode($_REQUEST["q"]);
	$idGame = $qObj->game;
	$idEvent = $qObj->event;
	$numCerca = $qObj->request;
	//$idGame = 1;
	//$idMap = 1;
	//$numCerca = 1;
	//lookup all hints from array if length of q>0
	if($numCerca == 1){	//Busca Comunitats.
		$hint=true;	
		//Construim la sentencia SQL
		$codiSql = 'UPDATE `gameevents` SET `idEventState`= 1 WHERE `idGame`= ? AND `idEvent`= ?;';	
		//Cridem a la funció per a demanar les dades.
		$hint = getDadesEventsUsuari($codiSql,$idGame,$idEvent);
		
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
		$response['txt']= $hint;
		//$response['txt']= "CON EST - RES OK - VIS FAIL";
	}

	//output the response
	echo json_encode($response);


	function getDadesEventsUsuari($codiSql,$idGame,$idEvent){
		
		$connexio = openDB();
		
		if($connexio){
			
			$consulta = $connexio->prepare($codiSql);
			$consulta->bindParam(1,$idGame, PDO::PARAM_STR);
			$consulta->bindParam(2,$idEvent, PDO::PARAM_STR);
			$consulta->execute();	
			$filesAfectades = $consulta->rowCount();
			
			if($filesAfectades > 0){
				$retorn = "correcte";
			}else{
				$retorn = "error";
			}	
			
			$connexio = null;
			return $retorn;
		}		
	}


?>
