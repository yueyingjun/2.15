//封装ajax
	//method  URL data  dateType  asynch  success,以对象的格式传参，无需考虑属性的顺序
	//{method:"get",url:"login.php",asynch:true,success:function(){}}
function ajax(obj){
	//参数初始化
	var method=obj.method||"get";
	
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	//data类型不同，处理方式不同（字符串、对象）
	var data="";
	switch(type(obj.data)){    //type检测结果为字符串，因此case可以
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
					result=ajax.eval("("+ajax.response+")");
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

//调用函数
//ajax({
//	method:"get",
//	url:"login.php",
//	asynch:true,
//	dataType:"text",
//	data:{aa:"bb",cc:"dd"},
//	data:"aa=bb&cc=bb",
//	success:function(text){
//		console.log(text)
//	}
//})
