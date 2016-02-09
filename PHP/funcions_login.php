<?php
	include 'conBBDD.php';
	
//funcions login
function check_user($username,$pass){
	$bd =openDB();
	$retorn = false;
	if($bd){		
		$sql = $bd->prepare("SELECT COUNT(idUser) AS res, idGame AS id FROM User WHERE name = ? AND password = ?;");
		$sql->bindParam(1, $username, PDO::PARAM_STR);
		$sql->bindParam(2, $pass, PDO::PARAM_STR);
		$sql->execute();
		$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);		
		if($resultat){
			foreach ($resultat as $fila){
				$retorn = $fila["res"];
				$_SESSION['idGame']=$fila["id"];
			}
		}
	}
	if($retorn>0){
		//echo $_SESSION['idGame'];
		return true;
	}else{
		return false;
	}
	//return $retorn;
}
function session(){
	session_start();
}
function S_destroy(){
	session_destroy();
}
///// funcions de carga
function cargar_datos(){
	echo '<script src="jquery-2.1.4.min.js"> </script>
		<script> sessionStorage.setItem("idGame","'.$_SESSION['idGame'].'")</script>
		<script src="javaScript/load_user_data_LS1.js"></script>';
	//header('Location: battle.html');
	return true;
}
// altres
function registrar_user($username, $password, $email){
	$bd = openDB();
	//1- Comprovar l'exitència del username.
	$existencia = check_user($username,$password);//comprovaExistenciaUsername($username);
	if(!$existencia){
		//2-Inserim les dades a la Base de Dades.
		if($bd){		
			$n1=144;
			$n2=112;
			$n3=1;
			$sql = $bd->prepare("INSERT INTO game (spritePosX, spritePosY, idmap) VALUES (?,?,?);");
			$sql->bindParam(1, $n1, PDO::PARAM_INT);
			$sql->bindParam(2, $n2, PDO::PARAM_INT);
			$sql->bindParam(3, $n3, PDO::PARAM_INT);	
			$sql->execute();
			$filesAfectades = $sql->rowCount();	//Per determinar el nombre de files afectades.		
			$ultimId = $bd->lastInsertId();
			$game=$ultimId;
			if($ultimId>0){
				$sql = $bd->prepare("INSERT INTO user (name, password, mail,idGame) VALUES (?,?,?,?);");
				$sql->bindParam(1, $username, PDO::PARAM_STR);
				$sql->bindParam(2, $password, PDO::PARAM_STR);
				$sql->bindParam(3, $email, PDO::PARAM_STR);	
				$sql->bindParam(4, $ultimId, PDO::PARAM_INT);	
				$sql->execute();
				$filesAfectades = $sql->rowCount();	//Per determinar el nombre de files afectades.		
				$ultimId = $bd->lastInsertId();
				if($ultimId){
					//echo "Darrera Inserció: $ultimId";
				}	
			}		
		}
	
			$bd = null;
		//crear el primer chachi (heroe)
		crea_chachi_en_BD_game(9,5,$game);	//ID Chachi, Nv, idGame
		//crear els events
		$idEvent= Array('CEF_101','CEF_102','BHO_101','BHO_102','BHO_103','LTH_101','LTH_102','LTH_103');
		for($i=0; $i<count($idEvent);$i++){
			createEventGame($ultimId, $idEvent[$i], 0);
		}
		return true;
	}else{
		return false;
	}
}
//funcion para crear un chachi en una partida
function crea_chachi_en_BD_game($type,$lvl,$game){
	//session();
	$bd = openDB();
	if($bd){	
			$bases= Array();
			//primer consultem els stats base del chachi
			$sql = $bd->prepare("SELECT base_HP,base_AT, base_DF, base_VE, base_MP, base_EX FROM chachis WHERE idchachi= ?");
			$sql->bindParam(1, $type, PDO::PARAM_INT);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				foreach ($resultat as $fila){
					$bases[0]=$fila['base_AT'];
					$bases[1]=$fila['base_DF'];
					$bases[2]=$fila['base_VE'];
					$bases[3]=$fila['base_MP'];
					$bases[4]=$fila['base_EX'];
					$bases[5]=$fila['base_HP'];
				}
			}
			
			//calcular exp segun nivel
			$exp=0.8*pow($lvl,3);
			//calcular hp y mp que tendra
			$hp=20+(($lvl/100)*($bases[5]*5));
			$mp=10+(($lvl/100)*($bases[3]*15));
			///buscar el moviment base d'aquest tipus de chachi
				$movs=get_last_four_movs($lvl,$type);
			/// un cop sabem els stats y el moviment base creem el chachi
				$x=1;
				$sql = $bd->prepare("INSERT INTO chachisgame(idGame, idChachi, level, HP, MP, idMov_1, idMov_2,idMov_3, idMov_4,EXP, teamPosition) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
				$sql->bindParam(1, $game, PDO::PARAM_INT);
				$sql->bindParam(2, $type, PDO::PARAM_STR);
				$sql->bindParam(3, $lvl, PDO::PARAM_STR);	
				$sql->bindParam(4, $hp, PDO::PARAM_STR);	
				$sql->bindParam(5, $mp, PDO::PARAM_STR);	
				$sql->bindParam(6, $movs[0], PDO::PARAM_STR);	
				$sql->bindParam(7, $movs[1], PDO::PARAM_STR);
				$sql->bindParam(8, $movs[2], PDO::PARAM_STR);
				$sql->bindParam(9, $movs[3], PDO::PARAM_STR);
				$sql->bindParam(10,$exp, PDO::PARAM_STR);	
				$sql->bindParam(11,$x, PDO::PARAM_STR);	
				$sql->execute();
				$filesAfectades = $sql->rowCount();	//Per determinar el nombre de files afectades.		
				if($filesAfectades>0){
					echo 'AAAAAAAAAAAAAAA'+$game;
				}
			//echo 'CCCCCCC';
			
	}
	//return true;
}
function get_last_four_movs($lvl,$type){
			$bd=openDB();
			$movs = Array();
			$movesDef= Array();
			$sql = $bd->prepare("SELECT idMove FROM movechachi WHERE levelRequired < ? AND idChachi = ?");
			/////////////////////HEREEEEEE
			$sql->bindParam(1, $lvl, PDO::PARAM_INT);
			$sql->bindParam(2, $type, PDO::PARAM_INT);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				$i=0;
				foreach ($resultat as $fila){
					$movesDef[$i]=$fila['idMove'];
					$i++;
				}
			}
			//treiem els 4 últims.
			$mida=count($movesDef);
			if($mida>4){
				$movs[0]=$movesDef[$mida-1];
				$movs[1]=$movesDef[$mida-2];
				$movs[2]=$movesDef[$mida-3];
				$movs[3]=$movesDef[$mida-4];
			}else if($mida<4){
				for($i=0;$i<$mida;$i++){
					$movs[$i]=$movesDef[$i];
				}
				for($i=$i;$i<4;$i++){
					$movs[$i]=999;
				}
			}else{
				$movs=$movesDef;
			}
			//print_r($movs);
	return $movs;	
}
function createEventGame($idGame, $idEvent, $idState){
	//INSERT INTO `gameevents`(`idGame`, `idEvent`, `idEventState`) VALUES 
	//1,'CEF_101',0
	$bd=openDB();
	$sql = $bd->prepare("INSERT INTO gameevents (idGame, idEvent, idEventState) VALUES (?,?,?);");
	$sql->bindParam(1, $idGame, PDO::PARAM_STR);
	$sql->bindParam(2, $idEvent, PDO::PARAM_STR);
	$sql->bindParam(3, $idState, PDO::PARAM_STR);
	$sql->execute();
	$filesAfectades = $sql->rowCount();				
	if($filesAfectades>0){
		return true;
	}else{
		return false;
	}
	$bd=null;
}
?>