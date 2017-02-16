<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>Document</title>
</head>
<style>
table{
	width: 800px;margin:0 auto;border-collapse: collapse;border:1px solid #000;
}
.add{
	width:798px;height: 30px;font-size:20px ;text-align: center;line-height: 30px;margin:0 auto;border:1px solid #000;border-top:none;display: block;text-decoration: none;
}
tr{width:25%;height: 30px;border:1px solid #000;text-align: center;}
tr.remove{text-align: left;}
tr.edit{text-align: left;}
</style>
<body>
	<table>
		<tr>
			<th>姓名</th>
			<th>性别</th>
			<th>年龄</th>
			<th>操作</th>
		</tr>
		<?php
	        include "db.php";
	        $sql="select * from teacher";
	        $result=$mysql->query($sql);
	        while($row=$result->fetch_assoc()){
        ?>
			   <tr id="<?php echo $row['id']?>">
	           <td attr="name"><?php echo $row["name"]?></td>
	           <td attr="sex"><?php echo $row["sex"]?></td>
	           <td attr="age"><?php echo $row["age"]?></td>
	           <td class="remove"><a href="del.php?id=<?php echo $row['id']?>">删除</a><a href="del.php?id=<?php echo $row['id']?>">编辑</a></td>
	          
	        </tr>

        <?php
            }
        ?>	
		
	</table>
	<a href="" class="add">+</a>
</body>
</html>