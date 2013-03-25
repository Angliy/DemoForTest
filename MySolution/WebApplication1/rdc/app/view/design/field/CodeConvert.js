Ext.define('HummerApp.view.design.field.CodeConvert', {
	extend : 'Ext.window.Window',
	alias : 'widget.codeconvert',
	resizable : false,
	modal : true,
	layout : 'fit',
	// layout: 'border',
	autoShow : true,
	title:'代码转换',
	width : 433,
	height : 260,
	initComponent : function() {
		this.selectionStart = 0;
		this.selectionEnd = 0;
		this.items = [{
				xtype : 'form',
//				margin:-2,
				bodyPadding : '5',
				frame : true,
				fieldDefaults : {
					msgTarget : 'side',
					labelWidth : 75,
					labelAlign : 'right',
					defaultType : 'textfield'
				},
				defaults : {
					anchor : '100%'
				},
				items : [{
					xtype : 'tabpanel',
//					margin:-8,
					items:[{
							title: '固定',
//			            	bodyPadding: 10,
							tbar: [
							  { xtype: 'button', action:'add', 
							  iconCls : 'icon-add'
//							  text: '添加' 
							  },
							  { xtype: 'button',  action:'delete', 
							  iconCls : 'icon-delete'
//							  text: '删除'
							  }
							],
			            	xtype:'grid',
			            	overflowY:'auto',
			            	height:154,
			            	plugins:[
			            		Ext.create('Ext.grid.plugin.CellEditing', {
				 		           clicksToEdit: 1
						        })],
			            	columns:[{ header: '代码',  dataIndex: 'code',flex:0.4,field: 'textfield' },
			            		{ header: '值',  dataIndex: 'value',flex:0.4,field: 'textfield' }],
			            	store:'field.FieldConvertFixed'
		            	},{
		            		title: '动态',
		            		xtype:'panel',
//		            		bodyStyle  : 'background:red;',
		            		baseCls : 'x-panel-body-default-framed',
		            		items:[{
		            				xtype:'fieldset',
		            				margin:'0 -1 0 -1',
		            				padding : '5 10 5 10',
		            				style  : 'background:transparent;',
		            				title: 'SQL：',
		            				items:{
		            					xtype:'textareafield',
		            					width:'100%',
		            					height:'100%',
		            					autoscroll:true
		            				}
		            			},{
		            				xtype:'fieldset',
		            				margin:'0 -1 -1 -1',
		            				style  : 'background:transparent;',
		            				title: '说明：',
		            				html:'SQL语句返回的第一列为代码，第二列为值。'
		            		}]
	            			
	            		}]
					}],
				buttons : [{
						text : '确定',
						action : 'codeconvert_save',
						iconCls: 'icon-submmit',
						scope : this//,
						//handler : this.hide
					}, {
						text : '取消',
						iconCls: 'icon-remove',
						scope : this,
						action : 'cancel',
						handler : this.close
					}]
		}];

		this.callParent(arguments);
	}
	
});