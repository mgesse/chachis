$("#tabpage_2").append('');
var team=JSON.parse(sessionStorage.getItem('chachis'));
var sprites=JSON.parse(sessionStorage.getItem('allDataChachi'));
var stats=JSON.parse(sessionStorage.getItem('stats'));
var allmovs= JSON.parse(sessionStorage.getItem('allmovsteam'));
var inteam=setInterval(function(){
	team=JSON.parse(sessionStorage.getItem('chachis'));
	sprites=JSON.parse(sessionStorage.getItem('allDataChachi'));
	stats=JSON.parse(sessionStorage.getItem('stats'));
	allmovs= JSON.parse(sessionStorage.getItem('allmovsteam'));
	if(stats){
		if(allmovs){
			clearInterval(inteam);
			show();
		}
	}
	
},1);
function show(){
	$('#teamF').remove();
	$('#save').remove();
	stats=JSON.parse(sessionStorage.getItem('stats'));
	allmovs= JSON.parse(sessionStorage.getItem('allmovsteam'));
	team=JSON.parse(sessionStorage.getItem('chachis'));
	//console.log(allmovs);
	var showTeam='<center><form id="teamF"><style type="text/css">'+
		'.tg  {border-collapse:collapse;border-spacing:0;}'+
		'.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}'+
		'.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}'+
		'.tg .tg-e3zv{font-weight:bold}'+
		'</style><table>';
	//generar html del team 
	for(var i=0;i<team.length;i++){
		showTeam=showTeam+'<td><table class="tg">';
		//buscar sprite
		var auxs=sprites[team[i].idChachi-1].sprite_url;
		auxA=auxs.split('/');
		auxs=auxA[0]+'/'+auxA[1]+'/sample_'+auxA[2];
		stats=JSON.parse(sessionStorage.getItem('stats'));
		allmovs= JSON.parse(sessionStorage.getItem('allmovsteam'));
		//crear html
		showTeam=showTeam+
		 ' <tr>'+
		 '   <th class="tg-031e" rowspan="4"><img src="'+auxs+'"/></th>'+
		 '   <th class="tg-031e" colspan="3"><b>'+sprites[team[i].idChachi-1].name+'</b></th>'+
		 ' </tr>'+
		 ' <tr>'+
		 '   <td class="tg-031e" colspan="3"><b>Level:</b> '+team[i].level+'</td>'+
		 ' </tr>'+
		 ' <tr>'+
		 '   <td class="tg-031e" colspan="3"><b>HP: </b>'+team[i].HP+' / <b>MP: </b>'+team[i].MP+'</td>'+
		 ' </tr>'+
		 ' <tr>'+
		 '   <td class="tg-031e" colspan="3"><b>EXP: </b> '+team[i].EXP+'</td>'+
		 ' </tr>'+
		 ' <tr>'+
		 '   <td class="tg-031e" colspan="4"><center><b>ATM: </b>'+stats[i].atm+' / <b>DFM:</b> '+stats[i].dfm+' / <b>VEL:</b>'+stats[i].vel+'</center></td>'+
		 ' </tr>'+
		 ' <tr>';
		 if(i==0){
			showTeam=showTeam+' <td class="tg-031e" colspan="4"><center><b>Primero: <input type="radio" name="first" value="'+i+'" checked> </b></center></td>';
		 }else{
			showTeam=showTeam+' <td class="tg-031e" colspan="4"><center><b>Primero: <input type="radio" name="first" value="'+i+'"> </b></center></td>';
		 }
		 showTeam=showTeam+' </tr>'+
		 ' <tr>'+
		 '   <td class="tg-031e" colspan="4"><center><b>Ataques:</b></center></td>'+
		 ' </tr>'+
		 ' <tr>'+
				'<td class="tg-031e"><b>Nombre:</b></td>'+
				'<td class="tg-031e"><b>PM:</b></td>'+
				'<td class="tg-031e"><b>Pot:</b></td>'+
				'<td class="tg-031e"><b>Prob:</b></td>'+
		' </tr>';
		for(var j=0;j<allmovs[i].length;j++){
			 showTeam=showTeam+'<tr>'+
				'<td class="tg-031e">'+allmovs[i][j].name+'</td>'+
				'<td class="tg-031e">'+allmovs[i][j].pm+'</td>'+
				'<td class="tg-031e">'+allmovs[i][j].pot+'</td>'+
				'<td class="tg-031e">'+allmovs[i][j].prob+'%</td>'+
			'</tr>';
		 }
		
		'</table>';
			
		showTeam=showTeam+'</td></tr>'+'</table></td>';
	}
	showTeam=showTeam+'</table>';
	//$("#tabpage_2").append('');
	showTeam=showTeam+'</form></center>';
	$("#tabpage_2").append(showTeam);
	$("#tabpage_2").append('<center><button id="save" class="boton"  onclick="changeFirst()">Guardar</button></center>');


}
function changeFirst(){
		var first = document.getElementById("teamF");
		team=JSON.parse(sessionStorage.getItem('chachis'));
		var x= first.elements["first"].value;
		var auxT= team[0];
		team[0]=team[x];
		team[x]=auxT;
		console.log('CAAMBIAAANDO'+x);
		console.log(team);
		sessionStorage.setItem('chachis',JSON.stringify(team));
		show();
	}
//<button id="huir" class="huidaBut" onclick="changeFirst()">Huir</button>
