//
  document.addEventListener("DOMContentLoaded",function(ee) {
   // your page initialization code here
   // the DOM will be available here
cl=console.log;

//    tab
var save_dom = document.getElementById("data_s");
var orig = document.getElementById("orig");
var perc = document.getElementById("per");
var mbut = document.getElementById("m-but");
var pbut = document.getElementById("p-but");
var x = document.getElementById("knoble");
var privatex=document.getElementById("knoble_private");
var addsite=document.getElementById("add_site");
 
var message=document.getElementById("disable_message");


cl(save_dom);
cl(orig);

//tabtitles
var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var tab3 = document.getElementById("tab3");
var tabs=[tab1,tab2,tab3];

//tab contents
var tabc1 = document.getElementById("tabc1");
var tabc2 = document.getElementById("tabc2");
var tabc3 = document.getElementById("tabc3");
var tabcontent=[tabc1,tabc2,tabc3];

tab1.addEventListener("click",function(){select_tab(0);});
tab2.addEventListener("click",function(){select_tab(1);});
tab3.addEventListener("click",function(){select_tab(2);});

var rate=document.getElementById("arate");
var learn=document.getElementById("alearn");


mbut.addEventListener("click", toggle_status);
//pbut.addEventListener("click",toggle_private);
rate.addEventListener("click",function(){sendto("rateurl");})
learn.addEventListener("click",function(){sendto("learnurl");})

var private_on=null;
var on = null;
//onshow(self.options);


function onshow(data) {//console.log(data);
    if (data.enabled) {
        on = 1;
        x.className = "knob";
        x.className = x.className + " knob-on";
    }
    else {

        x.className = "knob";
        x.className = x.className + " knob-off";
        on = 0;
    }
    /*
      if (data.allowprivate) {
        private_on = 1;
        privatex.className = "knob";
        privatex.className = privatex.className + " knob-on";
    }
    else {
        privatex.className = "knob";
        privatex.className = privatex.className + " knob-off";
        private_on = 0;
    }
    if(data.dreason=="private")
    {
    message.className="";
    
    
    }*/
    if (!data.t) {
        per = 0;
        tot = 0;
        save = 0;

    }
    
    else {
        var per = (data.actualbytes-data.savedbytes) / data.actualbytes * 100;//+" %";
        var tot = data.actualbytes / 1024 / 1024;// +" MB";
        var save = (data.savedbytes / 1024 / 1024);//  + "MB";
        //data.mbd=data.mbd/1024/1024;
        //data.mbm=data.mbm/1024/1024;
    }
    per = per.toFixed(2);
    tot = tot.toFixed(2);
    save = save.toFixed(2);

//data.mbd=data.mbd.toFixed(2);
//data.mbm=data.mbm.toFixed(2);
  
    //setting text
 /*   var nd1 = document.createElement("span");
    nd1.appendChild(document.createTextNode(data.mbd+" MB"));
    mbday.appendChild(nd1);
    var nd2 = document.createElement("span");
    nd2.appendChild(document.createTextNode(data.mbm+" MB"));
    mbmonth.appendChild(nd2);
   */ 
     //setting text
     var nd1 = document.createElement("span");
     nd1.appendChild(document.createTextNode(""+per+" MB"));
     perc.appendChild(nd1);

     var nd2 = document.createElement("span");
     nd2.appendChild(document.createTextNode(tot+ " MB"));
     orig.appendChild(nd2);

     var nd3 = document.createElement("span");
     nd3.appendChild(document.createTextNode(save+ " MB"));
     save_dom.appendChild(nd3);
     
}
var selected_tab=0;


function select_tab(c)
{


    rclass(tabs[selected_tab],"tab-selected");
    add_c(tabs[c],"tab-selected");
    rclass(tabcontent[selected_tab],"tab-content-selected");
    add_c(tabcontent[selected_tab],"tab-content-unselected");
    rclass(tabcontent[c],"tab-content-unselected");
    add_c(tabcontent[c],"tab-content-selected");

    selected_tab=c;

}
//add class
function add_c(node,classstr)
{
    node.className+=" "+classstr;
//console.log(node);


}
//remove class
function rclass(node,classstr)
{
    if(classstr=="tab-selected")
    {
        node.className="tab-title";
    }
    else{
        node.className="tab-content";


    }
  //  console.log(node);

}

/*
function toggle_private(){






   privatex.className = "knob";

    if (private_on) {
        private_on = 0;

// turn off;
        privatex.className = privatex.className + " knob-off";
        sendto("toggle_private");

    }
    else {

        //turn on;
        privatex.className = privatex.className + " knob-on";
        private_on = 1;
        sendto("toggle_private");
    }






}
*/

/*
function reset_month() {

    sendto("reset_month");
    while (mbmonth.hasChildNodes()) {
        mbmonth.removeChild(mbmonth.firstChild);
    }
    var nd1 = document.createElement("span");
    nd1.appendChild(document.createTextNode("0.00 MB"));
    mbmonth.appendChild(nd1);

}
*/
function toggle_status() {


    x.className = "knob";

    if (on) {
        on = 0;

// turn off;
        x.className = x.className + " knob-off";
        sendto("toggle_status");

    }
    else {

        //turn on;
        x.className = x.className + " knob-on";
        on = 1;
        sendto("toggle_status");
    }
 
}


function handleError(d){console.log("error==>"+d);}


function sendto(message)
{
	var sending=browser.runtime.sendMessage(message);
sending.then(onshow, handleError);

}

browser.runtime.onMessage.addListener(function(d){console.log(d);onshow(d);});

sendto("getdata");



});