/**
 *报警公式项列表面板
 */
Ext.define('HummerApp.view.design.alarm.FormulaList', {
	extend			: 'Ext.grid.Panel',
	alias			:'widget.formulalist',
//	border			:true,
	enableDragDrop	: true,
	columnLines:true,
	 plugins		: [
			           Ext.create('Ext.grid.plugin.CellEditing', {
			          	 clicksToEdit: 1
			           })
	      ],
    store	:'alarm.AlarmFormulas',
	columns	: {
    	items: [
				{	xtype	: 'rownumberer',
					width :23
				},
				{
					text 		: '公式名称',
					columnWidth	: .4,
					width 		: 100,
					style		: 'color:#669900',
					dataIndex 	: 'alarmName',
					maxLength 	: 50,
					editor		: {
		                  allowBlank	: true
		            			}
				}, 
				{
		            xtype		: 'booleancolumn', 
		            text		: '默认',
		            trueText	: '是',
		            falseText	: '否',
		            width :50,
		            dataIndex	: 'isDefault',
		            style: 'color:#669900',
    	        	editor		:{
			    	        		xtype			: 'combobox',
			    	        		editable		: false,
			                        forceSelection	: true,
			                        queryMode		: 'local',
			                        displayField	: 'name',
			                        valueField		: 'value',
			                        store			: {
							                            fields: ['value','name'],
							                            data: [
							                               {name: '是',value:true},
							                               {name: '否',value:false}
							                            ]
			                       					  }
    	        				}
		        },{
					xtype 			: 'checkcolumn',
					header 			: '有效',
					width :40,
					dataIndex 		: 'isValid',
					stopSelection 	: false,
					style: 'color:#669900',
					listeners		:{
						checkchange	: function(){
							var colorWin = Ext.getCmp('colorWinId');
							if(colorWin){
								colorWin.close();
							}
						}
					}
				},{
					text 		: '前景色',
					width :65,
					dataIndex 	: 'foreground',
					style: 'color:#669900',
					renderer	: function (val, metadata, record) {
						 if(val != null && val != ''){
						       metadata.tdCls = Ext.getStore('alarm.ColorStore').findRecord('value',val).get('icon'); 
						 }
					},
					editor		: {
					                  xtype 	: 'combo',
			    		            	align 	: 'center',
			    		            	collapsed	: true,
						        		store 	: 'alarm.ColorStore',
										labelAlign	: 'right',
										tpl			: '<tpl for="."><div class="x-boundlist-item"><img src="{address}" width="16" height="16">&nbsp;{name}</div></tpl>',
										displayField: 'name',
			        					valueField  : 'value',
			        					iconClsField :'icon',
										editable	: false,
										multiSelect : false
										
					}
				},
				{
					text 		: '背景色',
					width :65,
					dataIndex 	: 'background',
					style: 'color:#669900',
					renderer	: function (val, metadata, record) {   
						       metadata.tdCls = val;
					},
					editor		: {
					                  xtype 	: 'combo',
			    		            	align 	: 'center',
			    		            	collapsed	: true,
						        		store 	: 'alarm.ColorStore',
										labelAlign	: 'right',
										tpl			: '<tpl for="."><div x-boundlist-item:qtip="{address}" class="x-boundlist-item"><img src="{address}" width="16" height="16">&nbsp;{name}</div></tpl>',
										displayField: 'name',
			        					valueField  : 'icon',
										editable	: false,
										multiSelect : false
										
										
					}
				},
				{
					text 		: '报警方式',
					flex:1,
					dataIndex 	: 'alarmMode',
					style: 'color:#669900',
					renderer	: function (val, metadata, record) {   
							       if(val == 'SINGLECELL'){
							       		return '单元格';
							       }else if (val == 'SINGLEROW'){
							       		return '单行';
							       }else if (val == 'FIRSTANDCELL'){
							       		return '首列加单元格';
							       }
					},
					editor		: {
		                allowBlank		: true,
		                xtype			: 'combobox',
    	        		editable		: false,
                        forceSelection	: true,
                        queryMode		: 'local',
                        displayField	: 'name',
                        valueField		: 'value',
                        store			: {
				                            fields	: ['value','name'],
				                            data	: [
						                               {name	: '单元格',value	:'SINGLECELL'},
						                               {name	: '单行',value	:'SINGLEROW'},
						                               {name	: '首列加单元格',value:'FIRSTANDCELL'}
				                            ]
                        }
		            }
				}
//		        , {
//					xtype : 'actioncolumn',
//					width : 30,
//					sortable : false,
//					items : [ {
//						icon : 'app/rdc/resources/icons/fam/delete.gif',
//						tooltip : '删除',
//						handler : function(grid, rowIndex, colIndex) {
//							// store.removeAt(rowIndex);
//						}
//					} ]
//				}
		        
    	        ]
//    	        ,
//        defaults: {
//        	flex: 1
//        }
    },
    initComponent: function() {
    	this.buttonAdd = Ext.create('Ext.button.Button',{
     		action  : 'add_alarm_button',
     		tooltip	: '新增',
     		iconCls	: 'icon-add'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'del_alarm_button',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
     		{xtype: 'label', text: '报警公式',style:'fontWeight:bold'}, 
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonDel
    	];
    	this.storeChange = function(){
     		var v = (panelStore.getModifiedRecords().length>0 || panelStore.getRemovedRecords().length>0);
			changeTitle('Alarm',v);
			if(hasChanged != v)
    		{
    			hasChanged = v;
    		}
     	}
      	this.callParent(arguments);
      	var panelStore = this.store;
   		this.store.on({
	   		load:function(store,records,successful,eOpts){
	   			var panel = Ext.getCmp('formulalist');
	   			   if(successful && records.length>0){
	   		  			panel.getSelectionModel().select(0) ; 
	   		  	}
	   		 },
	   		add:this.storeChange,
     		update:this.storeChange,
     		remove:this.storeChange
   		})
       }
});