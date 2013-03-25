/**
 * 查询条件控制器
 */
Ext.define('HummerApp.controller.Condition', {
	extend : 'Ext.app.Controller',
	id:'controllerCondition',
	stores : ['condition.CustomComponentsList', 'condition.SubjectList',
	'condition.Component','condition.PublicComponentsList'],
	views : ['Design', 'query.List', 'design.condition.ConditionList',
			'design.condition.CustomComponents', 'design.condition.StaticData',
			'HummerApp.view.design.condition.ConditionListCelleditor',
			'design.field.EditField',
			'HummerApp.view.design.condition.PublicComponents'

	],
	init : function() {
		var me = this;
		this.control({
					'querylist' : {
						select : this.querySelection
					},
					'conditionlistcelleditor button[action=save]' : {
						click : this.saveCelleditor
					},
					'conditionlistcelleditor button[action=public_save]' : {
						click : this.savePublicCellEditor
					},
						
					'conditionlistcelleditor panel panel button[id=showEditSql]' : {// sql变量编辑
						click : this.showEditSql
					},
					'conditionlist button[action=deleteCondition]' : { // 查询条件删除事件
						click : this.delCondition
					},
					'conditionlist' : {
						select : this.initButton,
						edit : this.editPanel,
						beforeedit: this.beforeEdit,
						cellclick: this.conditionListEdit
					},
					'customcomponents button[action=save]' : {// 自定义组件保存
						click : this.saveCustomComponents

					},
					'staticdata button[action=save]' : {// 静态数据保存
						click : this.saveStaticData
					},
					'conditionTextEdit button[action=save]' : {// 默认值使用，公式编辑器
						click : this.saveEditField
					},
					'textedit[id=conditionEditor] grid[id=catetoryGrid]' : {
						render : this.gridRender
					},
					'publiccomponents button[action=ok]' : {// 公共组件确定
						click : this.choicePublicComponents

					},
					'customcomponents button[action=add_component_button]':{
						click : this.addComponent
					},
					'customcomponents button[action=save_component_button]':{
						click : this.saveConponent
					},'customcomponents button[action=del_component_button]':{
					 click : this.delConponent
					}
				})
	},
	addComponent:function(btn, e, eOpt){
	    var componentStore = btn.up('grid').getStore();
		// 如果有一条空记录，则直接定位到空记录上
		var index = componentStore.findBy(
		function(rec) {
					if (rec.get('name') == '' && rec.get('path') == '') {
						return true;
					} else {
						return false;
					}

				});

		if (index != -1) {
			return;
		}
		var componentModel = Ext.create('HummerApp.model.Component', {
					id : '',
					name : '',
					path : ''
				});
		 
		componentStore.add(componentModel);
		btn.up('grid').plugins[0].startEdit(componentStore.getCount() - 1, 0);
//		console.log(btn.up('grid').plugins[0]);
//		console.log();
//		btn.up('panel').rowEditor.startEdit(propertyStore.getCount() - 1, 0);
	},
	delConponent:function(btn, e, eOpt){
	 	 var componentStore = btn.up('grid').getStore();
	 	
	 	 componentStore.remove(
	 		 btn.up('grid').getSelectionModel( ).getSelection( )[0]
		 );
	},
	saveConponent:function(btn, e, eOpt){
	 	 var componentStore = btn.up('grid').getStore();
	 	 var addRecords=[];
	 	 var updateRecords=[];
	 	 var deleteRecords=[];
	 	 var storeAddRecords=componentStore.getNewRecords( ) ;
	 	 var storeUpdateRecords=componentStore.getUpdatedRecords( ) ;
	 	 var storeDeleteRecords=componentStore.getRemovedRecords( ) ;
	 	 
	 	  for(var i=0;i<storeDeleteRecords.length;i++){
		 	  var items=[];
		 	  items.push('delete');
		 	  items.push(storeDeleteRecords[i].get('id'));//id
		 	  items.push(storeDeleteRecords[i].get('name'));//name
		 	  items.push(storeDeleteRecords[i].get('path'));//path
		 	  deleteRecords.push(Ext.encode(items));
	 	 }
	 	 
	 	 for(var i=0;i<storeUpdateRecords.length;i++){
		 	  var items=[];
		 	  items.push('update');
		 	  items.push(storeUpdateRecords[i].get('id'));//id
		 	  items.push(storeUpdateRecords[i].get('name'));//name
		 	  items.push(storeUpdateRecords[i].get('path'));//path
		 	  updateRecords.push(Ext.encode(items));
	 	 }
	 	 
	 	 for(var i=0;i<storeAddRecords.length;i++){
		 	  var items=[];
		 	  items.push('add');
		 	  items.push('');//id
		 	  items.push(storeAddRecords[i].get('name'));//name
		 	  items.push(storeAddRecords[i].get('path'));//path
		 	  addRecords.push(Ext.encode(items));
	 	 }

	 	//异步提交
	 	 Ext.Ajax.request({
			url : "/hummer/application/controller/condition/UpdateComponent.action",
			method : 'POST',
			params : {
				deleteRecords : deleteRecords,
				addRecords : addRecords,
				updateRecords : updateRecords
			},
			success : function(response, opts) {
					if (response.responseText == "true") {
						componentStore.reload();
					}
				}
			});
	},
	initButton:function(){
		var panel = Ext.getCmp('conditionList');
		var buttonDel = panel.buttonDel;
		var records = panel.getSelectionModel().getSelection();
		if (records.length > 0) {
				buttonDel.setDisabled(false);
		}
	},
	beforeEdit:function(editor, e){
		// 告警类型条件对操作符、反置不能编辑  csx  2013-2-26
		if((e.record.get('fieldName') == 'CUSTOM_ALARM_COMBO' || e.record.get('fieldName') == 'CUSTOM_ALARM_CHECK') 
			&& (e.field == 'operator' || e.field == 'operatorIsNot'))
			return false;
	},
	editPanel:function(editor, e){
		if(e.field=='displayName'){  // 修改的是显示名称
			var value = e.value;//修改过后的  显示名称
			var oldValue = e.originalValue;
			if(oldValue!=value){//此处表示 显示名称有改变  执行一下语句
				// 处理级联字段
				var records = Ext.getCmp('conditionList').getStore().getRange();
				for(var i = 0;i<records.length;i++){
					var comboxValue = records[i].get('cashcadeField');
					//处理级联字段
					if(comboxValue){
						var comBoxRecords = comboxValue.toString().replace(oldValue,value);
						records[i].set('cashcadeField',comBoxRecords);
					}
					// 默认值
					var defaultValue = records[i].get('defalultValue');
					if(defaultValue){
						records[i].set('defalultValue',defaultValue.replace('${C:'+oldValue+'}','${C:'+value+'}'));
					}
				}
				// 处理计算字段的值
				records = this.getStore('field.SelectedFields').getRange();
				for(var i=0;i<records.length;i++){
					if(records[i].get('ftype')=='computed') { // 是计算字段
						var formula = records[i].get('formula');
						if(formula){
							records[i].set('formula',formula.replace('${C:'+oldValue+'}','${C:'+value+'}'))
							records[i].set('fieldName',records[i].get('fieldName').replace('${C:'+oldValue+'}','${C:'+value+'}'))
						}
					}
				}
			}
		}
		Ext.getCmp('conditionList').getView().refresh();
	},
	gridRender : function(grid) {
		grid.getStore().filterBy(function(record) {
					if (
//					record.get('name') != '查询条件'
//							&& 
							record.get('name') != '可用字段') {
						return true;
					}
				});
	},
	/**
	 * 查询列表改变事件
	 * 
	 * @param {}mode
	 * @param {}selected
	 * @param {}eOpts
	 */
	querySelection : function(mode, record, eOpts) {

		var queryId;
		//if (record != null && record.get('qtype') == 'list') {
		queryId = record.get('queryId');
		if(!Ext.getCmp('conditionList'))
			return;
		var conditionStore = Ext.getCmp('conditionList').getStore();
		conditionStore.load({
					params : {
						queryId : queryId
					}
				});
	},
	// 验证
	validBeforeSave : function() {

		var deleteRecord = Ext.getCmp('conditionList').getStore().getRemovedRecords();// 删除的记录
		var addRecord = Ext.getCmp('conditionList').getStore().getNewRecords();// 获得增加
		var updateRecord = Ext.getCmp('conditionList').getStore().getUpdatedRecords();// 更新的记录
		if (deleteRecord.length + addRecord.length + updateRecord.length == 0) {
			return '-1';
		}

		return this.CheckSelectedField();

	},
	CheckSelectedField : function() {
		var conditionStore = Ext.getCmp('conditionList').getStore();
		var record = Ext.getCmp('conditionList').getStore().getRange();// .getModifiedRecords();//
																		// 获得增加或修改的
		msg = "";
		for (var i = 0; i < record.length; i++) {
			// 1.显示名称验证
			var displayNameCheck = record[i].get('displayName');

			if (displayNameCheck == null || displayNameCheck == ""
					|| displayNameCheck.trim().length == 0) {
				msg += "已选条件的第" + (i + 1) + "行的显示名列不能为空.";
			} else if (displayNameCheck.length > 100) {
				msg += "已选条件的第" + (i + 1) + "行的显示名称列长度不能大于100.";
			}
			repeatRecord = conditionStore.findExact('displayName', record[i].get('displayName'), i + 1);
			if (repeatRecord != -1) {
				msg += "已选条件显示名称列”" + record[i].get('displayName') + "“重复;";
			}
			// 2.默认值验证
			var defalultValueCheck = record[i].get('defalultValue');

			if (defalultValueCheck != null && defalultValueCheck.length > 200) {
				msg += "已选条件的第" + (i + 1) + "行的默认值列内容长度不能大于200.";
			}

			var dataProviderCheck = record[i].get('editor.dataProvider');
			if (dataProviderCheck != null && dataProviderCheck.length > 1000) {
				if (record[i].get('editor.type') == 'TREE') {
					msg += "已选条件的第" + (i + 1) + "行的设置条件类型列内容中SQL长度不能大于1000.";
				} else {
					msg += "已选条件的第" + (i + 1) + "行的设置条件类型列内容中静态数据长度不能大于1000.";
				}
			}
		}
		return msg;
	},
	/**
	 * 保存查询条件
	 */
	getSaveObject : function() {
		var deleteRecord = Ext.getCmp('conditionList').getStore().getRemovedRecords();// 删除的记录
		var addRecord = Ext.getCmp('conditionList').getStore().getNewRecords();// 获得增加
		var updateRecord = Ext.getCmp('conditionList').getStore().getUpdatedRecords();// 更新的记录

		var fields = [];
		var delArray = new Array();
		var addArray = new Array();
		var updateArray = new Array();

		if (deleteRecord.length > 0) {
			for (var i = 0; i < deleteRecord.length; i++) {
				var items = new Array();

				items.push(deleteRecord[i].get("id"));
				items.push(deleteRecord[i].get("cashcadeField"));
				items.push(deleteRecord[i].get("defalultValue"));
				items.push(deleteRecord[i].get("display"));
				items.push(deleteRecord[i].get("displayName"));
				items.push(deleteRecord[i].get("fieldName"));
				items.push(deleteRecord[i].get("dataType"));

				if (deleteRecord[i].get("operator") == null
						|| deleteRecord[i].get("operator") == "") {
					items.push("EQUAL");
				} else {
					items.push(deleteRecord[i].get("operator"));//	 
				}
				items.push(deleteRecord[i].get("operatorIsNot"));// 
				items.push(deleteRecord[i].get("required"));

				items.push(deleteRecord[i].get("serial"));

				items.push(deleteRecord[i].get("sourceName"));
				if (deleteRecord[i].get("editor.etype") == null
						|| deleteRecord[i].get("editor.etype").length < 1) {
					Ext.Msg.alert('提示信息', '请双击单元格编辑条件录入方式！');
					return;
				}
				items.push(deleteRecord[i].get("editor.etype"));//
				if (deleteRecord[i].get("editor.id") != null
						&& deleteRecord[i].get("editor.id") != '') {
					items.push(deleteRecord[i].get("editor.id"));
				} else {
					items.push('');
				}
				items.push(deleteRecord[i].get("editor.dataProvider"));
				items.push(deleteRecord[i].get("editor.dataProviderType"));
				items.push("");// 冗余提示信息tooltip
				items.push(deleteRecord[i].get("editor.multi"));
				items.push(deleteRecord[i].get("editor.type"));
				items.push(deleteRecord[i].get("editor.mask"));
				items.push(deleteRecord[i].get("editor.name"));
				items.push(deleteRecord[i].get("editor.isPublic"));
				delArray.push(Ext.encode(items));
			}
		}

		if (addRecord.length > 0) {
			for (var i = 0; i < addRecord.length; i++) {
				var items = new Array();

				items.push(addRecord[i].get("id"));
				items.push(addRecord[i].get("cashcadeField"));
				items.push(addRecord[i].get("defalultValue"));
				items.push(addRecord[i].get("display"));
				items.push(addRecord[i].get("displayName"));
				items.push(addRecord[i].get("fieldName"));
				items.push(addRecord[i].get("dataType"));

				if (addRecord[i].get("operator") == null
						|| addRecord[i].get("operator") == "") {
					items.push("EQUAL");
				} else {
					items.push(addRecord[i].get("operator"));//	 
				}
				items.push(addRecord[i].get("operatorIsNot"));// 
				items.push(addRecord[i].get("required"));

				items.push(addRecord[i].get("serial"));

				items.push(addRecord[i].get("sourceName"));
				if (addRecord[i].get("editor.etype") == null
						|| addRecord[i].get("editor.etype").length < 1) {
					Ext.Msg.alert('提示信息', '请双击单元格编辑条件录入方式！');
					return;
				}
				items.push(addRecord[i].get("editor.etype"));//

				if (addRecord[i].get("editor.id") != null
						&& addRecord[i].get("editor.id") != '') {
					items.push(addRecord[i].get("editor.id"));
				} else {
					items.push('');
				}

				items.push(addRecord[i].get("editor.dataProvider"));
				items.push(addRecord[i].get("editor.dataProviderType"));
				items.push("");// 冗余提示信息tooltip
				items.push(addRecord[i].get("editor.multi"));
				items.push(addRecord[i].get("editor.type"));
				items.push(addRecord[i].get("editor.mask"));
				items.push(addRecord[i].get("editor.name"));
				items.push(addRecord[i].get("editor.isPublic"));
				addArray.push(Ext.encode(items));
			}
		}
		if (updateRecord.length > 0) {
			for (var i = 0; i < updateRecord.length; i++) {
				var items = new Array();

				items.push(updateRecord[i].get("id"));
				items.push(updateRecord[i].get("cashcadeField"));
				items.push(updateRecord[i].get("defalultValue"));
				items.push(updateRecord[i].get("display"));
				items.push(updateRecord[i].get("displayName"));
				items.push(updateRecord[i].get("fieldName"));
				items.push(updateRecord[i].get("dataType"));

				if (updateRecord[i].get("operator") == null
						|| updateRecord[i].get("operator") == "") {
					items.push("EQUAL");
				} else {
					items.push(updateRecord[i].get("operator"));//	 
				}
				items.push(updateRecord[i].get("operatorIsNot"));// 
				items.push(updateRecord[i].get("required"));

				items.push(updateRecord[i].get("serial"));

				items.push(updateRecord[i].get("sourceName"));
				if (updateRecord[i].get("editor.etype") == null
						|| updateRecord[i].get("editor.etype").length < 1) {
					Ext.Msg.alert('提示信息', '请双击单元格编辑条件录入方式！');
					return;
				}
				items.push(updateRecord[i].get("editor.etype"));//
				if (updateRecord[i].get("editor.id") != null
						&& updateRecord[i].get("editor.id") != '') {
					items.push(updateRecord[i].get("editor.id"));
				} else {
					items.push('');
				}
				items.push(updateRecord[i].get("editor.dataProvider"));
				items.push(updateRecord[i].get("editor.dataProviderType"));
				items.push("");// 冗余提示信息tooltip
				items.push(updateRecord[i].get("editor.multi"));
				items.push(updateRecord[i].get("editor.type"));
				items.push(updateRecord[i].get("editor.mask"));
				items.push(updateRecord[i].get("editor.name"));
				items.push(updateRecord[i].get("editor.isPublic"));
				updateArray.push(Ext.encode(items));
			}
		}
		fields.push(Ext.encode(delArray));
		fields.push(Ext.encode(addArray));
		fields.push(Ext.encode(updateArray));

		return Ext.encode(fields);

	},
	/**
	 * 删除查询条件
	 */
	delCondition : function() {
		//删除行时进行判断：如果有被其他行级联，则不删除
		var selectRecords = Ext.getCmp('conditionList').getSelectionModel().getSelection();
		var displayName = selectRecords[0].get('displayName');//要删除行的显示名称
		if(selectRecords.length < 1){
			Ext.Msg.alert('提示信息', '请选中删除行！');
		}else{
			var records = Ext.getCmp('conditionList').getStore().getRange();
			if(selectRecords[0].get('fieldName') == 'CUSTOM_ALARM_COMBO' || selectRecords[0].get('fieldName') == 'CUSTOM_ALARM_CHECK'){
				Ext.Msg.alert('提示信息', '告警条件不能删除！');
				return;
			}
			var num = -1;
			for(var i = 0; i < records.length; i++){
				var cashcadeFieldStr = records[i].get('cashcadeField');
				if(cashcadeFieldStr==null||cashcadeFieldStr == "null"){
					cashcadeFieldStr="";
				}
				var num = cashcadeFieldStr.toString().indexOf(displayName);
				if(num!=-1){
					break;
				}else{
					continue;
				}
			}
			var refByFields = [];
			records = this.getStore('field.SelectedFields').getRange();
			for(var i=0;i<records.length;i++){
				if(records[i].get('ftype')=='computed') { // 是计算字段
					var formula = records[i].get('formula');
					var re = RegExp('\\${C:'+displayName+'}');
					if(re.test(formula)){
						refByFields.push(records[i].get('displayName'));
					}
				}
			}
			
			if(num!=-1){
				//其他行存在级联关系 不可删除
				Ext.MessageBox.alert('提示', '查询条件 名称："'+displayName+ '"被级联设置引用，请删除级联设置引用后再删除');
				return;
			}
			if(refByFields.length>0){
				Ext.MessageBox.alert('提示', '查询条件 名称："'+displayName+ '"在计算字段: ['+refByFields.join(',')+']中引用，请删除引用后再删除查询条件。');
				return;
			}
			Ext.MessageBox.confirm('提示', '确实删除  '+displayName+ ' 已选条件吗?',function(_btn) {
				if(_btn == 'yes'){
					Ext.getCmp('conditionList').getStore().remove(selectRecords[0]);
					Ext.getCmp('conditionList').buttonDel.setDisabled(true);
				}else{
					return;
				}
			});
		}
		
//		var selectRecords = Ext.getCmp('conditionList').getSelectionModel().getSelection();
//		if (selectRecords.length < 1) {
//			Ext.Msg.alert('提示信息', '请选中删除行！');
//		} else {
//			var conditionStore = Ext.getCmp('conditionList').getStore();
//			// 查出级联字段是否引用了，当前要删除额的行
//			var findQuoteIndex = conditionStore.findExact("cashcadeField",selectRecords[0].get("fieldName"));
//			if (findQuoteIndex != -1) {
//				// 判断删除行，在列表中第一次查找位置
//				var findOneIndex = conditionStore.findExact("fieldName",selectRecords[0].get("fieldName"));
//				var findTowIndex = -1;
//				if (findOneIndex != -1) {
//					// 判断删除行，在列表中第二次查找位置
//					findTowIndex = conditionStore.findExact("fieldName", selectRecords[0].get("fieldName"), findOneIndex + 1);
//				}
//				if (findOneIndex > 0 && findTowIndex == -1) {// 如果被删除行，被引用且此字段只添加一次，不允许删除
//					Ext.MessageBox.alert('提示', '字段："'+ selectRecords[0].get("sourceName")+ '"被级联设置引用，请删除级联设置引用后再删除');
//					return;
//				}
//			}
//
//			Ext.MessageBox.confirm('提示', '确实删除  '+ selectRecords[0].get('displayName') + '  已选条件吗?',
//					function(_btn) {
//						if (_btn == 'no') {
//							return;
//						} else {
//							Ext.getCmp('conditionList').getStore().remove(selectRecords[0]);
//							Ext.getCmp('conditionList').buttonDel.setDisabled(true);
//						}
//					});
//
//		}
	},
	/**
	 * 双击弹出编辑组件框(主要模拟单击事件)
	 * 
	 * @param {}table
	 * @param {}
	 *            td
	 * @param {}cellIndex
	 * @param {}record
	 * @param {}rowIndex
	 * @param {}e
	 * @param {}eOpts
	 */
	conditionListEdit : function(table, td, cellIndex, record, tr, rowIndex, e,
			eOpts) {
		if(table!=null&&td!=null){
		return null;
		}
		// 单击的列
		if (cellIndex == 10) {
			var win = Ext.create('widget.window', {
						layout : 'fit',
						width : 727,
						height : 436,
						alias : 'widget.conditionTextEdit',
						id : 'conditionTextEdit',
						modal : true,
						resizable : false,
						title : '默认值设置窗体',
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
										region : 'center',
										id : 'conditionEditor',
										xtype : 'textedit'
									}],
							buttons : [{
										text : '确定',
										scope : this,
										iconCls : 'icon-submmit',
										action : 'save',
										handler : this.saveEditField
									}, {
										text : '取消',
										action : 'cancel',
										iconCls : 'icon-remove',
										handler : function() {
											Ext.getCmp('conditionTextEdit').close();
										}
									}]
						}]
					});
			if (win.down('panel').down('panel').down('panel').title != null
					&& win.down('panel').down('panel').down('panel').title.length > 0) {
				win.down('panel').down('panel').down('panel').setTitle('默认值编辑框');
			}

			var selectRecord = Ext.getCmp('conditionList').getSelectionModel().getSelection()[0];
			win.down('textedit').setValue(selectRecord.get('defalultValue'))

			var selectPanel = win.down('selectorpanel');
			var catetoryStore = selectPanel.getComponent('catetoryGrid').getStore();
 			win.down("textareafield").maxLength = 200;
			win.show();

		}
		if (cellIndex == 7) {

			var window = Ext.create(
					"HummerApp.view.design.condition.ConditionListCelleditor",
					{
						id : 'conditionlistcelleditor'
					});
			var selectRecord = Ext.getCmp('conditionList').getSelectionModel().getSelection()[0];// 当前选中行
			var fieldValue = selectRecord.get("editor.etype");
			var dataProviderType = selectRecord.get("editor.dataProviderType");

			if (fieldValue == null || fieldValue == '') {
				fieldValue = 'text';
			}
			var winForm = window.down('form');

			var editForm = winForm.getForm();
			editForm.findField("celleditorOpenMode").setValue("choise");
			editForm.findField("etypeCombo").select(fieldValue);
			// -----
			editForm.findField("editpublicId").setValue(selectRecord.get("editor.id"));

			editForm.findField("editnameTextfield").setValue(selectRecord.get("editor.name"));
			if (selectRecord.get("editor.isPublic") !== null
					&& selectRecord.get("editor.isPublic") != '') {

				editForm.findField("publicCheck").setValue(selectRecord.get("editor.isPublic"));
			} else {
				editForm.findField("publicCheck").setValue(false);
			}

			// ---------
			switch (fieldValue) {
				case 'dataPicker' :
					editForm.findField("maskCombo").select(selectRecord.get("editor.mask"));
					Ext.getCmp("sqlTextArea").up('panel').setVisible(false);

					break;
				case 'combo' :
					editForm.findField("dataprovidertypeCombo").select(selectRecord.get("editor.dataProviderType"));
					editForm.findField("typeCombo").select(selectRecord.get("editor.type"));
					editForm.findField("multiCheck").setValue(selectRecord.get("editor.multi"));
					break;
				case 'text' :
					Ext.getCmp("sqlTextArea").up('panel').setVisible(false);
					break;
				case 'custom' :
					editForm.findField("multiCheck").setValue(selectRecord.get("editor.multi"));
					editForm.findField("customTrigger").setValue(selectRecord.get("editor.dataProvider"));
					Ext.getCmp("sqlTextArea").up('panel').setVisible(false);

					break;
			}

			switch (dataProviderType) {
				case 'DYNAMIC_SUBJECT' :
					editForm.findField("dataprovidertypeCombo").select(selectRecord.get("editor.dataProviderType"));
					editForm.findField("subjectCombo").select(selectRecord.get("editor.dataProvider"));
					Ext.getCmp("sqlTextArea").up('panel').setVisible(false);
					break;
				case 'DYNAMIC_SQL' :
					editForm.findField("sqlTextArea").setValue(selectRecord.get("editor.dataProvider"));
					break;
				case 'ISSTATIC' :
					editForm.findField("isstaticTrigger").setValue(selectRecord.get("editor.dataProvider"));
					Ext.getCmp("sqlTextArea").up('panel').setVisible(false);

					break;
			}
			window.show();
		}
	},
	/*
	 * 验证输入合法性
	 */
	validCelleditor : function(srcObj, e, eOpts) {// 验证通过返回true,否则返回false
		var widForm = srcObj.up("window").down('form');
		var editForm = widForm.getForm();
		if (editForm != null) {

			var publicCheck = editForm.findField('publicCheck').getValue();

			var editname = editForm.findField('editnameTextfield').getValue();
			if (publicCheck) {// 公共组件验证
				if (editname == null || editname.trim().length < 1) {
					Ext.Msg.alert('提示信息', '模板名称内容不能为空！');
					return false;
				} else if (editname.length > 50) {
					Ext.Msg.alert('提示信息', '模板名称内容长度不能超过50！');
					return false;
				}
			}

			var etype = editForm.findField("etypeCombo").getValue();// 录入方式
			switch (etype) {
				case 'dataPicker' :
					break;
				case 'combo' :
					var dataprovidertype = editForm.findField("dataprovidertypeCombo").getValue();
					switch (dataprovidertype) {
						case 'DYNAMIC_SUBJECT' :
							if (editForm.findField("subjectCombo").getValue() == null
									|| editForm.findField("subjectCombo").getValue().length < 1) {
								Ext.Msg.alert('提示信息', '主题列表不能为空！');
								return false;
							}
							break;
						case 'DYNAMIC_SQL' :
							if (editForm.findField("sqlTextArea").getValue() == null
									|| editForm.findField("sqlTextArea").getValue().trim().length < 1) {
								Ext.Msg.alert('提示信息', 'SQL内容不能为空！');
								return false;
							} else if (editForm.findField("sqlTextArea").getValue().length > 1000) {
								Ext.Msg.alert('提示信息', 'SQL内容长度不能超过1000！');
								return false;
							}
							break;
						case 'ISSTATIC' :
							if (editForm.findField("isstaticTrigger").getValue() == null
									|| editForm.findField("isstaticTrigger").getValue().trim().length < 1) {
								Ext.Msg.alert('提示信息', '静态数据不能为空！');
								return false;
							} else if (editForm.findField("isstaticTrigger").getValue().length > 1000) {
								Ext.Msg.alert('提示信息', '静态数据长度不能超过1000！');
								return false;
							}

							break;
					}
					break;
				case 'text' :
					break;
				case 'custom' :
					if (editForm.findField("customTrigger").getValue().trim().length < 1) {
						Ext.Msg.alert('提示信息', '组件/URL不能为空！');
						return false;
					} else if (editForm.findField("customTrigger").getValue().length > 1000) {
						Ext.Msg.alert('提示信息', '组件/URL长度不能超过1000！');
						return false;
					}
					break;

			}
			return true;
		} else {
			Ext.Msg.alert('提示信息', '录入方式为空对象！');
			return false;
		}
	},
	/**
	 * 保存查询相关的编辑框
	 * 
	 * @param {}srcObj
	 * @param {}e
	 * @param {}eOpts
	 */
	saveCelleditor : function(srcObj, e, eOpts) {
		// 验证
		if (!this.validCelleditor(srcObj, e, eOpts)) {
			return;
		}

		var widForm = srcObj.up("window").down('form');
		var editForm = widForm.getForm();
		if (editForm != null) {

			var selectRecord = Ext.getCmp('conditionList').getSelectionModel().getSelection()[0];

			var etype = editForm.findField("etypeCombo").getValue();// 录入方式
			selectRecord.set("editor.etype", etype);
			// ----------
			selectRecord.set("editor.id", editForm.findField("editpublicId").getValue());
			selectRecord.set("editor.name", editForm.findField("editnameTextfield").getValue());
			selectRecord.set("editor.isPublic", editForm.findField("publicCheck").getValue());
			// ----------

			switch (etype) {
				case 'dataPicker' :
					selectRecord.set("editor.mask", editForm.findField("maskCombo").getValue());

					break;
				case 'combo' :
					selectRecord.set("editor.type", editForm.findField("typeCombo").getValue());
					selectRecord.set("editor.multi", editForm.findField("multiCheck").getValue());
					selectRecord.set("editor.dataProviderType", editForm.findField("dataprovidertypeCombo").getValue());

					var dataprovidertype = editForm.findField("dataprovidertypeCombo").getValue();
					switch (dataprovidertype) {
						case 'DYNAMIC_SUBJECT' :
							selectRecord.set("editor.dataProvider", editForm.findField("subjectCombo").getValue());

							break;
						case 'DYNAMIC_SQL' :
							selectRecord.set("editor.dataProvider", editForm.findField("sqlTextArea").getValue());
							break;
						case 'ISSTATIC' :
							selectRecord.set("editor.dataProvider", editForm.findField("isstaticTrigger").getValue());
							break;
					}
					break;
				case 'text' :
					break;
				case 'custom' :
					selectRecord.set("editor.multi", editForm.findField("multiCheck").getValue());
					selectRecord.set("editor.dataProvider", editForm.findField("customTrigger").getValue());
					break;

			}

			srcObj.up("window").close();

		} else {
			Ext.Msg.alert('提示信息', '录入方式为空对象！');
		}
	},
	showEditSql : function(obj, e, eOpts) {
		var win = Ext.create('widget.window', {
					layout : 'fit',
					width : 727,
					height : 436,
					alias : 'widget.editFieldConditionSql',
					id : 'editFieldConditionSql',
					resizable : false,
					modal : true,
					title : 'SQL变量设置窗体',
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

									xtype : 'textedit'
								}],
						buttons : [{
									text : '确定',
									scope : this,
									action : 'save',
									iconCls : 'icon-submmit',
									handler : this.saveEditConditionSql
								}, {
									text : '取消',
									action : 'cancel',
									iconCls : 'icon-remove',
									handler : function() {
										Ext.getCmp('editFieldConditionSql').close();
									}
								}]
					}]
				});
		if (win.down('panel').down('panel').down('panel').title != null
				&& win.down('panel').down('panel').down('panel').title.length > 0) {
			win.down('panel').down('panel').down('panel').setTitle('SQL变量值编辑框');
		}
		win.down('textareafield').setValue(Ext.getCmp('sqlTextArea').getValue());

		var catetoryStore = Ext.getCmp('catetoryGrid').getStore();

		catetoryStore.clearFilter();

		catetoryStore.filterBy(function(record) {
					if (record.get('name') != '查询条件'
							&& record.get('name') != '可用字段'
							&& record.get('name') != '函数') {
						return true;
					}
				});
		win.down("textareafield").maxLength = 1000;
		win.show();
	},
	saveEditConditionSql : function(srcObj, e, eOpts) {

		var win = Ext.getCmp('editFieldConditionSql');
		Ext.getCmp('sqlTextArea').setValue(win.down('textareafield').getValue());
		Ext.getCmp('catetoryGrid').getStore().clearFilter();
		win.close();
	},
	/**
	 * 保存组件
	 * 
	 * @param {}srcObj
	 * @param {}e
	 * @param {}eOpts
	 */
	saveCustomComponents : function(srcObj, e, eOpts) {
		var selectRecords = Ext.getCmp('customComponentsList').getSelectionModel().getSelection();// 查询记录行
		if (selectRecords.length > 0) {
			Ext.getCmp('customTrigger').setValue(selectRecords[0].get('path'));
			Ext.getCmp('customComponents').close();
		} else {
			Ext.MessageBox.alert('提示信息', '您没有选择记录');
		}
	},
	/**
	 * 保存静态数据
	 * 
	 * @param {}srcObj
	 * @param {}e
	 * @param {}eOpts
	 */
	saveStaticData : function(srcObj, e, eOpts) {
		var records = Ext.getCmp('staticDataList').getStore().getRange();
		var tempValue = '';
		for (var i = 0; i < records.length; i++) {
			if (i + 1 < records.length) {
				tempValue += '(' + records[i].get('name') + ',' + records[i].get('value') + ');';
			} else {
				tempValue += '(' + records[i].get('name') + ',' + records[i].get('value') + ')';
			}
		}
		Ext.getCmp('isstaticTrigger').setValue(tempValue);
		Ext.getCmp('staticData').close();
	},
	/**
	 * 保存编辑默认值
	 * 
	 * @param {Object}
	 *            srcObj
	 * @param {Object}
	 *            e
	 * @param {Object}
	 *            eOpts
	 */
	saveEditField : function(srcObj, e, eOpts) {

		var win = Ext.getCmp('conditionTextEdit');
		var selectRecord = Ext.getCmp('conditionList').getSelectionModel().getSelection()[0];
		try {// Uncaught TypeError: Cannot call method 'hasCls' of null
			selectRecord.set('defalultValue', win.down('textedit').getValue());
			//selectRecord.set('defalultValue', win.down('textedit').getText());
		} catch (e) {
		}
		Ext.getCmp('catetoryGrid').getStore().clearFilter();
		win.close();

	},
	choicePublicComponents : function(srcObj, e, eOpts) {
		var selectRecords = Ext.getCmp('publicComponentsList').getSelectionModel().getSelection();// 查询记录行
		if (selectRecords.length > 0) {
			var selectRecord = selectRecords[0];
			Ext.getCmp('editpublicId').setValue(selectRecord.get('id'));
			Ext.getCmp('editnameTextfield').setValue(selectRecord.get('name'));
			Ext.getCmp('publicCheck').setValue(true);

			var widForm = Ext.getCmp('editpublicId').up("window").down('form');
			var editForm = widForm.getForm();
			var fieldValue = selectRecord.get('etype');
			var dataProviderType = '';

			editForm.findField("etypeCombo").select(fieldValue);
			switch (fieldValue) {
				case 'dataPicker' :
					editForm.findField("maskCombo").select(selectRecord.get("mask"));

					break;
				case 'combo' :
					dataProviderType = selectRecord.get("dataProviderType");
					editForm.findField("dataprovidertypeCombo").select(selectRecord.get("dataProviderType"));
					editForm.findField("typeCombo").select(selectRecord.get("type"));
					editForm.findField("multiCheck").setValue(selectRecord.get("multi"));
					break;
				case 'text' :
					break;
				case 'custom' :
					editForm.findField("customTrigger").setValue(selectRecord.get("dataProvider"));
					break;
			}

			switch (dataProviderType) {
				case 'DYNAMIC_SUBJECT' :
					editForm.findField("subjectCombo").select(selectRecord.get("dataProvider"));
					break;
				case 'DYNAMIC_SQL' :
					editForm.findField("sqlTextArea").setValue(selectRecord.get("dataProvider"));
					break;
				case 'ISSTATIC' :
					editForm.findField("isstaticTrigger").setValue(selectRecord.get("dataProvider"));

					break;
			}

			Ext.getCmp('publicComponents').close();
		} else {
			Ext.MessageBox.alert('提示信息', '您没有选择记录');
		}
	},
	savePublicCellEditor : function(srcObj, e, eOpts) {
		var items = new Array();
		// 验证
		if (!this.validCelleditor(srcObj, e, eOpts)) {
			return;
		}

		var widForm = srcObj.up("window").down('form');
		var editForm = widForm.getForm();
		if (editForm != null) {

			var etype = editForm.findField("etypeCombo").getValue();// 录入方式

			items.push(etype);// 序号：0
			items.push(editForm.findField("editpublicId").getValue());// 序号：1

			switch (etype) {
				case 'dataPicker' :
					items.push(editForm.findField("maskCombo").getValue());// 序号：2
					break;
				case 'combo' :
					items.push(editForm.findField("typeCombo").getValue());// 序号：2
					items.push(editForm.findField("multiCheck").getValue());// 序号：3
					items.push(editForm.findField("dataprovidertypeCombo").getValue());// 序号：4

					var dataprovidertype = editForm.findField("dataprovidertypeCombo").getValue();
					switch (dataprovidertype) {
						case 'DYNAMIC_SUBJECT' :
							items.push(editForm.findField("subjectCombo").getValue());// 序号：5

							break;
						case 'DYNAMIC_SQL' :
							items.push(editForm.findField("sqlTextArea").getValue());// 序号：5
							break;
						case 'ISSTATIC' :
							items.push(editForm.findField("isstaticTrigger").getValue());// 序号：5
							break;
					}
					break;
				case 'text' :
					break;
				case 'custom' :
					items.push(editForm.findField("customTrigger").getValue());// 序号：2
					items.push(editForm.findField("multiCheck").getValue());// 序号：3
					
					if (editForm.findField("customTrigger").getValue().trim().length < 1) {
						Ext.Msg.alert('提示信息', '组件/URL不能为空！');
						return false;
					} else if (editForm.findField("customTrigger").getValue().length > 1000) {
						Ext.Msg.alert('提示信息', '组件/URL长度不能超过1000！');
						return false;
					}
					break;
			}

			items.push(editForm.findField("editnameTextfield").getValue());
			items.push(editForm.findField("publicCheck").getValue());

			var rows = new Array();
			rows.push(Ext.encode(items));
			Ext.Ajax.request({
				url : "/hummer/application/controller/condition/SavePublicCellEditor.action",
				method : 'POST',
				params : {
					celleditorArray : rows
				},
				success : function(response, opts) {
					if (response.responseText == "true") {
						Ext.Msg.alert('提示信息', '保存成功！');
						Ext.getCmp('publicComponentsList').getStore().load();
						srcObj.up("window").close();
					}
				},
				failure : function(response, opts) {
					Ext.Msg.alert('提示信息', '保存失败！<br/>' + response);
				}
			});

		}

	}

});