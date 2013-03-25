/**
 * 已选字段列表
 */
Ext.define('HummerApp.view.design.field.FieldList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.fieldlist',
	// id:"fieldlist",
	border : true,
	columnLines : true,
	enableDragDrop : true,
	// enableDrag:false,
	viewConfig : {
		plugins : {
			ptype : 'gridviewdragdrop',
			enableDrag : false,
			dropGroup : 'firstGridDDGroup'
		}
	},
	features : [{
		ftype : 'grouping',
		// hideGroupedHeader: true,
		groupHeaderTpl : ['类型: {name:this.formatName}({rows.length})', {
					formatName : function(name) {
						return Ext.String.trim(name == 'field' ? '字段' : '计算字段');
					}
				}]
	}],
	store : 'field.SelectedFields',
	initComponent : function() {
		this.buttonCustom = Ext.create('Ext.button.Button',{
     		action  : 'custom_selectedfield',
     		tooltip	: '新增计算字段',
     		iconCls	: 'icon-custom'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'delete_selectedfield',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
           '->',// 以下按钮靠右
           this.buttonCustom,
           this.buttonDel
     	];
		var cellEditor;
		Ext.apply(this, {
			plugins : [cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					})],
			columns :
			// {
			// items:
			[{
						text : "名称",
						// flex : 0.18,
						width : 130,
						//locked:true,
						groupable:false,
						dataIndex : "sourceName",
						editor : {
							allowBlank : false,
							maxLength : 100,
							allowBlank : false
						}
					}, {
						text : "类型",
						// flex : 0.1,
						groupable:false,
						width : 70,
						dataIndex : "dataType",
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store) {
							var myStore = Ext.getStore('field.DataTypes');
							var record = myStore.findRecord('value', value);
							if (record != null)
								return record.get('name');
							if(value.indexOf('NUMBER')>-1){
								return '数值型'
							}
							if(value.indexOf('CHAR')>-1 || value.indexOf('STRING')>-1){
								return '字符型'
							}	
							return value;
						},
						editor : {
							xtype : 'combo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : 'field.DataTypes'
						}
					}, {
						text : "显示名称",
						// flex : 0.18,
						width : 130,
						groupable:false,
						dataIndex : "displayName",
						style : 'color:#669900',
						editor : {
							allowBlank : false,
							maxLength : 100,
							validator:function(value){
								if(!Ext.String.trim(value)){
									return '显示名称不能为空';
								}
								else if(!/^[^'":]+$/.test(value)){
									return '不能包含字符：\' 、 \"或:';
								}
								return true
							}//,
//							regex:/^[^'":]+$/,
//							regexText:'不能包含字符：\' 、 \"或:'
						}
					}, {
						text : "公式",
						// xtype:'actioncolumn',
						// flex : 0.1,
						width : 80,
						groupable:false,
						sortable : false,
						dataIndex : "formula",
						hidden : false,
						tooltip : '编辑公式',
						style : 'color:#669900',
						renderer : function(value, p, record) {
							if (record.get('ftype') == "field") {
								return value ? value : ""
							} else {
								value == null ? text = '' : text = '已设置';
								if (value != null && value.length == 0) {
									text = '';
								}
								text='<div style="float:left">'+text+'</div>';
								return text
										+ '<a href="#" onclick="editField(null,null,3)"><img src="images/icon/function.png" title="编辑查看" style="margin-bottom: -3px; margin-right: -5px;" align="right"></a>';
							}
						}
					}, {
						text : "格式",
						// flex : 0.15,
						width : 80,
						groupable:false,
						dataIndex : "format",
						style : 'color:#669900',
						renderer : function(value, metadata, record) {
							if (record != null) {
								if (record.data.dataType == "STRING") {
									return '';
								}
							}
							var text = "";
							value == null||value=='' ? text = '' : text = '已设置';
							text='<div style="float:left">'+text+'</div>';
							return text
									+ '<a href="#" onclick="editField(null,null,4)"><img src="images/icon/dot.png" title="编辑查看" style="margin-bottom: -3px; margin-right: -5px;" align="right"></a>';

						}
					},
					{
						text:'宽度',
						width:60,
						groupable:false,
						style : 'color:#669900',
						dataIndex:'colWidth',
						editor:{
							xtype:'numberfield',
							maxValue: 500,
							maxText:'宽度最大为500',
							allowBlank:false,
					        minValue: 0,
					        minText:'宽度最小为0',
					        nonText:'宽度必须是数字',
					        negativeText:'宽度值不能为负'
						}
					},{
						text : "可固定",
						// flex : 0.08,
						width : 60,
						groupable:false,
						dataIndex : "fixedable",
						style : 'color:#669900',
						renderer : function(value) {
							return  "<div align='center'>"+(value?'是':'否')+"</div>";
						},
						editor : {
							xtype : 'combo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : 'field.BoolStore'
						}
					}, {
						text : "可分组",
						// flex : 0.08,
						width : 65,
						groupable:false,
						dataIndex : "groupable",
						style : 'color:#669900',
						renderer : function(value) {
							var name = (value == 2?'默认分组':(value==1?'分组':'不分组'))
							return  "<div align='center'>"+name+"</div>";
						},
						editor : {
							xtype : 'combo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							store : {
								fields : ['value', 'name'],
								data : [{
											name : '分组',
											value : 1
										}, {
											name : '不分组',
											value : 0
										}, {
											name : '默认分组',
											value : 2
										}]
							}
						}
					}, {
						text : "可排序",
						flex : 1,
						groupable:false,
						minWidth : 65,
						dataIndex : "sortable",
						style : 'color:#669900',
						renderer : function(value) {
							var name = (value == 2?'默认排序':(value==1?'排序':'不排序'))
							return  "<div align='center'>"+name+"</div>";
						},
						editor : {
							xtype : 'combo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							hiddenName : 'name',
							store : {
								fields : ['value', 'name'],
								data : [{
											name : '排序',
											value : 1
										}, {
											name : '不排序',
											value : 0
										}, {
											name : '默认排序',
											value : 2
										}]
							}
						}
					}, {
						text : "可合计",
						flex : 1,
						groupable:false,
						minWidth : 65,
						dataIndex : "summary",
						style : 'color:#669900',
						renderer : function(value) {
							var store = Ext.getStore('field.FieldSummary');
//							console.log(value);
							var model = store.findRecord('value', value);
							if(model!=null)
								return  "<div align='center'>"+(model.get('name'))+"</div>";
						},
						editor : {
							xtype : 'combo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							hiddenName : 'name',
							store : 'field.FieldSummary',
							validator:function(value){
								var fieldDataType = Ext.getCmp('fieldlist').getSelectionModel().getSelection()[0].get('dataType');
								if(!(fieldDataType=='NUMBER' || fieldDataType=='FLOAT' || fieldDataType=='INTEGER') && (value == '求和' || value == '求平均数')){
									return '非数值型不能进行求和或求平均';
								}
								return true;
							}
						}
					}, {
						text : "可编辑",
						flex : 1,
						groupable:false,
						minWidth : 65,
						dataIndex : "editable",
						style : 'color:#669900',
						renderer : function(value) {
							return  "<div align='center'>"+(value?'是':'否')+"</div>";
						},
						editor : {
							xtype : 'combo',
							editable : false,
							forceSelection : true,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							hiddenName : 'name',
							store : 'field.BoolStore'
						}
					}, {
						text : "代码转换",
						flex : 1,
						groupable:false,
						minWidth : 65,
						dataIndex : "codeconvert",
						style : 'color:#669900',
						renderer : function(value) {
							return '<a href="#" onclick="editCodeConvert()"><img src="images/icon/dot.png" title="编辑查看" style="margin-bottom: -3px; margin-right: -5px;" align="right"></a>';
						}//,
//						editor : {
//							xtype : 'combo',
//							editable : false,
//							forceSelection : false,
//							queryMode : 'local',
//							displayField : 'name',
//							valueField : 'value',
//							hiddenName : 'name',
//							store : {
//								fields : ['value', 'name'],
//								data : [{
//											name : '固定',
//											value : 'fixed'
//										}, {
//											name : '动态',
//											value : 'dynamic'
//										}, {
//											name : '不转换',
//											value : ''
//										}]
//							}
//						}
					}, {
						xtype : 'actioncolumn',
						// flex : 0.05,
						width : 50,
						groupable:false,
						sortable : false,
						hidden : true,
						hideable : false,
						items : [{
							icon : 'app/rdc/resources/icons/fam/delete.gif',
							tooltip : '删除',
							handler : function(grid, rowIndex, colIndex) {
								var fieldId = grid.getStore().data
										.getAt(rowIndex).get("id");
								grid.getStore().removeAt(rowIndex);
							}
						}]
					}/**/]
		});
		/**
		 * 编辑前的验证，本身是应该写到控制器中的，
		 * 但由于extjs4.1的缺陷，在控制器的beforeedit，当有column加locked的时候，不起作用，
		 * 但在这个地方加beforeedit是起作用的
		 */
//		cellEditor.on({
//			"beforeedit":function(editor, e, eOpts){
////				console.log("field before edit");
//				fieldBeforeEditForView(editor, e, eOpts);
//			},
//			edit:function(editor, e, eOpts){
//				fieldEditForView(editor, e, eOpts);
//			}
//		});
		//判断一下store与上一个状态是否一样，一样则不再调用changeTitle方法
		this.storeChange = function(){
			
			var v = (panelStore.getModifiedRecords( ).length>0 || panelStore.getRemovedRecords().length>0);
			changeTitle('Field',v);
			if(hasChanged != v)
    		{
    			hasChanged = v;
    		}
		};
		this.callParent(arguments);
		var panelStore = this.store;
     	panelStore.on({
        	add:this.storeChange,
     		update:this.storeChange,
     		remove:this.storeChange
        }); 
	}
});
//// 模拟调用点击表格点击事件
//function fieldSimulationClickEvents(value) {
//	Ext.getCmp('fieldlist').fireEvent('cellclick', null, null, value);
//};