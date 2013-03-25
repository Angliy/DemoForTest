/*
 * 表头分组编辑
 */
Ext.define('HummerApp.view.design.field.EditGroup', {
			extend : 'Ext.window.Window',
			alias : 'widget.editgroup',
			title : '表头分组编辑',
			layout : 'fit',
			modal : true,
			width : 260,
			height:150,
			resizable : false,
			autoShow : true,
			initComponent : function() {
				this.items = [{
							xtype : 'form',
							 bodyPadding	: '5',
							frame : true,
							fieldDefaults : {
								msgTarget : 'side',
								labelWidth : 45,
								labelAlign : 'right',
								defaultType : 'textfield'
							},
							defaults : {
								anchor : '100%'
							},
							items : [{
										xtype : 'fieldset',
										padding	: '10 10 5 5',
										// title : '组件信息',
										collapsible : false,
										defaultType : 'textfield',
										layout : 'anchor',
										defaults : {
											anchor : '100%'
										},
										items : [{
													xtype : 'textfield',
													name : 'id',
													readOnly : true,
													width : 300,
													hidden : true,
													fieldLabel : '上级'
												}, {
													xtype : 'textfield',
													name : 'parentDisplayName',
													readOnly : true,
													width : 300,
													fieldLabel : '上级'
												},
												// {
												// xtype: 'combo',
												// name : 'fieldName',
												// fieldLabel: '字段名',
												// multiSelect :true,
												// editable : false,
												// width:300,
												// displayField : 'displayName',
												// //valueNotFoundText:"",
												// valueField : 'id',
												// queryMode:'local',
												// store :'field.SelectedFields'
												// },
												{
													xtype : 'textfield',
													name : 'displayName',
													width : 300,
													allowBlank:false,
													blankText:'不能为空',
													regex : /[^\s]+/,
													regexText:'不能只有空格',
													maxLength : 20,
													// regex:/^[^<>!@#$%^&*]*$/,
													//regexText:'不能包括非法字符如:":,<>"',
													fieldLabel : '显示名'
													// },
													// {
													// xtype: 'textfield',
													// name : 'orderNo',
													// fieldLabel: '顺序号'
												}]

									}],
							buttons : [{
										text : '保存',
										iconCls : 'icon-save',
										action : 'save'
									}, {
										text : '取消',
										iconCls : 'icon-remove',
										scope : this,
										handler : this.close
									}]
						}];

				this.callParent(arguments);
			}
		});