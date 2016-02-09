<?php
	include('conBBDD.php');
	//Fitxer connexió a BBDD amb el MAPA 
	//get the q parameter from URL
	$qObj=json_decode($_REQUEST["q"]);
	$idEvent = $qObj->event;
	$idGame = $qObj->game;
	
	
	
	
	if($idEvent == "BHO_103"){	//
		$hint=true;
		//Construim la sentencia SQL
		$codiSql = 'INSERT INTO `chachisgame`(`idGame`, `idChachi`, `level`, `HP`, `MP`, `idMov_1`, `idMov_2`, `idMov_3`, `idMov_4`, `EXP`, `teamPosition`) VALUES 
		(?,4,7,45,94,30,31,32,999,275,2);';
		$setNewChachi = setNewChachi($codiSql,$idGame);	//Cridem a la funció per a demanar les dades.
		
		if($setNewChachi == true){
			$hint = "1";			
		}
	}else if($idEvent == "LTH_101"){	//
		$hint=true;
		//Construim la sentencia SQL
		$codiSql = 'INSERT INTO `chachisgame`(`idGame`, `idChachi`, `level`, `HP`, `MP`, `idMov_1`, `idMov_2`, `idMov_3`, `idMov_4`, `EXP`, `teamPosition`) VALUES 
		(?,3,8,56,118,20,21,22,23,410,3);';
		$setNewChachi = setNewChachi($codiSql,$idGame);	//Cridem a la funció per a demanar les dades.
		
		if($setNewChachi == true){
			$hint = "1";			
		}
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


	function setNewChachi($codiSql,$idGame){		
		$connexio = openDB();
		$retorn = false;
		if($connexio){			
			$consulta = $connexio->prepare($codiSql);
			//$codiSql = 'UPDATE `game` SET `spritePosX`= ?,`spritePosY`= ?,`mapPosX`= ?,`mapPosY`= ?,`idMap`= ? WHERE `idGame`= ?;';		
			$consulta->bindParam(1,$idGame, PDO::PARAM_INT);
			$consulta->execute();			
			$filesAfectades = $consulta->rowCount();
			
			if($filesAfectades > 0){
				$retorn = true;
			}else{
				$retorn = false;
			}
		}
		
		$connexio = null;
		return $retorn;
	}
	
	


?>
