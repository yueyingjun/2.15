//封装ajax
// 方式   method  get post  必须的
// 路径		xxx.php   必须的
// 同异步    true异步    false同步 但是同步没有意义
// 账号   密码   自己访问自己  也没有必要  
// 传的数据  data
// 成功以后执行的程序
// success
 function ajax(obj){
 	//数据初始化
 	var url=obj.url;
 	var method=obj.method||"get";
 	var getType=obj.getType||"text";
 	var data="";
 	var success=obj.success;
 //检测数据数据类型并且存入数据
     var tpof=typeof(obj.data)
 	if(tpof=="string"){data=obj.data;} 
 	if(tpof=="object"){
 		for(var i in obj.data){
             data=i"="obj.data[i]"&";
         }
         data=data.slice(0,-1);
 	}
 //判断传输方式
     var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
     if(method=="get"){
  		ajax.open("get",url"?"data);
 		ajax.send(null);  
     }else if(method=="post"){
 		ajax.open("post",url);
 		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 		ajax.send(data);
 	}
 //检测数据是否交换成功
 	ajax.onreadystatechange=function(){
 		if(ajax.readyState==4){
 			if(ajax.status==200){
 				var result;
 				if(getType=="text"){result=ajax.responseText;}
 				if(getType=="json"){result=eval("("ajax.response")");}
 				if(getType=="xml"){result=ajax.responseXML;}
 				if(getType=="document"){result=ajax.response;}
 				if(success){
 					success(result);
 				}
 			}else if(ajax.status==404){
 				alert("页面没有找到");
 			}else{
 				alert("获取错误");
 			}
 		}
 	}
 }