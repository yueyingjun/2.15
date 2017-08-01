function ajax(obj){
	// 1.初始化
	var method=obj.method||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	var data="";
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
			data=data.slice(0,-1);
		break;
	}
	// 2.ajax创建
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	// 3.根据method不同设置判断
	if(method==="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	}else if(method==="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	// 4.请求是否成功
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(dataType){
					case "text":
					result=ajax.responseText;
					break;
					case "XML":
					result=ajax.responseXML;
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
				alert("雾霾太大，找不到页面T0T");
			}else{
				alert("baby,服务器发生了错误~");
			}
		}
	}
}