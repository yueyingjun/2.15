function ajax(obj){
//初始化
	var method=obj.method||"get";
	var url=obj.url;//要连接的地址
	var dataType=obj.dateType||"text";
	var asynch=obj.asynch==undefined? true:obj.asynch;
	var success=obj.success;
	var data="";
	switch(typeof(obj.data)){
		case "undefined":;break;
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
	//处理兼容ie8以下
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	//get  post发送请求的类型
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send();
	}else if(method=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	//请求是否成功
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){//响应已完成，可以访问服务器响应并使用它
			if(ajax.status==200){//交易成功
				var result;
				//判断类型
				switch(dataType){
					case "text":
						result=ajax.responseText
					;break;
					case "json":
						result=eval("("+ajax.response+")")
					;break;
					case "xml":
						result=ajax.responseXML
					;break;
					case "document":
						result=ajax.response
					;break;
				}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				alert("页面错误")
			}else{
				alert("获取失败")
			}
		}
	}
}
