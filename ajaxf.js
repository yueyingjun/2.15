function ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var type=obj.type||"text";
	var success=obj.success;
	var data="";
	var ajax=new XMLHttpRequest();
	
	if(typeof data=="object"){
		for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
		data=data.slice(0,-1);
	}else if(typeof data=="undefined"){
//		return;
	}
	
	if(method=="get"){
		ajax.open("get",url+"?"+data);
		ajax.send();
	}else if(method=="post"){
		ajax.open("post",url);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(type){
					case "text":
						result=ajax.responseText;
					break;
					case "XML":
						result=ajax.responseXML;
					break;
					case "document":
						result=result;
					break;
					case "josn":
						result=eval("("+ajax.response+")");
					break;
				}
				success(result);
			}else if(ajax.status==404){
				alert("页面未能找到！");
			}else{
				alert("错误");
			}
		}
	}
	
	
}
