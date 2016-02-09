 ///////variables auxiliars 
 var ene_chachi;
 var player;
 var idatt_player=0;
 var idatt_cpu=0;
 var vida_player=0;
 var vida_cpu=0;
 var magia_player=0;
 var magia_cpu=0;
 var name_enemi=0;
 var name_player=0;
 //si muere la cpu o el player
 var M_player=0;
 var M_cpu=0;
 //text de la batalla
 var txtAttack='Comienza la batalla';
 //variable per esperar a que continui el text
 var next=0;
 //var pos= sessionStorage.getItem('chachiACT');
 //variables de moviment
 var z= false;//enemic
 var g= false;//jugador
 var s=0;//variable intermitencia animacion
 //imatge de fons
 var img = new Image();
 img.src = "img/battle/green.jpg";
 //variables per  l'animacio
 var idAnimacion=2;
 var return1=false;
 var return2=false;
 var jugador=new Chachiprint(170,260,100,100);
 var enemic= new Chachiprint(500,260,100,100);;
 var go=false;
 var turno=0;
 var fin=false;
 //text quan acaba la batalla
 var txtfin="";
 //variable per tornar al mapa quan acabi la batalla
 var volverjuego=false;
 var chachis;
 //
//objeto chachi  ( es para pintar )
function Chachiprint(x,y,width,height){
			//this.img=0;
			this.x=(x==null)?0:x;
			this.y=(y==null)?0:y;
			this.width=(width==null)?0:width;
			this.height=(height==null)?this.width:height;
}
Chachiprint.prototype.drawImageArea = function(ctx, img, sX, sY, sW, sH){
	if(img.width){
		ctx.drawImage(img, sX, sY, sW, sH, this.x, this.y, this.width, this.height);
	}else{
		 ctx.strokeRect(this.x,this.y,this.width,this.height);
	}
	
}
 Chachiprint.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
	
//generar chachis pantalla function 
var chachiGen=function(type1,type2){// el objeto de chachi, caso de ser enemigo poner capa para "oscurecer"
	//1 
	console.log('pintar');
	var sprites=JSON.parse(sessionStorage.getItem('allDataChachi'));
	//console.log(sprites);
		window.addEventListener('load',init,false);
		var canvas=null,ctx=null;
		//variable del chachi podriamos pasarla por arriba (donde type)
		//enemic= new Chachiprint(500,260,100,100);
		//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<PROVA, TREURE DESPRES
		//enemic.x = 0;
		//enemic.y = 0;
		//enemic.img='p1.jpg';
		////
		//jugador= new Chachiprint(170,260,100,100);
		f1=new Image();
		f2=new Image();
		//buscar sprites
			//treure url 1 
			for(var i=0;i<sprites.length;i++){
				if(sprites[i].idType==type1){
					f1.src=sprites[i].sprite_url;
					break;
				}
			}
			//treure url2
			for(var i=0;i<sprites.length;i++){
				if(sprites[i].idType==type2){
					f2.src=sprites[i].sprite_url;
					break;
				}
			}
			//enemic.img=f1;
		//console.log('srcenemic:'+f1.src);
		//console.log('srcjugador:'+f2.src);
		txtAttack='Aparece chachi salvaje';
		var mousex=0;
		var mousey=0;
		//var but= new movementBut(1,100,100,100,20);
		var oldtxt=txtAttack;
		function init(){
			canvas=document.getElementById('battle_canvas');
			//afegir event listener del mouse
			//enableInputs();
			//context
			ctx=canvas.getContext('2d');
			run();
			repaint();		
		}
		function run(){
			setTimeout(run,50);
			act(1);
			//paint(ctx);
		}
		function repaint(){
			requestAnimationFrame(repaint);
			paint(ctx);
			//s++;
		}
		
		function act(deltaTime){
			if(z == true){
				enemic.x -=5;
				//z = false;
			}
			if(g == true){
				jugador.x+=5;
			}
			if(return1==true){
				jugador.x-=5;
				if(jugador.x==170){
					return1=false;
					//idanimacion=;
					go=true;
					fin=true;
				}
				//s++;
			}
			if(return2==true){
				enemic.x+=5;
				if(enemic.x==500){
					return2=false;
					//idanimacion=2;
					go=true;
					fin=true;
				}
				//s++;
			}
			s++;
		}
    //pintar 
		function paint(ctx){
			document.getElementById('textBatalla').innerHTML=txtAttack;
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.drawImage(img, 0,0);
			anima(ctx);
			if(turno==1){
				if(enemic.x<=(jugador.x+110)){	
					console.log('pep');
					z=false;
					return2=true;
					//idAnimacion=1;
					jugador.drawImageArea(ctx,f2,0,100,100,100);
				}
			}else if(turno==2){ 
				if((jugador.x+100)>=enemic.x){
					g=false;
					return1=true;
				//	idAnimacion=2;
					enemic.drawImageArea(ctx,f1,0,100,100,100);
				}
			}else{
				//enemic.drawImageArea(ctx,f1,0,0,100,100);
				//jugador.drawImageArea(ctx,f2,0,0,100,100);
			}
			
		
			var pos= sessionStorage.getItem('chachiACT');
					ctx.font = "bold 20px Arial";
			//vida jugador
				ctx.fillStyle = "black";
				ctx.fillText(name_player,20,420);
				//ctx.fillStyle = "red";
				//hp
				ctx.fillText("HP:",20,440);
				if(vida_player<=(chachis[pos].stats.maxhp/2)){
					ctx.fillStyle = "red";
				}else{
					ctx.fillStyle = "green";
				}
				ctx.fillText(vida_player+'/'+chachis[pos].stats.maxhp,55,440);
				//mp
				ctx.fillStyle = "black";
				ctx.fillText("MP:",150,440);
				if(magia_player<=(chachis[pos].stats.maxpm/2)){
					ctx.fillStyle = "orange";
				}else{
					ctx.fillStyle = "blue";
				}
				ctx.fillText(magia_player+'/'+Math.round(chachis[pos].stats.maxpm),185,440);
			//vida enemic
				ctx.fillStyle = "black";
				ctx.fillText(name_enemi,460,420);
				//ctx.fillStyle = "red";
				//hp
				ctx.fillText("HP:",460,440);
				if(vida_cpu<=(ene_chachi.stats.maxhp/2)){
					ctx.fillStyle = "red";
				}else{
					ctx.fillStyle = "green";
				}
				ctx.fillText(vida_cpu+'/'+ene_chachi.stats.maxhp,500,440);
				//mp
				ctx.fillStyle = "black";
				ctx.fillText("MP:",590,440);
				if(magia_cpu<=(ene_chachi.stats.maxpm/2)){
					ctx.fillStyle = "orange";
				}else{
					ctx.fillStyle = "blue";
				}
				ctx.fillText(magia_cpu+'/'+Math.round(ene_chachi.stats.maxpm),630,440);
				//final de batalla
				ctx.font = "bold 40px Arial";
				ctx.fillStyle = "white";
				ctx.fillText(txtfin,100,200);	
			//EXP
				ctx.font = "bold 20px Arial";
				ctx.fillStyle='black';
				//ctx.fillText('EXP:'+chachis[pos].ex+'/'+Math.round(chachis[pos].expNextLvl),350,440);
			//nivel
				ctx.fillText('  lvl:'+chachis[pos].level,270,440);
				ctx.fillText('  lvl:'+ene_chachi.level,700,440);
			//visual
			var pos= sessionStorage.getItem('chachiACT');
			vida_player=Math.round(chachis[pos].hp);
			vida_cpu=Math.round(ene_chachi.hp);
			magia_player=Math.round(chachis[pos].mp);
			magia_cpu=Math.round(ene_chachi.mp);
			
	}
	//
}
//funcio per animar
function anima(ctx){
	//animacion jugador
	if(s>0 & s<=3){
		jugador.drawImageArea(ctx,f2,100,0,100,100);
	}else if(s>3 && s<=6){
		jugador.drawImageArea(ctx,f2,200,0,100,100);
	}else if(s>6 && s<=8){
		jugador.drawImageArea(ctx,f2,0,0,100,100);
	}else{
		jugador.drawImageArea(ctx,f2,0,0,100,100);
	}
	//enemic.drawImageArea(ctx,f1,0,0,100,100);
	//animacion enemic
	if(s>0 & s<=3){
		enemic.drawImageArea(ctx,f1,100,0,100,100);
	}else if(s>3 && s<=6){
		enemic.drawImageArea(ctx,f1,200,0,100,100);
	}else if(s>6 && s<=8){
		enemic.drawImageArea(ctx,f1,0,0,100,100);
		
	}else{
		enemic.drawImageArea(ctx,f1,0,0,100,100);
		s=0;
	}
	//enemic.drawImageArea(ctx,f1,0,0,100,100);
}
//////////////////////////////////////////////
//funcio per generar els botons corresponents als moviments del chachi
function generatMovButs(movs){// array de moviments
	//buscar atacks y generar botons
	//console.log('Crear movement buttons');
	//$("#tabpage_3").append('<center>');
	for (var i=0;i<movs.length;i++){
		$("#tabpage_3").append('<button id='+movs[i].id+' class="attbut" onclick="attack(this.id)">'+movs[i].name+'</button>');
	}
	$("#tabpage_3").append('<button id="huir" class="huidaBut" onclick="changeTab(1)">Huir</button>');
	//$("#tabpage_3").append('</center>');
}
//funcio per mirar si hi ha suficients punts de magia per fer l'atack
function checkPM(att,pms){
	if(att.pm>pms || pms<=0){
		console.log('asda');
		return false;
		
	}else{
		console.log('ds');
		return true;
	}
//	return false;
}
//funcion de ataque (restaria el daño)
function attack(idmov){ //? mriar que cosas necesitamos para atacar
	disable_buts();
	var mov;
	//recoger los objetos de agresor y agredido ///(id,level,hp,mp,movs,type,ex) movement(id,power,prob,type,name,desc,ef)
	/*var ats=new Array(new movement(1,80,85,1,'vent luminic','ventiscaaaaaa',0),new movement(2,20,100,1,'espurna','---',0));//,new movement(2,20,100,1,'espurna','---',0),new movement(3,35,100,1,'lux','---',0),new movement(4,50,95,1,'raig de llum','--',0));
	var ats2=new Array(new movement(1,80,85,1,'vent luminic','ventiscaaaaaa',0),new movement(2,20,100,1,'espurna','---',0),new movement(3,35,100,1,'lux','---',0),new movement(4,50,95,1,'raig de llum','--',0));
	*/
	var agresor=player;//new chachi(1,1,80,90,0,1,0); //SACAR DEL SESSION STORAGE
	var agredido=ene_chachi;//new chachi(2,1,80,90,0,1,0);//SACAR DEL SESSION STORAGE 
	//////////////////////////
		//sacar objecte moviment del moviment seleccionat pel nostre chachi
		for(var x=0;x<agresor.movs.length;x++){
				if(agresor.movs[x].id==idmov){
					mov=agresor.movs[x];					
				}
		}
	//calcular reaccion del enemigo
	var atenemi= robochachi(agredido,agresor);//invertimos el orden porque para el enemi el agresor será el otro
	//console.log('-attack enemic :'+atenemi.name);
	var pos= sessionStorage.getItem('chachiACT');
	//comparamos la velocidad para ver quien ataca primero
	////////////orden de ataque segun velocidad
	//primero ataca enemi
	if(agresor.stats.vel<=agredido.stats.vel){//agresor.ve<=agredido.ve
		console.log('AtoB'+agresor.ve+'--'+agredido.ve);
		//si la velocidad del agresor  es mas pequeña que el enemigo atacas el agresor)
		//mirar probabilidad de ataque y suficientes pm
		if(prob_attack(atenemi) && checkPM(atenemi,ene_chachi.mp) ){
			chachis[pos]=apply_attack(atenemi, agredido, agresor);;
			txtAttack='Enemigo usa '+atenemi.name;
			console.log('daño aplicado a player');
			z=true;
			turno=1;
		}else{
			txtAttack='Enemigo ha fallado';
			go=true;
		}
		//console.log(player);
		//miramos si ha muerto y sino nos ataca
		if(check_death(agresor.hp)){
			console.log('Ha muerto el player');
			death(2);
		}else{	
			//ataque del enemigo
			if(prob_attack(mov) && checkPM(mov,chachis[pos].mp)){
				ene_chachi=apply_attack(mov, agresor, agredido);
				console.log('daño aplicado a enemi');
				var inter=setInterval(function(){
					if(go){
						txtAttack='Chachi usa '+mov.name;
						g=true;
						turno=2;
						//console.log(jugador.x+'x');
						clearInterval(inter);
						//console.log('b');
						go=false;
						//enable_buts();
					}
				},1);
			//console.log(ene_chachi);
			//idAnimacion=2;
			}else{
				txtAttack='Chachi Ha fallado';
			}
			if(check_death(agredido.hp)){
				death(1);
			}
		}
		//primero ataca chachi
	}else{
		console.log('BtoA');
		//si es al reves ataca el antes
		if(prob_attack(mov) && checkPM(mov,chachis[pos].mp)){
			ene_chachi=apply_attack(mov, agresor, agredido);
			txtAttack='Chachi  usa '+mov.name;
			g=true;
			turno=2;
			console.log('daño aplicado a enemi');
		}else{
			txtAttack='Chachi ha fallado';
			go=true;
		}
		//animacion
	
		if(check_death(agredido.hp)){
			console.log('a muerto el enemi');
			death(1);
		}else{
		//despues tu 
			if(prob_attack(atenemi)  && checkPM(atenemi,ene_chachi.mp)){
				chachis[pos]=apply_attack(atenemi, agredido, agresor);;
				console.log('daño aplicado a player');
				var inter=setInterval(function(){
					if(go){
						txtAttack='Enemigo usa '+atenemi.name;
						z=true;
						turno=1;
						//console.log(jugador.x+'x');
						clearInterval(inter);
						//console.log('b');
						go=false;
						//enable_buts();
					}
				},1);
			}else{
				txtAttack='Enemigo ha fallado';
			}
			if(check_death(agresor.hp)){
				death(2);
			}
		}
	}
	var finint= setInterval(function(){
		if(enemic.x==500 && jugador.x==170){
			enable_buts();
			//clearInterval(finint);
		}else{
			disable_buts();
		}
	},1);
	fin=false;
	go=false;
	//enable_buts();
	//g=false;
	//z=false;
}
//funcio per saber si ha mort algun chachi
function check_death(pj){
	//console.log('pj');
	//console.log(pj);
	if(pj<1){
		return true;
	}
		return false;
	
}
//calcular probabilidad de atacar
function prob_attack(mov){
	//console.log('calculem probabilitat');
	//calculem la probabilitat 
	var x= Math.floor((Math.random() * 100) + 1);
	//si esta dins de la probabilitat del atac retornem true
	if(x>0 && x<=mov.prob){
		return true;		
	}else{
		return false;
	}
}
//funcio per aplicar l'atack restar punts de vida i magia
function apply_attack(att, agresor, agredido){
		//aplicar daños 

		//podem calcular el dany amb  calc_dany y restar ps y mp
		var dano =calc_dany(agresor,agredido,att);
		if(dano>agredido.hp){
			agredido.hp=0;
		}else{
			agredido.hp=parseInt(agredido.hp)-dano;
		}
		if(agresor.pm-att.pm<=0){
			agresor.mp=0;
		}else{
			if(agresor.mp-att.pm<=0){
				agresor.mp=0;
			}else{
				agresor.mp=agresor.mp-att.pm;
			}
		}
		console.log('pms'+agresor.mp)
	return agredido;
}
//funcion de calculo de daños
function calc_dany(agresor,agredido,mov){ //tipo 1 el del atacante y el tipo 2 el del atacado asi podemos reutilizarla para enemigos y amigos
	//console.log('efectss----'+(parseInt(mov.type))+(parseInt(agredido.type)));
	//console.log('asd'+mov);
	var dany=0;
	//variables daño
	var ag_lvl=parseInt(agresor.level);
	var ag_st_atm=parseInt(agresor.stats.atm);
	var mov_pot=parseInt(mov.pot);
	var ag_st_dfm=parseInt(agredido.stats.dfm);
	var mov_type=parseInt(mov.type);
	var ag_type=parseInt(agredido.type);
	var ef=comprovarTipos(mov_type,ag_type);
	//formula daño 
	dany=0.2*ag_lvl+1;//1
	dany=dany*(ag_st_atm*mov_pot);//2//3
	dany=dany/(25*ag_st_dfm);//4//5
	dany=dany+2;//6
	dany=dany*(ef*0.01);//7//8
	dany=dany*(Math.floor(Math.random() * (100 - 85)) + 85);
	//console.log('efectivitat : '+ef);
	return dany;
}
// robot chachi inteligencia artificial para enemigos
function robochachi(agresor,agredido){//le pasamos el objeto chachi enemigo con el que calcularemos todo y el chachi normal amigo
	//variable para comparar daño y auxiliar
	//var maxDany=new Array();
	//console.log(agresor);
	var attack=0;
	var aux=new Array();
	//console.log('dentro robochachi');
	for(var i=0;i<agresor.movs.length;i++){
		if(agresor.movs[i].id!="999"){
		aux[i]=new Array();
		aux[i][0]=calc_dany(agresor,agredido,agresor.movs[i]);
		aux[i][1]=agresor.movs[i];
	//	console.log('calc daño: '+aux[i][0]);
		}
	}
	aux.sort();//ordenar atacks per dany
	// calcular probabilitat escollir moviment
	//// millor 50% aux[0], 2 mill aux[1], 3 mill aux[2], 4 mill aux[3]
	//random entre 1 y 100 para ver cual sacamos
	var x= Math.floor((Math.random() * 100) + 1);
	//si el random esta entre 1 y 50 sacamos el primero
	if( (x>=1 && x<=50) || (agresor.movs.length==1)){
		attack= aux[0][1];
	}else if( (x>=51 && x<=75) || (agresor.movs.length==2)){
		attack= aux[1][1];
	}else if( (x>=76 && x<=90) || (agresor.movs.length==3)){
		attack= aux[2][1];		
	}else if( (x>=91 && x>=100) || (agresor.movs.length==4)){
		attack= aux[3][1];
	}
	//console.log('eeee'+attack.name);
	/////retorna atack seleccionat 
	return attack;
}
//objecte moviment on guardarem les dades del moviment necesaries pels atacks
function movement(id,power,prob,type,name,desc,ef,pm){
	this.pot=power;
	this.id=id;
	this.prob=prob;
	this.type=type;
	this.name=name;
	this.descrip=desc;
	this.pm=pm;
	//efecte secundari encara per implementar
	this.effect=ef;
}
////objeto chachi usable para enemigos tambien
function chachi(id,level,hp,mp,movs,type,ex,t){
	this.id=id;
	this.level=level;
	this.movs=movs; //4 moviments
	this.type=type;
	//calcular stats df,at,ve la funcio retorna un objecte stats
	this.stats= calc_stats(level,type);
	//if(t)
		this.hp=this.stats.maxhp;
	//else
		//this.hp=hp;
	//this.stats.maxhp;//actual
	this.mp=this.stats.maxpm;//actual 
	//la experiencia para enemigos es 0
	this.ex=ex;
	this.expNextLvl=calc_exp_to_lvl(this.level);
	
}
////funcio que genera la batalla pasan per totes les funcions 
function Battle(idEnemic,idmap){
	chachis=from_json_tochachis(JSON.parse(sessionStorage.getItem('chachis')));
	removeMovementsBut();
	var sprites=JSON.parse(sessionStorage.getItem('allDataChachi'));
	////comienza la batalla : activar pestaña batalla
	//si id enemic es 0 es un aleatorio del mapa si es X numero es ese chachi
	//hemos de saber a que enemigo nos enfrentamos 
	//buscar enemigo
	//sacamos el id del mapa con sessionStorage.getItem('idMap')
	if(idEnemic==0){;
		console.log('llamar a genera enemic');
		var enemic = genera_enemic(idmap);
		//guardar enemic a la sessió per a recollirlo en l'atack
		//console.log('enemic');
		//console.log(enemic);
		name_enemi=sprites[enemic.id-1].name;
		sessionStorage.setItem('enemic',JSON.stringify(enemic));
	}else{
		//generar el chachi que toca
		//aconseguir el nivell
		getInfoChachi(idEnemic);
		var enemi=JSON.parse(sessionStorage.getItem('fix_enemy'));
		//console.log(enemi);
		console.log('aaaaaaa');
		var jsonObject2 = {
			id: enemi.idChachi,
			nivell: enemi.level,
			mov:0,
			op:1
		}
		getAttacks(jsonObject2);
		from_json_toMovs(JSON.parse(sessionStorage.getItem('enemymovs')));
		var moviments= JSON.parse(sessionStorage.getItem('movsaux'));
		//agafar atacs
		var enemic= new chachi(enemi.idChachi,enemi.level,0,0,moviments,enemi.idChachi,0,true);
		sessionStorage.setItem('enemic',JSON.stringify(enemic));
		ene_chachi=enemic;
		name_enemi=sprites[enemic.id-1].name;

	}
	
	//console.log(chachis[0].stats.hp);
	//genera chachi teu (has de saber cual chachi va en este turno (por defecto el primero de la lista y si muere pues el que elija el jugador
	//sacamos el primer chachi que tenga vida mayor a 0
	//console.log('aqui2');
	var jugador;
	for(var i=0;i<chachis.length;i++){
		if(chachis[i].hp>0){
			jugador=saca_chachi_to_battle(chachis[i],i);
			//console.log('sacamos ');
			break;
		}
	}
	//txtAttack='Chachi Azul sale al ataque';
	//console.log('2-aparece tu chachi');
	//console.log(sprites);
	//console.log(sprites[0].sprite_url);
	//truere chachis per pantalla
	//console.log(jugador);
	chachiGen(enemic.type,jugador.type);
	//carregar els chachis que s'utilitzaran com a player y com a enemic
	console.log('jugador');
		console.log(jugador);
	console.log('enemigo');
		console.log(enemic);
	console.log(' ');
	ene_chachi=enemic;
	player=jugador;
	name_player=sprites[player.type-1].name;
	//test console.log(get_base_exp_rival(enemic.type));
}
//funcio per treure un chachi a la batalla
function saca_chachi_to_battle(chachi,pos){
	sessionStorage.setItem('chachiACT',pos);
	//console.log(' el chachi');
	//generar botones
	generatMovButs(chachis[pos].movs);
	//chachiGen(chachis[pos].idChachi);
	//console.log('printar chachi');
	return chachis[pos];
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7/Main final

 
//limpiar els botons
Battle(0,1);
//console.log('caca');
//funcio per eliminar botons dels atacs
function removeMovementsBut(){
	$('.attbut').remove();
	$('.huidaBut').remove();
}
//informacio del chachi fixed
function getInfoChachi(id){
	var jsonObject2={
		id: id
	}
	var stringifyedJsonObject=JSON.stringify(jsonObject2);
	//console.log(stringifyedJsonObject+'aaaaaa');
	//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject,
			url:'./php/get_fixed_enemy.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				//console.log(data);	
				var dades = data;
				//console.log('dades'+data.spritePosY+'d'+data.spritePosX);
				sessionStorage.setItem('fix_enemy',JSON.stringify(dades))
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown+textStatus+jqXHR);
			});	
	
}
//pasar de json a objectes chachi
function from_json_tochachis(array){
	//transformar el json que da el php en chachi
	var equip= new Array();
	var stats= new Array();
	var allmovs= new Array();
	//console.log('ffuu');
	for(var i=0;i<array.length;i++){
		//sacar datos movs
		//console.log(i);
		var x=0;
		x=llegir_Movs_BBDD(array[i].idchachisGame);
		/*while(x=0){
			//MIRAR ALTERNATIVA?
		}*/
		//console.log('buuuuuuuu');
		//new Array(new movement(1,80,85,1,'vent luminic','ventiscaaaaaa',0),new movement(2,20,100,1,'espurna','---',0),new movement(3,35,100,1,'lux','---',0),new movement(4,50,95,1,'raig de llum','--',0));
		equip[i]=new chachi(array[i].idchachisGame,array[i].level,array[i].HP,array[i].MP,JSON.parse(sessionStorage.getItem('movsaux')),array[i].idChachi,array[i].EXP,false)
		stats[i]=equip[i].stats;	
		allmovs[i]=equip[i].movs;
	}
	sessionStorage.setItem('stats',JSON.stringify(stats));
	sessionStorage.setItem('allmovsteam',JSON.stringify(allmovs));
	return equip;
}	
//funcio que genera enemic random
function genera_enemic(idMap){
	var enemi=0;
	var enemiid=0;
	var enemilvl=0;
	//var enemi = new Chachi();
	//mirem al session storage els enemics de la zona
	var enemizone= JSON.parse(sessionStorage.getItem('mapsChachis'));
	//console.log(enemizone);
	//console.log(enemizone.length);
	var mida= enemizone.length;
	var aux= new Array();
	if(mida>1){
		//console.log('123');
		var j=0;
		for(var i=0;i<enemizone.length;i++){
			//console.log('321');
			if(enemizone[i].idMap==idMap){
				aux[j]=enemizone[i];
				//console.log('pep'+aux[i]);
				j++;
			}
		}
	}
	mida=aux.length;
	//console.log('mida');
	//console.log(aux);
	//calcular probabilitat enemic si tenim 1-2 o 3 tipus de enemics posibles
	if(aux.length>=3){
		//console.log('aa3');
		var x= Math.floor((Math.random() * 100) + 1);
		if(x>=1 && x<=30){
			enemiid=aux[0].idChachi;
			enemilvl=aux[0].minLevel;
			console.log('idenemi'+enemiid+'-lvl'+enemilvl);
			enemi=aux[0];
		}else if(x>=31 && x<=65){
			enemiid=aux[1].idChachi;
			enemilvl=aux[1].minLevel;
			console.log('idenemi'+enemiid+'-lvl'+enemilvl);
			enemi=aux[1];
		}else{
			enemiid=aux[2].idChachi;
			enemilvl=aux[2].minLevel;
			console.log('idenemi'+enemiid+'-lvl'+enemilvl);
			enemi=aux[2];
		}
		
	}else if(aux.length>=2){
		//console.log('aa2');
		var x= Math.floor((Math.random() * 100) + 1);
		if(x>=1 && x<=50){
			enemiid=aux[0].idChachi;
			enemilvl=aux[0].minLevel;
			//console.log('idenemi'+enemiid+'-lvl'+enemilvl);
			enemi=aux[0];
		}else{
			enemiid=aux[1].idChachi;
			enemilvl=aux[1].minLevel;
			//console.log('idenemi'+enemiid+'-lvl'+enemilvl);
			enemi=aux[1];
		}
	}else{
		//console.log('aa1');
		enemiid=aux[0].idChachi;
		enemilvl=aux[0].minLevel;
		enemi=aux[0];
	}
	//console.log(enemiid+'-'+enemilvl);
	//extreure les dades dels atacs del chachi
	var jsonObject2 = {
		id: enemiid,
		nivell: enemilvl,
		mov:0
	}
	getAttacks(jsonObject2);
	//return enemi;
	//console.log('return enemi');
//	console.log(JSON.parse(sessionStorage.getItem('enemymovs')));
	from_json_toMovs(JSON.parse(sessionStorage.getItem('enemymovs')));
	var moviments= JSON.parse(sessionStorage.getItem('movsaux'));
	//console.log(moviments);
	return new chachi(enemiid,enemilvl,0,0,moviments,enemi.idChachi,0,true);
}	
//funcio per treure els atacs per defecte
function getAttacks(jsonObject2){
	
	var ok = false;
	//llamada json ///AQUI ELI 
	var stringifyedJsonObject=JSON.stringify(jsonObject2);
	//console.log(stringifyedJsonObject+'aaaaaa');
	//funcion ajax con json
		$.ajax({
			data:'q='+stringifyedJsonObject,
			url:'./php/get_enemy.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				//console.log(data);	
				var dades = data;
				//console.log('dades'+data.spritePosY+'d'+data.spritePosX);
				sessionStorage.setItem('enemymovs',JSON.stringify(dades));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown+textStatus+jqXHR);
			});	
}
//funcio per calcular stats
function calc_stats(level,type){
	//variables generals
	var BIPV=20;
	var BIOF=5;
	var BIPM=10;
	var mbase=5;
	var mpm=15;
	//sacar datos base segun el tipo de chachi
	//necesitem saber els stats base d'aquest chachi
	//get stats base
	var st=getStatsBase(type);
	//console.log('cnsdjkhvjsdfgvj');
	//console.log(st);
	var pvb=parseInt(st.base_HP);//pv/HP base del tipo del chachi
	var atmb=parseInt(st.base_AT);//atm base del tipo de chachi
	var dfmb=parseInt(st.base_DF);//dfm base del tipo de chachi
	var velb=parseInt(st.base_VE);//vel base del tipo de chachi
	var pmb=parseInt(st.base_MP);//pm base del tipo de chachi
	
	//calculo de los stats
	pv=BIPV+(level/100*(pvb*mbase));
	atm=BIOF+(level/100*(atmb*mbase));
	dfm=BIOF+(level/100*(dfmb*mbase));
	vel=BIOF+(level/100*(velb*mbase));
	pm=BIPM+(level/100*(pmb*mpm));
		//retornem el objecte stats
	return new Stats(Math.round(atm),Math.round(dfm),Math.round(vel),Math.round(pm),Math.round(pv));
	
	
}	
//funcio per saber els stats base
function getStatsBase(type){
	console.log(type+'type');
	var jsonObject={
		idChachi: type,
		op: 7		
	}
	var j;
	var stringifyedJsonObject2=JSON.stringify(jsonObject);
	$.ajax({
		data:'q='+stringifyedJsonObject2,
		url:'./php/get_user_data.php',
		dataType: 'json',
		async: false,
		cache: false
	}).done( function (data,textStatus,jqXHR) {
			j=data;
			//console.log('aaaaaaa'+data);
			}
	).fail(function (jqXHR,textStatus,errorThrown) {
		console.log('error'+errorThrown);
		});
	
	return j;
}
//clase stats
function Stats(atm,dfm,vel,pm,hp){
	this.atm=atm;
	this.dfm=dfm;
	this.vel=vel;
	this.maxpm=pm;
	this.maxhp=hp;
	this.print_stats=function (){
		console.log('pv:'+pv+'-atm:'+atm+'-dfm'+dfm+'-vel'+vel+'-maxpm'+maxpm+'-maxhp'+maxhp);
	}
}
//funcio per llegir els movs de un chachi de la bbdd
function llegir_Movs_BBDD(idChachi){
	jsonObject = {
		idGame : sessionStorage.getItem('idGame'),
		idChachi: idChachi,
		movs:0
	}
	//console.log('ID CHACHI'+idChachi);
	var stringifyedJsonObject2=JSON.stringify(jsonObject);
	//console.log('Objecte STRING JSON'+stringifyedJsonObject2);
	//funcion ajax con json
	var movs;
	$.ajax({
		data:'q='+stringifyedJsonObject2,
		url:'./php/get_movs_data.php',
		dataType: 'json',
		async: false,
		cache: false
	}).done( function (data,textStatus,jqXHR) {
			//console.log('okkkkkk');	
			//movs=dades;
			sessionStorage.setItem('movsaux2',JSON.stringify(data.txt))
			//console.log('MOOOOVV: '+data.txt);
			from_json_toMovs(data.txt);
			//console.log('dades2-'+data.chachis[1].idChachi+data.chachis[0].MP);
			//sessionStorage.setItem('chachis',JSON.stringify(dades.chachis));
			}
	).fail(function (jqXHR,textStatus,errorThrown) {
		console.log('error'+errorThrown);
		});
			
	return 1;	
}
//pasar de json a moviments 
function from_json_toMovs(arr){
	//console.log('aaaaaa');
	//console.log(arr);
	var movs= [];
	//console.log('movs--'+sessionStorage.getItem('movsaux2'));
	for(var i=0; i< arr.length ;i++){
		movs[i]=new movement(arr[i][0].idmove,arr[i][0].power,arr[i][0].accuracy,arr[i][0].idType,arr[i][0].moveName,arr[i][0].description,arr[i][0].idEffect,arr[i][0].PM);
	}
	//console.log(movs);
	sessionStorage.setItem('movsaux',JSON.stringify(movs));
}
//guardar els chachis al session storage
function save_chachis(){
	var x= JSON.parse(sessionStorage.getItem('chachis'));
	var pos= sessionStorage.getItem('chachiACT');
	//console.log(x[pos].HP);
	x[pos].HP=chachis[pos].stats.maxhp;
	x[pos].MP=chachis[pos].stats.maxpm;
//	console.log('peeeeepeee'  +chachis[pos].ex )
	x[pos].EXP=chachis[pos].ex;
	x[pos].level=chachis[pos].level;
	x[pos].expNextLvl=calc_exp_to_lvl(chachis[pos].level);
	//console.log('guardamos');
	sessionStorage.setItem('chachis',JSON.stringify(x));
	//guardar stats dels chachis al local storage (?)
}

//calcular experiencia obtinguda al finalitzar un combat
function calc_exp_obtenida(typeRival,lvlrival){
	var base_rival=parseInt(get_base_exp_rival(typeRival));
	return Math.round((base_rival*(parseInt(lvlrival))*1)/7);
}
//Calcular la experiencia que cal pel seguent nivell
function calc_exp_to_lvl(lvl){
	return 0.8*(Math.pow(parseInt(lvl),3));
}
//agafar la experiencia base del rival
function get_base_exp_rival(){
	////////////////////
	jsonObject2={
		op:6,
		idChachi:ene_chachi.type
	}
	var stringifyedJsonObject=JSON.stringify(jsonObject2);
	var x=0;
	$.ajax({
			data:'q='+stringifyedJsonObject,
			url:'./php/get_user_data.php',
			dataType: 'json',
			async: false,
			cache: false
		}).done( function (data,textStatus,jqXHR) {
				//console.log(data+'aa');	
				//var dades = data;
				x=data;
				//console.log('dades'+data.spritePosY+'d'+data.spritePosX);
				//sessionStorage.setItem('enemymovs',JSON.stringify(dades));
				}
		).fail(function (jqXHR,textStatus,errorThrown) {
			console.log('error'+errorThrown+textStatus+jqXHR);
			});	
	return x;
}
//funcio final quan mor enemic o chachi
function death(op){
	var pos= sessionStorage.getItem('chachiACT');
	//funcio per a que fer quan mor algú
	console.log('death');
	//bloquar botones cuando muera alguien.
	//ver si a muerte el player o el enemigos
	//txtfin="";
	switch(op){
		case 1: //si a muerto el enemigo recogemos exp y la guardamos
				chachis[pos].ex=parseInt(chachis[pos].ex)+calc_exp_obtenida(parseInt(ene_chachi.type),parseInt(ene_chachi.level));
				if(chachis[pos].ex>calc_exp_to_lvl(parseInt(chachis[pos].level)+1)){
					chachis[pos].level=parseInt(chachis[pos].level)+1;
					// ha pujat de nivell
					//while(next==0)
						//calcular nous stats
						//var st=calc_stats(chachi[pos.level],chachi[pos].type);
						//chachi[pos].stats=st;
						txtAttack='Tu chachi sube un nivel! Ahora es nivel: '+chachis[pos].level;
						txtfin='Tu chachi sube de nivel! Ahora es nivel:'+chachis[pos].level;
						/*while(next==0)
							console.log('entra while');
						}*/
						next=0;
						//txtAttack='funciona0';
						//next=0;
					//
				}
				txtfin='Chachi enemigo ha muerto';
				break;
		case 2: // si a muerto el player....
				txtAttack='Ha muerto tu chachi';
				txtfin='Tu chachi ha muerto';
				break;
	}
	save_chachis();

	var changetab=setInterval(function(){
		disable_buts();
		if(volverjuego==true){
			txtfin="";
			changeTab(1);
		}
		clearInterval(changetab);
	},5000);
	volverjuego=true;
	
}
//funcio per habilitar els botons dels atacs
function enable_buts(){
	var A=document.getElementsByClassName("attbut");
	//console.log(A);
	//console.log(A);
	for(var i=0;i<A.length;i++){
		A[i].disabled=false;
	}
}
//funcio per deshabilitar els botons dels atacs
function disable_buts(){
	var A=document.getElementsByClassName("attbut");
	//console.log(A);
	//console.log(A);
	for(var i=0;i<A.length;i++){
		A[i].disabled=true;
	}
}

/*
		 function enableInputs(){
			document.addEventListener('mousemove',function(evt){
				mousex=evt.pageX-canvas.offsetLeft;
				mousey=evt.pageY-canvas.offsetTop;
				//console.log(evt.pageX-canvas.offsetLeft);
				//console.log(evt.pageY-canvas.offsetTop);
			},false);
			canvas.addEventListener('mousedown',function(evt){
				lastPress=evt.which;
				//console.log('click'+evt.pageX+','+evt.pageY);
			},false);
		 }
		 function act(){
			 //mriar si has fet click al botó
			 if( (mousey>100 && mousey<120) && (mousex>100 && mousex<200)){
				//console.log('touched');
				//habria que recoger id del ataque 
			 }
		*/	
//listener del teclat
//control de intro auxiliar 
/*document.addEventListener('keydown',function(evt){
	if(evt.keyCode===13){
		next=1;
		z = true;
		console.log('a');
	}
	//console.log('presss enter'+evt.keyCode);
},false);		
*/