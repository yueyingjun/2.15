/**
 * Created by lenovo on 2017/2/15.
 */


//ajax���ݺ���  ������һ������
//  {
//      url:"",       Ҫ��ȡ���ݵĵ�ַ  ����
//      type:"",      ��ȡ���ݵķ�ʽ   ����
//      data:""/obj,  ���ݵ����ݣ�֧�ּ�ֵ���ַ���������  [��ʡ]
//      dataType:"",  ��ȡ������������  document/text/json/xml  [��ʡ]
//      success:fn ,  ���ݻ�ȡ�ɹ�����������
//      error:fn ,    ���ݻ�ȡʧ����������
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





