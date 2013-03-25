/**
 * 报警公式设置面板
 */
Ext.define('HummerApp.view.design.alarm.Alarm', {
	extend: 'Ext.panel.Panel',
	alias:'widget.alarmpanel',
	title:'报警设置',
	layout: 'border',
//	margins: '0 0 0 -1',
//	splitbar : 'mini',
    items: [
		{  
		    region:'west',  
		    width:"25%", 
		    split: true,
		    collapsible: true,
		    margins: '-1 0 0 -1',
//		    xtype: 'allfield'
		    xtype:'gridpanel',
		    id:'gridAlarmField',		    
		    header : false,
			columnLines : true,
			border : true,
			tbar : [{
						xtype : 'label',
						text : '可用报警字段',
						style : 'fontWeight:bold; height:20px; vertical-align:middle'
					}],
			height : 400,
			stripeRows : true,
			selModel: Ext.create('Ext.selection.CheckboxModel',{checkOnly:true}),
		    store : 'field.AllFields',
			columns : [{
							text : "名称",//使用显示名称
							width : 130,
							//请不要使用locked属性，否则会出现两个checkbox框
//							locked : false,
//							dataIndex : "displayName"
//							dataIndex:'fieldName'
							dataIndex:'sourceName'
						}, {
							text : "类型",
							flex : 1,
							minWidth : 70,
							groupable:false,
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
								if(value.indexOf('CHAR')>-1){
									return '字符串型'
								}	
								return value;
							}
						}]
		    
		},{
			region: 'center',
			header : false,
			width:"75%", 
			margins: '-1 -1 -1 0',
			split: true,
			collapsible: true,
		    xtype:'panel',
	        layout:'border',
	        items:[{
		        region:'north',
			    width:"100%", 
			    xtype:'alarmgroup' ,
			    margins: '-3 0 0 -1',
			    id : 'alarmgroup',
			    height:200
			},{
				region: 'center',
				width:"100%",
				header : false,
				margins: '-2 -1 0 -1',
				split: true,
				collapsible: true,
			    xtype:'panel',
		        layout:'border',
		        items:[{
		        	region:'west',
				   	xtype: 'alarmformula',
				   	margins: '-2 1 -1 -1',
				   	id : 'alarmformula',
				   	split: true,
				   	width : '70%'
			   },{
					region:'center',
					id : 'alarmformulacontent',
					margins: '-2 0 -1 -1',
				   	xtype: 'alarmformulacontent',
				   	width : '30%'
			   }]
			}]
		}
    ]
    
});