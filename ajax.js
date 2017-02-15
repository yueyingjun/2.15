function ajax(obj){
	var url=obj.url;
	var type=obj.type||"get";
	var dataType=obj.dataType||"text";
	var data="";
	var success=obj.success;
	var error=obj.error;
	switch(typeof(obj.data)){
		case "undefined":
		break;
		case "string":
			data=obj.data;
		break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data.slice(0,-1);
		break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
	if(type=="get"){
		ajax.open("get",url+"?"+data);
		ajax.send();
	}
	else if(type=="post"){
		ajax.open("post",url)
		ajax.setRequestHeader("Content_Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	if(dataType=="document"){
		ajax.responseType="document";
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(dataType){
					case "text":
					result=ajax.responseText;
					break;
					case "json":
					result=eval("("+ajax.response+")");
					break;
					case "XML":
					result=ajax.responseXML;
					break;
					case "document":
					result=ajax.response;
					break;
				}
				if(success){
					success(result);
				}
			}else{
				if(error){
					error(ajax.response);
				}
			}
		}
	}
}
