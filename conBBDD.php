<?php
	function openDB(){	
		$database = "chachis";
		//$database = "u107292855_quel";
		$host = "localhost";
		//$host = "mysql.hostinger.es";
		$username = "root";
		$password = "";
		//$username = "u107292855_quel";
		//$password = "abcdef";
		try{
			//Establim connexió amb la BBDD
			$bd = new PDO('mysql:host='.$host.';dbname='.$database.'',$username,$password);	//Posar lo del charset!!!!!!!
			
		}catch(PDOException $e){
			print "Error! ".$e->getMassage()."<br>";
			die($e->getMassage());
		}
		
		if($bd){
			return $bd;
		}else{
			return false;
		}
	}
 ?>