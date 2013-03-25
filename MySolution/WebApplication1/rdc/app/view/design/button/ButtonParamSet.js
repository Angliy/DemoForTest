Ext.define('HummerApp.view.design.button.ButtonParamSet', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.buttonparamset',
			// title:'参数对应设置',
			layout : 'fit',
			bodyPadding : '5',
			frame : true,
			fieldDefaults : {
				msgTarget : 'side',
				labelWidth : 75,
				labelAlign : 'right',
				defaultType : 'textfield'
			},
			defaults : {
				anchor : '100%'
			},

			items : [{
						xtype : 'paramset',
						id : 'buttonparamset'
					}],
			buttons : [

			{
						xtype : 'button',
						action : 'save_query_param',
						iconCls : 'icon-submmit',
						text : '确定'
					}, {
						xtype : 'button',
						action : 'cancel_query_param',
						iconCls : 'icon-remove',
						text : '取消'
					}]

		});