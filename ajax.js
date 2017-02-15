function ajax(obj){
	var method = obj.method||"get";
	var asynch = obj.asynch==undefined?true:obj.asynch;
	var url = obj.url;
	var dataType = obj.dataType||"text";
	var success = obj.success;
	var data = "";
	var error = obj.error;
	switch(typeof(obj.data)){
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			};
			data=data.slice(0,-1);
		break;
		case "string":
			data=obj.data;
		break;
		case "undefined":
		break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if (ajax.status==200){
				var result = 0;
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
				}
			}else{
				error();
			}
			if(success){
				success(result);
			}
		}
	}
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	}else if(method=="post"){
		ajax.open("get",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		ajax.send(data);
	}
	

}