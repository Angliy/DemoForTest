Ext.define('HummerApp.view.design.condition.ConditionList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.conditionlist',
	columnLines : true,
	enableDragDrop : true,
	viewConfig : {
		plugins : {
			ptype : 'gridviewdragdrop',
			ddGroup : 'firstGridDDGroup'// 拖拽
		},
		listeners : {
			beforedrop : function(node, data, overModel, dropPosition) {
			},
			drop : function(node, data, dropRec, dropPosition) {
				
				var records = this.getStore().getRange();
				var slectrecords = this.getSelectionModel().getSelection();
				if (slectrecords && slectrecords.length > 0) {
					if(!slectrecords[0].get('editor.etype')){
						slectrecords[0].set('editor.etype', 'text');
					}
					if(!slectrecords[0].get('defalultValue')){
						slectrecords[0].set('defalultValue', '');
					}		
				}
				for (var i = 0; i < records.length; i++) {
					records[i].set('serial', i);
				}

				
				if(slectrecords[0].get('editor.etype')=='combo'){
					 if(slectrecords[0].get('serial')>slectrecords[0].raw.serial){//combo类型的向下移动
					 	//------
					 	 if(slectrecords[0].get('cashcadeField')){//如combo有级联，级联设置内的内容判断
					 	 	if(typeof(slectrecords[0].get('cashcadeField'))=='object'){
					 	 		var tempArray=slectrecords[0].get('cashcadeField');
					 	 		 for(var j=0;j<tempArray.length;j++){
					 	 		 	if(slectrecords[0].get('cashcadeField')==''){
					 	 		 		break;
					 	 		 	}
					 	 		 	for(var i=0;i<slectrecords[0].get('serial');i++){
					 	 		 		if(records[i].get('displayName')==tempArray[j]){
					 	 		 			slectrecords[0].set('cashcadeField','');
					 	 		 			break;
					 	 		 		}
					 	 		 	}
					 	 		 	
					 	 		 }
					 	 	}else{
					 	 		if(slectrecords[0].get('cashcadeField').length>0){
					 	 			var tempArray=slectrecords[0].get('cashcadeField').split(',');
						 	 			for(var j=0;j<tempArray.length;j++){
						 	 		 	if(slectrecords[0].get('cashcadeField')==''){
						 	 		 		break;
						 	 		 	}
						 	 		 	for(var i=0;i<slectrecords[0].get('serial');i++){
						 	 		 		if(records[i].get('displayName')==tempArray[j]){
						 	 		 			slectrecords[0].set('cashcadeField','');
						 	 		 			break;
						 	 		 		}
						 	 		 	}
						 	 		 	
						 	 		 }
					 	 		}
					 	 	}
					 	  Ext.getCmp('conditionList').getView().refresh();
					 	 }
					 	//--------
					 }else{//combo类型的向上移动
					 	var tempName=slectrecords[0].get('displayName');
					 	for (var i = slectrecords[0].get('serial')+1; i < records.length; i++) {
					 		if(typeof(records[i].get('cashcadeField'))=='object'){
					 			var tempArry=records[i].get('cashcadeField');
					 			for(var j=0;j<tempArry.length;j++){
					 				if(tempArry[j]==tempName){
					 					records[i].set('cashcadeField','');
					 					break;
					 				}
					 			}
					 		}else{
					 			 if(records[i].get('cashcadeField').length>0){
					 			 	var tempArry=records[i].get('cashcadeField').split(',');
					 			 	for(var j=0;j<tempArry.length;j++){
						 				if(tempArry[j]==tempName){
						 					records[i].set('cashcadeField','');
						 					break;
						 				}
					 				}
					 			 }
					 			
					 		}
					 	}
					 	//刷新显示
					 	
					 }
					 Ext.getCmp('conditionList').getView().refresh();
				}else{
					if(slectrecords[0].get('serial')>slectrecords[0].raw.serial){//向下移动
					 	 if(slectrecords[0].get('cashcadeField')){
					 	 	if(typeof(slectrecords[0].get('cashcadeField'))=='object'){
					 	 		var tempArray=slectrecords[0].get('cashcadeField');
					 	 		 for(var j=0;j<tempArray.length;j++){
					 	 		 	if(slectrecords[0].get('cashcadeField')==''){
					 	 		 		break;
					 	 		 	}
					 	 		 	for(var i=0;i<slectrecords[0].get('serial');i++){
					 	 		 		if(records[i].get('displayName')==tempArray[j]){
					 	 		 			slectrecords[0].set('cashcadeField','');
					 	 		 			break;
					 	 		 		}
					 	 		 	}
					 	 		 	
					 	 		 }
					 	 	}else{
					 	 		if(slectrecords[0].get('cashcadeField').length>0){
					 	 			var tempArray=slectrecords[0].get('cashcadeField').split(',');
						 	 			for(var j=0;j<tempArray.length;j++){
						 	 		 	if(slectrecords[0].get('cashcadeField')==''){
						 	 		 		break;
						 	 		 	}
						 	 		 	for(var i=0;i<slectrecords[0].get('serial');i++){
						 	 		 		if(records[i].get('displayName')==tempArray[j]){
						 	 		 			slectrecords[0].set('cashcadeField','');
						 	 		 			break;
						 	 		 		}
						 	 		 	}
						 	 		 	
						 	 		 }
					 	 		}
					 	 	}
					 	  Ext.getCmp('conditionList').getView().refresh();
					 	 }
					 	
					 }else{//向上移动,非combox向上移动不做任何处理
					 	
					 }
				}
				
				

			}
		}
	},
	store : 'condition.SelectedConditions',
	initComponent : function() {
		this.buttonConfig = Ext.create('Ext.button.Button', {
			tooltip : '模板定义',
			iconCls : 'icon-config',
			handler : function() {
				var window = Ext
						.create("HummerApp.view.design.condition.PublicComponents",{
						title:'模板定义'
						});
				window.show();
			}
		});
		this.buttonDel = Ext.create('Ext.button.Button', {
					action : 'deleteCondition',
					disabled : true,
					tooltip : '删除',
					iconCls : 'icon-delete'
				});
		this.tbar = [{
					xtype : 'label',
					text : '已选条件',
					style : 'fontWeight:bold'
				}, '->',// 以下按钮靠右
				this.buttonConfig, this.buttonDel];

		/*
		 * 将 是否显示 true false转换成中文显示
		 */
		transformDisplayZH = function(value, metadata, record) {
			if (value == null) {
				record.data.display = true;
				value = true;
			}
			if (value == true) {
				return '<div align="center">是</div>';
			} else {
				return '<div align="center">否</div>';
			}
		};
		/*
		 * 将是否必选 true false转换成中文显示
		 */
		transformRequiredZH = function(value, metadata, record) {
			if (value == null) {
				record.data.required = true;
				value = true;
			}
			if (value == true) {
				return '<div align="center">是</div>';
			} else {
				return '<div align="center">否</div>';
			}
		};
		transformOperatorIsNotZH = function(value, metadata, record) {
			if(record.get('fieldName') == 'CUSTOM_ALARM_COMBO' || record.get('fieldName') == 'CUSTOM_ALARM_CHECK')
				return '';
			if (value == null) {
				record.data.operatorIsNot = false;
				value = false;
			}
			if (value == true) {
				return '<div align="center">是</div>';
			} else {
				return '<div align="center">否</div>';
			}
		};

		/*
		 * 将操作符转换成中文显示
		 */
		transformOperatorZH = function(value, metadata, record) {
			var returnVal = '';
			if(record.get('fieldName') == 'CUSTOM_ALARM_COMBO' || record.get('fieldName') == 'CUSTOM_ALARM_CHECK')
				return '';
			if (value == null) {
				record.data.operation = 'EQUAL';
				value = 'EQUAL';
			}
			switch (value) {
				case 'EQUAL' :
					returnVal = '等于';
					break;
				case 'GREATER_THAN_OR_EQUAL' :
					returnVal = '大于等于';
					break;
				case 'GREATER_THAN' :
					returnVal = '大于';
					break;
				case 'LESS_THAN_OR_EQUAL' :
					returnVal = '小于等于';
					break;
				case 'LESS_THAN' :
					returnVal = '小于';
					break;
				case 'LIKE' :
					returnVal = '模糊';
					break;
				case 'IN' :
					returnVal = '包含';
					break;
			}
			return returnVal;
		};

		transformDefalultValueZH = function(value, metadata, record) {
			// 报警公式与只显示报警不能设置录入方式   csx 20130130
			if(record.get('fieldName') == 'CUSTOM_ALARM_COMBO' || record.get('fieldName') == 'CUSTOM_ALARM_CHECK')
				return '';

			var text = "";
			(value == null||value=='') ? text = '' : text = '已设置';
			text = '<div style="float:left">' + text + '</div>';
			return text
					+ '<a href="#" onclick="simulationClickEvents(10)"><img src="images/icon/function.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -5px;" align="right"></a>';
		};

		transformCashcadeFieldZH = function(value, metadata, record) {

			if (value == null || value == '&nbsp;' || value == '') {
				record.data.cashcadeField = null;
				return '';
			}
			var tempValue = '';
			var gridRecords = record.store.getRange();// 查询条件列表数据
			for (var i = 0; i < gridRecords.length; i++) {
				if (gridRecords[i].get('fieldName') == value) {
					tempValue = gridRecords[i].get('sourceName');
					break;
				}
			}
			return tempValue;
		};

		Ext.apply(this, {
			plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					})],
			columns : [{
						text : "id",
						hidden : true,
						hideable : false,// 彻底隐藏
						dataIndex : "id"
					}, {
						text : "顺序号",
						width : 80,
						hidden : true,
						hideable : false,
						dataIndex : "serial"

					}, {
						text : "字段名称",
						hidden : true,
						hideable : false,
						dataIndex : "fieldName"
					}, {
						text : "名称",
//						locked : true,
						width : 130,
						dataIndex : "sourceName"
					}, {
						text : "字段类型",
						hidden : true,
						hideable : false,
						dataIndex : "dataType"

					}, {
						text : "类型",
						width : 55,
						dataIndex : "dataTypeZh",
						renderer:function(value,p,record){
							if(record.get('fieldName') == 'CUSTOM_ALARM_COMBO' || record.get('fieldName') == 'CUSTOM_ALARM_CHECK')
								return '';		
							return value;
						}
					}, {
						text : "显示名称",
						width : 130,
						id : "displayName",
						dataIndex : "displayName",
						style : 'color:#669900',
						editor : {
							allowBlank : true
						}
					}, {
						text : "录入方式",
						width : 85,
						id : 'inType',
						align : 'left',
						style : 'color:#669900',
						//dataIndex : "sztjlx",
						renderer : function(value, p, record) {
							// 报警公式与只显示报警不能设置录入方式 csx 20130130
							if(record.get('fieldName') == 'CUSTOM_ALARM_COMBO' || record.get('fieldName') == 'CUSTOM_ALARM_CHECK')
								return '';
							var text = '已设置';
							text = '<div style="float:left">' + text + '</div>';
							return text+'<a href="#" onclick="simulationClickEvents(7)"><img src="images/icon/dot.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -5px;" align="right"></a>';
						},
						readOnly : true
					}, {
						text : "操作符",
						width : 65,
						style : 'color:#669900',
						dataIndex : "operator",
						renderer : transformOperatorZH,
						editor : {
							xtype : 'combo',
							editable : false,
							allowBlank : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : {
								fields : ['value', 'name'],
								data : [{
											name : '等于',
											value : 'EQUAL'
										}, {
											name : '大于',
											value : 'GREATER_THAN'
										}, {
											name : '小于',
											value : 'LESS_THAN'
										}, {
											name : '模糊',
											value : 'LIKE'
										}, {
											name : '包含',
											value : 'IN'
										}]
							}
						}
					}, {
						text : "操作符反置",
						// flex : 0.1,
						width : 80,
						style : 'color:#669900',
						dataIndex : "operatorIsNot",
						renderer : transformOperatorIsNotZH,
						editor : {
							xtype : 'combo',
							id : 'operatorIsNotCombo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : {
								fields : ['value', 'name'],
								data : [{
											name : '是',
											value : true
										}, {
											name : '否',
											value : false
										}]
							}
						}
					}, {
						text : "默认值",
						width : 80,
						style : 'color:#669900',
						dataIndex : "defalultValue",
						renderer : transformDefalultValueZH
					}, {
						text : "是否显示",
						dataIndex : "display",
						width : 65,
						style : 'color:#669900',
						renderer : transformDisplayZH,
						editor : {
							xtype : 'combo',
							id : 'displayCombo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : {
								fields : ['value', 'name'],
								data : [{
											name : '是',
											value : true
										}, {
											name : '否',
											value : false
										}]
							}
						}
					}, {
						text : "是否必选",
						dataIndex : "required",
						width : 65,
						style : 'color:#669900',
						renderer : transformRequiredZH,
						editor : {
							xtype : 'combo',
							id : 'requiredCombo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : {
								fields : ['value', 'name'],
								data : [{
											name : '是',
											value : true
										}, {
											name : '否',
											value : false
										}]
							}
						}
					}, {
						text : "级联设置",
						id:'cashcadeField',
						dataIndex : "cashcadeField",
						flex : 1,
						minWidth : 80,
						style : 'color:#669900',
						// renderer : transformCashcadeFieldZH,
						renderer : function(value, metadata, record) {
							if (value == null) {
								return '';
							} else {
								return value.toString().split(",");
							}
						},
						editor : {
							xtype : 'combo',
							multiSelect : true,// 允许多选
							id : 'cashcadeFieldCombo',
							autoWidth : true,
							editable : false,
							forceSelection : true,
							selectOnFocus : true,
							allowBlank : true,
							queryMode : 'local',

							displayField : 'name',
							valueField : 'value',
							store : {
								fields : ['name', 'value']
							},
							listeners : {
								focus : function(selectText, delay) {
									// 加载级联设置的下拉列表
									var comboStore = this.getStore();// 获得combo的Store
									comboStore.removeAll();
									var conditionGrid = this.up('conditionlist');// 查询条件列表
									var conditionRecords = conditionGrid.getStore().getRange();// 获得conditionlist所有行
									var selectRecord = conditionGrid.getSelectionModel().getSelection()[0];// 获得查询行
									var conditionGridSelVal = selectRecord.get('displayName');// 获得当前选中行fieldName的值
									for (var i = 0; i < conditionRecords.length; i++) {
										// 报警公式与只显示报警不能设置录入方式 csx 20130130
										if(selectRecord.get('fieldName') == 'CUSTOM_ALARM_COMBO' || selectRecord.get('fieldName') == 'CUSTOM_ALARM_CHECK')
											continue;
										if(selectRecord.get('serial')<conditionRecords[i].get('serial')){ 
											if (conditionRecords[i].get('displayName') != conditionGridSelVal
											&&(conditionRecords[i].get('editor.etype')=='combo'
											||conditionRecords[i].get('editor.etype')=='custom'
											)) {
												var findCount = comboStore.findExact("value",conditionRecords[i].get('displayName'));
												if (findCount == -1) {
													comboStore.addSorted({
														name : conditionRecords[i].get('displayName'),
														value : conditionRecords[i].get('displayName')
													});
												}
											}
										}
									};
									if (selectRecord.get('cashcadeField') != null&& selectRecord.get('cashcadeField') != '') {
										// 设置 当再次打开下拉列表时 默认选中以选择字段
										var cashcadeStrs = selectRecord.get('cashcadeField').toString().split(",");
										this.setValue(cashcadeStrs);// 设置默认选中
									}
								}
							}
						}
					}, {
						xtype : 'actioncolumn',
						flex : 0.05,
						hidden : true,
						hideable : false,
						sortable : false,
						items : [{
									icon : 'app/rdc/resources/icons/fam/delete.gif',
									tooltip : '删除',
									handler : function(grid, rowIndex, colIndex) {
										//
									}
								}]
//					},// 隐藏后台字段
//					{
//						text : "editorId",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.id"
//
//					}, {
//						text : "dataProvider",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.dataProvider"
//
//					}, {
//						text : "etype",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.etype"
//
//					}, {
//						text : "multi",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.multi"
//					}, {
//						text : "dataProviderType",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.dataProviderType"
//					}, {
//						text : "mask",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.mask"
//					}, {
//						text : "type",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.type"
//					}, {
//						text : "name",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.name"
//					}, {
//						text : "isPublic",
//						hidden : true,
//						hideable : false,
//						dataIndex : "editor.isPublic"
					}
			]
				//
				// }
		});
		this.storeChange = function(store,record) {
			//控制‘保存按钮’状态
			var v = (panelStore.getModifiedRecords().length > 0 || panelStore.getRemovedRecords().length > 0);
			changeTitle('Condition', v);
			if (hasChanged != v) {
				hasChanged = v;
			}
//			//修改record
//			//获取更新的 当前record
//			var currentRecord = store.getModifiedRecords();
//			if(currentRecord.length==0){
//				currentRecord = store.getRemovedRecords();
//			}
//			console.log(currentRecord);
//			var records = store.getRange();
//			currentRecord = "";
			
			
			
			
			
		};
		this.callParent(arguments);
		var panelStore = this.store;
		panelStore.on({
					add : this.storeChange,
					update : this.storeChange,
					remove : this.storeChange
				});

	}

});

// 模拟调用点击表格点击事件
function simulationClickEvents(value) {
	Ext.getCmp('conditionList').fireEvent('cellclick', null, null, value);
};