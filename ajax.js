function ajax(obj){
	var url=obj.url;
	var type=obj.type||"get";	
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var data="";
	var dataType=obj.dataType||"text";
	var success=obj.success;
	var error=obj.error;
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
	var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	xmlobj.onreadystatechange=function(){

		if(xmlobj.readyState==4){
			if(xmlobj.status==200){
				var result;
				switch(dataType){
					case "text":
						result=xmlobj.responseText;
					break;
					case "json":
						result=eval("("+xmlobj.response+")");
					break;
					case "xml":
						result=xmlobj.responseXML;
					break;
				}
				if(success){
					success(result);
				}
			}else{
				error();
			}
		}
	}
	
	if(type=="get"){
		xmlobj.open("get",url+"?"+data,asynch);
		xmlobj.send(null);
	}else if(type=="post"){
		xmlobj.open("post",url,asynch);
		xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlobj.send(data);
	}


}