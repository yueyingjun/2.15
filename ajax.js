function ajax(obj){
    var method=obj.method||"get";
    var url=obj.url;
    var dataType=obj.dataType||"text";
    var asynch=obj.asynch==undefined?true:obj.asynch;
    var success=obj.success;
    var data="";
    switch(typeof(obj.data)){
        case "undefined":break;
        case "object":
           for(var i in obj.data){
            data+=i+"="+obj.data[i]+"&";
           }data=data.slice(0,-1);
        break;
        case "string":
           data=obj.data;
        break;
    }


    var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"); 
    if (method=="get") {
        ajax.open("get",url+"?"+data,asynch);        
        if (dataType=="document") {
            ajax.responseType="document";

        }
        ajax.send(null);
    }else if (method=="post") {
        ajax.open("post",url,asynch);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(data);
        if (dataType=="document") {
            ajax.responseType-"document";
        };
    };

    ajax.onreadystatechange=function(){  //监听事件
                if(ajax.readyState==4){    //打开请求成功
                    if(ajax.status==200){
                        var result;
                        switch(dataType){
                            case "text":
                            result=ajax.responseText;
                            break;
                            case "json":
                            result=eval("("+ajax.response+")");
                            
                            break;
                            case "xml":
                            result=ajax.responseXML;
                            
                            break; 
                            case "document":
                            result=ajax.response;
                            break;                          
                        }
                        if (success){
                            success(result);
                        }

                    }else if(ajax.status==404){
                        alert("页面未找到");
                    }else{
                        alert("请求不成功")
                    }
                }

}
}