<?php
	ob_start();
	include 'php/funcions_login.php';
	require_once("php/classeSessions.php");
	//include 'php/conBBDD.php';
	$sesion = new sesion();
	//session_destroy();
	$usuari = $sesion->get("user");
	
	if(!$usuari){
		
		
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <!--<script src="jquery-2.1.4.min.js"> </script> -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Chachimolongos Adventure - Login</title>
	
    <!--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">-->
    <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
 <![endif]-->
  </head>
  <body>
	  <center>
		<img src="img/web/logo.png"></img>
	  </center><p><p>
    <div class="container">
      <div id="login">
        <form action="" method="post"><!--javascript:void(0);" method="get">-->
          <fieldset class="clearfix">
            <p><span class="fontawesome-user"></span>
				<input type="text" placeholder="Usuario" name="user" required></p><!--onBlur="if(this.value == '') this.value = 'Username'" onFocus="if(this.value == 'Username') this.value = ''" required></p> --><!-- JS because of IE support; better: placeholder="Username" -->
            <p><span class="fontawesome-lock"></span>
				<input type="password"  placeholder="Contraseña" name="pass" required></p><!-- onBlur="if(this.value == '') this.value = 'Password'" onFocus="if(this.value == 'Password') this.value = ''" required></p> <!-- JS because of IE support; better: placeholder="Password" -->
			<p><input type="submit" placeholder="Iniciar Sessión" name="login"></p>
			<?php 
				if(isset($_POST['err'])){
					echo '<font color="red">  Usuario y contraseña incorrectos</font><p></p>';	
				}
				//echo $_SESSION['idGame'];
			?>
          </fieldset>
        </form>
        <p>No eres Miembro? <a href="register.php">Registrate Ahora</a><span class="fontawesome-arrow-right"></span></p>
     </div> <!-- end login -->
    </div>
		<?php
			if(isset($_POST['login'])){
				if(isset($_POST['user']) && isset($_POST['pass'])){
					if(check_user($_POST['user'],$_POST['pass'])){
						echo 'ok';
						$ok=cargar_Datos();///habrá que llamarla una vez estemos en la pantalla del juego
						//$_SESSION['user']=$_POST['user'];
						
						$sesion->set("user",$_POST['user']);
						$i=0;
						echo 'Cargando datos... '.$sesion->get("user");
						while($i<300){
							echo '.';
							$i++;
						}
						echo"jjj";
						header('Location: game.php');						
					}else{
						$_POST['err']=1;
						echo "FAIL - Usuari: ".$_POST['user']." Clau: ".$_POST['pass'];
						sleep(5);
					}
				}else{
					//INserta datos
				}
			}
		
		?>
  </body>
</html>
</body>
</html>
<?php 
	

	}else{
		header('Location: game.php');
		echo "Amb DADES de login";
	}
?>