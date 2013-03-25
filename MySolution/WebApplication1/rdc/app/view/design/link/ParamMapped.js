
Ext.define('HummerApp.view.design.link.ParamMapped',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.parammapped',
	border : true,
	store : 'condition.ConditionMapped',
//	plugins: [
//              Ext.create('Ext.grid.plugin.CellEditing', {
//             	 clicksToEdit: 1
//              })
//         ],    
	columns : {
		items : [{
					text : "id",
					hidden : true,
					hideable : false,// 彻底隐藏
					dataIndex : "id"
				},{
					text : "fieldName",
					hidden : true,
					hideable : false,// 彻底隐藏
					dataIndex : "fieldName"
				},{
					text : "是否必选",
					dataIndex : "required",
					renderer:function(value){
						return value?"  <p align=\"center\" style=\"color:red\"/>*</p> ":""
					},
					flex : 0.2
				},
				{
					text : "名称",
					dataIndex : "sourceName",
					flex : 0.4
				},
				{
					text : "对应的参数",  //可用字段列表
					dataIndex : "mappedParam",//"mappedParam","fieldName"
					flex : 0.4,
					renderer:function(value, m, record ,rowIndex,colIndex,store,view) { 
						var paramFieldName = record.data.fieldName;
						var avilableFieldStore = Ext.getStore('field.AvailableFields');
						var comboRecord = avilableFieldStore.findRecord('fieldName',paramFieldName);
						var displayText = ""; 
//						alert(comboRecord);
						if (comboRecord == null) { 
//							displayText = value; 
						} else { 
							displayText = comboRecord.data.sourceName;// 获取record中的数据集中的display字段的值 
						}
						return displayText;
					},
					
					editor : {
						xtype:'combo',
							editable : false,
							queryMode : 'local',
							displayField : 'sourceName',
							valueField  : 'fieldName',
						//						lazyRender: true,
							store:'field.AvailableFields'

					}
				}
				]
	}
	
})