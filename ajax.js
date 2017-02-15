/* ajax封装
 * @param  {object} obj
 * //obj包含以下内容
 * obj.url链接地址          *
 * obj.methodget获取方式    *
 * obj.data数据
 * obj.success回调函数
 * obj.datatype数据类型
 * obj.status状态
 */
  function ajax(obj){
 	var method=obj.method||"get";
 	var url=obj.url;
 	var success=obj.success;
 	var data="";
 	switch(typeof obj.data){
 		case "undefined": ;
 		break;
 		case "string":
 			data=obj.data;
 		break;
 		case "object":
 			for(i in obj.data){
 				data+=i+"="+obj.data[i]+"&";
 			}
      data=data.slice(0,-1);
 		break; 			
 	}
   	var asynch=obj.asynch==undefined?true:obj.asynch;
   	var dataType=obj.dataType||"text";
   	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft","XMLHTTP");
   	if(method=="get"){
   		  	ajax.open("get",url+"?"+data,asynch);
   		  	ajax.send(null);
   	}else if(method=="post"){
   			ajax.open("post",url,asynch);
   			ajax.setRequestHeader("Content-Type","applicatiion/x-www-form-urlencoded");
   			ajax.send(data);
   	}
   	ajax.onreadystatechange=function(){
   		if(ajax.readyState==4){
   			if(ajax.status==200){
   				var result;
   				switch(dataType){
   					case "text":
   						result=ajax.responseText;
   					break;
   					case "xml":
   						result=ajax.responseXML;
   					break;
   					case "json":
   						result=eval("("+ajax.response+")");
   					break;
            case "document":
   						result=eval("("+ajax.response+")");
   					break;
   				}
   				if(success){
   					success(result);
   				}
   			}else if(ajax.status==404){
   				alert("页面不存在");
   			}else{
   				alert("请求失败");
   			}
   		}   		   		
   	}   	 	   	
 }
 }
