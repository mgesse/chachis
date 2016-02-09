function displayPage() {
  var current = this.parentNode.dataset.current;
  //remove class of activetabheader and hide old contents
  document.getElementById("tabHeader_" + current).removeAttribute("class");
  document.getElementById("tabpage_" + current).style.display="none";

  var ident = this.id.split("_")[1];
  //add class of activetabheader to new active tab and show contents
  this.setAttribute("class","tabActiveHeader");
  document.getElementById("tabpage_" + ident).style.display="block";
  this.parentNode.setAttribute("data-current",ident);

}

window.onload=function() {
// on click of one of tabs

  // get tab container
  	var container = document.getElementById("tabContainer");
		var tabcon = document.getElementById("tabscontent");
		//alert(tabcon.childNodes.item(1));
    // set current tab
    var navitem = document.getElementById("tabHeader_1");
		
    //store which tab we are on
    var ident = navitem.id.split("_")[1];
		//alert(ident);
    navitem.parentNode.setAttribute("data-current",ident);
    //set current tab with class of activetabheader
    navitem.setAttribute("class","tabActiveHeader");

    //hide two tab contents we don't need
   	 var pages = tabcon.getElementsByTagName("div");
    	for (var i = 1; i < pages.length; i++) {
     	 pages.item(i).style.display="none";
		};

    //this adds click event to tabs
    var tabs = container.getElementsByTagName("li");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].onclick=displayPage;
	  tabs[i].display=displayPage;
    }
	tabs[2].onclick=function(){
		//alert('Aún no has iniciado una batalla');
	}
}


function changeTab(id){
	//cogemos la tab 
	var container = document.getElementById("tabContainer");
	var tabs = container.getElementsByTagName("li");
	var tab;
	switch(id){
		case 1: tab=tabs[0];
				blockTab(3);
				tabs[1].onclick=displayPage;
				tabs[0].onclick=displayPage;
				break;
		case 2:	tab=tabs[1];
				break;
		case 3: tab=tabs[2];
				blockTab(1);
				blockTab(2);
				break;
	}
	displayPage.call(tab);
}
function blockTab(id){
	var container = document.getElementById("tabContainer");
	var tabs = container.getElementsByTagName("li");
	var tab;
	switch(id){
		case 1: tabs[0].onclick=function(){
					//alert('¡Has de terminar la batalla!');
				}
				break;
		case 2: tabs[1].onclick=function(){
					//alert('No puedes ver tu inventario ahora');
				}
				break;
		case 3: tabs[2].onclick=function(){
					//alert('Aún no has iniciado batalla');
				}
				break;
	}
	
}
/*
  setTimeout(function(){
	  changeTab(2);
  }, 3000);
	*/
