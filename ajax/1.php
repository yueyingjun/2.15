<?php
  $zhanghao=$_GET["zhanghao"];
  $mima=$_GET["pass"];
  if($zhanghao=="duanxiaojie"){
  	if($mima=="12345"){
  		echo "登录成功";
  	}else{
  		echo "密码错误";
  	}
  }else{
     echo "账号不存在";  	
  }
?>