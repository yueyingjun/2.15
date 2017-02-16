/**
 * Created by Administrator on 2017/2/16.
 */
function ajax(obj){
    if(typeof obj!="object"){
        alert(error("请输入正确的格式"));
        return false;
    }
    var url=obj.url;
    if(url==undefined){
        console.error("请输入url地址");
        return false;
    }
    /*参数初始化*/
    var async=obj.async===undefined?true:obj.async;
    var type=obj.type||"get";
    var type=obj.type||"post";
    var dataType=obj.dataType||"text";
    var data=obj.data||"";
    if(typeof data=="object"){
        var str="";
        for(var i in data){
            str+=i+"="+data[i]+"&";
        }
        data=str.slice(0,-1);
    }

    var xmlobj=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    xmlobj.onreadystatechange=function(){
        if(xmlobj.readyState==4){
            if(xmlobj.status==200){
                if(dataType=="text"){
                    var result=xmlobj.responseText;
                }else if(dataType=="xml"){
                    var result=xmlobj.responseXML;
                }else if(dataType=="json"){
                    var str=xmlobj.responseText;
                    var result=eval("("+str+")");
                }
                obj.success(result);
            }
        }
    }
    if(type=="get"){
        xmlobj.open("get",url+"?"+data);
        xmlobj.send();
    }else if(type=="post"){
        xmlobj.open("post",url);
        xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlobj.send(data);
    }




}