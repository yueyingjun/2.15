function ajax(obj){
	var type=obj.type||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	var data="";
	var result="";
	var error=obj.error;
	var success=obj.success;
	switch(typeof(obj.data)){
		case "undefined":;break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data.slice(0,-1);
		break;
		case "string":
			data=obj.data;
		break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
	if(type=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	}else if(type=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				switch(dataType){
					case "text":
					result=ajax.responseText;
					break;
					case "json":
					result=eval("("+ajax.response+")");
					break;
					case "XML":
					result=ajax.responseHTML;
					break;
					case "document":
					
				}
				if(success){
					success();
				}
			}else if(ajax.status==404){
				error();
			}
		}
	}
}
