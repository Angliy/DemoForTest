/**
 * 公式设置面板
 */
Ext.define('HummerApp.view.design.alarm.AlarmFormulaContent', {
	extend 		: 'Ext.grid.Panel',
	alias 		: 'widget.alarmformulacontent',
	//requires 	: 'Ext.ux.CheckColumn',
	columnLines : true,
	store 		: 'alarm.AlarmFormulaContent',
	columns 	: {
		items 	: [{
			xtype 		: 'rownumberer',
			width 		: 23
		},{
			text 		: '报警项',
			dataIndex 	: 'alarmItem',
			flex 		: 0.4,
			style		: 'color:#669900',
			renderer	: function(value, metadata, record){
				var gridRecord=Ext.getStore('alarm.AlarmFields').findRecord('fieldName',value);
//				console.log(Ext.getStore('alarm.AlarmFields'));
//				console.log(value);
				if (gridRecord != null) {
//					console.log('here');
//					console.log(gridRecord.get('sourceName'))
					return gridRecord.get('sourceName');
				}
				return value;
			},
        	editor	: {
        		xtype		: 'combo',
        		autoWidth	: true,
        		editable	: false,
//        		alowBank:false,
        		forceSelection	: true,
        		queryMode 	: 'local',
                displayField: 'sourceName',
                valueField	: 'fieldName',
                store		: 'alarm.AlarmFields'
        	}
		}, {
			text 		: '操作符',
			dataIndex 	: 'operation',
			flex 		: 0.2,
			style		: 'color:#669900',
        	editor		: {
        		xtype			: 'combo',
        		editable		: false,
                forceSelection	: true,
                queryMode		: 'local',
                displayField	: 'name',
                valueField		: 'value',
                store			: {
                    fields	: ['value','name'],
                    data	: [
                       {name: '>',value:'>'},
                       {name: '<',value:'<'},
                       {name: '==',value:'=='},
                       {name: '>=',value:'>='},
                       {name: '<=',value:'<='}
                    ]
                }
        	}
		}, {
			text 		: '值',
			dataIndex 	: 'values',
			flex 		: 0.4,
			style		: 'color:#669900',
			renderer	: function(value, metadata, record){
				var gridRecord=Ext.getStore('alarm.AlarmFields').findRecord('fieldName',value);//查询条件列表数据
				if (gridRecord != null) {
					return gridRecord.get('sourceName');
				}
				return value;
			},
        	editor		: {
        		xtype		: 'combo',
        		autoWidth	: true,
        		editable	: true,
        		maxLength	: 50,
        		queryMode 	: 'local',
                displayField: 'sourceName',
                valueField	: 'fieldName',
                store		: Ext.create('Ext.data.Store',{
                	id		: 'alarmContentValueStore',
                	fields	: ['sourceName','fieldName'],
                	data	: []
                })
                //'alarm.AlarmFields'
        	}
		}]
	},
	plugins : Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}),

	initComponent : function() {
		this.buttonAdd = Ext.create('Ext.button.Button',{
     		action  : 'add_formItem_button',
     		disabled:true,
     		tooltip	: '新增',
     		iconCls	: 'icon-add'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'del_formItem_button',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
     		{xtype : 'label',text : '公式设置',style:'fontWeight:bold'}, 
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonDel
     	];
     	var me = this;
		this.callParent(arguments);
//     	me.storeChange = function(){
//     		var v = (panelStore.getModifiedRecords().length>0 || panelStore.getRemovedRecords().length>0);
//			changeTitle('Alarm',v);
//			if(hasChanged != v)
//    		{
//    			hasChanged = v;
//    		}
//     	}
//		var panelStore = this.store;
//     	panelStore.on({
//     		update:function(store,record,operation,modifyFieldName,eOpts){
//     			if(operation=='edit'){
//     				me.storeChange();
//     			}
//        	},
//     		remove:function(){
//				var count = panelStore.getCount();
//				//当前数据为最后一条时，关系 列 的 值 清空
//				if(count>0){
//					var record = panelStore.getAt(count-1);
//					record.set('relation','');
//				}
//				me.storeChange();
//	        }
//        }); 
	}
});