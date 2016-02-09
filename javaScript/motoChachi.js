(function(){
    'use strict';
    window.addEventListener('load',init,false);
	//Variables que desen el número de teclat
    var KEY_ENTER=13;
    var KEY_LEFT=37;
    var KEY_UP=38;
    var KEY_RIGHT=39;
    var KEY_DOWN=40;
	var KEY_A=65;
	
	//Creem el canvas i el seu context.
    var canvas=null,ctx=null;
    var lastPress=null;		//Desem la darrera tecla premuda
    var pressing=[];		//Desa la tecla premuda
    var pause;				//Desem si estem en PAUSA
    var gameover=true;		//Desem si s'ha fet final de la partida
	
	var caminaCorrecte = false;	//Per determinar si el personatge s'ha mogut o no al mapa.
    
	//Instanciem un nou jugador (X,Y,AMP,ALÇ)
	var player=new Rectangle(0,0,16,16);
	
    var wall=[];		//Array de Murs
    var pnj=[];			//Array d'Elements Secundaris (Altres PNJ)
	var sortides=[];	//Array amb les sortides del mapa.
	var events=[];		//Array amb els events que succeïran al mapa.
	var map0;			//Array que contindrà el mapa.	
	var img = new Image();	//Instanciem una nova imatge, que serà la del mapa.
	
	//Instanciem una imatge de Full d'SPRITES per al protagonista.
	var fullaSpritesVerde = new Image();
	fullaSpritesVerde.src = 'img/sprites/spritesGreen.png';
	
	//Variables per desar l'amplada i alçada del mon
	var worldWidth=0;
	var worldHeight=0;
	
	//Variables de la càmera
	var cam = new Camera();
	
	var darreraPosicioMoviment = 0;	//Ens desa la darrera Posició per al moviment del personatge, ja que al polsar una altre tecla desapareix.
	var caminar = 0;				//Desa el temporitzador per a l'animació del personatge si aquest es mou.
	var mov = 4;					//Distància en pixels (px) que es mourà el personatge i tots els elements relacionats amb el mapa.
	
	var mapaBI_X = 0;
	var mapaBI_Y = 0;
	//Variables per l'automatisme de construcció dels paràmetres del mapa
	var idBase='';			//ID alfabètic del mapa.
	var columnesMapa = 0;	//Columnes del mapa.
	var resetPNJX = 0;		//Posició X en la que apareixerà el personatge un cop carregi el mapa
	var resetPNJY = 0;		//Posició Y en la que apareixerà el personatge un cop carregi el mapa
	var ampladaMapa = 0;	//Amplada en pixels (px) del mapa en ús
	var alçadaMapa = 0;		//Alçada en pixels (px) del mapa en ús
	var mapX_DR = 0;		//Variables per al control de la càmera sobre el jugador i el mapa.
	var jugX_DR = 0;
	var mapY_BA = 0;
	var jugY_BA = 0;
	var mapX_ES= 0;
	var jugX_ES = 0;
	//Obtenim quin mapa cridarem.
	var nouIDMapa = 0;		//ID del mapa que estem fent servir
	var newGame = true;		//Guardem si el joc que carreguem es nou o no.
	var idGame = 0;			//Varibale on desarem quin id del joc estem carregant, ve determinat sobre la Base de Dades.
	var idCurrentEvent = 0;	//Varibale que desa quin Event s'està executant al moment.
	
	//Definim els diferents Sprites que usarem joc.
	var SpriteChachiAgua = new Image();
	var SpriteChachiNatu = new Image();
	var SpriteChachiOscu = new Image();
	SpriteChachiAgua.src = "img/sprites/spriteChachiMapAgua.png";
	SpriteChachiNatu.src = "img/sprites/spriteChachiMapNaturaleza.png";
	SpriteChachiOscu.src = "img/sprites/spriteChachiMapOscuro.png";
	//Fem un array de Chachis i n'instanciem tants com en necessitem.
	var chachis = [];
	chachis[0] = new Rectangle(0,0,16,16);
	chachis[1] = new Rectangle(0,0,16,16);
	chachis[2] = new Rectangle(0,0,16,16);
	chachis[3] = new Rectangle(0,0,16,16);
	
	var soAmbient;
	var musicBattle = false;
	
	//Funció per a llegir els events d'un mapa de la BBDD.
	function eventsComplexosJSON(idGame, idMap, peticio){
		console.log('Crida a ECJSON');
		var jsonTx = { // Tx -> Transmission || Rx -> Reception
			game: idGame,	//Posat manual, caldrà obtenir-lo del sessionStorage.
			map: idMap,
			request: peticio
		};
		console.log('A Enviar: q='+JSON.stringify(jsonTx));
		$.ajax({
			data: "q="+JSON.stringify(jsonTx),
			type: "POST",
			dataType: "json",
			url: "./PHP/get_events_data.php",
			async: false,
			cache: false,
		})
		.done(function( data, textStatus, jqXHR ){			
			//console.log('DINS DE evComRes! Dades: '+JSON.stringify(data));
			sessionStorage.setItem("JSONeventsComplexos", JSON.stringify(data));
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
				console.log( "La solicitud a fallado: " +  errorThrown);
				console.log( "La solicitud a fallado: " +  jqXHR);
			}
		});
	}
	
	//Funció per a llegir els events d'un mapa de la BBDD.	//HAURIEM D'INCLOURE LES DADES DELS CHACHIS AQUÍ AMUNT
	function checkpointEvents(idGame, idEvent, peticio){
		console.log('Crida a CheckPOint');
		var jsonTx = { // Tx -> Transmission || Rx -> Reception
			game: idGame,	//Posat manual, caldrà obtenir-lo del sessionStorage.
			event: idEvent,
			request: peticio
		};
		console.log('A Enviar: q='+JSON.stringify(jsonTx));
		$.ajax({
			data: "q="+JSON.stringify(jsonTx),
			type: "POST",
			dataType: "json",
			url: "./PHP/update_eventsState_user.php",
		})
		.done(function( data, textStatus, jqXHR ) {			
			sessionStorage.setItem("JSONeventsComplexos", JSON.stringify(data));
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
				console.log( "La solicitud a fallado: " +  errorThrown);
				console.log( "La solicitud a fallado: " +  jqXHR);
			}
		});
	}
	
	//Funció que dibuixa el mapa (Array del mapa, columnes verticals del mapa, pixel/columna)
    function setMap(map,columns,blockSize){
        var col=0;				//Index de columnes.
        var row=0;				//Index de files.
        wall.length=0;			//Esborra el contingut de l'array de murs
        pnj.length=0;			//Esborra el contingut de l'array d'elements secudaris
		sortides.length=0;		//Esborra el contingut de l'array de les sortides
		var idIndex=1;			//ID per a l'index d'elements secundaris
		var idFinal;			//Variable on des desa el ID final d'un element secundari (BASE+INDEX)
		var indexBBDD = 0;		//Desa cada iteració del resultat de la Base de Dades sobre els events complexos
		var indexRepeticions = 0;	//Desa quants cops trobarà un event ja creat en un altre casella
		var dadesString;		//Variable que desa el contingut de la resposta en un string JSON
		var dadesJSON;			//Varibale on es desa el contingut de la transformació d'un string JSON a un objecte.
		var nouEvent = true;	//True a l'inici, ja que sempre s'ha d'assignar un event nou.
		/*	CRIDEM A LA BASE DE DADES PER OBTENIR LES DADES DELS EVENTS COMPLEXOS	*/
		//Recuperem en una variable les dades de:
		// - idEvent, - Caselles, - idEventState
		eventsComplexosJSON(idGame, nouIDMapa,1);
		
		dadesString = sessionStorage.getItem("JSONeventsComplexos");
		//console.log('Contingut dades Events Complexos (FORA): '+dadesString);
		
		dadesJSON = JSON.parse(dadesString);
		//console.log('Contingut de les dades en JSON (FORA): '+dadesJSON.txt[0].idEvent);
		//Haurem de fer un if per determinar quin mapa entra i fer una concatenació amb un codi especific del mapa.
        for(var i=0;i<map.length;i++){	//Recorrem el mapa sencer del TileMap
			if(map[i]==1){
				//Si el resultat es 1, indica mur no travessable, instanciem un objecte rectangle i l'afegim a l'array de murs.
                wall.push(new Rectangle(col*blockSize,row*blockSize,blockSize,blockSize));
			}else if(map[i]==2){
                idFinal = idBase+'_'+idIndex;	//Construim el ID final
				var text = eventsSimplesJSON(nouIDMapa,idFinal,idIndex-1);
				//console.log('Contingut variable text per al event simple Nº: '+idIndex+': '+text);
				//Si resultat és 2, aquest és un element secundari i instanciem un event rectangle afegint-lo al seu l'array.
				pnj.push(new EventSimple(col*blockSize,row*blockSize,blockSize,blockSize,text));				
				idIndex = idIndex + 1;	//Incrementem l'index ID.
			}else if(map[i]===6 || map[i]===7 || map[i]===8 || map[i]===9){
				sortides.push(new EventSimple(col*blockSize,row*blockSize,blockSize,blockSize,map[i]));
			}else if(map[i]===3){
				//si es un event nou a assignar...
				if(nouEvent === true){				
					//Creem l'eventSimple, posant-li l'id de l'event.
						//console.log('ID a DESAR: '+dadesJSON.txt[indexBBDD].idEvent+' - INDEX: '+indexBBDD);
						events.push(new EventSimple(col*blockSize,row*blockSize,blockSize,blockSize,dadesJSON.txt[indexBBDD].idEvent));
					//Es desa al sessionStorage l'estat de realització de l'event en funció de l'ID.
						//console.log('ESTAT-ID a DESAR: '+dadesJSON.txt[indexBBDD].idEventState);
						sessionStorage.setItem(dadesJSON.txt[indexBBDD].idEvent, dadesJSON.txt[indexBBDD].idEventState);
					//Assignem al indexRepeticions el número de cops que ens haurem de saltar un "event" fins a assignar-ne de nou.
						indexRepeticions = dadesJSON.txt[indexBBDD].repeatedBox;
					//El Nou Event es false
						nouEvent = false;
						
				//Si es un event ja assignat.
				}else if(nouEvent === false){
					//Creem l'eventSimple amb les mateixes dades que l'anterior
						//console.log('ID a DESAR: '+dadesJSON.txt[indexBBDD].idEvent);
						events.push(new EventSimple(col*blockSize,row*blockSize,blockSize,blockSize,dadesJSON.txt[indexBBDD].idEvent));						
					//Restem l'indexRepeticions
					indexRepeticions = indexRepeticions - 1;					
				}
				//console.log('VALOR INDEX REP ABANS IF: '+indexRepeticions);
				//Quan han acabat les repeticions..
				if(indexRepeticions == 0){
					//console.log('SUMA INDEX: ('+indexRepeticions+')');
					nouEvent = true;				//Hi haurà un event nou
					indexBBDD = indexBBDD + 1;		//Se suma l'index de la BBDD.
				}
			}		
            col++;	//Sumem les columnes
			
			//Si les columnes actuals superen les totals, sumem una fila.
            if(col>=columns){
                row++;
                col=0;
            }
        }
		worldWidth=columns*blockSize;
        worldHeight=row*blockSize;
    }
	
	//Funció que llegirà del JSON els textos dels events simples.
	function eventsSimplesJSON(mapa,idFinal,index){
		var text;
		//console.log('Hem entrat a eventsSimplesJSON');
		$.ajax({ 
			url: "javaScript/JSON/eventsPersona.json", 
			dataType: 'json', 
			async: false, 
			success: function(datos){ 
				//Proceso de los datos recibidos
				if(mapa === 1){
					if(idFinal == datos.CEF[index].ID){
						//console.log('El text per l Event '+datos.a[index].ID+' és: '+datos.a[index].text);
						//console.log(datos.a[index].text);
						var texto = datos.CEF[index].text;						
						sessionStorage.setItem("textPersona", texto);						
					}
					
				}else if(mapa === 2){
					if(idFinal == datos.BHO[index].ID){
						//console.log('El text per l Event '+datos.a[index].ID+' és: '+datos.a[index].text);
						//console.log(datos.a[index].text);
						var texto = datos.BHO[index].text;						
						sessionStorage.setItem("textPersona", texto);						
					}
				}else if(mapa === 3){
					if(idFinal == datos.LTH[index].ID){
						//console.log('El text per l Event '+datos.a[index].ID+' és: '+datos.a[index].text);
						//console.log(datos.a[index].text);
						var texto = datos.LTH[index].text;						
						sessionStorage.setItem("textPersona", texto);						
					}
				}
			} 
		});
		
		text = sessionStorage.getItem("textPersona");
		return text;		
	}
	
	//Funció que estableix les dades i capa lògica del mapa. (TileMap)
	//0-Lliure, 1-Bloca, 2-Esdeveniment Simple i Bloca, 3-Esdeveniment Complex i Lliure, 6 7 8 9- Sortides
	function cridaMapa(id){
		if(id === 1){	//Ciudad Céfiro
			//Establim el mapa de Tiles
			map0=[
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,0,0,0,2,0,0,0,0,0,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,
				1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
				1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
				1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
				1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,2,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,2,0,0,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,0,0,0,0,2,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,
			];			
			img.src = "img/maps/ciudadCefiro_SG_CE.dib";	//Establim la URL del mapa de fons			
			idBase = 'CEF';									//Establim el prefix dels events			
			columnesMapa = 50;								//Establim el nombre de columnes del mapa			
			ampladaMapa = 800; alçadaMapa = 640;			//Establim les mides del mapa.			
			//Establim els límits matemàtiques per al moviment de la càmera del mapa.
			mapX_DR = 0; jugX_DR = 0;
			mapY_BA = -240; jugY_BA = 194;
			mapX_ES= 0; jugX_ES = 504;
			gameover=true;							//Establim que l'usuari ha de fer un "reset".			
		}else if(id === 2){	//Bosque de las Horas
			map0=[
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,2,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,3,3,3,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,
				1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,3,3,3,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,
				1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,
				1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,2,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,
				9,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,
				9,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,
				9,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,0,0,0,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,3,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,2,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,3,3,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,3,3,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			];
			img.src = "img/maps/bosqueHoras_SG_CE.dib";	//Establim la URL del mapa de fons			
			idBase = 'BHO';							//Establim el prefix dels events			
			columnesMapa = 57;						//Establim el nombre de columnes del mapa			
			ampladaMapa = 912; alçadaMapa = 752;	//Establim les mides del mapa.
			//Establim els límits matemàtiques per al moviment de la càmera del mapa.
			mapX_DR = -112; jugX_DR = 392;
			mapY_BA = -352; jugY_BA = 194;
			mapX_ES= 0; jugX_ES = 504;
			gameover=true;							//Establim que l'usuari ha de fer un "reset".			
		}else if(id === 3){	//Lago Themis
			map0=[
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,3,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,
				1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,
				1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,
				1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,
				1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,
				0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,2,1,0,0,0,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,1,1,1,1,0,1,1,1,1,
				1,1,0,2,0,0,0,0,0,3,3,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,0,0,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,1,1,0,0,1,1,0,0,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,1,1,1,1,1,0,0,2,0,1,1,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,0,1,1,1,
				1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,
				1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,
				1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,0,1,0,0,1,0,1,1,1,
				9,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				9,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				9,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,2,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,2,1,7,
				1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,7,
				1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,7,
				1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,7,
				1,1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			];			
			img.src = "img/maps/lagoThemis_SG_CE.dib";	//Establim la URL del mapa de fons			
			idBase = 'LTH';							//Establim el prefix dels events			
			columnesMapa = 60;						//Establim el nombre de columnes del mapa			
			ampladaMapa = 960; alçadaMapa = 640;	//Establim les mides del mapa.
			//Establim els límits matemàtiques per al moviment de la càmera del mapa.
			mapX_DR = -160; jugX_DR = 392;
			mapY_BA = -240; jugY_BA = 194;
			mapX_ES= 0; jugX_ES = 552;
			gameover=true;							//Establim que l'usuari ha de fer un "reset".
		}
		changeBSO(id, null);
	}
	
	//Funció que ens permetrà canviar de mapa en funció de la sortida que hagém travessat. Establirà el mapa nou i la posició on hem d'aparèixer.
	function comprovaCanviMapa(idSortida){	
		if(idSortida === 6){	//Sortides pel Nord
			
			
		}else if(idSortida === 7){ //Sortides per l'Est
			if(nouIDMapa === 1){	//Ciudad Cefiro
				nouIDMapa = 2; // -> Bosque Horas
				resetPNJX = 16; resetPNJY = 432;		//Establim les posicions d'inici/reset al mapa.			
				mapaBI_X = 0;	mapaBI_Y = -240;		//Modifiquem la posició del mapa
			}else if(nouIDMapa === 2){	//Bosque de las Horas
				nouIDMapa = 3; // -> Lago Themis
				resetPNJX = 32; resetPNJY = 416;		//Establim les posicions d'inici/reset al mapa.			
				mapaBI_X = 0;	mapaBI_Y = -224;		//Modifiquem la posició del mapa
			}
			
		}else if(idSortida === 8){
			
			
		}else if(idSortida === 9){	//Sortides per l'Oest
			if(nouIDMapa === 2){	//Bosque de las Horas
				nouIDMapa = 1; // -> Ciudad Céfiro
				resetPNJX = 768; resetPNJY = 288;			//Establim les posicions d'inici/reset al mapa.			
				mapaBI_X = 0;	mapaBI_Y = -96;		//Modifiquem la posició del mapa
			}else if(nouIDMapa === 3){	//Lago Themis
				nouIDMapa = 2; // -> Bosque de las Horas
				resetPNJX = 880; resetPNJY = 688;		//Establim les posicions d'inici/reset al mapa.			
				mapaBI_X = -112; mapaBI_Y = -352;		//Modifiquem la posició del mapa
			}		
		}		
	}
	
	//Funció que s'executa quan travessem un esdeveniment Complex, controlem quin esdeveniment és i executem el seu contingut.
	function intersectaEvent(idEvent){
		console.log('Colisió amb Event: '+idEvent+' Estat de l\'Event: '+sessionStorage.getItem(idEvent));
		idCurrentEvent = idEvent;	//Desa l'esdeveniment en curs
		var codi = prova(idEvent,sessionStorage.getItem(idEvent)); 		//Obtenim el codi a executar en funció de l'esdeveniment que obtenim del SS.
		
		//Funcions per a realitzar les animacions. Formen part de la execució del setInterval.
		function tempsBHO101_CHBLA(){
			//Quan la posició sigui major/menos que el limit, finalitzem l'intèrval.
			if(chachis[0].y > limitMov1){
				chachis[0].x = -100;clearTimeout(t);//console.log("Pos Y: "+chachis[0].x+" - limit: "+limitMov1);
			}else{
				//Mentre no superi el límit, es calcula la nova distància, i se li assigna.
				var novaDist = mouChachi(chachis[0].y);chachis[0].y = novaDist;				
			}
		}
		function tempsBHO101_CHOSC(){			
			if(chachis[1].y > limitMov2){
				clearTimeout(t2);//console.log("Pos Y: "+chachis[1].y+" - limit: "+limitMov2);
			}else{
				var novaDist = mouChachi(chachis[1].y);chachis[1].y = novaDist;				
			}			
		}
		function tempsBHO101_CHNAT(){			
			if(chachis[2].y > limitMov3){
				clearTimeout(t3);sessionStorage.setItem("BHO_101",1);//console.log("Pos Y: "+chachis[2].y+" - limit: "+limitMov3);
			}else{
				var novaDist = mouChachi(chachis[2].y);chachis[2].y = novaDist;
			}
		}
		function tempsLTH102_CHAGU(){			
			if(chachis[0].x > limitMov1){
				clearTimeout(t1);sessionStorage.setItem("LTH_102",1);//console.log("Pos Y: "+chachis[2].y+" - limit: "+limitMov3);
			}else{
				var novaDist = mouChachi(chachis[0].x);chachis[0].x = novaDist;
			}
		}
		function tempsLTH103_MAPCCL(){			
			if(cicle > limitCicle){
				img.src = "img/maps/lagoThemis_SG_CE.dib";clearTimeout(t1);sessionStorage.setItem("LTH_103",1);//console.log("Pos Y: "+chachis[2].y+" - limit: "+limitMov3);
			}else{
				cicle = cicle + 1;
			}
		}
		
		//Quan sigui l'event fixat manualment, i la sessió no s'hagi executat, es fixaran les dades inicials per a l'animació de l'event en concret.
		if(idCurrentEvent === "BHO_101" && sessionStorage.getItem("BHO_101") == 0){
			var limitMov1 = 304;	//Límit fins on es podrà moure l'element
			chachis[0].y = 64;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[0].x = 288;
			var t = setInterval(tempsBHO101_CHBLA,100);	//Cridem l'intèrval.
			var limitMov2 = 272;
			chachis[1].y = 48;
			chachis[1].x = 288;
			var t2 = setInterval(tempsBHO101_CHOSC,100);
			var limitMov3 = 400;
			chachis[2].y = 64;
			chachis[2].x = 272;
			var t3 = setInterval(tempsBHO101_CHNAT,100);
		}
		
		if(idCurrentEvent === "BHO_102" && sessionStorage.getItem("BHO_102") == 0){
			//Chachi de Natura
			chachis[0].y = 80;
			chachis[0].x = 328;			
			//Chachi Fosc
			chachis[1].y = 48;
			chachis[1].x = 328;
		}
		
		if(idCurrentEvent === "BHO_103" && sessionStorage.getItem("BHO_103") == 0){
			caminaCorrecte = false;pause= true;
			//Chachi de Natura
			chachis[0].y = 244;
			chachis[0].x = 352;
			//Chachi Fosc
			chachis[1].y = 244;
			chachis[1].x = 336;
			enviaDadesCombat(2);	//Crida a la fucnió que permet iniciar un combat.
			//Guardar partida completa, i després, afegir el nou Chachi. Finalment cal baixar les noves dades per carregar-les al session.
			//save_game()			
		}
		
		if(idCurrentEvent === "LTH_101" && sessionStorage.getItem("LTH_101") == 0){
			caminaCorrecte = false;pause= true;			
			chachis[0].y = 32;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[0].x = 688;
			enviaDadesCombat(2);
		}
		
		if(idCurrentEvent === "LTH_102" && sessionStorage.getItem("LTH_102") == 0){
			caminaCorrecte = false;pause= true;
			var limitMov1 = 608;	//Límit fins on es podrà moure l'element
			chachis[0].y = 176;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[0].x = 160;
			var t1 = setInterval(tempsLTH102_CHAGU,100);	//Cridem l'intèrval.
		}
		
		if(idCurrentEvent === "LTH_103" && sessionStorage.getItem("LTH_103") == 0){
			caminaCorrecte = false;pause= true;
			var limitCicle = 1;		//Límit fins on es podrà moure l'element
			var cicle = 0;
			chachis[0].y = 152;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[0].x = 496;
			chachis[1].y = 352;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[1].x = 512;
			chachis[2].y = 330;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[2].x = 728;
			chachis[3].y = 52;		//Fixem la posició inicial de l'element a la X i Y.
			chachis[3].x = 310;
			img.src = "img/maps/lagoThemis_fosc.png";
			var t1 = setInterval(tempsLTH103_MAPCCL,2000);	//Cridem l'intèrval.
		}
		
		eval(codi);
	}
	
	//Funció on farem que afegeixi un nou Chachi a la Base de Dades.
	function addNewChachi(idEvent,idGame){
		var jsonTx = { // Tx -> Transmission || Rx -> Reception
			event: idCurrentEvent,	//Posat manual, caldrà obtenir-lo del sessionStorage.
			game: idGame
		};
		console.log('A Enviar: q='+JSON.stringify(jsonTx));
		$.ajax({
			data: "q="+JSON.stringify(jsonTx),
			type: "POST",
			dataType: "json",
			url: "./PHP/create_new_chachi.php",
			async: false,
			cache: false,
		})
		.done(function( data, textStatus, jqXHR ){			
			//console.log('DINS DE evComRes! Dades: '+JSON.stringify(data));
			sessionStorage.setItem("mapUserData", JSON.stringify(data));
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
				console.log( "La solicitud a fallado: " +  errorThrown);
				console.log( "La solicitud a fallado: " +  jqXHR);
			}
		});
	}
	
	function getTeamChachis(){
		jsonObject = {
			idGame : sessionStorage.getItem('idGame'),
			op:1,
			chachis: []
		}
		var stringifyedJsonObject2=JSON.stringify(jsonObject);
		$.ajax({
			data:'q='+stringifyedJsonObject2,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
			console.log('dades chachis OK');
			var dades = data;
			//console.log('dades2-'+data.chachis[1].idChachi+data.chachis[0].MP);
			sessionStorage.setItem('chachis',JSON.stringify(dades.chachis));
		}).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown);
		});	
		Battle(0,1);
		show();
	}
	
	//Funció que permet establir l'aleatorietat amb la que poden apareixer els combats pel mapa. Sols s'executa qunan passa per un lloc lliure.
	function enemicsAleatoris(){
		var numFinal = Math.random() * (1000 - 0) + 0;	//calculem un número aleatori entre 0 i 1000
		if(numFinal > 990){
			console.log('Chachimolongo Salvatge ataca!');
			caminaCorrecte = false;	//Bloquem i pausem els moviments del personatge
			pause = true;
			enviaDadesCombat(1);	//Crida a la fucnió que permet iniciar un combat.
		}
	}
	
	//Funció que cridarà la pestanya per iniciar un combat, recollirà i enviarà les dades en funció del tipus de combat que és.
	function enviaDadesCombat(tipus){
		musicBattle = true;
		changeBSO(nouIDMapa,tipus);
		if(tipus == 1){
			console.log('Envia dades: ID MAP: '+nouIDMapa);	//Enviar el idMapa
			idCurrentEvent = 0;
			$("#text").text("Pulsa INTRO para continuar.");
			Battle(0,nouIDMapa);
			changeTab(3);
		}else if(tipus == 2){
			if(idCurrentEvent == "BHO_103"){
				console.log('Envia dades: ID MAP: '+nouIDMapa+' - ID Enemy: 2'); //Enviar mapa i enemic.
				Battle(2,nouIDMapa);	//ID Fixed Enemy.
				changeTab(3);
			}else if(idCurrentEvent == "LTH_101"){
				console.log('Envia dades: ID MAP: '+nouIDMapa+' - ID Enemy: 3'); //Enviar mapa i enemic.
				Battle(3,nouIDMapa);	//ID Fixed Enemy.
				changeTab(3);
			}
		}
		//console.log();
	}
	
	//Funció que mou el Chachi una posició fixa.
	function mouChachi(chachi){
		//chachiAgua.y = chachiAgua.y + 4;
		return chachi + 4;
		//console.log('Baixem 4 pix ('+chachiAgua.y+')');
	}
	
	//Funció que crida a checkpointEvents per a desar la realització d'un esdeveniment.
	function checkpoint(idEvent,idGame){
		checkpointEvents(idGame, idEvent, 1);
	}
	
	//Funció que agafarà de la Base de Dades les dades per carregar la partida d'un usuari.
	function carregarPartida(usuari){
		console.log('Carreguem la partida');
		var jsonTx = { // Tx -> Transmission || Rx -> Reception
			pnj: usuari			
		};
		console.log('A Enviar: q='+JSON.stringify(jsonTx));
		$.ajax({
			data: "q="+JSON.stringify(jsonTx),
			type: "POST",
			dataType: "json",
			url: "./PHP/load_game.php",
			async: false,
			cache: false,
		})
		.done(function( data, textStatus, jqXHR ){			
			//console.log('DINS DE evComRes! Dades: '+JSON.stringify(data));
			sessionStorage.setItem("mapUserData", JSON.stringify(data));
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
				console.log( "La solicitud a fallado: " +  errorThrown);
				console.log( "La solicitud a fallado: " +  jqXHR);
			}
		});
	}
	
	//Funció per a guardar la partida mitjançant el botó.
	function save_game(){
		//Necessitem les dades del mapa per una banda, i per l'altre les dels chahcis actius de l'equip.
		var PX = player.x;
		var PY = player.y;
		var MX = mapaBI_X;
		var MY = mapaBI_Y;
		var MAP = nouIDMapa;
		var game = idGame;
		var chachiGame = sessionStorage.getItem("chachis");
		console.log('Desar la partida: ');
		console.log('PARTIDA NÚMERO: '+game);
		console.log('ID MAPA: '+MAP+' - JUGADOR: '+PX+':'+PY+' - MAPA: '+MX+':'+MY);
		console.log('Dades dels Chachimolongos: '+chachiGame);
		
		var jsonTx = { // Tx -> Transmission || Rx -> Reception
			posJX: PX,	
			posJY: PY,
			posMX: MX,
			posMY: MY,
			map: MAP,
			game: game,
			chachis: chachiGame
		};
		console.log('A Enviar: q='+JSON.stringify(jsonTx));
		$.ajax({
			data: "q="+JSON.stringify(jsonTx),
			type: "POST",
			dataType: "json",
			url: "./PHP/save_game.php",
			async: false,
			cache: false,
		})
		.done(function( data, textStatus, jqXHR ){			
			//console.log('DINS DE evComRes! Dades: '+JSON.stringify(data));
			//sessionStorage.setItem("JSONeventsComplexos", JSON.stringify(data));
			console.log('RESULTAT DE DESAR PARTIDA: '+JSON.stringify(data));
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if ( console && console.log ) {
				console.log( "La solicitud a fallado: " +  textStatus);
				console.log( "La solicitud a fallado: " +  errorThrown);
				console.log( "La solicitud a fallado: " +  jqXHR);
			}
		});
	
	
	}
	
	//Funció que s'inicia a l'inici de l'execució.
    function init(){
		var dadesJSON;
		if(newGame === true){
			console.log("SessióStorage: "+sessionStorage.getItem("idGame"));
			idGame = sessionStorage.getItem("idGame");
			carregarPartida(idGame);						//Hem d'obtenir les dades de desat de l'usuari.			
			dadesJSON = JSON.parse(sessionStorage.getItem("mapUserData"));
			nouIDMapa = parseInt(dadesJSON.txt[0].idMap);
			resetPNJX = parseInt(dadesJSON.txt[0].spritePosX);
			resetPNJY = parseInt(dadesJSON.txt[0].spritePosY);
			mapaBI_X = parseInt(dadesJSON.txt[0].mapPosX);
			mapaBI_Y = parseInt(dadesJSON.txt[0].mapPosY);
			//nouIDMapa = 1;
			//resetPNJX = 144; resetPNJY = 112;		//Establim les posicions d'inici/reset al mapa.
			//mapaBI_X = 0;	mapaBI_Y = 0;			//Modifiquem la posició del mapa
			//var estatEvent = false;
			//sessionStorage.setItem("EC_CEF_1", estatEvent);
			//nouIDMapa = 3; // -> Lago Themis
			//resetPNJX = 32; resetPNJY = 416;		//Establim les posicions d'inici/reset al mapa.			
			//mapaBI_X = 0;	mapaBI_Y = -224;		//Modifiquem la posició del mapa
		}		
        canvas=document.getElementById('pantalla');	//Obte l'element canvas
        ctx=canvas.getContext('2d');	//Especifica el context d'aquest canvas 
        canvas.width=800;				//Determina l'amplada del canvas
        canvas.height=400;				//Determina l'alçada del canvas
		worldWidth=canvas.width;
        worldHeight=canvas.height;		
		//console.log('INIT IDMAP: '+nouIDMapa);
		cridaMapa(nouIDMapa);			//Per iniciar, cal que esbrinem quin mapa cridarem.        		
		setMap(map0,columnesMapa,16);	//Cridem a la funció per a establir el mapa. (mapa a llegir, columnes, i pixels/columna)
        if(newGame === true){
			run();				//No ho recordo bé, pero diria que era per iniciar a pintar el canvas.
			newGame = false;	
			repaint();			//Inicia l'execució del repaint per refrescar el canvas cada x ms.
		}
    }

    function run(){
        setTimeout(run,50);
        act(0.05);
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }
	
	//Funció que s'usa per resetejar la partida o al iniciar-la
    function reset(){
        player.x = resetPNJX;
		player.y = resetPNJY;
        gameover=false;		
    }
	
	//Funció que s'executa cada x ms.
    function act(deltaTime){
        if(!pause){	//Si no està pausat, fem l'execució.
            // GameOver Reset
            if(gameover)
                reset();
            
			//Event del botó A
			if(pressing[KEY_A]){
				player.y-=mov;	//Movem al personatge endavant
				//Fem un for per recorre els elements secundaris.
                for(var i=0;i<pnj.length;i++){
					
					//Cridem a la funció intersects per determinar si el jugador ha creuat amb un element.
                    if(player.intersects(pnj[i])){
						//console.log('Event Persona de: '+pnj[i].id);
						console.log(pnj[i].id);
						$('#text').text(pnj[i].id);
						break;	//Si l'ha trobat, aturem la cerca per a que no surtin repetits o els del rang proper.
                    }
                }
				player.y+=mov;	//Tornem a retrocedir el personatge
				prova();
			}
			
            // Move Rect
            if(pressing[KEY_UP]){		//Amunt
                player.y-=mov;
				caminaCorrecte = true;				
                for(var i=0;i<wall.length;i++){
					//Comprovem que el jugador no interseccioni amb un mur o element secundari
                    if(player.intersects(wall[i]) || player.intersects(pnj[i])){
						player.y+=mov;
						caminaCorrecte = false;
                    }
					if(player.intersects(sortides[i])){							
						comprovaCanviMapa(sortides[i].id);						
						init();
						caminaCorrecte = false;
					}
					if(player.intersects(events[i])){
						intersectaEvent(events[i].id);						
					}
                }
				
				if(caminaCorrecte == true){
					if(cam != null){
						if(mapaBI_Y < cam.y && player.y < alçadaMapa-208){
							//console.log('Càmara activa, mapa en moviment: '+mapaBI_Y+' / Posició Y personatge: '+player.y);
							mapaBI_Y = mapaBI_Y + mov;
						}else{
							//console.log('Càmara activa.'+mapaBI_Y+' / Posició Y personatge: '+player.y);
						}
					}
					if(lastPress == KEY_UP){
						enemicsAleatoris();
					}
				}				
            }
            if(pressing[KEY_RIGHT]){	//Dreta    //Moure després de l'execució d'un event? Esperar a un "OK" per part de l'usuari?
                player.x+=mov;
				caminaCorrecte = true;				
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i]) || player.intersects(pnj[i])){
                        player.x-=mov;
						caminaCorrecte = false;
                    }
					if(player.intersects(sortides[i])){							
						comprovaCanviMapa(sortides[i].id);
						console.log('reinicio');
						init();
						caminaCorrecte = false;
					}
					if(player.intersects(events[i])){
						intersectaEvent(events[i].id);						
					}
                }
				
				if(caminaCorrecte == true){					
					if(cam != null){						
						if(mapaBI_X > mapX_DR && player.x > jugX_DR){	// A -112  B 392
							//console.log('MOV: La posició del mapa '+mapaBI_X+' {<}  que la càmera: '+cam.x);
							mapaBI_X = mapaBI_X - mov;							
						}else{
							//console.log('FIX: La posició del mapa '+mapaBI_X+' {!<}  que la càmera: '+cam.x);
						}
					}
					if(lastPress == KEY_RIGHT){
						enemicsAleatoris();
					}
				}
            }
            if(pressing[KEY_DOWN]){	//Baixar
                player.y+=mov;
				caminaCorrecte = true;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i]) || player.intersects(pnj[i])){
                        player.y-=mov;
						caminaCorrecte = false;						
                    }
					if(player.intersects(sortides[i])){							
						comprovaCanviMapa(sortides[i].id);						
						init();
						caminaCorrecte = false;
					}
					if(player.intersects(events[i])){
						intersectaEvent(events[i].id);						
					}
                }
				
				if(caminaCorrecte == true){					
					if(cam != null){	
						if(mapaBI_Y > mapY_BA && player.y > jugY_BA){
							//console.log('La posició del mapa ('+mapaBI_Y+') és més gran que la càmera: '+cam.y+' (Act: '+camYCS+'Límit -240)');
							mapaBI_Y = mapaBI_Y - mov;							
						}else{
							//console.log('Càmara activa.'+mapaBI_Y+' / Posició Y camera: '+cam.y);
						}						
					}
					if(lastPress == KEY_DOWN){
						enemicsAleatoris();
					}
				}
				
            }
            if(pressing[KEY_LEFT]){	//Esquerra
                player.x-=mov;
				caminaCorrecte = true;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i]) || player.intersects(pnj[i])){
                        player.x+=mov;
						caminaCorrecte = false;
                    }
					if(player.intersects(sortides[i])){							
						comprovaCanviMapa(sortides[i].id);
						init();
						caminaCorrecte = false;
					}
					if(player.intersects(events[i])){
						intersectaEvent(events[i].id);						
					}
                }
				
				if(caminaCorrecte == true){					
					if(cam != null){						
						if(mapaBI_X < cam.x && player.x < jugX_ES){
							//console.log('MOV: La posició del mapa '+mapaBI_X+' {<}  que la càmera: '+cam.x);
							//console.log('MOV! MAPX: '+mapaBI_X+' < '+cam.x+' I PNJX: '+player.x+' < 512');							
							mapaBI_X = mapaBI_X + mov;							
						}else{
							//console.log('Càmara activa.'+mapaBI_X+' / Posició Y personatge: '+player.x);
						}
					}
					if(lastPress == KEY_LEFT){
						enemicsAleatoris();
					}
				}				
            }
            
            // Out Screen Cas que arribi al final de la pantalla, reposicionarem el jugador
            if(player.x>worldWidth)
                player.x-=mov;	//De moment, que retrocedeixi!
            if(player.y>worldHeight)
                player.y-=mov;
            if(player.x<0)
				player.x+=mov;
            if(player.y<0)
                player.y+=mov;
                
           	cam.focus(player.x+player.width/2,player.y+player.height/2);
			
        }
		//Es pausa automàticament quan succeix un event, s'ha de despausar prememnt enter.
        // Pause/Unpause
        if(lastPress==KEY_ENTER){
			if(pause === true){
				checkpoint(idCurrentEvent,idGame);
				pause=!pause;
				$("#text").text("");
				lastPress=null;
				if(idCurrentEvent == 'BHO_102'){
					sessionStorage.setItem("BHO_102",1);
				}else if(idCurrentEvent == 'BHO_103'){
					sessionStorage.setItem("BHO_103",1);
					addNewChachi(idCurrentEvent,idGame);	//Afegim el Chachi de la Natura (ID: 4).
					getTeamChachis();
				}else if(idCurrentEvent == 'LTH_101'){
					sessionStorage.setItem("LTH_101",1);
					addNewChachi(idCurrentEvent,idGame);	//Afegim el Chachi de la Natura (ID: 4).
					getTeamChachis();
				}
				
				//Bloquem música de combat i iniciem la de la ruta.
				if(musicBattle === true){
					changeBSO(nouIDMapa,null);
					//console.log('Hem fet un combat i canviem a música del mapa');
					musicBattle = false;
				}
				
				idCurrentEvent = 0;
			}
        }
    }
	
	//Funció que ens permetrà dibuixar el moviment de l'sprite protagonista
	//(context, sprite, direcció, amplada, alçada)
	function dibuxaMoviment(ctx,sprite,dir,amp,alc){		
		//Usem el contador de caminar per determinar quina imatge mostrar
		if(caminar < 9){
			player.drawImageArea(ctx, cam, sprite, dir,0,amp,alc);
		}else if(caminar < 18){
			player.drawImageArea(ctx, cam, sprite, dir,19,amp,alc);
		}else if(caminar < 27){
			player.drawImageArea(ctx, cam, sprite, dir,38,amp,alc);
		}
		caminar = caminar + 1;
		if(caminar > 26){
			caminar = 0;	//Si arriba al final, el reiniciem a 0.
		}
	}
	
	//Funció que farà que es mostrin els es sprites si és necessari.
	function pintaEvents(ctx){
		if(idCurrentEvent === "BHO_101" && sessionStorage.getItem("BHO_101") == 0){
			//console.log('DINSs');
			chachis[0].drawImageArea(ctx, null, SpriteChachiAgua, 0,0,16,16);
			chachis[1].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);
			chachis[2].drawImageArea(ctx, null, SpriteChachiNatu, 0,0,16,16);
		}else if(idCurrentEvent === "BHO_102" && sessionStorage.getItem("BHO_102") == 0){
			chachis[0].drawImageArea(ctx, null, SpriteChachiNatu, 0,0,16,16);
			chachis[1].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);			
		}else if(idCurrentEvent === "BHO_103" && sessionStorage.getItem("BHO_103") == 0){
			chachis[0].drawImageArea(ctx, null, SpriteChachiNatu, 0,0,16,16);
			chachis[1].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);			
		}else if(idCurrentEvent === "LTH_101" && sessionStorage.getItem("LTH_101") == 0){
			chachis[0].drawImageArea(ctx, null, SpriteChachiAgua, 0,0,16,16);			
		}else if(idCurrentEvent === "LTH_102" && sessionStorage.getItem("LTH_102") == 0){
			chachis[0].drawImageArea(ctx, null, SpriteChachiAgua, 0,0,16,16);				
		}else if(idCurrentEvent === "LTH_103" && sessionStorage.getItem("LTH_103") == 0){
			chachis[0].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);
			chachis[1].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);
			chachis[2].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);
			chachis[3].drawImageArea(ctx, null, SpriteChachiOscu, 0,0,16,16);
		}
		
	}	
	
	//Funció on pintarem els elements del canvas.
    function paint(ctx){
		//pasamos la imagen al 2d del canvas y se dibujará
		//en 0 0 podemos poner las cordenadas de donde empezar a dibujar la imagen
		//Dibuixem el fons del Canvas en color i hi posem el mapa de fons.
        ctx.fillStyle='#000';	//Color de fons.
        ctx.fillRect(0,0,canvas.width,canvas.height);	//Redibuixa el canvas sencer
        ctx.drawImage(img, mapaBI_X, mapaBI_Y);		//Indiquem on dibuixem la imatge de fons.
		//console.log('Mapa: X: '+mapaBI_X+' Y: '+mapaBI_Y+' | PNJ: X: '+player.x+' Y: '+player.y);
		//console.log('Posició del jugador: X: '+player.x+' / Y: '+player.y);
		ctx.strokeStyle='#0f0';
		switch(lastPress){ //37 = Esq | 38 = Sup | 39 = Dre | 40 = Inf
			case 37:	dibuxaMoviment(ctx,fullaSpritesVerde,16,16,19);				//Cridem per dibuixar l'animació.
						darreraPosicioMoviment = 16;						//Desem la posioció de la fulla on ha quedar el jugador al no moure's						
						break;
			case 38:	dibuxaMoviment(ctx,fullaSpritesVerde,48,16,19);
						darreraPosicioMoviment = 48;
						break;
			case 39:	dibuxaMoviment(ctx,fullaSpritesVerde,32,16,19);
						darreraPosicioMoviment = 32;
						break;
			case 40:	dibuxaMoviment(ctx,fullaSpritesVerde,0,16,19);
						darreraPosicioMoviment = 0;
						break;
			default:	player.drawImageArea(ctx, cam, fullaSpritesVerde, darreraPosicioMoviment,0,16,19);			
		}
		
		//chachiAgua.x =288; chachiAgua.y = 64;
		pintaEvents(ctx);
		
		//player.drawImageArea(ctx, fullaSpritesVerde, 0,0,16,19);	//Dibuixem l'sprite
		//player.fill(ctx);
		
		//Si hem aixecat el botó, last press = 0 i aturem l'animació.
		
		//El d'abaix ens serviria per pintar les zones de murs i pnj. Però no es necessari.
        ctx.strokeStyle='#999';
        for(var i=0;i<wall.length;i++)
            //wall[i].fill(ctx,cam);
        ctx.strokeStyle='#f00';
        for(var i=0;i<pnj.length;i++)
            //pnj[i].fill(ctx,cam);
        
        //ctx.fillStyle='#aaa';
        //ctx.fillText('Last Key: '+lastPress,0,20);
        if(pause){
            ctx.textAlign='center';
            /*if(gameover)
                //ctx.fillText('GAMEOVER',150,100);
            else
                //ctx.fillText('PAUSE',150,100);*/
            ctx.textAlign='left';
        }
    }
	
	//Events per quan premem un boto i el deixem de premer.
    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
		lastPress = null;
        pressing[evt.keyCode]=false;
    },false);
	
	// Rectangles que són per al personatge principal, objectes que es mouen i parets
	
    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
    }

    Rectangle.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }

    Rectangle.prototype.fill=function(ctx,cam){
        if(cam!=null)
            ctx.fillRect(this.x-cam.x,this.y-cam.y,this.width,this.height);
        else
            ctx.fillRect(this.x,this.y,this.width,this.height);
    }
	
	Rectangle.prototype.drawImageArea = function(ctx, cam, img, sX, sY, sW, sH){
		if(cam!=null){
			//console.log('1');
			if(img.width){
				ctx.drawImage(img, sX, sY, sW, sH, this.x-cam.x, this.y-cam.y, this.width, this.height);				
			}else{
				ctx.strokeRect(this.x-cam, this.y-cam, this.width, this.height);
				
			}
		}else{
			//console.log('2');
			if(img.width){
				ctx.drawImage(img, sX, sY, sW, sH, this.x, this.y, this.width, this.height);				
			}else{
				ctx.strokeRect(this.x, this.y, this.width, this.height);
			}
		}
	}
	
	// Elements per als events.
	function EventSimple(x,y,width,height,id){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
		this.id=(id==null)?0:id;
    }

    EventSimple.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }

    EventSimple.prototype.fill=function(ctx,cam){
        if(cam!=null)
            ctx.fillRect(this.x-cam.x,this.y-cam.y,this.width,this.height);
        else
            ctx.fillRect(this.x,this.y,this.width,this.height);
    }
	
	function Camera(){
        this.x=0;
        this.y=0;
    }
        
    Camera.prototype.focus=function(x,y){
        this.x=x-canvas.width/2;
        this.y=y-canvas.height/2;
		var total = worldWidth-canvas.width;
		//console.log('CAMX: '+this.x+' - (>) RESX: '+total+' {'+worldWidth+' - '+canvas.width+'} | PNJX: '+player.x);
		//console.log('CAMX: '+this.x+' - (>) RESX: '+worldWidth-canvas.width+' {'+worldWidth+' - '+canvas.width+'} | PNJX: '+player.x);
        if(this.x<0){
            this.x=0;
			//console.log('X menor que 0');
        }else if(this.x>worldWidth-canvas.width){
            this.x=worldWidth-canvas.width;
			//console.log('X més gran que el mon menys l amplada canvas');
        }
		if(this.y<0){
            this.y=0;
        }else if(this.y>worldHeight-canvas.height){
            this.y=worldHeight-canvas.height;
		}
		//console.log('Valor de X: '+this.x +' / Valor de Y: '+this.y);
    }
	
	/*document.getElementById("desaPartida").onClick = function(){
		console.log("M'has clicat");
	}*/
	/*window.onload = function save(){
		document.getElementById("desaPartida").addEventListener('click', arribada, false);
		function arribada() {
			console.log('VULL DESAR LA PARTIDA');
			document.getElementById('desaPartida').blur();
			save_game();
		}
	}*/
	function save(){
		document.getElementById("desaPartida").addEventListener('click', arribada, false);
		function arribada() {
			console.log('VULL DESAR LA PARTIDA');
			document.getElementById('desaPartida').blur();
			if(lastPress == null){
				save_game();
			}
			
		}
	}
	//Solució
	if (document.addEventListener){
        window.addEventListener('load',save,false);
    } else {
        window.attachEvent('onload',save);
    }
	
	function changeBSO(idMap,typeEnemy){
		
		
		if(soAmbient){
			soAmbient.loop = false;
			soAmbient.pause();
			soAmbient.currentTime = 0;
			console.log('En teoria et pauso...');
		}
		
		if(typeEnemy == 1){
			soAmbient = null;
			soAmbient = new Audio("img/bgm/battle1.aac");
			
		}else if(typeEnemy == 2){
			soAmbient = null;
			soAmbient = new Audio("img/bgm/battle2.aac");
			
		}else{
			if(idMap == 1){				
				soAmbient = null;
				soAmbient = new Audio("img/bgm/bgm1_MV.aac");
			}else if(idMap == 2){
				soAmbient = null;
				soAmbient = new Audio("img/bgm/bgm2_LW.aac");
			}else if(idMap == 3){
				soAmbient = null;
				soAmbient = new Audio("img/bgm/bgm1_MV.aac");
			}
		}
		
		
		if(soAmbient){
			soAmbient.play();
			soAmbient.loop = true;
		}
		
	}
	
})();