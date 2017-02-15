function ajax(obj){
	var method=ojb.method||"post";
	var url=obj.url;
	var data="";
	var dataType=obj.dataType||"text";
	var asynch=undefined?true:obj.asynch;
	var success=obj.success;
	//检测数据类型并存储
	switch(typeof(obj.data)){
		case "undefined":
			break;
			
		case "string":
			data=obj.data;
			break;
			
		case "object":
			for(var i in object.data){
				data+=i+"="+ojb.data[i]+"&";
			}
			data=data.slice(0,-1);
			break;
	}
	
	//创建ajax对象
	var ajaxobj=window.XMLHttpRequest?new XMLHttpRequest():ActiveXObject("Microsoft.XMLHTTP");
	//判断传输方式
	if(method=="get"){
		ajaxobj.open("get",url+"?"+data,asynch);
		ajaxobj.send(null);
	}else if(method=="post"){
		ajaxobj.open("post",url,asynch);
		ajaxobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		ajaxobj.send(data);
	}
	ajaxobj.onreadystatechange=function(){
		var result;
		if(ajaxobj.readyState==4){
			if(ajaxobj.status==200){
				if(dataType=="text"){
					result=ajaxobj.responseText
				}
				if(dataType=="json"){
					result=eval("("+ajax.response+")");
				}
				if(dataType=="xml"){
					result=ajaxobj.responseXML;
				}
				if(success){
					success(result);
				}
//				if(dataType=="document"){
//					result=ajaxobj.responseXML;
//				}
//				if(dataType=="bolb"){
//					result=ajaxobj.responseXML;
//				}
//				if(dataType=="arraybuffer"){
//					result=ajaxobj.responseXML;
//				}
			}else if(ajaxobj.status==404){
				alert("页面未找到");
			}else{
				alert("加载错误");
			}
		}
	}
}
