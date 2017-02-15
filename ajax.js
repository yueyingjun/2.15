function ajax(obj){
	//重置
	var url=obj.url;
	var type=obj.type||"get";
	var asynch=obj.asynch==false?obj.asynch:true;
	var dataType=obj.dataType||"text";
	var success=obj.success;
	var data="";
	//处理data的值
	switch(typeof(obj.data)){
		case "undefined":;break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data.slice(0,-1);
		break;
		case "string":
			data=obj.data;
		break;
	}
	//ajax
	var ajax=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
	//get  post
	if(type=="get"){
		ajax.open("get",url+"?"+data,asynch);
		if(dataType=="document"){
			ajax.responseType="document";
		}
		ajax.send(null);
	}else if(type=="post"){
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
		if(dataType=="document"){
			ajax.responseType="document";
		}
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				//判定类型
				switch(dataType){
					case "text":
					result=ajax.responseText;
					break;
					case "json":
					result=eval("("+ajax.response+")");
					break;
					case "XML":
					result=ajax.responseXML;
					break;
					case "document":
					result=ajax.response;
					break;
				}
				if(success){
					success(result);
				}
			}else if(ajax.status==404){
				alert("访问失败！");
			}else{
				alert("访问出错！");
			}
		}
	}
}
//调用
//ajax({
//	url:"a.php",
//	type:"get",
//	asynch:true,
//	data:"name=zhangsan",
//	dataType:"document",
//	success:function(text){
//		console.log(text.getElementsByTagName('h1')[0].innerHTML);
//	}
//})