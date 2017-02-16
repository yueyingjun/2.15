<?php
include "db.php";
$id=$_GET["id"];
$mysql->query("delete from teacher where id=".$id);
if($mysql->affected_rows>0){
   echo "<script>alert('删除');location.href='tab.php'</script>";
// include "tab.php";
}
?>