function ajax(obj){
   var method=obj.method||"get";
   var url=obj.url;
   var dataType=obj.dataType||"text";
   var asynch=obj.asynch==undefined?true:obj.asynch;
   var data="";
   switch(typeof(obj.data)){
      case "undefined":
      break;
      case "object":
        for(var i in obj.data){
           data+=i+"="+obj.data[i]+"&";
        }
        data=data.slice(0,-1);
      break;
      case "string":
        data=obj.data;
      break;
   }
   var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
   if(method=="get"){
       ajax.open("get",url+"?"+data,asynch);
       ajax.send(null);
   }
   else if(method=="post"){
       ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       ajax.open("post",url,asynch);
       ajax.send(data);
   }
   ajax.onreadystatechange=function(){
       if(ajax.readyState==4){
          if(ajax.status==200){
             var result;
             switch(dataType){
                case "text":
                  result=ajax.responseText;
                break;
                case "xml":
                  result=ajax.responseXML;
                break;
                case "json":
                  result=eval("("+ajax.response+")");
                break;
             }
             if(obj.success){
                obj.success(result);
             }
          }
          else if(ajax.status==404){
             alert("获取失败");
          }
          else{
             alert("请求失败");
          }
       }
   }
}
