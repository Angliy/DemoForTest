Ext.define('HummerApp.view.design.button.ButtonUrlSet', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.buttonurlset',
			// title:'参数对应设置',
			layout : 'fit',

			items : [{
						xtype : 'form',
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
									region : 'fit',
									id : 'buttonurlset',
									xtype : 'textedit'
								}],
						buttons : [

						{
									xtype : 'button',
									action : 'save_button_url',
									iconCls : 'icon-submmit',
									text : '确定'
								}, {
									xtype : 'button',
									action : 'cancel_button_url',
									iconCls : 'icon-remove',
									text : '取消'
								}]

					}

			]

		});