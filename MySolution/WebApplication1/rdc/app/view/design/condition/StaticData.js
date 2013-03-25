/*
 * 静态数据
 */
Ext.define('HummerApp.view.design.condition.StaticData', {
	extend : 'Ext.window.Window',
	alias : 'widget.staticdata',
	id : 'staticData',
	layout : 'center',
	autoShow : true,
	initComponent : function() {
		Ext.apply(this, {
					title : '静态数据',
					name : 'staticdatacelleditor',
					height : 275,
					width : 458,
					modal : true,
					resizable : false,
					layout : 'fit'
				});
		this.formList = Ext.create('Ext.grid.Panel', {
			border : true,
			id : 'staticDataList',
			columnLines:true,
			maxHeight : 195,
			minHeight : 195,
			autoScroll : true,
			store : Ext.create('Ext.data.Store', {
						fields : ['name','value']
					}),
			tbar : [{
						xtype : 'label',
						text: '名称：'
					},{
						xtype : 'textfield',
						id : 'staticTextfieldTextInput',
						emptyText : '输入添加或删除的数据',
						name : 'staticTextfieldTextInput'
					},'|',{
						xtype : 'label',
						text: '值：'
					},{
						xtype : 'textfield',
						id : 'staticTextfieldTextValue',
						emptyText : '输入添加或删除的数据',
						name : 'staticTextfieldTextValue'
					}, '->',{
						xtype : 'button',
						iconCls : 'icon-add',
						listeners : {
							click : function() {
								//值验证
								var	tempTextValue = Ext
										.getCmp('staticTextfieldTextValue')
										.getValue().trim();
								 if (tempTextValue.length > 0) {
									if (tempTextValue.indexOf(',') > -1) {
										Ext.MessageBox.alert('提示信息', '值内不能有逗号');
										return;
									}
								}
								//名称验证
								var tempVal = Ext
										.getCmp('staticTextfieldTextInput')
										.getValue().trim();
										
								if (tempVal.length > 0) {
									if (tempVal.indexOf(',') > -1) {
										Ext.MessageBox.alert('提示信息', '名称内不能有逗号');
										return;
									}
									var staticStore = Ext
											.getCmp('staticDataList')
											.getStore();
									var findIndex = staticStore.findExact(
											'name', tempVal);// 精确匹配
									if (findIndex < 0) {
										staticStore.addSorted({
													name : tempVal,
													value:tempTextValue
												});
									}else{
										staticStore.getRange()[findIndex].set('value',tempTextValue);
									}
								}
								 
							}
						}
					}, {
						xtype : 'button',
						iconCls : 'icon-delete',
						listeners : {
							click : function() {
								var tempVal = Ext
										.getCmp('staticTextfieldTextInput')
										.getValue().trim();
								if (tempVal.length > 0) {
									var staticStore = Ext
											.getCmp('staticDataList')
											.getStore();
									var findIndex = staticStore.findExact(
											'name', tempVal);
									if (findIndex > -1) {
										staticStore.removeAt(findIndex);
									}
								}
							}
						}
					}],
			columns : [{
						header : '名称',
						dataIndex : 'name',
						hideable : false,
						sortable: false,
						flex : 0.5
					},{
						header : '值',
						dataIndex : 'value',
						hideable : false,
						sortable: false,
						flex : 1
					}]
		});
		this.formList.on({
					selectionchange : this.gridSelectionChange
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
								action : 'save'
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
	/**
	 * 静态数据列表
	 * @param {}thisObj
	 * @param {}selected
	 * @param {}eOpts
	 */
	gridSelectionChange : function(thisObj, selected, eOpts) {
		if (selected.length > 0) {
			Ext.getCmp('staticTextfieldTextInput').setValue(selected[0]
					.get('name'));
			Ext.getCmp('staticTextfieldTextValue').setValue(selected[0]
					.get('value'));
		}
	}

});
