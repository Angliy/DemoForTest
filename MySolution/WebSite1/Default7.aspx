<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default7.aspx.cs" Inherits="Default7" %>
<!--ÈÕÀú¿Ø¼þ-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="CSS/jquery-ui-1.8.7.custom.css" rel="Stylesheet"type="text/css" />  
    <script src="js/WebCalendarTime.js" type="text/javascript"></script>
    <script type="text/javascript" src="<%=Page.ResolveUrl("~")%>js/jquery-1.4.4.min.js"></script> 
    <script type="text/javascript" src="js/jquery-ui-1.8.7.custom.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
  
    <div id="tip" style="display:none">
    <asp:TextBox runat="server"  onclick="SelectDate(this,'MM/dd/yyyy hh:mm');"  />
    </div>
    </form>

    <script type="text/javascript">


    
    </script>
    
</body>
</html>
