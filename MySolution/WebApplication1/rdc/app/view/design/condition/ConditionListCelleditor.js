Ext.define('HummerApp.view.design.condition.ConditionListCelleditor', {
	extend : 'Ext.window.Window',
	alias : 'widget.conditionlistcelleditor',
	layout : 'center',
	title : '编辑录入方式',
	initComponent : function() {
		Ext.apply(this, {
					name : 'conditionlistcelleditor',
					// height : 296,
					width : 497,
					modal : true,
					resizable : false,
					layout : 'fit'
				});
		/*
		 * 公共组件id
		 */
		this.editpublicId = Ext.create('Ext.form.field.Hidden', {
					name : 'editpublicId',
					id : 'editpublicId'
				});

		/*
		 * 公共组件名称
		 */
				if(this.title=='添加模板'||this.title=='编辑模板'){
					this.editnameTextfield = Ext.create('Ext.form.ComboBox', {
								name : 'editnameTextfield',
								id : 'editnameTextfield',
								emptyText : '选择模板',
								fieldLabel : '模板名称',
								store : 'condition.PublicComponentsList',
								displayField : 'name',
								valueField : 'id',
								hideTrigger: true
							     
							});
				}else{
					this.editnameTextfield = Ext.create('Ext.form.ComboBox', {
								name : 'editnameTextfield',
								id : 'editnameTextfield',
								emptyText : '选择模板',
								fieldLabel : '模板名称',
								store : 'condition.PublicComponentsList',
								displayField : 'name',
								editable:false,
								valueField : 'id',
			   					trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
			                    trigger2Cls: Ext.baseCSSPrefix ,
								onTrigger1Click: function() {
									this.setRawValue('');
									this.setValue('');
							    }
							});
				}
		/*
		 * 是否公共组件
		 */
		this.publicCheck = Ext.create('Ext.form.Checkbox', {
					name : 'publicCheck',
					id : 'publicCheck',
					labelAlign : 'right',
					checked : false,
					hidden : true,
					fieldLabel : '<font color=red>*</font>公共模板'
				});

		/*
		 * 录入方式
		 */
		this.etypeCombo = Ext.create('Ext.form.ComboBox', {
					name : 'etypeCombo',
					id : 'etypeCombo',
					editable : false,
					store : Ext.create('Ext.data.Store', {
								fields : ['name', 'value'],
								data : [{
											"name" : '日期',
											"value" : "dataPicker"
										}, {
											"name" : '下拉框',
											"value" : "combo"
										}, {
											"name" : '文本',
											"value" : "text"
										}, {
											"name" : '自定义',
											"value" : "custom"
										}]
							}),
					displayField : 'name',
					valueField : 'value',
					labelAlign : 'right',
					fieldLabel : '<font color=red>*</font>录入方式'
				});

		/*
		 * 日期掩码
		 */
		this.maskCombo = Ext.create('Ext.form.ComboBox', {
					name : 'maskCombo',
					editable : false,
					store : Ext.create('Ext.data.Store', {
								fields : ['name', 'value'],
								data : [{
											"name" : 'YYYY-MM',
											"value" : "Y-m"
										}, {
											"name" : 'YYYY-MM-DD',
											"value" : "Y-m-d"
										}, {
											"name" : 'YYYYMM',
											"value" : "Ym"
										}, {
											"name" : 'YYYY年MM月',
											"value" : "Y年m月"
										}, {
											"name" : 'YYYY年MM月DD日',
											"value" : "Y年m月d日"
										}]
							}),
					displayField : 'name',
					valueField : 'value',

					labelAlign : 'right',
					fieldLabel : '<font color=red>*</font>掩码'
				});

		/*
		 * 下拉框类
		 */
		this.typeCombo = Ext.create('Ext.form.ComboBox', {
					name : 'typeCombo',
					editable : false,
					store : Ext.create('Ext.data.Store', {
								fields : ['name', 'value'],
								data : [{
											"name" : '列表',
											"value" : "LIST"
										}, {
											"name" : '树',
											"value" : "TREE"
										}, {
											"name" : '网格',
											"value" : "GRID"
										}]
							}),
					displayField : 'name',
					valueField : 'value',

					labelAlign : 'right',
					fieldLabel : '<font color=red>*</font>下拉框类'
				});

		this.customTrigger = Ext.create('Ext.form.Trigger', {
			emptyText : '输入URL,点击下拉列选则组件',
			labelAlign : 'right',
			fieldLabel : '<font color=red>*</font>组件/URL',
			name : 'customTrigger',
			id : 'customTrigger',
			onTriggerClick : function() {
				var window = Ext
						.create("HummerApp.view.design.condition.CustomComponents");
				window.down('grid').getStore().reload();;
				window.show();
				
			}

		});

		/*
		 * 是否多选
		 */
		this.multiCheck = Ext.create('Ext.form.Checkbox', {
					name : 'multiCheck',
					labelAlign : 'right',
					fieldLabel : '<font color=red>*</font>是否多选'
				});
		/*
		 * 数据来源类型
		 */
		this.dataprovidertypeCombo = Ext.create('Ext.form.ComboBox', {
					name : 'dataprovidertypeCombo',
					id : 'dataprovidertypeCombo',
					editable : false,
					lastQuery : '',
					store : Ext.create('Ext.data.Store', {
								fields : ['name', 'value'],
								data : [{
											"name" : '主题',
											"value" : "DYNAMIC_SUBJECT"
										}, {
											"name" : 'SQL',
											"value" : "DYNAMIC_SQL"
										}, {
											"name" : '静态数据',
											"value" : "ISSTATIC"
										}]
							}),
					displayField : 'name',
					valueField : 'value',
					labelAlign : 'right',
					fieldLabel : '<font color=red>*</font>数据来源'
				});

		/*
		 * 主题
		 */
		this.subjectCombo = Ext.create('Ext.form.ComboBox', {
					name : 'subjectCombo',
					id : 'subjectCombo',
					store : 'condition.SubjectList',
					displayField : 'name',
					valueField : 'id',

					labelAlign : 'right',
					fieldLabel : '<font color=red>*</font>主题列表'
				});

		/*
		 * SQL语句
		 */
		this.sqlTextArea = Ext.create('Ext.form.TextArea', {
			grow : false,// 是否自动随字多而扩大列表框
			name : 'sqlTextArea',
			id : 'sqlTextArea',
			height : 66,
			width : 380,
			emptyText : "例如(查询变电站A下,所有的母线):select t.sid,t.name,t.pid from table t where t.type='母线'  start with t.SID = '变电站A'  connect by t.pid=prior t.sid  ",
			fieldLabel : '<font color=red>*</font>SQL',
			labelAlign : 'right'

		});

		/*
		 * 静态数据isstatic
		 */
		this.isstaticTrigger = Ext.create('Ext.form.Trigger', {
					name : 'isstaticTrigger',
					id : 'isstaticTrigger',
					labelAlign : 'right',
					emptyText : '请点击按钮输入静态数据',
					editable : false,
					fieldLabel : '<font color=red>*</font>静态数据',
					onTriggerClick : function() {
						var window = Ext
								.create("HummerApp.view.design.condition.StaticData");
						var staticStore = Ext.getCmp('staticDataList')
								.getStore();
						if (this.getValue() != null && this.getValue() !== "") {
							var tempList = this.getValue().split(');');// (name,value),(name,value)过滤
							var tempName = "";
							var tempValue = "";
							for (var i = 0; i < tempList.length; i++) {
								var tempGroup = tempList[i].split(',');// 分隔
								if (i + 1 < tempList.length) {
									tempName = tempGroup[0].substring(1,
											tempGroup[0].toString().length);
									tempValue = tempGroup[1].substring(0,
											tempGroup[1].toString().length);
								} else {
									tempName = tempGroup[0].substring(1,
											tempGroup[0].toString().length);
									tempValue = tempGroup[1].substring(0,
											tempGroup[1].toString().length - 1);
								}

								staticStore.addSorted({
											name : tempName,
											value : tempValue
										});

							}

							window.show();
						}
					}
				});

		// 注册事件
		this.on({
					show : function(thisObj, eOpts) {
						this.setCellEditor(this.publicCheck.getValue());
					}
				});
		this.etypeCombo.on({
					change : this.etypeComboChange
				});
		this.typeCombo.on({
					change : this.typeComboChange
				});
		this.dataprovidertypeCombo.on({
					change : this.dataprovidertypeComboChange
				});
		this.sqlTextArea.on({
					hide : function(areThis, eOpts) {
						this.up('panel').hide();
					},
					show : function(areThis, eOpts) {
						this.up('panel').show();
					}
				});
		this.editnameTextfield.on({
			
			select : function(comboObj, records, eOpts) {// 选中公共组件
				Ext.getCmp("publicCheck").setValue(true);
				Ext.getCmp("editpublicId").setValue(this.getValue());
				// 设置组件不可以编辑
				this.up("window").setCellEditor(true);
			},
			change : function(obj, newValue, oldValue, eOpts) {
//				console.log('211:'+Ext.getCmp('celleditorOpenMode').getValue());
				if (Ext.getCmp('celleditorOpenMode').getValue() == "choise") {
					if (newValue == null || newValue == ""||newValue=="0") {
						Ext.getCmp("editpublicId").setValue("");
						Ext.getCmp("publicCheck").setValue(false);
						// 设置组件可编辑
						this.up("window").setCellEditor(false);
					}
				} else if (Ext.getCmp('celleditorOpenMode').getValue() == "add") {
					if (obj.getStore().getRange().length > 0) {
						var storeTe = Ext.create('Ext.data.Store', {
									model : 'HummerApp.model.PublicComponentsList',
									proxy : {
										type : 'memory'
									}
								});
						obj.bindStore(storeTe);
						obj.getStore().load();
					}
				} else if (Ext.getCmp('celleditorOpenMode').getValue() == "edit") {
					if (obj.getStore().getRange().length > 0) {
						var storeTe = Ext.create('Ext.data.Store', {
									model : 'HummerApp.model.PublicComponentsList',
									proxy : {
										type : 'memory'
									}
								});
						obj.bindStore(storeTe);
						obj.getStore().load();
					}

				}
			}
		});

		this.items = [{
			xtype : 'form',
			bodyPadding : 5,
			frame : true,
			fieldDefaults : {
				msgTarget : 'side',
				labelWidth : 62,
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
				items : [this.editpublicId,

						this.editnameTextfield, this.publicCheck,

						this.etypeCombo, this.maskCombo, this.typeCombo,
						this.multiCheck, this.dataprovidertypeCombo,
						this.subjectCombo, {
							xtype : 'panel',
							layout : 'column',
							width : '100%',
							padding:'0 0 6 0',
							bodyStyle : 'background:transparent;',
							border : 0,
							items : [this.sqlTextArea, {
										xtype : 'panel',
										id : 'sqlTextAreaPanel',
										bodyStyle : 'background:transparent;',
										layout : {
											type : 'vbox',
											pack : 'end',
											align : 'right'
										},
										height : 66,
										border : 0,
										items : [{
													xtype : 'button',
													padding : '0',
													heigth : 5,
													id : 'showEditSql',
													text : '...'
												}]
									}]
						}, this.customTrigger, this.isstaticTrigger, {
							xtype : 'hiddenfield',
							id : 'celleditorOpenMode', // 编辑框打开方式 add, edit,choise
							value : ''
						}]
			}],
			buttons : [{
						text : '确定',
						iconCls : 'icon-submmit',
						id : 'publicCelleditor_submmit',
						action : 'save'
					}, {
						text : '保存',
						id : 'publicCelleditor_save',
						iconCls : 'icon-save',
						hidden : true,
						action : 'public_save'
					}, {
						action : 'edit_cancel_button',
						iconCls : 'icon-remove',
						text : '取消',
						scope : this,
						handler : this.close
					}]
		}];

		this.callParent(arguments);
	},
	showAllControl : function() {
		var winForm = this.down('form');
		var formContent = this.down('form').getForm();
		formContent.findField('customTrigger').setVisible(true);
		formContent.findField('maskCombo').setVisible(true);
		formContent.findField('typeCombo').setVisible(true);
		formContent.findField('multiCheck').setVisible(true);
		formContent.findField('dataprovidertypeCombo').setVisible(true);
		formContent.findField('subjectCombo').setVisible(true);
		formContent.findField('sqlTextArea').setVisible(true);
		// formContent.findField('isstaticCombo').setVisible(true);
		formContent.findField('isstaticTrigger').setVisible(true);
	},
	etypeComboChange : function(field, newValue, oldValue, eOpts) {
		this.up('window').showAllControl();
		var winForm = this.up('form');
		var formContent = this.up('form').getForm();
		if (newValue == 'text') {
			formContent.findField('customTrigger').hide();
			formContent.findField('maskCombo').hide();
			formContent.findField('typeCombo').hide();
			formContent.findField('multiCheck').hide();
			formContent.findField('dataprovidertypeCombo').hide();
			formContent.findField('subjectCombo').hide();
			formContent.findField('sqlTextArea').hide();
			// formContent.findField('isstaticCombo').hide();
			formContent.findField('isstaticTrigger').hide();
			this.up('window').setHeight(148);
		} else {
			if (newValue == 'dataPicker') {
				formContent.findField('customTrigger').hide();
				formContent.findField('typeCombo').hide();
				formContent.findField('multiCheck').hide();
				formContent.findField('dataprovidertypeCombo').hide();
				formContent.findField('subjectCombo').hide();
				formContent.findField('sqlTextArea').hide();
				// formContent.findField('isstaticCombo').hide();
				formContent.findField('isstaticTrigger').hide();
				if (formContent.findField('maskCombo').getValue() == null
						|| formContent.findField('maskCombo').getValue() == "") {
					formContent.findField('maskCombo').select('YYYY-MM');

				}
				this.up('window').setHeight(179);
			} else {
				formContent.findField('subjectCombo').getStore().load();
				if (newValue == 'combo') {
					formContent.findField('customTrigger').hide();
					formContent.findField('maskCombo').hide();
					if (formContent.findField('typeCombo').getValue() == null
							|| formContent.findField('typeCombo').getValue() == "") {
						formContent.findField('typeCombo').select('LIST');
					} else {
						var temp = formContent.findField('typeCombo')
								.getValue();
						if (temp == 'DYNAMIC_SQL') {
							temp = 'DYNAMIC_SUBJECT';
						}
						formContent.findField('typeCombo').select('');
						formContent.findField('typeCombo').select(temp);
					}

					if (formContent.findField('dataprovidertypeCombo')
							.getValue() == null
							|| formContent.findField('dataprovidertypeCombo')
									.getValue() == "") {
						formContent.findField('dataprovidertypeCombo')
								.select('DYNAMIC_SUBJECT');
					} else {
						var temp = formContent
								.findField('dataprovidertypeCombo').getValue();
						formContent.findField('dataprovidertypeCombo')
								.select('');
						formContent.findField('dataprovidertypeCombo')
								.select(temp);
					}

				} else {
					if (newValue == 'custom') {
						formContent.findField('maskCombo').hide();
						formContent.findField('typeCombo').hide();
//						formContent.findField('multiCheck').hide();
						formContent.findField('dataprovidertypeCombo').hide();
						formContent.findField('subjectCombo').hide();
						formContent.findField('sqlTextArea').hide();
						// formContent.findField('isstaticCombo').hide();
						formContent.findField('isstaticTrigger').hide();
						this.up('window').setHeight(197);
					}

				}
			}
		}
	},
	typeComboChange : function(field, newValue, oldValue, eOpts) {

		var winForm = this.up('form');
		var formContent = this.up('form').getForm();

		if (formContent.findField('dataprovidertypeCombo').getStore()
				.isFiltered()) {
			formContent.findField('dataprovidertypeCombo').getStore()
					.clearFilter();
		}

		if (newValue == 'TREE') {
			formContent.findField('dataprovidertypeCombo').getStore().filterBy(
					function(record) {
						if (record.get('name') != '静态数据') {
							return true;
						}
					});
			formContent.findField('dataprovidertypeCombo')
					.select('DYNAMIC_SQL');
			formContent.findField('dataprovidertypeCombo').enable(false);
			formContent.findField('isstaticTrigger').hide();
			this.up('window').setHeight(298);

		} else {// GRID,LIST
			formContent.findField('dataprovidertypeCombo').getStore().filterBy(
					function(record) {
						if (record.get('name') != 'SQL') {
							return true;
						}
					});
			if (formContent.findField('dataprovidertypeCombo').getValue() == 'DYNAMIC_SQL'
					|| formContent.findField('dataprovidertypeCombo')
							.getValue() == null) {// 当数据来源为空，或者数据来源为过滤掉的SQL时，就直接设置成主题
				formContent.findField('dataprovidertypeCombo')
						.select('DYNAMIC_SUBJECT');
			}
			this.up('window').setHeight(253);
		}

	},
	dataprovidertypeComboChange : function(field, newValue, oldValue, eOpts) {
		var winForm = this.up('form');
		var formContent = this.up('form').getForm();

		formContent.findField('subjectCombo').setVisible(true);
		formContent.findField('sqlTextArea').setVisible(true);
		formContent.findField('isstaticTrigger').setVisible(true);

		if (newValue == 'DYNAMIC_SUBJECT') {
			formContent.findField('sqlTextArea').hide();
			formContent.findField('isstaticTrigger').hide();

			if (formContent.findField('subjectCombo').getValue() == null
					|| formContent.findField('subjectCombo').getValue() == "") {

				formContent.findField('subjectCombo').select(formContent
						.findField('subjectCombo').getStore().getRange()[0]
						.get('id'));
			} else {
				var temp = formContent.findField('subjectCombo').getValue();
				formContent.findField('subjectCombo').select('');
				formContent.findField('subjectCombo').select(temp);
				this.up('window').setHeight(253);
			}
		}
		if (newValue == 'DYNAMIC_SQL') {
			formContent.findField('subjectCombo').hide();
			formContent.findField('isstaticTrigger').hide();
			this.up('window').setHeight(298);

		}
		if (newValue == 'ISSTATIC') {
			formContent.findField('subjectCombo').hide();
			formContent.findField('sqlTextArea').hide();
		}

	},
	setCellEditor : function(state) {
		if (Ext.getCmp('celleditorOpenMode').getValue() == "add") {
			return;
		} else if (Ext.getCmp('celleditorOpenMode').getValue() == "edit") {
			this.etypeCombo.setDisabled(true);
			return;
		}
		this.choicePublicComponents();
		this.etypeCombo.setDisabled(state);
		this.maskCombo.setDisabled(state);
		this.typeCombo.setDisabled(state);
		this.multiCheck.setDisabled(state);
		this.dataprovidertypeCombo.setDisabled(state);
		// this.dataprovidertypeCombo.setReadOnly(true);
		this.subjectCombo.setDisabled(state);
		this.sqlTextArea.setDisabled(state);
		this.customTrigger.setDisabled(state);
		this.isstaticTrigger.setDisabled(state);
		Ext.getCmp('showEditSql').setDisabled(state);

	},
	choicePublicComponents : function() {//公共组件的查询改变加载
		if (Ext.getCmp('editnameTextfield').getValue() == null
				|| Ext.getCmp('editnameTextfield').getValue() == "") {
			return;
		}
		var selectRecords = Ext.getCmp('editnameTextfield').getStore()
				.findRecord("id", Ext.getCmp('editnameTextfield').getValue());

		var selectRecord = selectRecords;
		if (selectRecord == null) {
			return;
		}
		Ext.getCmp('editpublicId').setValue(selectRecord.get('id'));
		// Ext.getCmp('editnameTextfield').setValue(selectRecord.get('name'));
		Ext.getCmp('publicCheck').setValue(true);

		var widForm = Ext.getCmp('editpublicId').up("window").down('form');
		var editForm = widForm.getForm();
		var fieldValue = selectRecord.get('etype');
		var dataProviderType = '';

		editForm.findField("etypeCombo").select(fieldValue);
		switch (fieldValue) {
			case 'dataPicker' :
				editForm.findField("maskCombo")
						.select(selectRecord.get("mask"));

				break;
			case 'combo' :
				dataProviderType = selectRecord.get("dataProviderType");
				editForm.findField("dataprovidertypeCombo").select(selectRecord
						.get("dataProviderType"));
				editForm.findField("typeCombo")
						.select(selectRecord.get("type"));
				editForm.findField("multiCheck").setValue(selectRecord
						.get("multi"));
				break;
			case 'text' :
				break;
			case 'custom' :
				editForm.findField("multiCheck").setValue(selectRecord
							.get("multi"));
				editForm.findField("customTrigger").setValue(selectRecord
						.get("dataProvider"));
				break;
		}

		switch (dataProviderType) {
			case 'DYNAMIC_SUBJECT' :
				editForm.findField("dataprovidertypeCombo")
						.select(selectRecord.get("dataProviderType"));
				editForm.findField("subjectCombo").select(selectRecord
						.get("dataProvider"));
				break;
			case 'DYNAMIC_SQL' :
				editForm.findField("sqlTextArea").setValue(selectRecord
						.get("dataProvider"));
				break;
			case 'ISSTATIC' :
				editForm.findField("isstaticTrigger").setValue(selectRecord
						.get("dataProvider"));

				break;
		}

	}

});
