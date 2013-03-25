<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default1.aspx.cs" Inherits="Default1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--Ext测试-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="ext/resources/css/ext-all.css" type="text/css"  rel="Stylesheet" />
</head>
<body>


  <script type="text/javascript" src="ext/adapter/ext/ext-base.js"></script>
  <script type="text/javascript" src="ext/ext-all.js"></script>
  <script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript">

//Ext.onReady(function(){Ext.MessageBox.alert("test");});//Ext.onReady()在dom加载完后执行脚本

//Ext.onReady(function(){
//    var win=new Ext.Window({title:"test",width:300,height:200,html:"<input type='text'/>"});
//    win.show();
//    
//});//弹出层 

//(function(){Ext.get("TestInput").show();})();//匿名自调用函数 获取元素

//(function(){Ext.get("TestDiv").dom.innerHTML="TEST";})();

//(function(){Ext.getDom("TestDiv").innerHTML="TEST";})();

////Ext.get()获取的为Ext.Element元素 变为HTML元素需访问其dom属性  Ext.get().dom=Ext.getDom()

//Ext.onReady(function(){
//var foo=new Ext.Panel({
//    id:"panelCmp",title:"测试",renderTo:"TestDiv",width:300,height:200
//});
//Ext.getCmp("panelCmp").setTitle("新的标题");// 获取组件 参数为组件id
//});

// var o = function() { return "111" } (); alert(o); //匿名子调用函数将返回值赋值给对象o  

//    var class1 = function(a, b) {
//        this.a = a;
//        this.b = b;
//    };//类的定义
//    class2 = new class1("1", "11");
//    alert(class2.b);


//匿名函数调用方式
//方式一
//(function() { Ext.get("TestDiv").dom.innerHTML = "TEST"; } ());  
//方式二
// (function() { Ext.get("TestDiv").dom.innerHTML = "TEST"; })();

//------------Ext.grid.GridPanel
//    var mydata = [[1, {text:'Ext',url:'http://www.baidu.com'},10.00]];
//    var store = new Ext.data.SimpleStore({
//        fields: [
//                    { name: "id", type: "int" },
//                    { name: "linker" }, 
//                    { name: "number", type: "float" }
//    
//                ]
//    });
//    store.loadData(mydata);
//    function linker(val) {
//        if (typeof val == 'object') {return '<a href="'+val.url+'">'+val.text+'</a>';} 
//    }
//    var grid = new Ext.grid.GridPanel({
//        height: 350,
//        width: 800,
//        store: store,
//        title: '测试',
//        columns: [
//                     { header: '编号', width: 80, dataIndex: 'id' },
//                     { header: '链接', width: 80, dataIndex: 'linker', renderer:linker },
//                     { header: '数值', width: 80, dataIndex: 'number' }
//                 ],
//       stripeRows:true          
//                 

//     });
//     Ext.onReady(function() { grid.render("TestDiv"); });
//-------------------------------------


//    Ext.onReady(function() {

//        var tree = new Ext.tree.TreePanel({
//            el: 'tree'//容器的ID
//        });

//        var root = new Ext.tree.TreeNode({ text: 'root' });
//        var node1 = new Ext.tree.TreeNode({ text: 'catalog' });
//        var node2 = new Ext.tree.TreeNode({ text: 'catalog1_leaf' });
//        var node3 = new Ext.tree.TreeNode({ text: 'root_leaf' });
//        node1.appendChild(node2);
//        root.appendChild(node1);
//        root.appendChild(node3);

//        tree.setRootNode(root);
//        tree.render();
//        root.expand();
//        //可以有两个参数  
//    });


//    Ext.onReady(function() {
//        //Ext.BLANK_IMAGE_URL = "../../resources/images/default/s.gif"
//        // shorthand
//        var Tree = Ext.tree;

//        var tree = new Tree.TreePanel({
//            el: 'tree-div',
//            useArrows: true,
//            autoScroll: true,
//            animate: true,
//            enableDD: true,
//            containerScroll: true,
//            loader: new Tree.TreeLoader({
//                requestMethod:'GET',
//                dataUrl: 'HTMLPage.htm'
//            })
//        });

//        tree.on('checkchange', function(node, checked) {
//            node.expand();
//            node.attributes.checked = checked;
//            node.eachChild(function(child) {
//                child.ui.toggleCheck(checked);
//                child.attributes.checked = checked;
//                child.fireEvent('checkchange', child, checked);
//            });
//        }, tree);

//        // set the root node
//        var root = new Tree.AsyncTreeNode({
//            text: 'Ext JS',
//            draggable: false,
//            id: 'source'
//          
//        });
//        tree.setRootNode(root);

//        // render the tree
//        tree.render();
//        root.expand();
//    });



//    Ext.Ajax.request({
//        url: "http://go.cqmmgo.com/topic/activity/activity_ajax.php?obj=activity_page&req=vote&activity_id=15&item_id=13585",
//        method: "GET",
//        params: {
//            obj: 'activity_page',
//            req: 'vote',
//            activity_id: 15,
//            item_id: 13585
//        },
//        success: function(response) {
//            alert(response.responseText);
//        },
//        failure: function() {

//        }
    //    });



    Ext.onReady(function() {

    var sm = new Ext.grid.CheckboxSelectionModel();
    
        //列信息
        var columnModel = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(), //自动计算行号
    sm,
    { header: '编号', dataIndex: 'id', width: 50, sortable: true }, //让grid支持按列排序
    {header: '性别', dataIndex: 'sex', width: 50, renderer: renderSex },
    { header: '名称', dataIndex: 'name' },
    { header: '描述', dataIndex: 'descn', renderer: renderDescn }
    ]);

        function renderSex(value) {
            if (value == 'male') {
                return "<span style='color:red;'>男</span><img src='male.jpg' height=15 width=15/>";
            } else {
                return "<span>女</span><img src='female.jpg' height=15 width=15/>";
            }
        }

        //数据
        var data = [
    ['1', 'male', '刘备', '大哥'],
    ['2', 'male', '关羽', '二弟'],
    ['3', 'female', '貂蝉', '美女'],
    ['4', 'male', '张飞', '三弟'],
    ['5', 'female', '大乔', '孙策的妻子']
];

        //列和数据绑定
        var dataStore = new Ext.data.Store({
            proxy: new Ext.data.MemoryProxy(data),
            reader: new Ext.data.ArrayReader({}, [
    { name: 'id' },
    { name: 'sex' },
    { name: 'name' },
    { name: 'descn' }
    ])
        });
        //dataStore.load();

        //创建网格面板
        var grid = new Ext.grid.GridPanel({
            title: '大家好',
            el: "grid",
            autoHeight: true,
            ds: dataStore, //ds为固定写法
            cm: columnModel, //cm为固定写法
            sm: sm,
            viewConfig: {//自动按比例填满grid
                forceFit: true
            }

            //    autoExpandColumn : 'descn1' //让指定的列自动伸展，从而填满表格(不过注意这里的'descn1'是id，加上id项)
        });
        grid.render();

        /**
        * 1、value是当前单元格的值，
        * 2、cellmeta里保存的是cellId单元格id(貌似是列号),css是这个单元格的css样式，
        * 3、record是这行的所有数据，你想要什么，record.data["id"]这样就获得了，
        * 4、rowIndex是列号，不是从头往下数的意思，而是计算了分页以后的结果，
        * 5、columnIndex列号
        * 6、store,这个厉害，实际上这个是你构造表格的时候传递的ds,也就是说表格里所有的数据可以随便调用。
        */
        function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
            var str = "<input type='button' value='查看详细信息' onclick='alert(\"" +
        "此单元格的值是：" + value + "\\n" +
        "此单元格的配置是：{cellId:" + cellmeta.cellId + ",id:" + cellmeta.id + ",css:" + cellmeta.css + "}\\n" +
        "此单元格对应行的record是：" + record + "，一行的数据都在这里边" +
        "这是第" + rowIndex + "行\\n" +
        "这是第" + columnIndex + "列\\n" +
        "此表格对应的Ext.data.Store在这里：" + store + "，随便用吧." +
        "\")'>";
            return str;
        }

     

    });





</script>
   
 <%--  <div id="tree-div" style="overflow:auto; height:300px;width:250px;border:1px solid #c3daf9;"></div>
     <div id="tree" style="height:800px;"></div>  
   
   <div id="TestDiv">
     <input type="text" value="test" style="display:none" id="TestInput" />
    </div>--%>
    
    <div id="grid"></div>
    
    
    
    
    
    
    
    
   
</body>
</html>
