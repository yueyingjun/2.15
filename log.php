<?php
header("Content-Type:text/html;charset=UTF-8");
$zhanghao=$_GET["name"];
echo $zhanghao;
if($zhanghao=="zhangsan"){
	echo "操作正确";
}else{
	echo "操作失败！";
}


?>