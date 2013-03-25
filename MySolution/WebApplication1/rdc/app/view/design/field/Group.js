/**
 *查询列表
 */
Ext.define('HummerApp.view.design.field.Group', {
	extend: 'Ext.tree.Panel',
	alias:'widget.grouppanel',
//  title: '设置表头分组',
	header : false,
    height:400,
    rootVisible : true,
	root:{
		text:"root"
		},
    store:'field.Group',
    
	viewConfig: {	// 处理拖拽
            plugins: {
                ptype: 'treeviewdragdrop'
            },
			listeners:{
				beforedrop:function(node,data,overModel,dropPosition,eOpts ){
				}
			}
	},
	initComponent: function() {
		
    	this.buttonAdd = Ext.create('Ext.button.Button',{
     		action  : 'add',
     		tooltip	: '新增',
     		iconCls	: 'icon-add'
     	});
     	this.buttonEdit = Ext.create('Ext.button.Button',{
     		action  : 'edit',
     		disabled: true,
     		tooltip	: '编辑',
     		iconCls	: 'icon-edit'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'delete',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonEdit,
           this.buttonDel
     	];
     	this.callParent(arguments);
     	
     	}
});