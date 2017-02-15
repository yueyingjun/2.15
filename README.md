<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">

<head>

	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />

	<title></title>

</head>

<style>

	div{

		width: 200px;

		height: 200px;

		border: 1px solid red;	

	}

</style>

<body>

	<div>

		

	</div>

	<input type="button" value="按钮"/>

</body>

<script>

	// 1. 返回的数据是xmldocumentobj 

	// 2. 返回的类型 text

	var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

	var btn=document.getElementsByTagName("input")[0];

	var div=document.getElementsByTagName("div")[0];

	btn.onclick=function(){

	xmlobj.onreadystatechange=function(){

		if(xmlobj.readyState==4){

			if(xmlobj.status==200){

				var content=xmlobj.responseXML;//content是xml文档

				var trs=content.getElementsByTagName("stu");

				var str="<table><tr><th>姓名</th><th>年龄</th><th>性别</th></tr>";

						for(var i=0;i<trs.length;i++){

							str+="<tr>";

								str+="<td>"+trs[i].getElementsByTagName('name')[0].innerHTML+"</td>";

								str+="<td>"+trs[i].getElementsByTagName('age')[0].innerHTML+"</td>";

								str+="<td>"+trs[i].getElementsByTagName('sex')[0].innerHTML+"</td>";

							str+="</tr>";

						}

					str+="</table>";

					document.body.innerHTML=str;

			}

		}

	}

//	xmlobj.open("get","2.php?name=zhangsan1");

	xmlobj.open("post","3.xml");

	xmlobj.setRequestHeader("Content-type","application/x-www-form-urlencoded");//头部信息要放在open之后

	xmlobj.send();

	}

</script>

</html>
