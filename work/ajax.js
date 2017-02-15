
function ajax(obj){
	url=obj.url;
	type=obj.type||"get";
	var data="";
	asynch=obj.asynch||true;
	dataType=obj.dataType||"text";
	success=obj.success;
	error=obj.error;
	switch(typeof(obj.data)){
		case "undefined":;break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data=data.slice(0,-1);
			break;
		case "strng":
			data=obj.data;
			break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
	if(type=="get"){
		ajax.open(type,url+"?"+data,asynch);
		ajax.responseType=dataType;
		ajax.send(null);
	}else if(type=="post"){
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
//					consloe.log(dataType)
					case "text":
						result=ajax.responseText;
					break;
					case "json":
						result=ajax.response;
					break;
					case "document":
						result=ajax.response;
					break;
				}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				var str="找不到页面";
				if(error){
					error(str);
				}else{
					alert(str);
				}
			}else{
				var str1="打开错误";
				if(error){
					error(str1);
				}else{
					alert(str1);
				}
			}
		}
	}
}

