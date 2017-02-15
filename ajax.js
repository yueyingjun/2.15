/*
         参数
 * ajax({
 * 	type:提交方式(不传默认是get),
 * 	url:提交到的地址,
 *  dataType:返回值类型(默认是text),
 *  asynch:是否异步(默认为true),
 *  success:function(){
 * 	交互成功后做的动作
 *  },
 *  error:function(){
 * 	交互失败做的动作
 *  },
 *  selector:选择器 	需设置参数属性dataType:"document"  返回document对象数组
 * })
 * 
 * 
 * */
function ajax(obj){
	var type=obj.type||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;
	var data="";
	var error=obj.error;
	var selector=obj.selector;
	switch(typeof(obj.data)){
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

	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new
	ActiveXObject("Microsoft.XMLHTTP");
	if(type=="get"){
		ajax.open("get",url+"?"+data,asynch);
		if(ajax.dataType=="document"){
			ajax.responseType="document";
		}
		ajax.send(null);
	}else if(type=="post"){
		ajax.open("post",url,asynch);
		if(ajax.dataType=="document"){
			ajax.responseType="document";
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	ajax.onreadystatechange=function(){
		if (ajax.readyState==4) {
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
					document.write(ajax.response);
					var dom=document.querySelectorAll(selector);
					var res=[];
					for(var i=0;i<dom.length;i++){
						res.push(dom[i]);
					}
					result=res;
					break;
				}
				if(success){
					success(result);
				}
			}
			if(error){
				if(ajax.status==404){
					var str1="页面未找到";
					error(str1);
				}else if(ajax.status==500){
					var str1="服务器内部错误";
					error(str1);
				}
				else if(ajax.status==403){
					var str1="拒绝或者禁止访问";
					error(str1);
				}
				else if(ajax.status==502){
					var str1="服务器暂时不可用";
					error(str1);
				}
				else if(ajax.status==503){
					var str1="服务器过载或暂停维修";
					error(str1);
				}
			}
		}
	}
}