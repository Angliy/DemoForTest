/**
 * 公式设置面板
 */
Ext.define('HummerApp.view.design.alarm.FormulaItem', {
	extend 		: 'Ext.grid.Panel',
	alias 		: 'widget.formulaitem',
	requires 	: 'Ext.ux.CheckColumn',
	columnLines : true,
	store 		: 'alarm.FormulaItems',
	
	columns 	: {
		items 	: [ {
			xtype : 'rownumberer',
			width 	: 23
		},{
			text 		: '括号',
			dataIndex 	: 'left',
			width 		: 50,
			style: 'color:#669900',
			renderer	:function(value, metadata, record){
							if (value == null || value == '&nbsp;' || value == '') {
								return '';
							}else
								return value;
				
							},
        	editor		:{
			        		xtype			: 'combo',
			        		editable		: false,
			                forceSelection	: true,
			                queryMode		: 'local',
			                displayField	: 'name',
			                valueField		: 'value',
			                store			: {
							                    fields: ['value','name'],
							                    data : [{name: '&nbsp;',value:''},{name: '(',value:'('}, {name: '((',value:'(('}]
			                				},
			                listeners		:{
							        			focus	:function(comp,e,eOpts){
									        				comp.select(this.up('gridpanel').getSelectionModel().getSelection()[0].get('left'));
									        				if(comp.value == ''){
									        					comp.setRawValue('');
									        					}
							        				}
			        						}
        				}
		}, {
			text : '报警项',
			dataIndex : 'itemName',
			width 		: 100,
			style: 'color:#669900',
			renderer:function(value, metadata, record){
//				var gridRecord=Ext.getStore('field.AvailableFields').findRecord('fieldName',value);//查询条件列表数据
				var gridRecord=Ext.getStore('alarm.AlarmFields').findRecord('fieldName',value);
				if (gridRecord) {
					return gridRecord.get('sourceName');
				}
				return value;
			},
        	editor:{
        		xtype: 'combo',
        		autoWidth: true,
        		editable: false,
        		queryMode : 'local',
                displayField: 'sourceName',
                valueField: 'fieldName',
                store:'alarm.AlarmFields'
        	}
		}, {
			text : '操作符',
			dataIndex : 'operation',
			width 		: 55,
			style: 'color:#669900',
        	editor:{
        		xtype: 'combo',
        		editable: false,
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'value',
                store: {
                    fields: ['value','name'],
                    data: [
                       {name: '>',value:'>'},
                       {name: '<',value:'<'},
                       {name: '==',value:'=='},
                       {name: '>=',value:'>='},
                       {name: '<=',value:'<='}
                    ]
                }
        	}
		}, {
			text : '值',
			dataIndex : 'value1',
			width 		: 100,
			style: 'color:#669900',
			renderer:function(value, metadata, record){
				var gridRecord=Ext.getStore('alarm.AlarmFields').findRecord('fieldName',value);
				if (gridRecord) {
					return gridRecord.get('sourceName');
				}
				return value;
					
			},
        	editor:{
        		xtype		: 'combo',
        		autoWidth	: true,
        		editable	: true,
        		maxLength	: 50,
        		queryMode 	: 'local',
                displayField: 'sourceName',
                valueField	: 'fieldName',
                store:'alarm.AlarmFields'
        	}
		},{
			text : '括号',
        	width 		: 50,
			dataIndex : 'right',
			style: 'color:#669900',
			renderer:function(value, metadata, record){
				if (value == null || value == '&nbsp;'||value == '') {
					return '';
				}else
					return value;
				
			},
        	editor:{
        		xtype: 'combo',
        		editable: false,
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'value',
                store: {
                    fields: ['value','name'],
                    data : [{name: '&nbsp;',value:''},{name: ')',value:')'}, {name: '))',value:'))'}]
                },
                listeners:{
        			focus:function(comp,e,eOpts){
        				comp.select(this.up('gridpanel').getSelectionModel().getSelection()[0].get('right'));
        				if(comp.value == ''){
        					comp.setRawValue('');
        				}
        			}
        		}
        	}
		},{
			text : '关系',
			dataIndex : 'relation',
			flex :1,
			style: 'color:#669900',
			renderer:function(value, metadata, record){
				if (value == null || value == '&nbsp;'||value == '') {
					return '';
				}else if(value == 'AND'){
//					console.log('and');
					return '并且';
				}else if (value == 'OR'){
					return '或者';
				}else
					return value;
				
			},
        	editor:{
        		xtype: 'combo',
        		editable: false,
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'value',
                store: {
                    fields: ['value','name']
                },
                listeners:{
        			focus:function(comp,e,eOpts){
        				var panel = comp.up('gridpanel');
        				var store = panel.getStore();
        				var index = store.indexOf(panel.getSelectionModel().getSelection()[0]);
        				var count = store.getCount();
        				if((count-1) == index){
        					//控制，当前数据为最后一条时，关系下拉框清空，不能选择关系
        					Ext.MessageBox.alert('提示','当前公式设置项后没有字段，无法设置关系！');
//        					Ext.MessageBox.show({  
//				                 title:"提示",  
//				                 msg:"当前公式设置项只有一条，无法设置关系！",  
//				                 width:200,  
//				                 closable:true  
//				             });
//				            setTimeout(function(){Ext.MessageBox.hide()},5000);//5s后自动关闭
        					comp.getStore().removeAll();
        				}
        				else{
        					//如果不是最后一条，则添加上关系下拉框的数据
        					comp.getStore().loadData( Ext.decode("[{name: '&nbsp;',value:''},{name: '并且',value:'AND'}," +
        							"{name: '或者',value:'OR'}]"));
        					this.select(this.up('gridpanel').getSelectionModel().getSelection()[0].get('relation'));
        				}
        				//下面这两句 没看懂 不知道要干啥
        				if(comp.value == ''){
        					comp.setRawValue('');
        				}
        			}
                }
        	}
		}
		]
	},
	plugins : Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}),

	initComponent : function() {
		this.buttonAdd = Ext.create('Ext.button.Button',{
     		action  : 'add_formItem_button',
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
     	me.storeChange = function(){
     		var v = (panelStore.getModifiedRecords().length>0 || panelStore.getRemovedRecords().length>0);
			changeTitle('Alarm',v);
			if(hasChanged != v)
    		{
    			hasChanged = v;
    		}
     	}
		this.callParent(arguments);
		var panelStore = this.store;
     	panelStore.on({
     		update:function(store,record,operation,modifyFieldName,eOpts){
     			if(operation=='edit'){
     				me.storeChange();
     			}
        	},
     		remove:function(){
				var count = panelStore.getCount();
				//当前数据为最后一条时，关系 列 的 值 清空
				if(count>0){
					var record = panelStore.getAt(count-1);
					record.set('relation','');
				}
				me.storeChange();
	        }
        }); 
	}
});