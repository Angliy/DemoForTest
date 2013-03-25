/**
 *已选字段列表面板
 */
Ext.define('HummerApp.view.design.alarm.AlarmList', {
	extend: 'Ext.grid.Panel',
	alias:'widget.alarmlist',
	border:true,
	enableDragDrop: true,
	proxy	: this,
    viewConfig: {
    	scope:this,
    	saveAlarmField:function(data,panel){
    			var queryRecord = Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
    			var qtype = queryRecord.get('qtype');
    			if(qtype != 'list'){
    				return false;
    			}
        		var queryId = queryRecord.get('queryId');
        		var fieldName = data.records[0].get('fieldName');
				Ext.Ajax.request({
				    url: '/hummer/application/controller/alarm/AddAlarmField.action',
				    params: {
				        queryId: queryId,
				        fieldName : fieldName,
				        fieldType : data.records[0].get('dataType')
				    },
				    callback : function(records, operation, success){
				    	var records = Ext.decode(success.responseText);
//				    	var store = Ext.getStore('alarm.AlarmFields');
//				    	if(records.length > 0){
//				     		for(i=0;i<records.length;i++){
////				     			var record = Ext.getStore('field.AvailableFields').findRecord('fieldName',records[i].fieldName);
//				     			var record = Ext.getStore('field.SelectedFields').findRecord('fieldName',records[i].fieldName);
//				     			if(record != null){
//			        				records[i].sourceName = record.get('sourceName');
//				     			}
//			        		}
//	     				}
//				    	store.loadData(records);
//				    	var index = store.findExact('fieldName',fieldName);
//				    	if(index != -1)
//				    		panel.getSelectionModel().select(index);
//				    	store.commitChanges();
				    }
				});
	},
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'secondGridDDGroup',
            dropGroup: 'selectedGridDDGroup'
        },
        listeners: {
        	beforedrop: function(node, data, overModel, dropPosition) {
        		
        		if(!data.records[0].get('id')){
        			Ext.Msg.alert('提示信息','新增的字段需先保存才能使用');
        			return false;
        		}
        		if(data.records[0].get('fieldName') == ""){
        			return false;
        		}
        		var storeCount = this.getStore().getCount();
        		if(storeCount > 0){
        			var fieldName = data.records[0].get('fieldName');
        			var storeIdx = this.getStore().findExact('fieldName',fieldName);
        			if(storeIdx != -1){
        				return false
        			}else{
        				 return this.saveAlarmField(data,this);
        			}
        		}else{
        			return this.saveAlarmField(data,this);
        		}
        		
            }
        }
    },
    store:'alarm.AlarmFields',
	columns: {
    	items: [
    	        {
    	        	text		: "名称",
    	        	dataIndex	: "fieldName",
    	        	renderer 	: function(value){
//    	        		var record = Ext.getStore('field.AvailableFields').findRecord('fieldName',value);
    	        		var record = Ext.getStore('field.SelectedFields').findRecord('fieldName',value);
    	        		if(record != null){
    	        			return record.get('sourceName');
    	        		}else{
    	        			return '';
    	        		}
    	        	},
    	        	listeners:{
    	        		'afterrender':function(comp,eOpts){
//    	        			var store = Ext.getStore('alarm.AlarmFields');
//    	        			var alarmRecords = store.getRange();
//    	        			var selectRecords = Ext.getStore('field.SelectedFields').getRange();
//    	        			for(var i = 0;i<alarmRecords.length;i++){
//    	        				for(var j = 0;j<selectRecords.length;j++){
//									if(alarmRecords[i].get('fieldName')==selectRecords[j].get('fieldName')){
//										alarmRecords[i].sourceName = selectRecords[j].get('sourceName');
//										alarmRecords[i].set('sourceName', selectRecords[j].get('sourceName') )
//									}   	        				
//    	        				}
//    	        			}
//    	        			store.commitChanges();
//    	        			console.log(alarmRecords);
    	        		}
    	        	}
    	        }
    	        ],
        defaults: {
        	flex: 1
        }
    },
    initComponent: function() {
    	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'dele_alarm_button',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
     		{xtype: 'label', text: '报警字段',style:'fontWeight:bold'},
           '->',// 以下按钮靠右
           this.buttonDel
     	];
    	this.callParent(arguments);
    }
    
});