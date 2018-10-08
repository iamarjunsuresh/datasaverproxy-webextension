/**
 * Created by arjun on 29/6/16.
 */



var update=document.getElementById("btn_update");
var  list=document.getElementById("list");

update.addEventListener("click",function(){
    self.port.emit("update-white-list",{list:list.value.split('\n')});
    
    
})

 function onshow(data) {//console.log(data);

    list.value=data.list.join('\n');
    



}

onshow(self.options);
