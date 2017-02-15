/*
	2016.6.13
	ajax(){
		url:"http://www.baidu.com"
		type:"post||get"
		asynch:"true||false"
		data:{}||user=admin&pwd=123
		dataType:"text||xml||json"
		success:function(data){
			//处理数据
		}
		error:function(s){
			//处理错误
		}
	}
*/ 
function ajax(o){
	if(!o.url){return;}
	var url=o.url,
		type=o.type||"GET",
		asynch=o.asynch||true,
		data=o.data,
		dataType=o.dataType||"text",
		success=o.success;
		//1.创建ajax对象
		var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
		//2.打开请求
		//3.发送请求
		if(data && typeof data=="object"){
			var str="";
			for(var i in data){
				str+=i+"="+data[i]+"&";
			}
			data=str.slice(0,-1);
		}
		if(type=="GET"){
			if(data){
				xhr.open(type,url+"?"+data,asynch);
			}else{
				xhr.open(type,url,asynch);
			}
			xhr.send(null);
		}else if(type=="POST"){
			xhr.open(type,url,asynch);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(data);
		}
		//4.处理数据
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(dataType=="text"){

						success&&success(xhr.responseText);

					}else if(dataType=="xml"){
						success&&success(xhr.responseXML);
					}else if(dataType=="json"){
						console.log(xhr)
						var obj=eval("("+xhr.responseText+")");
						o.success&&o.success(obj);
					}
				}else{
					o.error&&o.error(xhr.status)
				}
			}
		}
		

}