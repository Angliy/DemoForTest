/**
 * 定义edit window
 * 
 * @author 叶振飞
 * @version 2012-6-5
 */
Ext.define('DEMO.view.EditConfigDemoWindow',{
	extend 			: 'Ext.window.Window',
	alias			: 'widget.editconfigdemowindow',
	requires		: ['DEMO.view.EditConfigDemoForm'],
	
	initComponent 	: function(){
		Ext.apply(this, {
				title 	: '新增Demo',
				name	: 'editConfigDemoWidow',
				height 	: 210,
				width 	: 400,
				modal 	: true,
				layout	: 'fit',
				items	: [
					Ext.create('DEMO.view.EditConfigDemoForm')
				]
		});
		this.callParent(arguments);
	}
})