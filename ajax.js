function ajax (obj) {
	//数据初始化
	var method = obj.method || 'GET';
	var data = obj.data || null;
	var url = obj.url || '';
	var asynch = obj.asynch || true;
	var success = obj.success;
	var xmlobj=window.XMLHttpRequst?new XMLHttpRequest():new AxctiveXObject("Microsoft.XMLHTTP");
	var tpof=typeof(obj.data);
	if (tpof=="string") {dataStr=obj.data};
	if (tpof=="object") {
		var aa = [];
		for (var i in obj.data){
			aa.push(i + '=' + data[i]);
		//  i 对象的下标输出冒号前面的内容
		}
		var dateStr= aa.join('&');
	}
	//这是url后面链接希望发送的数据
	if(method=="get"){
		xmlobj.open('get',url+'?'+datestr,asynch);
		xmlobj.send(null);
	}else{
		xmlobj.open('post',url,asynch)
		xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlobj.send(datestr);
	}
	//根据不同的方法选择不同的方式请求
	xmlobj.onreadystatechange = function () {
		if (xmlobj.readyState == 4) {
			if (xmlobj.status == 200) {
				//判定类型
				switch(dataType){
					case "text": result=ajax.responseText; break;
					case "json": result=eval("("+ajax.response+")"); break;
					case "XML": result=ajax.responseXML; break;
					case "document": result=ajax.response; break;
				}
				if(success){
					success(result);
				}
				// success(xmlobj.responseText);
			}else if (xmlobj.status == 404) {
				alert("访问失败");
			}	
		}else{
			alert("请求错误");
		}
　　}
	

}
//调用
// ajax({
// 	url:"1.php",
// 	type:"get",
// 	asynch:true,
// 	data:{
// 		name1: 'value1',
// 		name2: 'value2'
// 	},
// 	dataType:"document",
// 	success:function(text){
// 		console.log(text.getElementsByTagName('h1')[0].innerHTML);
// 	}
// })