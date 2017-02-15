function ajax(obj){
	var url=obj.url;
	var type=obj.type||"get";
	var dataType=obj.dataType||"text";
	var success=obj.success;
	var error=obj.error;
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
	if(type=="get"){
		ajax.open("get",url+"?"+data);
		ajax.send(null);
	}else if(type=="post"){
		ajax.open("post",url);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(dataType){
					case "xml":
						result=ajax.responseXML;
					break;
					case "text": 
						result=ajax.responseText;
					break;
					case "json": 
						result=eval("("+ajax.response+")");
					break;
					case "document":
						result=ajax.response;
					break;
				}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				error();
			}else{
				error();
			}
		}
	
	}
}
