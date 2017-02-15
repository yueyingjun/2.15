function ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var data="";
	var result="";
	var dataType=obj.dataType||"text";
	var success=obj.success;
	switch(typeof(obj.data)){
		case "undefined":break;
		case "object":for(var i in obj.data){
							data+=i+"="+obj.data[i]+"&";
					  }
					  data=data.slice(0,-1);
					  break;
		case "string":data=obj.data;break;
	}
	var ajaxobj=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("MicrosoftXMLHTTP");
	if(method=="get"){
		ajaxobj.open("get",url+"?"+data,true);
		ajaxobj.send();
	}else if(method=="post"){
		ajaxobj.open("post",url,true);
		ajaxobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxobj.send(data);
	}
	ajaxobj.onreadystatechange=function(){
		if(ajaxobj.readyState==4){
			if(ajaxobj.status==200){
				switch(dataType){ //可能是text,document,xml,json格式
					case "text":
					result=ajaxobj.responseText;
					break;
					case "document":
					result=ajaxobj.response;
					break;
					case "xml":
					result=ajax.responseXML;
					break;
					case "json":
					result=eval("("+ajax.response+")");
					break;//eval将符合语法规范的字符串转化为JS代码
				}
				if(success){
						success(result);
				}
			}else if(ajaxobj.status==404){
				alert("页面加载失败");
			}else{
				alert("请求失败");
			}
		}
	}
}
