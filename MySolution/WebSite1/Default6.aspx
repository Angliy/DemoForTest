<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default6.aspx.cs" Inherits="Default6" %>
<!--百度地图API-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    
    <script src="http://api.map.baidu.com/api?v=1.1&services=true" type="text/javascript"></script>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
</head>
<body>

    <!--百度地图容器-->
    <div style="width:697px;height:550px;border:#ccc solid 1px;" id="dituContent"></div>



    <script type="text/javascript">


        //创建和初始化地图函数：
        function initMap() {
            createMap(); //创建地图
            setMapEvent(); //设置地图事件
            addMapControl(); //向地图添加控件
        }

        //创建地图函数：
        function createMap() {
            var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
            var point = new BMap.Point(98.78282, 60.94159); //定义一个中心点坐标
            map.centerAndZoom(point, 4); //设定地图的中心点和坐标并将地图显示在地图容器中
            window.map = map; //将map变量存储在全局
        }

        //地图事件设置函数：
        function setMapEvent() {
            map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
            map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
            map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
            map.enableKeyboard(); //启用键盘上下左右键移动地图
        }

        //地图控件添加函数：
        function addMapControl() {
            //向地图中添加缩放控件
            var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
            map.addControl(ctrl_nav);
            //向地图中添加缩略图控件
            var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
            map.addControl(ctrl_ove);
            //向地图中添加比例尺控件
            var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
            map.addControl(ctrl_sca);
        }


        initMap(); //创建和初始化地图


    </script>
</body>
</html>
