/*
 * 封装ajax
 * 请求方式 
 * 地址
 * 数据类型
 * 同步、异步
 * 数据
 * 成功
 * 错误
 * */
function ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var data="";
	var success=obj.success;
	switch(typeof obj.data){
		case "string":
		data=obj.data;
		break;
		case "undefined":
		break;
		case "object":
		  for(var i in obj.data){
		  	 data+=i+"="+obj.data[i]+"&";
		  }
		data=data.slice(0,-1);
		break;
	}
	var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.responseType=dataType;
		ajax.send(null);
	}else if(method=="post"){
		ajax.open("post",url,asynch);
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
					result=ajax.responseText;
					break;
					case "document":
                    result=ajax.response;
                    break;
					case "xml":
					result=ajax.responseXML;
					break;
					case "json":
					result=eval("("+ajax.response+")");
					break;
				}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				alert("页面未找到");
			}else{
				alert("页面加载错误");
			}
		}
	}
}
