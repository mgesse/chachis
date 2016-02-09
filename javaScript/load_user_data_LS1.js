var c= "<?php echo $_SESSION['idGame']; ?>";

////////////////dades de game
var jsonObject={
	idGame: sessionStorage.getItem('idGame'),
	op:2,
	spritePosY:0,
	spritePosX:0,
	mapPosX:0,
	mapPosY:0,
	idMap:0,
	newGame:0,
}
 var stringifyedJsonObject=JSON.stringify(jsonObject);
//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				console.log('okkkkkk');	
				var dades = data;
				//console.log('dades'+data.spritePosY+'d'+data.spritePosX);
				sessionStorage.setItem('game',JSON.stringify(dades));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown);
			});	
////////dades dels chachis
jsonObject = {
	idGame : sessionStorage.getItem('idGame'),
	op:1,
	chachis: []
}
var stringifyedJsonObject2=JSON.stringify(jsonObject);
//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject2,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				console.log('okkkkkk');	
				var dades = data;
				//console.log('dades2-'+data.chachis[1].idChachi+data.chachis[0].MP);
				sessionStorage.setItem('chachis',JSON.stringify(dades.chachis));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown);
			});	
////////////saber el sprite que correspon al chachi 			
jsonObject = {
	op:3
}
var stringifyedJsonObject3=JSON.stringify(jsonObject);
//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject3,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				//console.log(data);	
				sessionStorage.setItem('allDataChachi',JSON.stringify(data));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown);
			});	
////////////
/////maps chachi
jsonObject = {
	op:4
}
var stringifyedJsonObject3=JSON.stringify(jsonObject);
//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject3,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				//console.log(data);	
				sessionStorage.setItem('mapsChachis',JSON.stringify(data));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown);
			});	
/////////////
//recollir enemic 
jsonObject = {
	op:5
}
var stringifyedJsonObject3=JSON.stringify(jsonObject);
//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject3,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				//console.log(data);	
					
				sessionStorage.setItem('enemies',JSON.stringify(data));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown);
			});	

/*
var f=JSON.parse(sessionStorage.getItem('game'));
console.log('SSSSSSSSSSSS'+f.idGame);
*/