<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default13.aspx.cs" Inherits="Default13" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
    
    
    
    
    <script type="text/javascript">


        //    AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。
        //    它采用异步方式加载模块，模块的加载不影响它后面语句的运行。
        //    所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

        var tt = 321;
        
        (function() {
            var tt = 123;
            (function() {

                var gg = this;
                alert(gg.tt)

            })();
        })();
        
        
        
        
        


    
    </script>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</body>
</html>
