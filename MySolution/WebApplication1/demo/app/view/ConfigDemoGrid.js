/**
 * 定义demo gridPanel
 * 
 * @author 叶振飞
 * @version 2012-6-6
 */
Ext.define('DEMO.view.ConfigDemoGrid',{
	extend : 'Ext.grid.Panel',
	alias  : 'widget.configdemogrid',
	
	requires : 'DEMO.store.ConfigDemoEntities',
	
	initComponent : function(){
		this.store = 'ConfigDemoEntities';
		this.columns = [{
			            xtype: 'rownumberer',
			            width: 80,
			            sortable: false,
			            align : 'center',
			            header : '序号'
			        },
		           { header : 'id', dataIndex : 'id', width : 240},
		           { header : '配置项名称', dataIndex : 'configNo', width : 240},
		           { header : '配置项值', dataIndex : 'configValue', width : 300},
		           { header : '备注', dataIndex : 'note', width : 300}
		           ];
		Ext.apply(this,{
			id		: 'config_grid_id',
			name	: 'ConfigDemoGrid',
			title	: '系统配置项demo',
			region	: 'center',
			header	: false,
			height	: 300,
			forceFit : true,
			dockedItems: [{
                xtype	: 'toolbar',
                ui		: 'footer',
                items	: ['->',  {
                	action	: 'add_demo_button',
                    iconCls	: 'icon-add',
                    text	: '新增'
                },{
                	action	: 'edit_demo_button',
                    iconCls	: 'icon-edit',
                    itemId	: 'save',
                    text	: '编辑'
                }, {
                	action	: 'del_demo_button',
                    iconCls	: 'icon-delete',
                    text	: '删除'
                }]
            },{
		        xtype: 'pagingtoolbar',
		        store: this.store,   // same store GridPanel is using
		        dock: 'bottom',
		        displayInfo: true,
		        displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条'
		    }]
		});
		this.callParent(arguments);
	}
})