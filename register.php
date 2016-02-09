<?php
	$_POST["errorreg"]='';
	include 'php/funcions_login.php';
	if(isset($_POST['register'])){
		$ok=registrar_user($_POST['username'],$_POST['pass1'],$_POST['email']);
		if($ok){
			header('Location: index.php');
		}else{
			$_POST['errorreg']='Nombre de usuario ya en uso';
		}
		
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Registro</title>
		<link rel="stylesheet" href="css/style.css"
	</head>
	<body>
		<div class="container">
			<div id="login">
				<!--<p><h1>Completa los campos para registrarte</h1></p>-->
				<form action="" method="post">
					<fieldset class="clearfix">
						<?php
							echo '<font color="red">'.$_POST["errorreg"].'</font><p>';
						?>
						Nombre de usuario:
						<p><span class="fontawesome-user"></span>
							<input type="text" placeholder="Pepito" name="username" required>
						</p>
						Contraseña:
						<p><span class="fontawesome-lock"></span>
							<input type="password"  placeholder="Contraseña" name="pass1" required>
						</p>
						Repetir Contraseña:
						<p><span class="fontawesome-lock"></span>
							<input type="password"  placeholder="Contraseña" name="pass2" required>
						</p>
						Email:
						<p><span>@</span>
							<input type="email" id="pim" placeholder="pepito@pepito.com" name="email" required>
						</p>
						<p>
							<input type="submit" value="Registrarse" name="register">
						</p>
				</form>
			</div>
		</div>
	</body>
</html>