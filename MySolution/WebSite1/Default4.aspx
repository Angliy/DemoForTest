<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default4.aspx.cs" Inherits="Default4" %>
<!--jquery ui-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="CSS/jquery-ui-1.8.7.custom.css" rel="Stylesheet"type="text/css" />  
    <script type="text/javascript" src="js/jquery-1.4.4.min.js"></script> 
    <script type="text/javascript" src="js/jquery-ui-1.8.7.custom.min.js"></script>
    
    //jquery   ui
    
</head>
<body>
        
   <div id="tip" style="display:none">   
    旧密码:<input type="text"/><br />
    新密码:<input type="text"/>
   </div><input type="button" value="修改密码" id="btn"/>
   
   <div id="datepicker"></div> 
   
 
   <script type="text/javascript">
   
      $(function () {
        $('#datepicker').datepicker({
            inline: true
        });
    });


        
       $("#btn").click(function() {
       $('#tip').dialog({
           title: "修改密码",
           show: "bounce",
           buttons: {
				"确认": function() {
					$( this ).dialog( "close" );
				},
				"取消": function() {
					$( this ).dialog( "close" );
				}
			},
           modal: true
       });
       });

       $.fx.speeds._default = 100;


      // $.get("HTMLPage.htm", function(data) { $('#tip').html(data).dialog(); });
        
   </script>
        
</body>
</html>
