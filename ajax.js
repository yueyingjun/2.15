function ajax(obj){
   var url=obj.url;
   var dataType=obj.dataType||"text";
   var success=obj.success;
   var error=obj.error;
   var data="";
   switch(typeof obj.data){
      case "undefined":  ;
      break;
      case "string":
      data=obj.data;
      break;
      case "object":
      for(var i in obj.data){
         data+=i+"="+obj.data[i]+"&";
      }
      date+=data.slice(0,-1);
      break;
   }
   var method=obj.method||"get";
   var xml=XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
   if(method=="get"){
      if(xml.responseXML){
         xml.open("get",url+"?"+data);
         xml.send();
      }else{
         xml.open("get",url+"?"+data);
         xml.responseType=dataType;
         xml.send();
      }
   }else if(method=="post"){
      if(xml.responseXML){
         xml.open("post",url);
         xml.setRequestHead("Content-Type","application/x-www-form-urlencoded");
         xml.send(data);
      }else{
         xml.open("post",url);
         xml.responseType=dataType;
         xml.setRequestHead("Content-Type","application/x-www-form-urlencoded");
         xml.send(data);
      } 
   }
   xml.onloadend=function(){
      success(xml.response);
   }  
   error();
}




   window.onload=function(){
         var div=document.getElementsByTagName("div")[0];
         var btn=document.getElementsByTagName("input")[0];
         btn.onclick=function(){
            var xml=new XMLHttpRequest();   
            xml.onload=function(){  
               div.innerHTML=xml.response;
               // // 将xml文件当做文本获取到
               div.innerHTML=xml.responseXML;
               // // 获取到的是一个对象
               var content=xml.responseXML;
               var stu=content.getElementsByTagName("stu");
               var str="<table>";
               str+="<tr><th>名字</th><th>年龄</th><th>性别</th></tr>";
               for(var i=0;i<stu.length;i++){
                  str+="<tr><td>"+content.getElementsByTagName("name")[i].innerHTML+"</td><td>"+content.getElementsByTagName("age")[i].innerHTML+"</td><td>"+content.getElementsByTagName("sex")[i].innerHTML+"</td></tr>"
               }
               str+="</table>";
               div.innerHTML=str;
            }
            xml.open("post","1.xml"); 
            xml.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
            xml.send();
         }
}