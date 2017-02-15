//function ajax(obj){
//	var url=obj.url;
//	var method=obj.method||"get";
//	var asynch=obj.asynch==undefined?true:obj.asynch;//变
//	var data="";
//	var success=obj.success;//成功做的事情
//	var datatype=obj.datatype||"Text";//返回的数据类型
//	switch(typeof obj.data){
//		case "object":
//			for(var i in obj.data){
//				data+=i+"="+obj.data[i]+"&";
//			}
//			data.slice(0,-1);
//		case "string":
//			data=obj.data;
//			break;
//		case "undefined":break;
//	}
//	switch(method){
//		case "get":
//			obj.open("get",url+"?"+data);
//			obj.send();
//			break;
//		case "post":
//			objs.open("post",url);
//			objs.setRequertHeader("Content-Type","application/x-www-form-urlencoded";
//			objs.send(data);
//			break;
//	}
//	var objs=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft-XMLHTTP");
//	objs.onreadystatechange=function(){
//		if(objs.readyState==4){
//			if(objs.status==200){
//				var result="";
//				switch(datatype){
//					case "json":
//						result=eval((objs.repsonse));
//						break;//?????
//					case "Text":
//						result=objs.repsonseText;
//						break;
//					case "XML":
//						result=objs.responseXML;
//						break;
//				};
//				if(success){//????
//					success(result);
//				}
//			}else if(objs.status==404){
//				alert("页面没有找到");
//			}else{
//				alert("获取错误");
//			}
//		}else{
//			alert("请求不成功");
//		}
//	}
//}


function ajax(obj){
	var url=obj.url;
	var data="";
	var datatype=obj.datatype||"Text";
	var asynch=obj.asynch===undefined?true:obj.asynch;
	var success=obj.success;
	var method=obj.method||"get";
	switch(typeof data){
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data.slice(0,-1);
			break;
		case "string":
			data=obj.data;
			break;
		case "undefined":break;
	}
	var objs=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft-XMLHTTP");
	switch(method){
		case "get":
		objs.open("get",url+"?"+data);
		objs.send();
		break;
		case "post":
		objs.open("post",url);
		objs.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		objs.send(data);
		break;
	}
	objs.onreadystatechange=function(){
		if(objs.readyState==4){
			if(objs.status==200){
				var result="";
				switch(datatype){
					case "json":
						result=eval((objs.response));
						break;
					case "Text":
						result=objs.responseText;
						break;
					case "XML":
						result=objs.responseXML;
						break;
					case "document":
						result=objs.response;
						break;
				}
				if(success){
					success(result);
				}
				
			}else if(objs.status==404){
				alert("页面未找到");
			}else{
				alert("获取错误");
			}
		}
	}
}
