<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>
<!--css样式实现div相对窗体位置不变-->
<html>   
<head>   
<title></title>
<script type="text/javascript" src="js/jquery-1.2.6.min.js"></script>

<style type="text/css"> 
 
body 
{ 
overflow:hidden; 
margin:0px; 
width:100%; 
height:100%; 

} 
  

#main_outer      
{
width:100%; 
height:100%;   
overflow:auto;   

}   
    
    
    
#glideDiv     
{     
position:   absolute;     
top:0;    
left:0;   
z-index:200;     
margin-left:0;
} 
    
</style>  

</head>   

<body> 




<div id="main_outer">   
  <br/><br/><br/><br/>
  互<br/><br/><br/>邀<br/><br/><br/>网<br/><br/><br/>页<br/><br/><br/>面<br/><br/><br/>主<br/><br/><br/>内<br/><br/><br/>容<br/><br/><br/>
  互<br/><br/><br/>邀<br/><br/><br/>网<br/><br/><br/>页<br/><br/><br/>面<br/><br/><br/>主<br/><br/><br/>内<br/><br/><br/>容<br/><br/><br/>
  互<br/><br/><br/>邀<br/><br/><br/>网<br/><br/><br/>页<br/><br/><br/>面<br/><br/><br/>主<br/><br/><br/>内<br/><br/><br/>容<br/><br/><br/>
</div>    
   


    
    
<div  id="glideDiv">

<span id="spanClose" style="border:solid thin Scrollbar;   
 background-color:#E6EEE7;">
 <span style="border-right:solid thin Gray;"><a href="javascript:showMyWhoYao()">我在互邀</a></span>
 
 <span style="border-right:solid thin Gray; "><a href="javascript:showmyFriend()">与好友聊天</a></span>
 <span style="border-right:solid thin Gray; "><a href="javascript:showsystemInfo()">系统消息</a></span>
 <span style="border-right:solid thin Gray; "><a href="javascript:showsetWhoyao()">状态</a></span>
 <span style="border-right:solid thin Gray; "><a href="">互邀小助手</a></span>
 
 <a href="javascript:Divclose()">关闭</a>

</span>   

<span id="spanOpen" style="border: solid thin Scrollbar; 
 background-color:#E6EEE7; display:none" >
 <a href="javascript:Divopen()">开启</a>  
</span>   


<div id="myWhoyao" style="display:none;">
<span><a href="">个人资料</a></span><br />
<span><a href="">活动中心</a></span><br />
<span><a href="">展示空间</a></span>
</div>


<div id="systemInfo" style="display:none;">
<span>暂时没有新系统消息</span><br />
</div>


<div id="myFriend" style="display:none;">
<span>搜索好友<input type="text" /><input type="button" value="搜索"/></span><br />
<span >好友列表</span><br />
您还没有好友
<br /><br /><br /><br /><br />
</div>

<div id="setWhoyao" style="display:none;">
<span><a href="">忙碌</a></span><br />
<span><a href="">空闲</a></span><br />

</div>




</div>


<script type="text/javascript">

    function Divclose() {
        $("#spanClose").hide(); $("#spanOpen").show(); $("#myWhoyao").hide(); $("#myFriend").hide(); $("#systemInfo").hide(); $("#setWhoyao").hide();
    }
    function Divopen() {
        $("#spanClose").show(); $("#spanOpen").hide(); 
    }
   function showMyWhoYao() {
       $("#myWhoyao").show(); $("#myFriend").hide(); $("#systemInfo").hide(); $("#setWhoyao").hide();
    }
    function showmyFriend() {
        $("#myFriend").show(); $("#myWhoyao").hide(); $("#systemInfo").hide(); $("#setWhoyao").hide();
    }
    function showsystemInfo() {
        $("#systemInfo").show(); $("#myWhoyao").hide(); $("#myFriend").hide(); $("#setWhoyao").hide();
    }
    function showsetWhoyao() {
        $("#setWhoyao").show(); $("#myWhoyao").hide(); $("#myFriend").hide(); $("#systemInfo").hide();
    }

</script>


</body>   
    
</html>

