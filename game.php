<?php
	ob_start();
	include 'php/funcions_login.php';
	require_once("php/classeSessions.php");
	$sesion = new sesion();
	$usuari = $sesion->get("user");
	
	if($usuari == false){	
		echo "Valor usuari: ".$usuari;
		header("Location: index.php");
	}else{
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link href="tabs/style.css" rel="stylesheet" type="text/css">
		<script src="jquery-2.1.4.min.js"></script>
		<script src="javaScript/efectivitats.js"></script>
		<!--miquel-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="javaScript/eventsComplexos.js"></script>		
		<title> Chachimolongos Adventures </title>
		<script>
			var gobattle=false;
		</script>
	</head>
	<body>
		<div id="wrapper" style="margin-left: 150px";>	
			<table style='' width='900'>
				<td><img src="img/web/logomini.png"></img> </td>
				<td style='vertical-align:center;' align='right' >
					<form name='formulariLogin'  id='formulari' action='game.php' method='post' onsubmit=''>
						<?php 		
							$ok=cargar_Datos();///habrá que llamarla una vez estemos en la pantalla del juego
							if($ok){
								//echo "Datos cargados";
							}
							//echo "Usuari: ".$usuari." amb ID: ".$sesion->get("idGame"); 
							echo "<button type='submit' name='tancaSessio' class='boton'>Cerrar sessión</button></form></td>";
							echo "<td align='left'><button align='right' type='submit' name='guardaPartida' id='desaPartida' class='boton'>Guardar Partida</button></td>";
						?>	
				
			</table>		
			<div id="tabContainer">
				<div id="tabs">
					<ul>
						<li id="tabHeader_1">Juego</li>
						<li id="tabHeader_2">Equipo</li>
						<li id="tabHeader_3">Batalla</li>
					</ul>
				</div>
				<div id="tabscontent">
					<div class="tabpage" id="tabpage_1">
						<canvas id="pantalla" width="496" height="496" style="background:#999">
							El Canvas no es compatible con tu navegador!
						</canvas>
						<p id="globusText" style="font-size:15px; color:black; border-style:double; text-align:center">
							<label id="text"> ---- </label>
						</p>
						<script src="javaScript/motoChachi.js"></script>
						<script>gobattle=true;</script>
					</div>
					<div class="tabpage" id="tabpage_2">
						<script src='javaScript/team.js'></script>	
					</div>
					<div class="tabpage" id="tabpage_3" align="center">
						<p>
							<canvas id="battle_canvas" width="800" height="450">
								El Canvas no es compatible con tu navegador!
							</canvas>
						</p>
						<!--<button id=1 onclick="attack(this.id)">Placaje</button><button id=2 onclick="attack(this.id)">Proteger</button>-->
						<p id='textBatalla' style="font-size:20px; color:blue; border-style:double; text-align:center">aaaaa</p>
						<div id="buts">
							<label id='movements'></label>
						</div>
						<script src="javaScript/battles2.js" ></script>
					</div>
				</div>
			</div>
			<!-- <a href="http://www.my-html-codes.com/javascript-tabs-html-5-css3">Back to Tutorial</a> </div>-->
			<script src="tabs/tabs_old.js"></script>
			<?php
				if(isset($_POST["tancaSessio"])){
					echo "intent";//$usuario = $sesion->get("NomMestre");	
					$sesion->termina_sesion();	
					header("location: index.php");				
				}
			?>
		</div>
	</body>
</html>
<?php
	}
?>