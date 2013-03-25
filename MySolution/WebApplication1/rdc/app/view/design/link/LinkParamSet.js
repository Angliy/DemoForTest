Ext.define('HummerApp.view.design.link.LinkParamSet', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.linkparamset' ,
			layout: 'fit',
					bodyPadding : '5 5 2 5',
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
			items:[
				{
				xtype:'paramset',
				id:'linkparamset'
				}
				] ,
			buttons: [
			     { xtype: 'button', action:'save_query_param',iconCls: 'icon-submmit', text: '确定'  },
		    	 { xtype: 'button', action:'cancel_query_param',   iconCls: 'icon-remove',text: '取消' }
			]

		});