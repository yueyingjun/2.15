<?php
//$name=$_POST["name"];
//echo $name;

$aa=array(
	"aa"=>"zhangsan",
	"bb"=>"lisi",
);
$cc=$_POST["name"];
if($cc=="zhangsan"){
   echo $aa["aa"];
}else{
   echo "error";
}

?>