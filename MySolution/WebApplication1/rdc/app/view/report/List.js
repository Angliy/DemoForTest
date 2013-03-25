/**
 *查询列表
 */
Ext.define('HummerApp.view.report.List', {
	extend: 'Ext.grid.Panel',
	alias:'widget.reportlist',
	store: 'Reports',
//    collapsible: true,
//    title: '查询',
    split: true,
    tbar: [
           {xtype: 'label', text: '查询列表'},
           '->',// 以下按钮靠右
           { xtype: 'button', text: '增加' },
           { xtype: 'button', text: '编辑' },
           { xtype: 'button', text: '删除' }
         ],

    initComponent: function() {
    	
        this.columns = [
            {header: '名称',  dataIndex: 'name',  flex: 0.8},
            {header: '发布', dataIndex: 'published', flex: 0.2, align:'center'}
        ];

        this.callParent(arguments);
    }
});