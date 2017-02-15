<?php
	$aa=array(
		"name"=>"lisi",
		"sex"=>"man"
	);
	$name=$_POST["name"];
	$sex=$_POST["sex"];
	if($name=="lisi"&&$sex=="man"){
		echo $aa;
	}else{
		echo "erro";
	}
?>