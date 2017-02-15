function ajax(obj){
	var method=obj.method||"get";      //方式
	var url=obj.url;                   //地址
	var dataType=obj.dataType||"text";    //类型
	var asynch=obj.asynch==undefined?true:obj.asynch;    //异步方式
	var success=obj.success;      //函数
	var data="";        //数据
	switch(typeof(obj.data)){    
		case "undefined": ;
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
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsofe.XMLHTTP");     //兼容
	ajax.onreadystatechange=function(){
		if (ajax.readyState==4) {
			if (ajax.status==200) {
				var result;
				switch (dataType){
					case "text":
					    result=ajax.responseText;
					    success(result);
						break;
					case "json":
						result=eval("("+ajax.response+")");
					    success(result);	
						break;
					case "xml":
						result=ajax.responseXML;
					    success(result);	
					break;
				}
			} else if(ajax.status==404){
				alert("页面没找到！")
			}
		} 
//		alert("获取错误！");
	}
	
	if (method=="get") {
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	} else if(method=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
}
