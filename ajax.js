function ajax(obj){
	var type=obj.type||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var success=obj.success;
	var error=obj.error;
	var datas="";
	switch(typeof(obj.data)){
		case "string":
			data=obj.data;
		break;
		case "undefined":;
		break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data=data.slice(0,-1);
		break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
	ajax.onload=function(){
		var result;
		switch(dataType){
			case "text":result=ajax.responseText;break;
			case "xml":result=ajax.responseXML;break;
			case "json":result=eval("("+ajax.response+")");break;
			case "document":result=ajax.response;break;
		}
		if(success){
			success(result);
		}else if(error){
			alert("页面没有找到");
		}
	}
	if(type=="get"){
		ajax.open("get",url+"?"+data);
		ajax.send();
	}else if(type=="post"){
		ajax.open("post",url);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		ajax.send(data);
	}
}

