function ajax(obj){
	var method=obj.method||"get";       //访问方式
	var url=obj.url;                    //地址
	var dataType=obj.dataType||"text";  //数据类型
	var asynch=obj.asynch==undefined?true:obj.asynch;    //异步
	var success=obj.success;             //函数
	var data="";                         //数据
	//判断数据的类型
	switch(typeof(obj.data)){
		case "undefined": ;
		break;
		case "object":
		for(var i in (obj.data)){
			data+=i+"="+obj.data+"&";
		}
		data=data.slice(0,-1);
		break;
		case "string":
		data=obj.data;
		break;
	}
	//兼容
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;       //判断数据类型
				switch(dataType){ 
					case "text":
					result=ajax.responseText;
					success(result);
					break;
					case "json":
					releaseEvents=eval("("+ajax.response+")");
					success(result);
					break;
					case "xml":
					result=ajax.responseXML;
					success(result);
					break;
					case "document":
					result=ajax.response;
					success(result);
//					case "arraybuffer":
//                  case "bolb":
				}
			}else if(ajax.status==404){
				alert("没有找到此页面！");
			}else{
				alert("访问出错！")
			}
		}
	}	
//判断获取的方式
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send();
	}else if(method=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
}