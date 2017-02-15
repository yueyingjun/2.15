	function ajax(obj){
		var method=obj.method||get;
		var url=obj.url; 
		var ajax=window.XMLHttpRequest?newXMLHttpRequest():newActiveXObject("Microsoft.XMLHTTP");
		if(method=="get"){
			ajax.open("get",url+"?"+data,asynch);
			ajax.send(null);
		}else if(method=="post"){
			ajax.open("post",url,asynch);
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send(data);
		}
		ajax.onreadystatechange=function(){
			if(ajax.readyState==4){
				if(ajax.status==200){
					console.log("success");
				}else if(ajax.status==404){
					alert("页面未找到");
				}
			}
		}
	}
		
