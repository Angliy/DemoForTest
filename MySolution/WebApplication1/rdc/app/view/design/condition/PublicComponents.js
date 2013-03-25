Ext.define('HummerApp.view.design.condition.PublicComponents', {
	extend : 'Ext.window.Window',
	alias : 'widget.publiccomponents',
	id : 'publicComponents',
	layout : 'center',
	autoShow : true,
	
	initComponent : function() {
		var me = this;
		
		me.buttonAdd = Ext.create('Ext.button.Button',{
     		tooltip	: '新增',
     		iconCls	: 'icon-add',
     		handler : this.addPublicComponent
     	});
     	me.buttonEdit = Ext.create('Ext.button.Button',{
     		tooltip	: '编辑',
     		iconCls	: 'icon-edit',
     		handler : this.editPublicComponent
     	});
     	me.buttonDel = Ext.create('Ext.button.Button',{
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete',
     		handler : this.delPublicComponent
     	});
		
		Ext.apply(this, {
//					title : '公共组件',
					name : 'conditionlistpubliccomponents',
					height : 275,
					width : 458,
					modal : true,
					resizable : false,
					layout : 'fit'
				});

		this.formList = Ext.create('Ext.grid.Panel', {
					border : true,
					maxHeight : 195,
					minHeight : 195,
					columnLines:true,
					autoScroll : true,
					id : 'publicComponentsList',
					listeners:{
						select:function(){
							me.buttonDel.setDisabled(false);
						}
					},
					store : 'condition.PublicComponentsList',
					tbar : [
							{xtype : 'label',text : ''},
							'->', // 以下按钮靠右
							me.buttonAdd,
							me.buttonEdit,
							me.buttonDel
					],
					columns : [{
								header : '模板id',
								dataIndex : 'id',
								hidden : true,
								hideable : false,
								flex : 1
							}, {
								header : '模板名称',
								dataIndex : 'name',
								hideable : false,
								flex : 1
							}, {
								header : '模板类型',
								dataIndex : 'etype',
								renderer : function(value, metadata, record) {
									returnVal = '文本';
									switch (value) {
										case 'dataPicker' :
											returnVal = '日期';
											break;
										case 'combo' :
											returnVal = '下拉框';
											break;
										case 'custom' :
											returnVal = '自定义';
											break;
									}
									return returnVal;
								},
								flex : 1
							}]
				});
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
					items : [this.formList],
					buttons : [{
								text : '确定',
								iconCls : 'icon-submmit',
								hidden : true,
								action : 'ok'
							}, {
								action : 'edit_cancel_button',
								iconCls : 'icon-remove',
								text : '取消',
								scope : this,
								handler : this.close
							}]
				}]
		this.callParent(arguments);
	},
	addPublicComponent : function(thisBut, e, eOpts) {
		var window = Ext.create(
				"HummerApp.view.design.condition.ConditionListCelleditor", {
					id : 'celleditorAdd',
					title : '添加模板'

				});
		var winForm = window.down('form');
		
		Ext.getCmp('editnameTextfield').setFieldLabel('<font color=red>*</font>模板名称');

		var editForm = winForm.getForm();
		editForm.findField("etypeCombo").select('text');
		editForm.findField("publicCheck").setValue(true);
		editForm.findField("celleditorOpenMode").setValue("add");
		editForm.findField("publicCheck").setVisible(false);

		editForm.findField("editnameTextfield").setValue("000");
		editForm.findField("editnameTextfield").setValue("");

		Ext.getCmp("publicCelleditor_submmit").setVisible(false);
		Ext.getCmp("publicCelleditor_save").setVisible(true);
		Ext.getCmp("sqlTextArea").up('panel').setVisible(false);
		window.show();

	},
	editPublicComponent : function(thisBut, e, eOpts) {
		var selectRecords = Ext.getCmp('publicComponentsList')
				.getSelectionModel().getSelection();
		if (selectRecords.length < 1) {
			Ext.Msg.alert('提示信息', '请选中编辑行！');
		} else {
			Ext.Ajax.request({
				url : "/hummer/application/controller/condition/GetPublicCellEditor.action",
				method : 'POST',
				params : {
					id : selectRecords[0].get('id')
				},
				success : function(response, opts) {
					var retmsg = Ext.decode(response.responseText);
					var window = Ext
							.create(
									"HummerApp.view.design.condition.ConditionListCelleditor",
									{
										id : 'celleditorEdit',
										title : '编辑模板'
									});

					var winForm = window.down('form');
					var editForm = winForm.getForm();
					Ext.getCmp('editnameTextfield').setFieldLabel('<font color=red>*</font>模板名称');

					editForm.findField("editpublicId").setValue(retmsg.id);
					editForm.findField("publicCheck").setValue(true);
					editForm.findField("celleditorOpenMode").setValue("edit");
					editForm.findField("publicCheck").setVisible(false);
					editForm.findField("etypeCombo").select(retmsg.etype);
					editForm.findField("editnameTextfield")
							.setValue(retmsg.name);
					// -------
					var fieldValue = retmsg.etype;
					var dataProviderType = "";
					switch (fieldValue) {
						case 'dataPicker' :
							editForm.findField("maskCombo").select(retmsg.mask);
							Ext.getCmp("sqlTextArea").up('panel')
									.setVisible(false);
							break;
						case 'combo' :

							editForm.findField("typeCombo").select(retmsg.type);

							editForm.findField("dataprovidertypeCombo")
									.select(retmsg.dataProviderType);
							dataProviderType = retmsg.dataProviderType;

							editForm.findField("multiCheck")
									.setValue(retmsg.multi);
							break;
						case 'text' :
							Ext.getCmp("sqlTextArea").up('panel')
									.setVisible(false);
							break;
						case 'custom' :
						    editForm.findField("multiCheck")
									.setValue(retmsg.multi);
									
							editForm.findField("customTrigger")
									.setValue(retmsg.dataProvider);
							Ext.getCmp("sqlTextArea").up('panel')
									.setVisible(false);

							break;
					}

					switch (dataProviderType) {
						case 'DYNAMIC_SUBJECT' :
							editForm.findField("subjectCombo")
									.select(retmsg.dataProvider);
							Ext.getCmp("sqlTextArea").up('panel')
									.setVisible(false);
							break;
						case 'DYNAMIC_SQL' :
							editForm.findField("sqlTextArea")
									.setValue(retmsg.dataProvider);
							break;
						case 'ISSTATIC' :
							editForm.findField("isstaticTrigger")
									.setValue(retmsg.dataProvider);
							Ext.getCmp("sqlTextArea").up('panel')
									.setVisible(false);

							break;
					}
					// -------
					Ext.getCmp("publicCelleditor_submmit").setVisible(false);
					Ext.getCmp("publicCelleditor_save").setVisible(true);
					window.show();
				}
			});

		}
	},
	delPublicComponent : function(thisBut, e, eOpts) {
		var selectRecords = Ext.getCmp('publicComponentsList')
				.getSelectionModel().getSelection();
		if (selectRecords.length < 1) {
			Ext.Msg.alert('提示信息', '请选中删除行！');
		} else {
			var selNum = Ext.getCmp('conditionList').getStore().find(
					"editor.id", selectRecords[0].get('id'));
			if (selNum > -1) {
				Ext.Msg.alert('提示信息', '模板名称"' + selectRecords[0].get('name')
								+ '"被当前查询条件页面引用！');
			} else {
				Ext.MessageBox.confirm('提示', '确实删除名称为 "'
								+ selectRecords[0].get('name') + '"模板吗?',
						function(_btn) {
							if (_btn == 'no'||_btn =='cancel') {

								return;
							} else {
								Ext.Ajax.request({
									url : "/hummer/application/controller/condition/DelPublicCellEditor.action",
									method : 'POST',
									params : {
										id : selectRecords[0].get('id')
									},
									success : function(response, opts) {
										if (response.responseText == "true") {
											Ext.getCmp('publicComponentsList')
													.getStore().load();
											Ext.Msg.alert('提示信息', '删除成功！');
										}
									},
									failure : function(response, opts) {
										Ext.Msg.alert('提示信息', '删除失败！<br/>'
														+ response);
									}
								});
							}
						});
			}

		}
	}

});
