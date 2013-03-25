/**
 * 编辑已选字段的窗口
 */

Ext.define('HummerApp.view.design.field.EditField', {
			extend : 'Ext.window.Window',
			alias : 'widget.editfield',
			resizable : false,
			modal : true,
			layout : 'fit',
			// layout: 'border',
			autoShow : true,
			title:'公式编辑窗体',
			width : 724,
			height : 434,
			initComponent : function() {
				this.selectionStart = 0;
				this.selectionEnd = 0;
				this.items = [{
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
										xtype : 'textedit'
									}],
							buttons : [{
										text : '确定',
										action : 'save_field_edit',
										iconCls: 'icon-submmit',
										scope : this//,
										//handler : this.hide
									}, {
										text : '取消',
										iconCls: 'icon-remove',
										scope : this,
										action : 'cancel',
										handler : this.close
									}]
						}

				];

				this.callParent(arguments);
			}
		});