/**
 * Created by lenovo on 2017/2/15.
 */


//ajax兼容函数  参数是一个对象
//  {
//      url:"",       要获取数据的地址  必填
//      type:"",      获取数据的方式   必填
//      data:""/obj,  传递的数据，支持键值对字符串，对象  [可省]
//      dataType:"",  获取到的数据类型  document/text/json/xml  [可省]
//      success:fn ,  数据获取成功后做的事情
//      error:fn ,    数据获取失败做的事情
//  }

function ajax(obj){
    var url=obj.url;
    var type=obj.type;
    var data="";
    var dataType=obj.dataType||"text";
    var success=obj.success;
    var error=obj.error;

    switch(typeof obj.data){
        case "undefined":break;
        case "string":
            data=obj.data;
            break;
        case "object":
            for(var i in obj.data){
                data+=i+"="+obj.data[i]+"&";
            }
            data=data.slice(0,-1);
            break;
    }

    var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

    xmlobj.onreadystatechange=function(){
        if(xmlobj.readyState==4){
            if(xmlobj.status==200){
                var result=xmlobj.response;
                if(success){
                    success(result);
                }
            }else if(xmlobj.status==404){
                if(error){
                    error();
                }
            }
        }
    }

    if(type=="get"){
        xmlobj.open("get",url+"?"+data);
        xmlobj.send();
    }else if(type=="post"){
        xmlobj.open("post",url);
        xmlobj.setResponseHeader("Content-Type","application/x-www-form-urlencoded");
        xmlobj.send(data);
    }

    switch(dataType){
        case "text":
            break;
        case "document":
            xmlobj.responseType="document";
            break;
        case "json":
            xmlobj.responseType="json";
            break;
    }

}





