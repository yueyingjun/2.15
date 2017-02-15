function  ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	var data="";
    switch(typeof(obj.data)){
    	case undefined:;
    	break;
    	case "string":data=obj.data;
    	break;
    	case "object":
    	for (var i in obj){
    		data+=i+"="+obj.data[i]+"&";
    	};
    	 data=data.slice(0,-1);
    	 break;
    }
    var ajax=window.XMLHttpRequest?new XMLHttpRquest():new ActiveObject("Microsoft.XMLHTTP");
    if(method=="get"){
    	ajax.open("get",url+"?"+data,asynch);
    	ajax.send();
    }
    if(method=="post"){
    	ajax.open("post",url,asynch);
    	ajax.setrequestHeader(Content-Type,"application/x-www-form-urlencoded");
    	ajax.send(data);
    }
    ajax.readystatechange=function(){
    	if(ajax.readystate==4){
    		if(ajax.status==200){
    			var  result;
    			switch(dataType){
    				case "text":
    				result=ajax.responseText;
    				break;
    				case "json":
                    result=eval("("+ajax.response+")");
                    break;
                    case "xml":
                    result=ajax.responseXML;
                    break;
                    case "document":
                    result=ajax.response;
    			}
	    			if(success){
	    				success(result);
	    			}
    			}else if(ajax.status==404){
    				alert("页面不存在");
    			}
    			else {
    				alert("请求失败");
    		}
    	}
    }
}