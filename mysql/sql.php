<?php
$mysql=new mysqli("localhost","root","","info");
$mysql->query("set names utf8");
echo "<pre>";//原样输出
//var_dump($mysql);
$result=$mysql->query("select * from teacher");
$str="<table>";
while($row=$result->fetch_assoc()){
//  var_dump($row);	
  $str.="<tr>";
  	$str.="<td>".$row['name']."</td>";
  	$str.="<td>".$row['age']."</td>";
  	$str.="<td>".$row['sex']."</td>";
  $str.="</tr>";
}
$str.="</table>";
echo $str;
?>