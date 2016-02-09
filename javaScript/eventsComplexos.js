function prova(numEvent,c){
	if(numEvent === "CEF_101"){
		
		var contingut = 
		'var text = "Joven Héroe! Habéis regresado al fin! Alguna cosa está pasando en nuestro continente, algunos Chachimolongos '+
		'están perdiendo el color, y otros inexplicablemente se han vuelto rebeldes atacando a qualquier cosa que se ponga por delante. '+
		'Por favor, cruzad el bosque y dirigios a Ciudad Noto en busca del caporal de la Guarda Real, nos han dicho que ha tenido que abandonar '+
		'el palacio por algún motivo. Por que ha hecho eso Chachimolonga?";'+
		'var estat = sessionStorage.getItem("CEF_101"); '+
		'if(estat == 0){$("#text").text(text);sessionStorage.setItem("CEF_101",1);player.x-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';		
		
	}else if(numEvent === "CEF_102"){
		var contingut = 
		'var text = "Héroe! No puede adentrarse más allá sin saber como luchar ante esta amenaza, los Chachimolongos que nos atacan '+
		'aparecen de repente sin darnos cuenta, en ese momento emepzará un combate, en el que tiene que elegir que movimientos quieres usar para ganar. '+
		'El combate termina cuando tu equipo ha derrotado al enemigo, recuerda que hay distintos tipos de Chachimolongos, por lo que algunas habilidades '+
		'pueden ser efectivas o poco útiles, tendrás que descubirlo, lee el manual ante alguna duda. Mire, aquí tenemos uno, a por él!";'+
		'var estat = sessionStorage.getItem("CEF_102"); '+
		'if(estat == 0){$("#text").text(text);sessionStorage.setItem("CEF_102",1);player.x-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
		
		// A aquest event haurem de fer-li entrar a combat amb uns paràmetres en específic.
	}else if(numEvent === "BHO_101"){
		var contingut = 
		'var text = "-Guardián de la Naturaleza: Que raro, los Chachimolongos oscurecen y pierden su color, no entiendo porque.'+
		'-Guardián del Agua: Chachimolonga no tendrá algo que ver? Ella es quien nos irradia el poder! '+
		'-Guardián de la Naturaleza: No lo se compañero, pero ahora tenemos que huir de nuevo, rápido! '+
		'-Guardián del Agua: Oh no, un Chachimolongo oscuro, nos va atacar, dividánomos!";'+
		'var estat = sessionStorage.getItem("BHO_101"); '+
		'if(estat == 0){$("#text").text(text);player.x-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
	}else if(numEvent === "BHO_102"){
		var contingut = 
		'var text = "-Guardián de la Naturaleza: Diantres! El muy pesado me persige. Estoy cansado y no puedo más, ayudaaaaaaaaaaaaaaaaaaaaaaaaaa!";'+
		'var estat = sessionStorage.getItem("BHO_102"); '+
		'if(estat == 0){$("#text").text(text);player.y+=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
	}else if(numEvent === "BHO_103"){
		var contingut = 
		'var text = "-Guardián de la Naturaleza: Muchas gracias por deshacerte de este Chachimolongo! Me preocupa el estado del Chachimolongo Guardián'+
		' , vayamos al Lago Themis a ver que ha pasado!!";'+
		'var estat = sessionStorage.getItem("BHO_103"); '+
		'if(estat == 0){$("#text").text(text);player.y-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
	}else if(numEvent === "LTH_101"){
		var contingut = 
		'var text = "-Guardián del Agua: Comprendo lo que sucede joven héroe, mis disculpas por emboscarte. Os ayudaré a esclarecer que está sucediendo!'+
		'Mas adelante está Ciudad Noto, podremos comunicarnos con los sabios. Vayamos!";'+
		'var estat = sessionStorage.getItem("LTH_101"); '+
		'if(estat == 0){$("#text").text(text);player.x-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
	}else if(numEvent === "LTH_102"){
		var contingut = 
		'var text = "-Guardián del Agua: Malditos traidores, que habrá pasado con el Guardián de la Naturaleza? Todos se estan convirtiendo en oscuros?'+
		' Eso significa que son enemigos míos? AHHHH, que dolor, me esconderé por el este... ";'+
		'var estat = sessionStorage.getItem("LTH_102"); '+
		'if(estat == 0){$("#text").text(text);player.x-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
	}else if(numEvent === "LTH_103"){
		var contingut = 
		'var text = "-Guardián del Agua: Qué ha sido eso? Todo se ha tornado oscuro por unos segundos! -Guardián de la Naturaleza: Que raro, fíjate! '+
		'Los Chachimolongos están oscureciendo en mayores cantidades!! -Guardián del Agua: Ohh no, que horror! Continuemos con cautela, ya falta poco! ";'+
		'var estat = sessionStorage.getItem("LTH_103"); '+
		'if(estat == 0){$("#text").text(text);player.x-=mov;caminaCorrecte = false;pause= true;}'+
		'else{console.log("ja ha fet levent");};';
	}
	
	return contingut;
	
	/*var contingut =
		'var a = localStorage.getItem("EC_CEF_1"), b = 8;'+
		'if(c == true){'+
		'console.log("c és certa");}'+
		'else if(c == false){console.log("c és falsa");}'+
		'else{console.log("tapunamok");};';*/
		
		/*var contingut =
		'var a = localStorage.getItem("EC_CEF_1"), b = 8; console.log("hola");';
		if(c == true){
			contingut += 'console.log("c és certa");'
		}else if(c == "false"){
			//console.log('entres al c = false');
			contingut += 'console.log("c és falsa");'
		}else{
			console.log('entres al else, valor de c: '+c);
			contingut += 'console.log("tapunamok");';
		};*/
}