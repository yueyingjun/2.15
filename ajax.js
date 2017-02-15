//ajax的封装

function ajax(obj){

	//参数初始化

	var method=obj.method||"get";

	var url=obj.url;

	var dataType=obj.dataType||"text";

	var asynch=obj.asynch==undefined? true:obj.asynch;

	var success=obj.success;

	var data="";

	//检测数据的类型（未定义、object、string）

	switch(typeof(obj.data)){   

		case "undefined":;break;

		case "object":

		    for(var i in obj.data){

		    	data+=i+"="+obj.data[i]+"&";

		    };

		    data=data.slice(0,-1);   

		break;

		case "string":

		    data=obj.data;

		break;

	}

    //创建ajax对象

    var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject();

    //打开/发送函数（get post）

    if(method=="get"){

    	ajax.open("get",url+'?'+data,asynch);     	            

        ajax.send(null);  

    }else if(method=="post"){

    	ajax.open("post",url,asynch);      	

    	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); //post 请求头信息

        ajax.send(data);  

    }

    //监听函数

    ajax.onreadystatechange=function(){

    	if(ajax.readyState==4){

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

    				console.log(result)

    			}

    			if(success){

    				success(result);

    			}

    		}else if(ajax.status==404){

    			alert("页面为找到！");

    		}else{

    			alert("获取错误！");

    		}

    	}

    }

}