<?php
include 'conBBDD.php';
$bd=openDB();
//consulta y extraccion de todos los datos
//recogemos la pedido
$data = json_decode($_REQUEST["q"]);
$op=$data->op;
//$data->sy=123;
			//$d=
			
switch ( $op ){
	//segun lo que pida del usuario haremos una consulta   u otra;
	case 1: //recoger datos chachis
			$sql = $bd->prepare("SELECT *  FROM chachisGame WHERE idGame = ? ;");
			$sql->bindParam(1, $data->idGame, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				$i=0;
				foreach ($resultat as $fila){
					$data->chachis[$i] = $fila;
					$i++;
				}
			}
			break;
	case 2: //recoger juego (posicion de game etc)
			$sql = $bd->prepare("SELECT spritePosY AS sy, spritePosX AS sx, mapPosX AS mx, mapPosY AS my, idMap AS idMap, newGame AS newG FROM game WHERE idGame = ? ;");
			$sql->bindParam(1, $data->idGame, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);		
			if($resultat){
				foreach ($resultat as $fila){
					$data->spritePosY = $fila["sy"];
					$data->spritePosX = $fila["sx"];
					$data->mapPosX = $fila["mx"];;
					$data->mapPosY = $fila["my"];;
					$data->idMap = $fila["idMap"];;
					$data->newGame = $fila["newG"];;
				}
			}
	
			break;
	case 3: //recoger los datos de los chachis y las urls de su simgs
			$chachisimg=0;
			$sql = $bd->prepare("SELECT idChachi, idType, name, base_HP, base_AT, base_DF, base_VE, base_MP, base_EX, sprite_url FROM chachis ;");
			//$sql->bindParam(1, $data->idGame, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);		
			if($resultat){
				$res=Array();
				$i=0;
				foreach ($resultat as $fila){
					$res[$i]=$fila;
					$res[$i]["name"]=utf8_encode($res[$i]["name"]);
					$i++;
				}
			}
			$data=$res;			
			break;			
	case 4: //recoger maps chachis
			$sql = $bd->prepare("SELECT idmapsChachis, idMap, idChachi, minLevel, maxLevel FROM mapschachis ;");
			//$sql->bindParam(1, $data->idGame, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				$res=Array();
				$i=0;
				foreach ($resultat as $fila){
					$res[$i]=$fila;
					$i++;
				}
			}
			$data=$res;	
			break;
	case 5:// recollir enemics dels mapas
			$sql = $bd->prepare("SELECT idenemy,idChachi,nameFE, level FROM fixedenemies ;");
			//$sql->bindParam(1, $data->idGame, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				$res=Array();
				$i=0;
				foreach ($resultat as $fila){
					$res[$i]=$fila;
					$res[$i]["nameFE"]=utf8_encode($res[$i]["nameFE"]);
					$i++;
				}
			}
			$data=$res;	
			break;
	case 6: //recollir la base exp del rival
			$sql = $bd->prepare("SELECT base_EX FROM chachis where idChachi=?;");
			$sql->bindParam(1, $data->idChachi, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				$res=Array();
				$i=0;
				foreach ($resultat as $fila){
					$res=$fila['base_EX'];
				}
			}
			$data=$res;	
			break;
	case 7:
			$sql = $bd->prepare("SELECT base_EX, base_HP, base_AT, base_DF, base_VE, base_MP FROM chachis where idChachi=?;");
			$sql->bindParam(1, $data->idChachi, PDO::PARAM_STR);
			$sql->execute();
			$resultat = $sql->fetchAll(PDO::FETCH_ASSOC);
			if($resultat){
				//$res=Array();
				$i=0;
				foreach ($resultat as $fila){
					$res=$fila;
				}
			}
			$data=$res;	
			break;
}
$bd=null;
echo json_encode($data);
?>