//封装ajax
function ajax(obj){//定义一个对象，因为没有顺序
	var type=obj.type||"get";//方式
	var url=obj.url==undefined?false:obj.url;//地址
	var asynch=obj.asynch==undefined?true:obj.asynch;//同异步
	var dataType=obj.dataType||"text";//返回数据的类型 text json xml document
      var success=obj.success;//当数据返回成功之后,我们要做的事情  
      var data=obj.data;//传递的数据

      if(url==false){
            alert("你没写地址！");
      }

	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
      
      var str;
	switch(typeof(data)){
		case "undefined":;
			break;
		case "object":
			for (var i in data){
				str+=i+"="+data[i]+"&";
			};
			str=str.slice(0,-1)
			break;
		case "string":
			str=data;
			break;
	}

	if(type=="get"){
		ajax.open("get", url+'?'+data, asynch);
            ajax.send(null);
	}else if(type=="post"){
		ajax.open("post", url, asynch);
            ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajax.send(data);
	}

	ajax.onreadystatechange=function () {
            if (ajax.readyState==4){
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
                              case "document":
                                    result=ajax.response;
                                    break;
            		}
            		if(success){
            			success(result);
            		}
            	}else if(ajax.status==404){
            		alert("页面没有找到！");
            	}else{
            		alert("获取错误！");
            	} 
            }
      };
}
