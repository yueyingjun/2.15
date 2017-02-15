function ajax(obj){
	var url=obj.url;
	var type=obj.type||"post";
	var data=obj.data;
	var dataType=obj.dataType||"text";

	if (typeof data=="object") {
		var str="";
		for(var i in str){
			str+=i+"="+data[i]+"&";
		}
		data=str.slice(0,-1);
	}

	var ajaxobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	ajaxobj.onreadystatechange=function(){
		if(ajaxobj.readyState==4){
			if(ajaxobj.status==200){
				if(dataType=="text"){
					var result=ajaxobj.responseText;
				}else if(dataType=="xml"){
					var result=ajaxobj.responseXML;
				}else if(dataType=="json"){
					var result=ajaxobj.responseText;
					var result=eval("("+str+")");
				}
				obj.success(result)
			}
		}
	}
	if(type=="get"){
		ajaxobj.open("get",url+"?"+data);
		ajaxobj.send();
	}else if(type=="post"){
		ajaxobj.open("post",url);
		ajaxobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxobj.send(data);
	}

}