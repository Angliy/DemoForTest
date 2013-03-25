<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default5.aspx.cs" Inherits="Default5" %>
<!--Jcrop图片切割-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
	<head>
		<title>图片切割测试</title>
		<link href="CSS/jquery.Jcrop.css" type="text/css" rel="Stylesheet" media="screen"/>
		<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="js/jquery.Jcrop.min.js"></script>
		<script type="text/javascript" src="js/jQuery.UtrialAvatarCutter.js"></script>
		<style type="text/css">
			div{float:left;margin-right:10px;}
			
		</style>
	</head>
	<body>
		<!--
			原始图
		-->
		<div id="picture_original">
			<img src="http://hiphotos.baidu.com/1172542911/pic/item/203dda9bbc2fab3b6e068c1a.jpg"/>
		</div>
		<!---
			缩略图
		-->
		<div id="picture_200"></div>
		<div id="picture_50"></div>
		<div id="picture_30"></div>
		<br>
		<input type="button" value="切换图片" onclick="change_img()"/>
		<input type="button" value="确定" id="save_btn"/>
		<script type="text/javascript">
			var cutter = new jQuery.UtrialAvatarCutter(
				{
					//主图片所在容器ID
					content : "picture_original",
					
					//缩略图配置,ID:所在容器ID;width,height:缩略图大小
					purviews : [{id:"picture_200",width:200,height:200},{id:"picture_50",width:50,height:50},{id:"picture_30",width:30,height:30}],
					
					//选择器默认大小
					selector : {width:200,height:200}
				}
			);
	
			$(window).load(function(){
			
				cutter.init();

				//确定按钮动作
				$("#save_btn").click(
					function(){
						var data = cutter.submit();
						alert("x="+data.x+"\ny="+data.y+"\nw="+data.w+"\nh="+data.h+"\ns="+data.s);
					}
				);
			});
			
			/*
			 * 切换图片
			 */
			function change_img(){
				var imgs = [
					"http://hiphotos.baidu.com/1172542911/pic/item/203dda9bbc2fab3b6e068c1a.jpg",
					"http://hiphotos.baidu.com/156215779/pic/item/945f5df77dc5ac0d730eec20.jpg",
					"http://hiphotos.baidu.com/1172542911/pic/item/0399073a6de2761097ddd8e1.jpg",
					"http://hiphotos.baidu.com/wmy9641/pic/item/6d5e420a3854923b95ca6bcd.jpg",
					"http://www.hxsd.com/upimg/userup/0803/20105I35641.jpg",
					"http://hiphotos.baidu.com/%C6%BC%C3%CE%D0%C7%CF%EB/pic/item/29cf9566f40c5417ab184ce4.jpg",
					"http://hiphotos.baidu.com/%CF%C4%CC%EC%B5%C4%B9%E2%BB%D4/pic/item/807ccafbaae1ce35a8d31184.jpg",
					"http://www.comicyu.com/UploadFiles/CY/2008/10/200810201732108385.jpg",
					"http://hiphotos.baidu.com/1172542911/pic/item/3e1af38d87c1efc9513d9219.jpg",
					"http://www.manhua123.cn/uploads/allimg/c090802/12491XL456250-2H06.jpg"
				];
				var ra = (Math.random() + "").substr(3, 1);
				cutter.reload(imgs[ra]);
			}
		</script>
	</body>
</html>
