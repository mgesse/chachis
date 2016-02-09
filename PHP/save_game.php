<?php
	include('conBBDD.php');
	//Fitxer connexió a BBDD amb el MAPA 
	//get the q parameter from URL
	$qObj=json_decode($_REQUEST["q"]);
	$posX = $qObj->posJX;
	$posY = $qObj->posJY;
	$mapX = $qObj->posMX;
	$mapY = $qObj->posMY;
	$idMap = $qObj->map;
	$idGame = $qObj->game;
	$chachis =$qObj->chachis;
	
	$dadesChachis = json_decode($chachis,true);
	//echo "ID MAPA: $idMap - JUGADOR: $posX:$posY - MAPA: $mapX:$mapY <br>";
	//print_r($dadesChachis);
	//var_dump($ch);
	//echo "<br><br><br>";
	//$max = count($dadesChachis);
	//echo "Numero max: ".$max."<bR>";
	
	/*echo "********+ DADES DELS CHACHIMOLONGOS +********";
	for($index = 0; $index < $max; $index++){
		echo "<br>======== CHACHIMOLONGO NUM ".$index." ================";
		echo "<br>ID Chachi Game: ".$dadesChachis[$index]['idchachisGame'];
		echo "<br>ID Game: ".$dadesChachis[$index]['idGame'];
		echo "<br>ID Chachi: ".$dadesChachis[$index]['idChachi'];
		echo "<br>Nivell: ".$dadesChachis[$index]['level'];
		echo "<br>Punts de Vida: ".$dadesChachis[$index]['HP'];
		echo "<br>Punts de Magia: ".$dadesChachis[$index]['MP'];
		echo "<br>ID Moviment 1: ".$dadesChachis[$index]['idMov_1'];
		echo "<br>ID Moviment 2: ".$dadesChachis[$index]['idMov_2'];
		echo "<br>ID Moviment 3: ".$dadesChachis[$index]['idMov_3'];
		echo "<br>ID Moviment 4: ".$dadesChachis[$index]['idMov_4'];
		echo "<br>Experiencia: ".$dadesChachis[$index]['EXP'];
	}
	
	echo "<br>*********************************************";
	*/
	
	if($dadesChachis){	//
		$hint=true;
		//Construim la sentencia SQL
		$codiSql = 'UPDATE `game` SET `spritePosX`= ?,`spritePosY`= ?,`mapPosX`= ?,`mapPosY`= ?,`idMap`= ? WHERE `idGame`= ?;';		
		$saveDataMap = setMapData($codiSql,$posX,$posY,$mapX,$mapY,$idMap,$idGame);	//Cridem a la funció per a demanar les dades.
		
		if($saveDataMap == true){
			$codiSql = 'UPDATE `chachisgame` SET `level`= ?,`HP`= ?, `MP`= ?,`idMov_1`= ?, `idMov_2`= ?,`idMov_3`= ?, `idMov_4`= ?,`EXP`= ? WHERE `idchachisGame`= ? AND `idGame`= ?;';
			$saveChachisData = setChachisData($codiSql,$dadesChachis,$idGame);
			
			if($saveChachisData == true){
				$hint = "1";
			}
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


	function setMapData($codiSql,$posX,$posY,$mapX,$mapY,$idMap,$idGame){		
		$connexio = openDB();
		$retorn = false;
		if($connexio){			
			$consulta = $connexio->prepare($codiSql);
			//$codiSql = 'UPDATE `game` SET `spritePosX`= ?,`spritePosY`= ?,`mapPosX`= ?,`mapPosY`= ?,`idMap`= ? WHERE `idGame`= ?;';		
			$consulta->bindParam(1,$posX, PDO::PARAM_INT);
			$consulta->bindParam(2,$posY, PDO::PARAM_INT);
			$consulta->bindParam(3,$mapX, PDO::PARAM_INT);
			$consulta->bindParam(4,$mapY, PDO::PARAM_INT);
			$consulta->bindParam(5,$idMap, PDO::PARAM_INT);
			$consulta->bindParam(6,$idGame, PDO::PARAM_INT);
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
	
	function setChachisData($codiSql,$dadesChachis,$idGame){
		$connexio = openDB();
		$retorn = false;
		if($connexio){
			$max = count($dadesChachis);
			for($index = 0; $index < $max; $index++){
				/*echo "<br>======== CHACHIMOLONGO NUM ".$index." ================";
				echo "<br>ID Chachi Game: ".$dadesChachis[$index]['idchachisGame'];
				echo "<br>ID Game: ".$dadesChachis[$index]['idGame'];
				echo "<br>ID Chachi: ".$dadesChachis[$index]['idChachi'];
				echo "<br>Nivell: ".$dadesChachis[$index]['level'];
				echo "<br>Punts de Vida: ".$dadesChachis[$index]['HP'];
				echo "<br>Punts de Magia: ".$dadesChachis[$index]['MP'];
				echo "<br>ID Moviment 1: ".$dadesChachis[$index]['idMov_1'];
				echo "<br>ID Moviment 2: ".$dadesChachis[$index]['idMov_2'];
				echo "<br>ID Moviment 3: ".$dadesChachis[$index]['idMov_3'];
				echo "<br>ID Moviment 4: ".$dadesChachis[$index]['idMov_4'];
				echo "<br>Experiencia: ".$dadesChachis[$index]['EXP'];*/
				
				$CHG = $dadesChachis[$index]['idchachisGame'];
				$NVL = $dadesChachis[$index]['level'];
				$PTV = $dadesChachis[$index]['HP'];
				$PTM = $dadesChachis[$index]['MP'];
				$MV1 = $dadesChachis[$index]['idMov_1'];
				$MV2 = $dadesChachis[$index]['idMov_2'];
				$MV3 = $dadesChachis[$index]['idMov_3'];
				$MV4 = $dadesChachis[$index]['idMov_4'];
				$EXP = $dadesChachis[$index]['EXP'];
				
				if($CHG){
					$consulta = $connexio->prepare($codiSql);
					$consulta->bindParam(1,$NVL, PDO::PARAM_INT);
					$consulta->bindParam(2,$PTV, PDO::PARAM_INT);
					$consulta->bindParam(3,$PTM, PDO::PARAM_INT);
					$consulta->bindParam(4,$MV1, PDO::PARAM_INT);
					$consulta->bindParam(5,$MV2, PDO::PARAM_INT);
					$consulta->bindParam(6,$MV3, PDO::PARAM_INT);
					$consulta->bindParam(7,$MV4, PDO::PARAM_INT);
					$consulta->bindParam(8,$EXP, PDO::PARAM_INT);
					$consulta->bindParam(9,$CHG, PDO::PARAM_INT);
					$consulta->bindParam(10,$idGame, PDO::PARAM_INT);
					$consulta->execute();
					$filesAfectades = $consulta->rowCount();
				}
			}
			
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
