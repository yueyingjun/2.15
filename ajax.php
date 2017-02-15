<?php
    name=$_POST["name"];
if($name){
	if($name=="zhangsan"){
		echo "true";
	}else{
		echo "false";
	}	
}else{
	echo "没有数据";
}
?>