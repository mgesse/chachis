/*	1-Luz
	2-Aire
	3-Agua
	4-Naturaleza
	5-Tierra
	6-Fuego
	7-Hielo
	8-Electricidad
	9-Mente
	10-Oscuridad
*/

var idTipoPlayer = 4;
var idTipoRival = 5;

function comprovarTipos(idTipoPlayer,idTipoRival){
	//console.log('tipo player'+idTipoPlayer+'  -idrival'+idTipoRival);
	var dany;
	var efectiu = 2;
	var noEfectiu = 0.50;
	var neutre = 1;
	
	if(idTipoPlayer == 1){	//Luz
		switch(idTipoRival){
			case 1:	dany= neutre;
					break;
			case 2:	dany=neutre;
					break;
			case 3:	dany=noEfectiu;
					break;
			case 4:	dany=noEfectiu;
					break;
			case 5:	dany=noEfectiu;
					break;
			case 6:	dany=neutre;
					break;
			case 7:	dany=noEfectiu;
					break;
			case 8:	dany=neutre;
					break;
			case 9:	dany=efectiu;
					break;
			case 10:dany=efectiu;
					break;
		}
	}else if(idTipoPlayer == 2){	//Aire
		switch(idTipoRival){
			case 1:	dany= neutre;
					break;
			case 2:	dany=neutre;
					break;
			case 3:	dany=efectiu;
					break;
			case 4:	dany=efectiu;
					break;
			case 5:	dany=noEfectiu;
					break;
			case 6:	dany=neutre;
					break;
			case 7:	dany=neutre;
					break;
			case 8:	dany=neutre;
					break;
			case 9:	dany=neutre;
					break;
			case 10:dany=efectiu;
					break;
		}
	}else if(idTipoPlayer == 3){	//Aigua
		switch(idTipoRival){
			case 1:	dany= efectiu;
					break;
			case 2:	dany=noEfectiu;
					break;
			case 3:	dany=noEfectiu;
					break;
			case 4:	dany=noEfectiu;
					break;
			case 5:	dany=efectiu;
					break;
			case 6:	dany=efectiu;
					break;
			case 7:	dany=neutre;
					break;
			case 8:	dany=neutre;
					break;
			case 9:	dany=noEfectiu;
					break;
			case 10:dany=neutre;
					break;
		}
	}else if(idTipoPlayer == 4){	//Natura
		switch(idTipoRival){
			case 1:	dany= efectiu;
					break;
			case 2:	dany=neutre;
					break;
			case 3:	dany=efectiu;
					break;
			case 4:	dany=noEfectiu;
					break;
			case 5:	dany=efectiu;
					break;
			case 6:	dany=noEfectiu;
					break;
			case 7:	dany=noEfectiu;
					break;
			case 8:	dany=noEfectiu;
					break;
			case 9:	dany=neutre;
					break;
			case 10:dany=neutre;
					break;
		}
	}else if(idTipoPlayer == 5){	//Terra
		switch(idTipoRival){
			case 1:	dany= efectiu;
					break;
			case 2:	dany=efectiu;
					break;
			case 3:	dany=noEfectiu;
					break;
			case 4:	dany=noEfectiu;
					break;
			case 5:	dany=neutre;
					break;
			case 6:	dany=efectiu;
					break;
			case 7:	dany=neutre;
					break;
			case 8:	dany=efectiu;
					break;
			case 9:	dany=neutre;
					break;
			case 10:dany=noEfectiu;
					break;
		}
	}else if(idTipoPlayer == 6){	//Foc
		switch(idTipoRival){
			case 1:	dany= noEfectiu;
					break;
			case 2:	dany=noEfectiu;
					break;
			case 3:	dany=noEfectiu;
					break;
			case 4:	dany=efectiu;
					break;
			case 5:	dany=neutre;
					break;
			case 6:	dany=noEfectiu;
					break;
			case 7:	dany=efectiu;
					break;
			case 8:	dany=neutre;
					break;
			case 9:	dany=efectiu;
					break;
			case 10:dany=efectiu;
					break;
		}
	}else if(idTipoPlayer == 7){	//Gel
		switch(idTipoRival){
			case 1:	dany= neutre;
					break;
			case 2:	dany=efectiu;
					break;
			case 3:	dany=neutre;
					break;
			case 4:	dany=efectiu;
					break;
			case 5:	dany=efectiu;
					break;
			case 6:	dany=noEfectiu;
					break;
			case 7:	dany=noEfectiu;
					break;
			case 8:	dany=efectiu;
					break;
			case 9:	dany=noEfectiu;
					break;
			case 10:dany=noEfectiu;
					break;
		}
	}else if(idTipoPlayer == 8){	//Electricitat
		switch(idTipoRival){
			case 1:	dany= noEfectiu;
					break;
			case 2:	dany=efectiu;
					break;
			case 3:	dany=efectiu;
					break;
			case 4:	dany=noEfectiu;
					break;
			case 5:	dany=noEfectiu;
					break;
			case 6:	dany=neutre;
					break;
			case 7:	dany=efectiu;
					break;
			case 8:	dany=noEfectiu;
					break;
			case 9:	dany=neutre;
					break;
			case 10:dany=efectiu;
					break;
		}
	}else if(idTipoPlayer == 9){	//Mental
		switch(idTipoRival){
			case 1:	dany= noEfectiu;
					break;
			case 2:	dany=neutre;
					break;
			case 3:	dany=efectiu;
					break;
			case 4:	dany=neutre;
					break;
			case 5:	dany=neutre;
					break;
			case 6:	dany=noEfectiu;
					break;
			case 7:	dany=efectiu;
					break;
			case 8:	dany=neutre;
					break;
			case 9:	dany=neutre;
					break;
			case 10:dany=noEfectiu;
					break;
		}
	}else if(idTipoPlayer == 10){	//Obscuritat
		switch(idTipoRival){
			case 1:	dany= efectiu;
					break;
			case 2:	dany=noEfectiu;
					break;
			case 3:	dany=noEfectiu;
					break;
			case 4:	dany=efectiu;
					break;
			case 5:	dany=neutre;
					break;
			case 6:	dany=noEfectiu;
					break;
			case 7:	dany=neutre;
					break;
			case 8:	dany=noEfectiu;
					break;
			case 9:	dany=efectiu;
					break;
			case 10:dany=neutre;
					break;
		}
	}
	
	return dany;
}