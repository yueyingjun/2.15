//封装ajax 
//method URL data dataType success,以对象的格式传参数 不需要考虑属性的顺序7
function ajax(obj){
	//初始化参数
	var method=obj.method||"get";//两种方式
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var fangshi=obj.fangshi==undefined?true:obj.fangshi;
	var success=obj.success;
	var data="";
	//data类型不同 处理方式不同（字符串 对象）;
	switch(typeof(obj.data)){    //type检测结果为字符串，因此case可以
		case "undefined":;break;
		case "object":   //{aa:"bb",cc:"dd"}
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&"
			};
			data=data.slice(0,-1)
		;break;
		case "string":
			data=obj.data;
		;break;
	}

	var ajax=window.XMLHttpRequest? new XMLHttpRequest() :new ActiveXObject("Microsoft.XMLHTTP") 
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null)
	}else if(method=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
		ajax.send(data);
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState===4){
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
				alert("页面没找到")
			}else{
				alert("页面不存在")
			}
		}	
	}
}