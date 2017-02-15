function ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var detaType=obj.detaType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	var data=""
	switch(typeof(obj.data)){
		case "undefined":;break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
				data=data.slice(0,-1)
			}
		break;
		case "string":
			data=obj.data;
		break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);

	}else if(method=="post"){
		ajax.open(type,url,asynch);
		ajax.responseType=dataType;
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
		
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(dataType){
					case "text":
						resule=ajax.responseText;
					break;
					case "json":
						result=eval("("+ajax.response+")");
					break;
					case "xml":
						result=ajax.responseXML;
					break;
				}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				alert("页面未找到");
			}else{
				alert("获取错误");
			}
		}
	}
}