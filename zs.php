<?php
	
//	$name=$_GET["name"];
//	if($name=="zhangsan"){
//		echo "ok";
//	}else{
//		echo "error";
//	}
	$name=$_POST["name"];
	$age=$_POST["age"];
	if($name=="zhangsan"&&$age=="12"){
		echo "ok";
	}else{
		echo "error";
	}
?>