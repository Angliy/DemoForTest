/**
 * 定义edit form panel
 * 
 * @author 叶振飞
 * @version 2012-5-6
 */

Ext.define('DEMO.view.EditConfigDemoForm',{
	extend		: 'Ext.form.Panel',
	alias		: 'widget.editconfigdemoform',
	
	initComponent	: function (){
		Ext.apply(this,{
			region		: 'center',
			xtype		: 'form',
			header		: false,
			id			: 'edit_config_demo_form',
			collapseble	: true,
			frame		: true,
			bodyPadding	: '5 5 0',
			
			filedDefaults : {
				msgTarget	: 'side',
				labelWidth	: 75,
				
				defaultType : 'textfield'
			},
			defaults : {
				anchor : '100%'
			},
			items : [{
				xtype		: 'fieldset',
				title		: 'configdemo表单',
				collapsible	: false,
				defaultType	: 'textfield',
				layout 		: 'anchor',
				labelAlign	: 'right',      
				
				defaults	: {
					anchor : '100%'
				},
				items : [
				         {
					xtype			: 'hiddenfield',
					fieldLabel		: '编号',
					name			: 'id'
				},{
					fieldLabel		: '配置项名称',
					labelAlign		: 'right',
					name 			: 'configNo'
				},{
					fieldLabel 		: '配置项值',
					labelAlign		: 'right',
					name 			: 'configValue'
				},{
					fieldLabel		: '备注',
					labelAlign		: 'right',
					name			: 'note'
				}]
			}],
			buttons : [{
				action	: 'edit_save_button',
      			iconCls	: 'icon-save',
				text 	: '保存'
				}, {
				action	: 'edit_cancel_button',
        		iconCls	: 'icon-reset',
				text 	: '取消'
			}]
		});
		this.callParent(arguments);
	}
})