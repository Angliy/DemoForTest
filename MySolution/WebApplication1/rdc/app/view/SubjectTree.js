/**
 * 主界面左边主题树
 */
Ext.define('HummerApp.view.SubjectTree', {
	extend		: 'Ext.tree.Panel',
	alias		: 'widget.querylist',
	store		: 'QueryPanelTree',
    rootVisible	: false,
    useArrows 	: true,
    border		: 0,
    margin 		: '0 0 0 0',
    initComponent:function(){
     	this.buttonAdd = Ext.create('Ext.button.Button',{
     		action : 'add_query_button',
     		tooltip	: '新增',
     		iconCls	: 'icon-add'
     	});
     	this.buttonEdit = Ext.create('Ext.button.Button',{
     		action : 'edit_query_button',
     		tooltip	: '编辑',
     		iconCls	: 'icon-edit'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action : 'delete_query_button',
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
    	this.buttonSave = Ext.create('Ext.button.Button',{
     		action:'save_design_button', 
     		tooltip	: '保存',
     		disabled:true,
     		iconCls	: 'icon-save'
     	});
     	this.buttonPublish = Ext.create('Ext.button.Split',{
     		action: 'publish_button',
     		tooltip	: '发布', 
     		iconCls	: 'icon-release',
     		disabled: true,
     		text   : null,
     		width:37,
     		cls: 'floater',
     		menu:[{
     				id		: 'buttonPublishMenu',
     				iconCls	: 'icon-menu',
     				text	: '注册到菜单'
     			},
     			{
     				id		: 'buttonPublishComment',
     				iconCls	: 'icon-portlet',
     				text	: '注册首页组件'
     			}]
     	});
     	this.tbar= [
           {xtype: 'label', 
//           text: '主题查询',
           style:'fontWeight:bold'},
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonEdit,
           this.buttonDel,
           '-',
           this.buttonSave,
           this.buttonPublish
     		]
     	this.callParent(arguments);
     	//默认选中第一条叶子节点并展开
     	var panelStore = this.store;
     	panelStore.on('load',function(store,node,records,successful,eOpts){
			if(successful && records.length>0 && node){
				for(var i = 0; i<records.length;i++){
					var leafNode = getLeafNode(node);
					if(leafNode!=''){
						Ext.getCmp('queryList').getSelectionModel().select(leafNode);
						if(!leafNode.get('expanded')){
		    				leafNode.expand();
		    			}
						break;
					}
				}
			}
    	});
		getLeafNode = function(node){
			var leafNode='';
			if(node){
				if(!node.isLeaf()&&node.hasChildNodes()){
					var childrenNodes = node.childNodes;
					for(var i = 0;i<childrenNodes.length;i++){
						var childrenNode = childrenNodes[i];
						leafNode = getLeafNode(childrenNode);
						if(leafNode==''||leafNode==null){
							continue;
						}
						return leafNode;
					}
				}else if(node.isLeaf()){
					return node;
				}
			}
//			console.log('end:'+leafNode);
			return leafNode;
		}
     }
});