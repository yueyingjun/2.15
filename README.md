<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Ajax与php</title>
</head>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	body{
		font: 20px "微软雅黑";
	}
	div{
		width: 200px;
		height: 200px;
		border: 1px solid red;
	}
	input{
		width: 80px;
		height: 30px;
		background: #fff;
		color: #000;
	}
</style>
<body>
 <div></div>
 <input type="button" value="提交">
</body>
<script>
window.onload=function(){
		var div=document.getElementsByTagName("div")[0];
        var btn=document.getElementsByTagName("input")[0];
        btn.onclick=function(){
      	var xmlobj=new XMLHttpRequest();
      	    xmlobj.open("get","student.xml");
      	    xmlobj.send();
      	xmlobj.onload=function(){
      		var content=xmlobj.responseXML;
      		var trs=content.getElementsByTagName("stu");
      		var str="<table><tr><th>姓名</th><th>年龄</th><th>性别</th></tr>"
      		
      		for(var i=0;i<trs.length;i++){
      			str+="<tr>"
      			str+="<td>"+trs[i].getElementsByTagName("name")[0].innerHTML+"</td>"
      		    str+="<td>"+trs[i].getElementsByTagName("age")[0].innerHTML+"</td>"
      		    str+="<td>"+trs[i].getElementsByTagName("sex")[0].innerHTML+"</td>"
                str+="</tr>"
      			
      		}
      		
      		str+="</table>"
      		div.innerHTML=str;
      	}
      }



//  封装函数  ajax

  //     function ajax(obj){
  //       var method=obj.method||"get";
  //       var url=obj.url;
  //       var asynch=obj.asynch==undefined?true:obj.asynch;
  //       var data="";
  //       var dataType=obj.dataType||"text";
  //       var success=obj.success;
		//   switch(typeof(obj.data)){
		//  		case "undefinde":;break;
		//  		case "string":
		//  		data=obj.data;
		//  		break;
		//  		case "object":
		//         for(var i in obj.data){
		//          	data+=i+"="+obj.data[i]+"&";
		//          }
		//          data=data.slice(0,-1);
		//  		break;
		//  	}
  //       var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHttp");
  //       if(method=="get"){
  //       	xmlobj.open("get",url+"?"+data,asynch);
  //       	if(dataType!="xml"){
  //       		xmlobj.responseType=dataType;
  //       	}
        	
  //       	xmlobj.send(null);
  //       }
  //       if(method=="post"){
  //       	xmlobj.open("post",url,asynch);
  //       	if(dataType!="xml"){
  //       		xmlobj.responseType=dataType;
  //       	}
  //       	xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  //       	xmlobj.send(data);
  //       }
  //       xmlobj.onreadystatechange=function(){
  //       	if(xmlobj.readyState==4){
  //       		if(xmlobj.status==200){
  //       			var result;
  //                  if(dataType=="xml"){
  //                  	 result=xmlobj.responseXML;
  //                  }
  //                  else{
  //                    result=xmlobj.response;
  //                  }
  //                  if(success){
  //                  	success(result);
  //                  }
  //       		}else if(xmlobj.status==404){
  //       			alert("未找到指定文件！")
  //       		}
        
  //       	}else { 
  //       		 alert("请求失败！")

  //       	}
  //       }
  // }
 }
</script>
</html>


