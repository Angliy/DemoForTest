/**
 * 表头及字段设计面板
 */
Ext.define('HummerApp.view.design.button.Button', {
	extend: 'Ext.grid.Panel',
	alias:'widget.buttonpanel',
	title:'控制按钮',
//	bodyPadding:'-1',
//	border:'-1',
//	padding	: '5 -1 -1 -1',
	columnLines:true,
	viewConfig: {
        plugins: {
			ptype : 'gridviewdragdrop',
			ddGroup : 'firstGridDDGroup'// 拖拽
        },
        listeners : {
			drop : function(node, data, dropRec, dropPosition) {
				var records = this.getStore().getRange();
				for (var i = 0; i < records.length; i++) {
					records[i].set('serial', i);
				}
			}
		}
    }, 
    store:'button.Buttons',
    initComponent: function() {
    	var cellEditor;
    	this.buttonAdd = Ext.create('Ext.button.Button',{
     		action  : 'add_button_button',
     		tooltip	: '新增',
     		iconCls	: 'icon-add'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'delete_button_button',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonDel
     	];
    	
    	btypeSet = function(value){
        	if(value == 'preset'){
        		return '预置';
        	}else if (value == 'separator'){
        		return '分离器';
        	}else if (value == 'querylink'){
        		return '查询';
        	}else if (value == 'urllink'){
        		return 'URL';
        	}
    	};
        Ext.apply(this, {
			plugins : [cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					})],
    		columns : [
    					{	
    					xtype		: 'rownumberer', 
    					width 		: 20,
//    					locked:true,
    					hidden : true,
						hideable : false
    					},
    		            {
    		            	header		: '按钮名称',  
    		            	dataIndex	: 'name', 
    		            	width : 100,
    		            	style: 'color:#669900',
    		            	editor		: {
    		            	xtype 		: 'textfield',
    		            	maxLength 	: 50,
    		            	maxLengthText: '字符串长度不能超过50个字符',
    		            	allowBlank 	: false
    		            	}
    		            },
    		            {	
    		            	header		: '图标', 
    		            	dataIndex	: 'icon',
    		            	width : 60,
    		            	style: 'color:#669900',
    		            	renderer 	: function(value, metadata, record){
    		            			metadata.tdCls = value;
    		            	},
    		            	editor		:{
    		            				xtype 	: 'combo',
    		            				name	: 'icon',
			    		            	align 	: 'center',
						        		store 	: Ext.create('Ext.data.Store',{
						        					fields	: ['name', 'icon','value'],
						        					autoLoad:true,
									    			proxy	: {
									    					type :'ajax',
									    					url  : '../hummer/app/rdc/app/store/button/icon.json'
									    			},
									    			reader	: {
	                    									type : 'json'
	                    							}
									    		}),
										labelAlign	: 'right',
										tpl			: '<tpl for="."><div x-boundlist-item:qtip="{icon}" class="x-boundlist-item"><img src="{icon}" width="16" height="16" align="center"></div></tpl>',
										displayField: 'name',
			        					valueField  : 'value',
										editable	: false,
										multiSelect : false
    		            	}
    		       		},
    		       		{
    		       			header		: '是否显示', 
    		       			id			: 'display',
    		       			dataIndex	: 'display', 
    		       			renderer 	: function(value){
					        	if(value == 'true'||value==true){
					        		return '是';
					        	}else if (value == 'false'||value==false){
					        		return '否';
					        	}else {
					        		return value;
					        	}
					    	}, 
    		       			width : 70,
    		       			style: 'color:#669900',
    		            	editor		:{
	    		            	xtype 		: 'combo',
								editable 	: false,
								forceSelection : true,
								queryMode 	: 'local',
								displayField: 'name',
								valueField 	: 'value',
								store: {
									fields 	: ['name', 'value'],
									data 	: [
										{name : '是',value : true}, 
										{name : '否',value : false}
									]
								},
								listeners:{
									focus : function(selectText, delay) {
										var record = this.up('buttonpanel').getSelectionModel().getSelection()[0];
										var displayStr = record.get('display');
										if(displayStr=="true"||displayStr==true){
											this.setValue(true);// 设置默认选中
										}else{
											this.setValue(false);
										}
									}
								}
    		            	}
    		        	},
    		       		{
    		       			header		: '类型', 
    		       			dataIndex	: 'btype', 
    		       			renderer 	: btypeSet, 
    		       			width : 55,
    		       			style: 'color:#669900',
    		            	editor		:{
	    		            	xtype 		: 'combo',
								editable 	: false,
								forceSelection : true,
								queryMode 	: 'local',
								displayField: 'name',
								valueField 	: 'value',
								store: {
									fields 	: ['name', 'value'],
									data 	: [
										{name : '查询',value : 'querylink'}, 
										{name : 'URL',value : 'urllink'}
									]
								}
    		            	}
    		        	},
    		            {	text		: "查询名称", 
    		            	dataIndex	: 'queryName',  
    		            	width : 180,
    		            	style: 'color:#669900',
    		            	renderer	: function(value, metadata, record){
											  if(record.get('btype')=='querylink'){
				    		            			var text="";
													value == null ? text = '' : text =value;
													if(value!=null&&value.length==0){
														text = '';
													}
												text='<div style="float:left">'+text+'</div>';
												return text+'<a href="#" onclick="buttonSimulationClickEvents(4)"><img src="images/icon/dot.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -5px;" align="right"></a>';
											  }else{
											  	return  "";
											  }										 
										 }
    		            },
    		            {	text		: "链接地址", 
    		            	dataIndex	: 'url',  
//    		            	flex		: 0.25,
    		            	width : 150,
    		            	style: 'color:#669900',
    		            	renderer	: function(value, metadata, record){
				    		            		if(record.get('btype')=='urllink'){
				    		            			var text="";
													value == null ? text = '未设置' : text = '已设置';
													if(value!=null&&value.length==0){
														text = '未设置';
													}
													text='<div style="float:left">'+text+'</div>';
													return text+'<a href="#" onclick="buttonSimulationClickEvents(5)"><img src="images/icon/function.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -5px;" align="right"></a>';
												}else{
													return  ""; 
												}
    		            				}
    		            },
    		            {
    		            	header		: '打开方式', 
    		       			dataIndex	: 'showin', 
    		       			style: 'color:#669900',
    		       			renderer 	: function(value){
    		       				if(value == ''){
    		       					return '';
    		       				}else if(value == 'tab'){
    		       					return 'Tab页';
    		       				}else if(value == 'window'){
    		       					return '窗口';
    		       				}else if(value == 'message'){
    		       					return '提示信息';
    		       				}else{
    		       					return '';
    		       				}
    		       			}, 
//    		       			flex		: 0.1,
    		       			width : 80,
    		            	editor		:{
	    		            	xtype 		: 'combo',
								editable 	: false,
								forceSelection : false,
								queryMode 	: 'local',
								displayField: 'name',
								valueField 	: 'value',
								store 		: {
										fields 	: ['name', 'value'],
										data 	: [
													{
														name:'&nbsp;',
														value : ''
													}, {
														name : 'Tab页',
														value : 'tab'
													},{
														name : '窗口',
														value : 'window'
													},{
														name : '提示信息',
														value : 'message'
													}
												  ]
								},
								listeners:{
									change : function(field,newValue,oldValue,eOpts){
												var record = Ext.getCmp('buttonPanel').getSelectionModel().getSelection();
												if(newValue == 'window'){
													record[0].set('height','500');
													record[0].set('width','500');
												}else{
													record[0].set('height','');
													record[0].set('width','');
												}
										
									}
								}
    		            	}
    		            },
    		            {
    		            	header:'窗口宽度',
//    		            	flex		: 0.1,
    		            	width : 60,
    		            	dataIndex	: 'width',
    		            	style: 'color:#669900',
    		            	editor		: {
	    		            	xtype 		: 'numberfield',
	    		            	allowDecimals: false,//不能为小数
								allowNegative: false,//需为正数
								allowBlank: false,
								minValue  : 1,
								maxValue  : 999999999
    		            	}
    		            },
    		            {
    		            	header:'窗口高度',
    		            	flex		: 1,
    		            	minWidth : 60,
    		            	dataIndex	: 'height',
    		            	style: 'color:#669900',
    		            	editor		: {
	    		            	xtype 		: 'numberfield',
	    		            	allowDecimals: false,//不能为小数
								allowNegative: false,//需为正数
								allowBlank: false,
								minValue  : 1,
								maxValue  : 999999999
    		            	}
    		            	
    		            }
    		        ]
    	});
		this.storeChange = function(){
     		var v = (panelStore.getModifiedRecords( ).length>0 || panelStore.getRemovedRecords().length>0);
 			Ext.getCmp('buttonPanel').getView().refresh(); //刷新view，render内容显示
			changeTitle('Button',v);
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
// 模拟调用点击表格点击事件
function buttonSimulationClickEvents(value) {
	Ext.getCmp('buttonPanel').fireEvent('cellclick', null, null, value);
};