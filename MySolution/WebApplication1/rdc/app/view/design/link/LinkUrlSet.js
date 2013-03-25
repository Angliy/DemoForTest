Ext.define('HummerApp.view.design.link.LinkUrlSet', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.linkurlset',
			// title:'参数对应设置',
			layout : 'form',
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
			buttons : [{
						xtype : 'button',
						action : 'save_link_url',
						iconCls: 'icon-submmit',
						text : '确定'
					}, {
						xtype : 'button',
						action : 'cancel_link_url',
						iconCls: 'icon-remove',
						text : '取消'
					}],
			items : [{
						region : 'center',
						id : 'linkurledit',
						xtype : 'textedit'
					}]

		});