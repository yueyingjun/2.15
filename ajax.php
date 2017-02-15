<?php
	header("Content-Type:text/xml;charset=utf8");
	 $xml="<?xml version='1.0' encoding='utf8'?>
		 <clothes>
			<header id='h'>XML格式头部</header>
			<footer class='f'>XML格式底部</footer>
		</clothes>
	";
	echo $xml; 
?>