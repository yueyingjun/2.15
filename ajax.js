function ajax(obj){
	//需要的参数:method URL data dataType asynch success
	var method=obj.method||"get";  //设置默认的获取方式
	var url=obj.url; 	//路径为传入的路径
	var dataType=obj.dataType||"text";	//responseType="json"/"text"/"document"/"arraybuffer"/"dolb"
	var asynch=obj.asynch==undefined?true:obj.asynch;//设置同步or异步
	var success=obj.success;
	var data=""; 
		switch(typeof(obj.data)){
			case "undefined":;break;
			case "Object":	//{aa:"bb",cc:"dd"}
				for(var i in obj.data){
					data+=i+"="+obj.data[i]+"&"
				};
				data=data.slice(0,-1);
			break;
			case "string":
				data=obj.data;
			break;
		}
	
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(dataType){
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
					success(result)
				}
			}else if(ajax.status==404){
				alert("页面找不到")
			}else{
				alert("页面不存在")
			}
		}
	}
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null)
	}else if(method=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		ajax.send(data);
	}
}
