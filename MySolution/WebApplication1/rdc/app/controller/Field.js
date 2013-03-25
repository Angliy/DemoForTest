Ext.define('HummerApp.controller.Field', {
	extend : 'Ext.app.Controller',
	stores : ['field.Group', 
		'field.AvailableFields', 
		'field.SelectedFields',
		'field.Functions',
		'field.FunctionCategory',
		'field.MyVariants',
		'condition.SelectedConditions',
		'field.FieldFormats',
		'field.DataTypes',
		'field.BoolStore',
		'field.FieldSummary',
		'field.FieldConvertFixed'
		],

	views : [
			'Viewport',

			// 字段及表头
			'design.field.Field', 
			'design.field.EditField',
			'design.field.FieldList', 
			'design.field.AvailableField',
			'design.field.Group',
			'query.List',
			'design.field.Selector',
			'design.field.TextEdit'],
	//hasChanged = false,
	init: function() {
	    this.control({
	    	'grouppanel  button' : {
	    		click : this.editGroup
	        },
	        'grouppanel':{
	    		select: this.selectGroup
	        },
	        'grouppanel treeview':{
	    		drop:this.groupDrop
	        },
	    	'editgroup  button[action=save]' : {
	    		click : this.saveGroupEdit
	        },
	        //控制grid中的动作
	        'querylist': {
	        	select: function(rowModel,record,index, eOpts){
		        	this.LoadAvailableFieldData(rowModel,record,index, eOpts);
	                this.loadSelectedFieldData(rowModel,record,index, eOpts);
	        	}
                
            },
            'fieldlist':{
//				celldblclick:this.editFieldFormula, 
            	select :this.initButton,
				//cellclick:this.editFieldFormula,//双击响应变点击响应
				edit:this.fieldEdit,
				beforeedit:this.fieldBeforeEdit//,
            },
            'fieldlist button[action=delete_selectedfield]':{
            	click: this.deleteSelectedField
            },
            'fieldlist button[action=custom_selectedfield]':{
            	click: this.customSelectedField
            },
            "editfield button[action=save_field_edit]" : {
                click:this.saveFieldFormula
            },
            "editformat button" : {
                click:this.saveFieldFormat
            },
            "fieldlist gridview":{
            	drop:this.displayFieldDrop,
            	beforedrop:this.displayFieldBeforeDrop
            },
            "codeconvert grid button":{
            	click:this.codeConvertEdit
            },
            "codeconvert button[action=codeconvert_save]":{
            	click:this.codeConvertSave
            }

	    });
	    fieldEditForView = this.fieldEdit;
	    fieldBeforeEditForView = this.fieldBeforeEdit;
	    //findGroupNodeByText = this.findGroupNodeByText;
	    editField = this.editFieldFormula;
	    fieldController = this;
	    editCodeConvert = this.editCodeConvert;
	    
	},
	codeConvertEdit:function(srcObj, e, eOpts){
		var grid = srcObj.up('grid');
		var store = grid.getStore();
		var model;
		if(srcObj.action == 'add'){
			model = Ext.ModelManager.getModel(store.model);
			store.add(model);
		}
		else if(srcObj.action == 'delete'){
			model = grid.getSelectionModel().getSelection();
			store.remove(model);
		}
		//console.log(e);
	},
	codeConvertSave: function(srcObj, e, eOpts){
		//var value = "[{fixed:[{code:0,value:'否'},{code:1,value:'是'}]},{dynamic:'select 3 from dual'}]";
		var win = srcObj.up('window');
		var gridModels = win.down('grid').getStore().getRange();
		var textArea = win.down('textareafield').getValue();
		var result = [];
		var fixedData = [], aData;
		for(var idx in gridModels){
			fixedData.push({'code':gridModels[idx].get('code'),'value':gridModels[idx].get('value')});
		}
		result.push({'fixed':fixedData});
		result.push({'dynamic':textArea});
		win.close();
		var fieldModel = Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0];
		fieldModel.set('codeConvert',result);
	},
	editCodeConvert:function(){
		var convertCode = Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0].get('codeConvert');
		//console.log(Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0]);
		//console.log(convertCode);
		if(Ext.isString(convertCode))
			convertCode = Ext.JSON.decode(convertCode);
		//var value = "[{fixed:[{code:0,value:'否'},{code:1,value:'是'}]},{dynamic:'select 3 from dual'}]";
		var codeconvertWin = Ext.create("HummerApp.view.design.field.CodeConvert");
		var store = codeconvertWin.down('grid').getStore();
		var textArea = codeconvertWin.down('textareafield');
		store.removeAll(true);
		if(convertCode){
			var valData = convertCode;
			store.loadRawData(valData[0]['fixed']);
			textArea.setValue(valData[1]['dynamic']);
		}else{
			textArea.setValue('');
		}
		codeconvertWin.show();
	},

	groupDrop : function(node,data,overModel,dropPosition,eOpts){
//		console.log('before:'+data.records[0].get('serial'));
//		data.records[0].set("serial",1);
//		console.log('after:'+data.records[0].get('serial'));
		changeTitle('Group','true');
	},
	initButton:function(){
		var panel = Ext.getCmp('fieldlist');
		var buttonDel = panel.buttonDel;
		var records = panel.getSelectionModel().getSelection();
		if (records.length > 0) {
			buttonDel.setDisabled(false);
		}
	},
	/**
	 * 单元格编辑之前控制是否可编辑
	 * @param {} editor
	 * @param {} e
	 * @param {} eOpts
	 */
	fieldBeforeEdit:function(editor, e, eOpts){
		var ftype = e.record.get("ftype");
		if(ftype == 'field' && (e.field == 'dataType' || e.field == 'sourceName'))
			e.cancel = true;
		if(e.field == "dataType"){
			
		}
	},
	/**
	 * 拖拽可选字段到已选字段
	 * @param {} node
	 * @param {} data
	 * @param {} overModel
	 * @param {} dropPosition
	 */
	displayFieldDrop:function(node, data, overModel, dropPosition){
		data.records[0].set('ftype','field');
		data.records[0].set('colWidth','150');
		data.records[0].set('groupable','0');
		data.records[0].set('sortable','1');
		this.appendNodeToGroup(data.records[0].get('sourceName'));
	},
	/**
	 * 拖拽可选字段到已选字段，生效之后的合法性验证
	 * @param {} node
	 * @param {} data
	 * @param {} overModel
	 * @param {} dropPosition
	 * @return {Boolean}
	 */
	displayFieldBeforeDrop:function(node, data, overModel, dropPosition){
    	var store = this.getStore('field.SelectedFields');
    	if(data.records[0].get('fieldName') == "")
    		return false;
    	var modelIdx = store.findExact("fieldName",data.records[0].get('fieldName'));
    	if(modelIdx != -1)  // 如果已经存在，则为无效拖拽
    		return false;
	},
	/**
	 * 在表头分组根节点下增加一个节点
	 * @param {} text 节点名称
	 */
	appendNodeToGroup:function(text){
		var parentNode = Ext.getCmp('groupPanel').getRootNode();
		var newNode = Ext.create('Ext.data.NodeInterface',{
				leaf: true
			});		
		newNode = parentNode.createNode(newNode);
		newNode.set("text",text);
		newNode.set("leaf",true);
		parentNode.appendChild(newNode);
		
	},
	
	/*
	 * 自定义已选字段
	 */
	customSelectedField:function(){
		//console.log("add");
		var model = Ext.create('HummerApp.model.SelectedFields');
		model.set("ftype","computed");
		model.set("dataType","FLOAT");
		model.set("colWidth","150");
		model.set("groupable","0");
		this.getStore("field.SelectedFields").add(model);
		// 使选中新添加的行
		var grid = Ext.getCmp('fieldlist');
		grid.getSelectionModel().select(model);
		
		grid.getView().refresh(); 
		this.appendNodeToGroup("");
		// 在所能可用字段Store中动态添加计算字段
		var allFieldStore = Ext.getStore("field.AllFields");
		if(allFieldStore != null && allFieldStore != undefined){
			allFieldStore.add({fieldName:'',displayName:'',sourceName:'',dataType:'FLOAT',dataTypeZh:'数值型'});
			allFieldStore.commitChanges();
		}
	},
	/**
	 * 编辑字段事件
	 * 1.处理同步显示表头分组树的名称同步
	 * 2.处理可用字段的名称同步
	 * @param {} editor
	 * @param {} e
	 * @param {} eOpts
	 */
	fieldEdit:function(editor, e, eOpts){
		// 表头分组树的名称同步
		if(e.field=="sourceName" && e.originalValue != e.value){
			var node ;
			if(e.record.get('id')!= undefined && e.record.get('id')!="")
				node = fieldController.findGroupNodeByText('id', e.record.get('id'));
			else
				node = fieldController.findGroupNodeByText('text', e.originalValue);
			if(node != null)
				node.set('text', e.value);
		}else if(e.field == 'groupable' && e.value=='2'){ // 使只能有一个默认分组
			var models = Ext.getStore("field.SelectedFields").getRange();
			for(var idx in models){
				if(models[idx].get('groupable')==2 && e.rowIdx != idx)
					models[idx].set('groupable',1);
			}
		}else if(e.field == 'sortable' && e.value=='2'){  // 使只能有一个默认排序
			var models = Ext.getStore("field.SelectedFields").getRange();
			for(var idx in models){
				if(models[idx].get('sortable')==2 && e.rowIdx != idx)
					models[idx].set('sortable',1);
			}
		}
		// 可用字段的名称同步
		var allFieldStore = Ext.getStore("field.AllFields");
		if(allFieldStore != null && allFieldStore != undefined){
			var sourceNameValue ;
			if(e.field=="sourceName")
				sourceNameValue = e.originalValue;
			else 
				sourceNameValue = e.record.get("sourceName");
			var num = allFieldStore.findExact( 'sourceName', sourceNameValue );
			//console.log(num + '    ' + e.originalValue);
			if(num>=0){
				allFieldStore.getAt(num).set(e.field, e.value);
				allFieldStore.commitChanges();
			}
		}
	},
	/**
	 * 根据指定的字段字段名称和值，找树节点
	 * @param {} fieldName
	 * @param {} fieldValue
	 * @param {} parentNode
	 * @return {}
	 */
	findGroupNodeByText:function( fieldName, fieldValue, parentNode){
		if(!parentNode)
			parentNode = Ext.getCmp('groupPanel').getRootNode();
		for(var i = 0; i<parentNode.childNodes.length;i++){
			var node = parentNode.childNodes[i];
			if(node.get(fieldName) == fieldValue)
				return node;
			if(node.hasChildNodes( )){
				var node = this.findGroupNodeByText(fieldName, fieldValue, node);
				if(node != null)
					return node;
			}
		}
		return null;
	},
	/*
	 * 删除已选字段
	 */
	deleteSelectedField:function(){
//		var alarmFields = Ext.getStore('alarm.AlarmFields').getRange();
//		console.log(alarmFields);
		var me = this;
		var selectedField = Ext.getCmp('fieldlist').getSelectionModel().getSelection();
		
		if(selectedField.length == 0){
			Ext.Msg.alert("提示信息","请选择一条记录后再删除。");
		}
		else{
			//取消对删除的限制
//			for(var i = 0;i<alarmFields.length;i++){
//				var fieldName = alarmFields[i].get('fieldName');
//				if(fieldName==selectedField[0].get('fieldName')||fieldName==selectedField[0].get('')){
//					Ext.Msg.alert('提示信息','该字段在报警设置页面已经使用，不可删除。');
//					return false;
//				}
//			}
			Ext.MessageBox.confirm('提示', '确实删除  '+selectedField[0].get('sourceName')+' 吗?', function(_btn) {
				if (_btn == 'yes') {
					var store = me.getStore("field.SelectedFields");
					var idx = store.indexOf(selectedField[0]);
					store.remove(selectedField);
					// 在所能可用字段Store中动态添加计算字段
					var allFieldStore = Ext.getStore("field.AllFields");
					if(allFieldStore != null && allFieldStore != undefined && selectedField[0].get('ftype')!='field'){
		//				console.log(selectedField[0].get('sourceName'));
		//				console.log(allFieldStore.findExact('fieldName',fieldName));
						allFieldStore.removeAt(allFieldStore.findExact('sourceName',selectedField[0].get('sourceName')));
					}
					
					// 使选中删除的行的下一行，如果为最后一行，选中上一行
					idx = idx >= store.getCount()?store.getCount()-1:idx;
					Ext.getCmp('fieldlist').getSelectionModel().select(idx);
		
					// 同时删除表头分组的相应字段
					var node;
					for(var i=0;i<selectedField.length;i++){
						var model = selectedField[i]
						if(model.get('id'))
							node = me.findGroupNodeByText('id', model.get('id'));
						else
							node = me.findGroupNodeByText('text', model.get('sourceName'));
						if(node != null)
							node.remove();
						
					}
					node = null;
					model = null;
					Ext.getCmp('fieldlist').getView().refresh(); 
				}else{
					return;
				}
			})
		}
		//this.getStore("field.SelectedFields");
	},
	/*
	 * 保存计算字段公式
	 */
	saveFieldFormula:function(srcObj, e, eOpts){
		// 只在当前tab页是字段页面时才执行
		if(Ext.getCmp('designTabpanel').getActiveTab().id != 'fieldPanel')
			return;
			
		var textEdit = srcObj.up("window").down('textedit');
		if(!textEdit.isValid())
			return;
		var curSelectedRow = Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0];
		curSelectedRow.set("formula",textEdit.getText());
		curSelectedRow.set("fieldName",textEdit.getValue());
		this.editFormulaWin.close();
		// 可用字段的名称同步
		var allFieldStore = Ext.getStore("field.AllFields");
		if(allFieldStore != null && allFieldStore != undefined){
			
			var num = allFieldStore.findExact( 'sourceName', curSelectedRow.get('sourceName') );
			//console.log(num + '    ' + e.originalValue);
			if(num>=0){
				allFieldStore.getAt(num).set("fieldName",curSelectedRow.get('fieldName'));
				allFieldStore.commitChanges();
			}
		}

	},
	saveFieldFormat:function(srcObj, e, eOpts){
		if(srcObj.action == 'save'){
			// 只在当前tab页是字段页面时才执行
			if(Ext.getCmp('designTabpanel').getActiveTab().id != 'fieldPanel')
				return;
			if(!this.editFormatWin.isValid())
				return;
			Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0].set("format",this.editFormatWin.fieldFormat);
		}
		else if(srcObj.action == 'clear'){
			Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0].set("format",'');
		}
		this.editFormatWin.close();
	},

	// 根据主题ID加载可选字段与可用字段
	LoadAvailableFieldData : function(rowModel,record,index, eOpts) {
		if(record.get("nodeType") != 2 ||  this.projectId == record.parentNode.get("queryId"))
			return;
		this.projectId = record.parentNode.get("queryId")
		var fieldStore = this.getStore("field.AvailableFields");
		fieldStore.load({
					scope : this,
					params : {
						subjectId : this.projectId
					}//,
//					//回调函数中调用报警公式设置的查询方法 yzf 20120801
//					callback: function(records, operation, success) {
//						this.getController('Alarm').setFieldSourceName();
//					}
				})
		
	},
	/*
	 * 验证是否存在重复字段
	 */
	CheckSelectedField:function(){
		var fieldStore = this.getStore("field.SelectedFields");
		var checkFieldName = "sourceName";
		var allRecord = fieldStore.getRange();
		var msg = "";
		for(var i=0;i<allRecord.length;i++){
			var checkValue = allRecord[i].get(checkFieldName);
			if(checkValue == undefined || checkValue==""){
				msg += "计算字段的第"+(i+1) + "行的名称不能为空.";				
			}
			else if(checkValue.length>100){
				msg += "计算字段的第"+(i+1) + "行的名称长度不能大于100.";		
			}
			if(allRecord[i].get("displayName") == undefined || allRecord[i].get("displayName")==""){
				msg += "字段的第"+(i+1) + "行的显示名称不能为空.";				
			}
			else if(allRecord[i].get("displayName").length>100){
				msg += "字段的第"+(i+1) + "行的显示名称长度不能大于100.";		
			}
			if(allRecord[i].get('ftype') == 'computed' && (allRecord[i].get('fieldName') == null || allRecord[i].get('fieldName') == '')){
				msg += "字段的第"+(i+1) + "行的计算公式不能为空";
			}
			var repeatRecord = fieldStore.findExact(checkFieldName,allRecord[i].get(checkFieldName),i+1);
			if(repeatRecord != -1){
				msg += "”"+allRecord[i].get(checkFieldName) + "“重复;";
			}
		}
		return msg;
	},
	/*
	 * 保存之前的数据验证，在整体保存之前调用
	 */
	validBeforeSave:function(){
		//刷新表头分组的字段顺序号
		this.serialNo = 0;
		this.refreshDisplayFieldSerialByGroupTree();
		
		// 判断是否有修改
		if(this.getStore("field.SelectedFields").getModifiedRecords().length 
			+ this.getStore("field.SelectedFields").getRemovedRecords().length
			+ this.getStore("field.Group").getModifiedRecords().length
			+ this.getStore("field.Group").getRemovedRecords() == 0)
			return '-1';
		return this.CheckSelectedField();
	},
	/*
	 * 得到当前tab页所有修改的数据：已选字段、表内链接、表头分组，整体保存时调用 
	 */
	getSaveObject:function(){
		var modifiedAndDeletedFields = [];
		
		// 根据表头分组刷新字段的顺序号和分组Id
		var rootNode = Ext.getCmp('groupPanel').getRootNode();
		this.serialNo = 0;
		this.refreshDisplayFieldSerialByGroupTree();

		
		var modifiedRecord = this.getStore("field.SelectedFields").getModifiedRecords();
		var deletedRecord = this.getStore("field.SelectedFields").getRemovedRecords();
/*
		if(modifiedRecord.length + deletedRecord.length==0){
			Ext.Msg.alert("提示信息","已选字段没有变动，无须保存。");
			return;
		}

		var checkResult = this.CheckSelectedField();

		if(checkResult != -1){ // 存在重复字段
			Ext.Msg.alert("提示信息","已选字段名"+checkResult+"，请修改。");
			return;
		}

		var queryId = Ext.getCmp('queryList').getSelectionModel()
				.getSelection()[0].get('queryId');
		var result = false;
*/		//console.log("保存" + modifiedRecord.length + "个。");
		//return ;
		var modefiedFields = [];
		var maxNum = this.getStore("field.SelectedFields").getCount();
		for (var i = 0; i < modifiedRecord.length; i++) {
			var item = new Array();
			item.push(modifiedRecord[i].get("id"));
			item.push(modifiedRecord[i].get("fieldName"));
			item.push(modifiedRecord[i].get("dataType"));
			//console.log(modifiedRecord[i].get("dataType"));
			item.push(modifiedRecord[i].get("displayName"));
			item.push(modifiedRecord[i].get("sourceName"));
			//console.log(modifiedRecord[i].get("sourceName"));
			item.push(modifiedRecord[i].get("formula"));
			//console.log(modifiedRecord[i].get("fixedable")?true:false);
			item.push(modifiedRecord[i].get("fixedable")?true:false);
			item.push(Ext.isNumeric(modifiedRecord[i].get("groupable"))?modifiedRecord[i].get("groupable"):0);
			item.push(Ext.isNumeric(modifiedRecord[i].get("sortable"))?modifiedRecord[i].get("sortable"):0);
			item.push(modifiedRecord[i].get("ftype"));
			item.push(modifiedRecord[i].get("format"));
			item.push(modifiedRecord[i].get("colWidth"));
			// 下面表内链接相关信息
			item.push(modifiedRecord[i].get("hyperlink.linkType"));
			item.push(modifiedRecord[i].get("hyperlink.id"));
			item.push(modifiedRecord[i].get("hyperlink.queryId"));
			item.push(modifiedRecord[i].get("hyperlink.queryName"));
			item.push(modifiedRecord[i].get("hyperlink.url"));
//			console.log(modifiedRecord[i].get("serial"));
			var serial = modifiedRecord[i].get("serial");
			if(!Ext.isNumeric(serial))  // 异常情况会顺序号为空，这时设置为记录最大号
				serial = maxNum;
			item.push(serial);
			item.push(modifiedRecord[i].get('summary'));
			item.push(modifiedRecord[i].get('editable')?true:false);
			item.push(modifiedRecord[i].get('codeConvert'));
			item.push(modifiedRecord[i].get("groupId"));
			modefiedFields.push(Ext.encode(item));
		}
//		console.log(modefiedFields);
		//console.log(modefiedFields);
		//return ;
		var deletedFieldIds = new Array();
		for (var i = 0; i < deletedRecord.length; i++) {
			deletedFieldIds.push(deletedRecord[i].get("id"));
		}
		//得到表头分组数据
		var groupArr = new Array();
		
		//console.log(this.getStore("field.Group"));
		//console.log(this.getStore("field.Group").getNodeById('4'));
		var modifiedRecordGroup = this.getStore("field.Group").getModifiedRecords();
		var deletedRecordGroup = this.getStore("field.Group").getRemovedRecords();
		if(modifiedRecordGroup.length>0){
			var nodeArr = rootNode.childNodes;
			for(var i=0;i<nodeArr.length;i++){
				var node = nodeArr[i];
				//只处理分组，不处理字段
				if(node.get('leaf') != true && node.get('leaf') != 'true'){
					var item = new Array();
					item.push(node.get('id'));
					item.push(node.get('text'));
					item.push("");
					item.push("");
					//item.push(node.get('serial'));
					item.push(node.get('leaf'));
					item.push(node.get('serial'));
					
					groupArr.push(Ext.encode(item));
					//groupArr.push(item);
					if(node.hasChildNodes()){
						groupArr = groupArr.concat(this.getChildNode(node));
					}
					
				}
			}
		}
		// 得到删除的表头分组
		var delGroupArr = new Array();
		for (var i=0; i<deletedRecordGroup.length; i++) {
			var node = deletedRecordGroup[i];
			// 只处理分组，不管字段 
			if(node.get('leaf') != true && node.get('leaf') != 'true')
				delGroupArr.push(node.get("id"));
		}

		//console.log(groupArr);
		modifiedAndDeletedFields.push(Ext.encode(modefiedFields));
		modifiedAndDeletedFields.push(Ext.encode(deletedFieldIds));
		modifiedAndDeletedFields.push(Ext.encode(groupArr));
		modifiedAndDeletedFields.push(Ext.encode(delGroupArr));
		return Ext.encode(modifiedAndDeletedFields);

	},
	getChildNode:function(pnode){
		var groupArr = new Array();

		var nodeArr = pnode.childNodes;
		
		for(var i=0;i<nodeArr.length;i++){
			var node = nodeArr[i];
			// 只处理分组，不处理字段
			if(node.get('leaf') != true && node.get('leaf') != 'true'){
				var item = new Array();
				item.push(node.get('id'));
				item.push(node.get('text'));
				item.push(pnode.get("id"));
				item.push(pnode.get('text'));
				item.push(node.get('leaf'));
				item.push(node.get('serial'));
				groupArr.push(Ext.encode(item));
				if(node.hasChildNodes()){
					groupArr = groupArr.concat(this.getChildNode(node));
				}
			}
		}
		return groupArr;
	},
	
	/*
	 * 根据分组实际结果刷新字段的顺序号、分组Id和分组顺序号
	 */
	refreshDisplayFieldSerialByGroupTree:function(pnode){
		if(pnode == null )
			pnode = Ext.getCmp('groupPanel').getRootNode();
		var nodeArr = pnode.childNodes;
//		console.log(pnode.get("text"));
		for(var i=0;i<nodeArr.length;i++){
			var node = nodeArr[i];
			if(!node.get('leaf')){ // 只对分组处理顺序号
				//this.getStore("field.Group").getNodeById('4')
				node.set('serial',this.serialNo ++);
			}
			if(node.get('leaf')){ // 字段
				//console.log(this.serialNo + "---原来的顺序号：" + node.get("serial"));
				//node.set("serial", this.serialNo);
				var fieldModel;
				if(node.get('id')!=undefined && node.get('id')!=""){
					fieldModel = this.getStore("field.SelectedFields").findRecord('id',node.get('id'));
				}
				else
					fieldModel = this.getStore("field.SelectedFields").findRecord('sourceName',node.get('text'));
				if(fieldModel!=null){
					fieldModel.set('serial',this.serialNo);
					if(pnode.get('id') != 'root')
						fieldModel.set('groupId',pnode.get('id'));
					else
						fieldModel.set('groupId',''); // 如果上级是根，则置上级分组id为空
					this.serialNo ++;
				}
			}	
			else if(node.hasChildNodes()){
				this.refreshDisplayFieldSerialByGroupTree(node);
			}
		}
	},
	// 根据QueryId加载已选字段 csx 20120626
	loadSelectedFieldData : function(model,record,index, eOpts) {
		if(record.get("nodeType") != 2 || record.get("qtype")!='list') //如果不是列表类型的查询，直接返回
			return;
		this.loadHeaderGroupData();
  		var queryId = record.get("queryId");
		var fieldStore = this.getStore("field.SelectedFields");
		if(queryId != ""){
			fieldStore.load({
						scope	:this,
						params : {
							queryId : queryId
						}
					})
		}
		else
			fieldStore.removeAll();
	},
	loadHeaderGroupData:function(){
		var queryId = this.getQueryId();
		var groupStore = this.getStore("field.Group");
		if(queryId != ""){
			groupStore.load({
						params : {
							queryId : queryId
						},
						callback: function(){
						        groupStore.getRootNode().expand(true);
						}
					})
		}
		
	},
	getQueryId:function(){
  		var selectedQueryModel = Ext.getCmp('queryList').getSelectionModel().getSelection();
  		var queryId = "";
  		if(selectedQueryModel != null && selectedQueryModel.length>0){
			queryId = selectedQueryModel[0].get('queryId');
  		}
		return queryId;
	},
	editFieldFormula : function(view,td, cellIndex, record,tr,rowIndex,e,eOpts){
		// 原来是写的事件，后因要控制只有在点击后面的图片时才执行，所以加了下面的这个扯蛋判断
		if(view!=null&&td!=null){
			return;
		}
		record=Ext.getCmp('fieldlist').getSelectionModel()
					.getSelection()[0];
		
		switch(cellIndex) {
			case 3:
			    // 计算字段设置公式
				 if(record.get("ftype")=="field")  // 非计算字段不可设置公式
					 return;
				 fieldController.editFormulaWin = Ext.create("HummerApp.view.design.field.EditField");
				 var fieldValue = record.get("formula");
				 fieldController.editFormulaWin.down("textedit").setText(fieldValue);
				 var txt = fieldController.editFormulaWin.down("textareafield");
				 txt.maxLength = 500;
				 txt.validate( );
//				 console.log(txt.validate( ));
				 fieldController.editFormulaWin.show();

				break;
			case 4:
				if(record.get("dataType")=="STRING"){
				 return;
				}
				 if(fieldController.editFormatWin == null || fieldController.editFormatWin.down("label[id='lblSample']")==null){
					 fieldController.editFormatWin = Ext.create("HummerApp.view.design.field.EditFormat");
				 }
				 var fieldValue = record.get("format");
				 var dataType = record.get("dataType").toLowerCase();
				 fieldController.editFormatWin.setDataType(dataType, fieldValue);
				 if(dataType=='date'){
					 fieldController.editFormatWin.setWidth(350);
					 fieldController.editFormatWin.setHeight(210);
				 }else{
				 	fieldController.editFormatWin.setWidth(297);
				 	fieldController.editFormatWin.setHeight(178);
				 }
				 
				 fieldController.editFormatWin.show();
			
				break;
		}
	},
	editGroup:function(srcBtn, e, eOpts){
		var groupPanel = Ext.getCmp('groupPanel');
		var groupField = groupPanel.getSelectionModel().getSelection();
		switch(srcBtn.action){
		case 'add':
			if(groupField.length>0 && groupField[0].isLeaf()){ // 选中叶子节点不能新增
				Ext.Msg.alert("提示信息","字段节点下不能新增节点。");
				return;
			}
			if(this.editGroupWin == null|| this.editGroupWin.down("form")==null) 
				this.editGroupWin = Ext.create("HummerApp.view.design.field.EditGroup");
			//this.editGroupWin.reset();
			if(groupField.length>0 /*&& !groupField[0].isRoot()*/){//因为删除的孤立节点isRoot() == true
				this.editGroupWin.down('textfield[name=parentDisplayName]').setValue(groupField[0].get('text'));
			}
			else
				this.editGroupWin.down('textfield[name=parentDisplayName]').setValue('');

			this.editGroupWin.down('textfield[name=displayName]').setValue('');
			this.editGroupWin.editState = 'add';
//			console.log(this.editGroupWin.title);
			this.editGroupWin.setTitle('新增表头分组');
			this.editGroupWin.show();

			break;
		case 'edit':
			if(groupField.length == 0){
				Ext.Msg.alert("提示信息","请选择一条记录后再编辑。");
				return;
			}
			if(groupField[0].isRoot() ){ // 选中根节点不能编辑
				Ext.Msg.alert("提示信息","根节点不能修改。");
				return;
			}
			if( groupField[0].isLeaf()){ // 选中叶子节点不能编辑
				Ext.Msg.alert("提示信息","字段节点不能修改。");
				return;
			}

			if(this.editGroupWin == null|| this.editGroupWin.down("form")==null) 
				this.editGroupWin = Ext.create("HummerApp.view.design.field.EditGroup");
			this.editGroupWin.down('textfield[name=parentDisplayName]').setValue(groupField[0].parentNode.get('text'));
			this.editGroupWin.down('textfield[name=displayName]').setValue(groupField[0].get('text'));
			this.editGroupWin.editState = 'edit';
//			console.log(this.editGroupWin.title);
			this.editGroupWin.setTitle('编辑表头分组');
			this.editGroupWin.show();
			break;
		case 'delete':
			if(groupField.length == 0){
				Ext.Msg.alert("提示信息","请选择一条记录后再删除。");
				return;
			}
			if(groupField[0].isRoot() ){ // 选中根节点不能删除
				Ext.Msg.alert("提示信息","根节点不能删除。");
				return;
			}
			if( groupField[0].isLeaf()){ // 选中叶子节点不能删除
				Ext.Msg.alert("提示信息","字段节点不能删除。");
				return;
			}
			var pNode = groupField[0].parentNode;
			var nodeIdx = pNode.indexOf(groupField[0]);
			for(var i=groupField[0].childNodes.length-1;i>=0;i--){
				pNode.insertChild(nodeIdx, groupField[0].childNodes[i].remove());
			}
			pNode.removeChild(groupField[0]);
			groupField[0].remove();
			groupField[0] = null;
			changeTitle('Field','true');
			break;
		}
	},
	/**
	 * 控制按钮是否可用
	 * @param {} m
	 * @param {} record
	 * @param {} index
	 * @param {} e
	 * @author 李成林
	 */
	selectGroup:function(m, record, index, e){
		var groupPanel = Ext.getCmp('groupPanel');
		var groupField = groupPanel.getSelectionModel().getSelection();
		var buttonAdd = groupPanel.buttonAdd;
		var buttonEdit = groupPanel.buttonEdit;
		var buttonDel = groupPanel.buttonDel;
		if(groupField.length>0 && groupField[0].isLeaf()){ // 选中叶子节点不能新增 编辑 删除
			buttonAdd.setDisabled(true);
			buttonEdit.setDisabled(true);
			buttonDel.setDisabled(true);
		}else if(groupField[0].isRoot() ){ // 选中根节点 可添加 不能编辑  删除 
			buttonAdd.setDisabled(false);
			buttonEdit.setDisabled(true);
			buttonDel.setDisabled(true);
		}else{
			buttonAdd.setDisabled(false);
			buttonEdit.setDisabled(false);
			buttonDel.setDisabled(false);
		}
	},
	/*
	 * 保存分组编辑
	 */
	saveGroupEdit:function(srcBtn){
		var groupField = Ext.getCmp('groupPanel').getSelectionModel().getSelection();
		var txtfield = this.editGroupWin.down('textfield[name=displayName]');
		if(!txtfield.validate()){
			Ext.Msg.alert("提示信息",txtfield.getErrors());
			return;
		}
		var nodeText = txtfield.getValue();
		//console.log(nodeText);
		if(this.editGroupWin.editState == 'edit'){
			groupField[0].set("text",nodeText);
			changeTitle('Field','true');
		}
		else if(this.editGroupWin.editState == 'add'){
			var newNode = Ext.create('Ext.data.NodeInterface',{
				leaf: false
			});
			var parentNode;
			// 得到上级节点
			if(groupField.length==0 || groupField[0].isRoot()){
				parentNode = Ext.getCmp('groupPanel').getRootNode();
			}
			else
				parentNode = groupField[0];
			// 验证同一节点下名称不能重复
			for(var i = 0; i<parentNode.childNodes.length;i++){
				if(parentNode.childNodes[i].get("text") == nodeText){
					Ext.MessageBox.alert('提示','新增分组”'+nodeText+'“重复。')
					return;
				}
			}
			// 创建节点
			var newNode = parentNode.createNode(newNode,{
				iconCls:'icon-table-header'
			});
			newNode.set("text",nodeText);
			newNode.set("leaf",false);
			newNode.set('iconCls', 'icon-table-header');
			var queryId = this.getQueryId();
			Ext.Ajax.request({
				url : "/hummer/application/controller/field/AddHeaderGroup.action",
				method : 'POST',
				params : {
					displayName:nodeText,
					queryId : queryId
				},
				success : function(response, opts) {
					newNode.set("id",response.responseText.replace(/'/g,""));
					//console.log(newNode.get('id'));
					parentNode.appendChild(newNode);
				}
			});
			
			
		}
		this.editGroupWin.close();
	}
});