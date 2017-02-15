function ajax(obj){
	//初始化参数
	var method=obj.method||"get";
	var url=obj.url;
	var datatype=obj.datatype||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	var data="";
	//分情况判断所传入的数据类型
	switch(typeof(obj.data)){
		case "undefined":;
		break;
		case "string":
			data=obj.data;
		break;
		//{aa:"bb",cc:"dd"}
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data=data.slice(0,-1);
		break;
	}
	//1.获取xmlHttpRequest对象
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	//2.判断方法并打开请求，发送请求
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	}else if(method=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	//3.监听
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){ 
			if(ajax.status==200){
				//判断数据类型
				var result;
				switch(obj.datatype){
					case "text":
						result=ajax.responseText;
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
				alert("页面错误")
			}else{
				alert("页面不存在")
			}
		}
	}
}