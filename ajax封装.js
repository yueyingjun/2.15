//封装ajax
function ajax(obj){
	var method=obj.method||"get";      //初始化
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined? true:obj.asynch;
    var success=obj.success;
    var data="";
    switch(typeof(obj.data)){           //判断data的类型
    	case "undefined":;
    	break;
    	case "string":
    	   data=obj.data;
    	break;
    	case "object":
    	   for(var i in obj.data){
    	   	 data+=i+"="+obj.data[i]+"&";
    	   }
    	   data=data.slice(0,-1);
    	break;
    }
    var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.HTTP");        //ajax对象的获取
    if(method=="get"){
    	ajax.open("get",url+"?"+data,asynch);
    	ajax.send();
    }else if(method=="post"){
    	ajax.open("post",url,asynch);
    	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	ajax.send(data);
    }
    ajax.onreadystatechange=function(){
    	if(ajax.readyState==4){
    		if(ajax.status==200){
    			var result;
    			switch(dataType){
    				case "text":
    				   result=ajax.responseText;
    				   success(result);
    				break;
    				case "XML":
    				    result=ajax.responseXML;
    				    success(result);
    				break;
    				case "json":
    				    result=eval("("+ajax.response+")");
    				    success(result);
    				break;
    			}
    		}
    	}
    }
}
