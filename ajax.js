function ajax(obj){
	//method  url data dataType asynch success
	var method=obj.method||"get";         //默认获取方式get
	var url=obj.url;                      //地址
	var dataType=obj.dataType||"text";     //数据类型
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var success=obj.success;     //接受信息后回调函数（要完成的）
	var data="";                 //定义数据为字符串类型
	switch(typeof(obj.data)){    //检测数据类型
		case "undefined":break;  //undefined为字符串
		case "object":           //object时，截取处理为字符串
			for(var i in obj.data){
				data+="="+obj.data[i]+"&"; //把对像的形式转化为字符串data=data+"="+obj.data[i]+"&";
			}
			data=data.slice(0,-1);
		break;
		case "string":
		    data=obj.data;
		break;
	}
	var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

	if (method=="get") {                     //获取方式为get
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	} else if(method=="post"){               //获取方式为post
		ajax.open("post",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);		
	}
	ajax.onreadystatechange=function(){
	 if(ajax.readyState==4){                  //如果4，与服务器连接成功
		if(ajax.status==200){                 //200,请求成功
	       var result;
	       switch(dataType){
	       	case "text":                      //text
              result=ajax.responseText;
	       	break;
	       	case "xml":                       //XML
              result=ajax.responseXML;
	       	break;
	       	case "json":                      //json
              result=eval("("+ajax.response+")");
	       	break;
	       }
	       if (success) {
	       	success(result);
	       }
		}else if (ajax.status==404) {
             alert("请求未找到！");
		 }else{
             alert("请求错误！");
		  }
	 }
   } 
}