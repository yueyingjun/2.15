function ajax(obj){
	var url=obj.url;
	var type=obj.type||"get";
	var data=obj.data;
	var dataType=obj.dataType||"text";
	var success=obj.success;
	var error=obj.error;
	
	switch(typeof(obj.data)){
		case "undefined":break;
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
	var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(type=="get"){
		xmlobj.open("get",url+"?"+data);
		xmlobj.send();
	}else if(type=="post"){
		xmlobj.open("post",url);
		xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlobj.send(data);
	}
	xmlobj.onload=function(){
		switch(dataType){
			case "text":
				var result=xmlobj.responseText;
			break;
			case "json":
				result=eval("("+xmlobj.response+")");
			break;
			case "document":
				result=xmlobj.responseXML;
			break;
		}
		if(success){
			success(result);
		}
	}
	xmlobj.onreadystatechange=function(){
		if(xmlobj.readyState==4){
			if(xmlobj.status!==200){
				if(error){	
					error();
				}
			}
		}
	}
}