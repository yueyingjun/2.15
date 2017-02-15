<?php
	$zh=$_POST['zh'];
	$mm=$_POST['mm'];
	if($zh=='zhangsan'){
		if($mm=='123456'){
			echo "2";
		}else{
			echo "1";
		}
	}else{
		echo "0";
	}
?>