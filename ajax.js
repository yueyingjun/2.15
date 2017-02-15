
	//url: 地址
	//type:请求方式
	//data: 数据
	//dataType:数据类型
	//success:function(){}  请求成功后执行的函数
	//error:function(){} 请求发生错误执行的函数
//	ajax({
//		url:"",
//		type:"post",
//		data:"",
//		dataType:"json",
//		success:function(){
//			
//		},
//		error:function(){
//			
//		}
//	})
//	
	function ajax(obj){
		var url=obj.url;
		var type=obj.type||"get";
		var dataType=obj.dataType||"text";
		var success=obj.success;
		var data="";
		switch(typeof obj.data){
			case "undefined":
			break;
			case "object":
				for(var i in obj.data){
					data+=i+"="+obj.data[i]+"&";
				}
				data=data.slice(0,-1);
			break;
			case "string":
				data=obj.data;
			break;
		}
		var xmlobj=new window.XMLHttpRequest();
		if(type=="get"){
			xmlobj.open("get",url+"?"+data);
			xmlobj.responseType=dataType;
			xmlobj.send();
		}else if(type=="post"){
			xmlobj.open("post",url);
			xmlobj.responseType=dataType;
			xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlobj.send(data);
		}
		xmlobj.onreadystatechange=function(){
			if(xmlobj.readyState==4){
				if(xmlobj.status==200){
					switch(dataType){
						case "text":
							dt=xmlobj.responseText;
						break;
						case "json":
							dt=eval("("+xmlobj.response+")");
						break;
						case "xml":
							dt=xmlobj.responseXML;
						break;
						case "document":
							dt=xmlobj.response;
						break;
					}
					if(success){
						success(dt);
					}
				}else{
					if(error){
						error();
					}
				}
			}
		}
	}
	
	
	
	
	

