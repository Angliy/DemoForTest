/**
 *报警公式项列表面板
 */
Ext.define('HummerApp.view.design.alarm.AlarmFormula', {
	extend		: 'Ext.grid.Panel',
	alias		:'widget.alarmformula',
//	border		:true,
//	enableDragDrop	: true,
	columnLines:true,
	plugins		: [
       Ext.create('Ext.grid.plugin.CellEditing', {
      	 clicksToEdit: 1
       })
  	],
    store	: 'alarm.AlarmFormula',
	columns	: {
    	items: [
//    		{	
//			xtype		: 'rownumberer',
//			width 		: 25
//		},
			{
			header		: '名称',
        	dataIndex	: 'name',
        	flex 		: 0.2,
        	style		: 'color:#669900',
        	editor		: {
            	xtype 		: 'textfield',
            	maxLength 	: 50,
            	maxLengthText: '字符串长度不能超过50个字符',
            	allowBlank 	: false
        	}
		},{
			xtype 			: 'checkcolumn',
			dataIndex 		: 'isValid',
			header 			: '有效',
			flex 			: 0.08,
			style			: 'color:#669900'
		},{
			text 		: '前景色',
			flex 		: 0.1,
			dataIndex 	: 'foreground',
			style		: 'color:#669900',
			renderer	: function (value, metadata, record) {
				 if(value != null && value != ''){
				       metadata.tdCls = Ext.getStore('alarm.ColorStore').findRecord('value',value).get('icon'); 
				 }
			},
			editor		: {
			    xtype 		: 'combo',
            	align 		: 'center',
            	collapsed	: true,
        		store 		: 'alarm.ColorStore',
				labelAlign	: 'right',
				tpl			: '<tpl for="."><div class="x-boundlist-item"><img src="{address}" width="16" height="16">&nbsp;{name}</div></tpl>',
				displayField: 'name',
				valueField  : 'value',
				iconClsField:'icon',
				editable	: false,
				multiSelect : false
			}
		},{
			text 		: '背景色',
			flex 		: 0.1,
			dataIndex 	: 'background',
			style		: 'color:#669900',
			renderer	: function (value, metadata, record) {   
				if(value != null && value != ''){
//				       metadata.tdCls = Ext.getStore('alarm.ColorStore').findRecord('icon',value).get('icon'); 
				metadata.tdCls = value;
				}
			},
			editor		: {
              	xtype 		: 'combo',
            	align 		: 'center',
            	collapsed	: true,
        		store 		: 'alarm.ColorStore',
				labelAlign	: 'right',
				tpl			: '<tpl for="."><div class="x-boundlist-item"><img src="{address}" width="16" height="16">&nbsp;{name}</div></tpl>',
				displayField: 'name',
				valueField  : 'icon',
//				iconClsField:'icon',
				editable	: false,
				multiSelect : false
			}
		},{
			text 		: '报警方式',
//			flex		: 1,
			flex 		: 0.2,
			dataIndex 	: 'alarmMode',
			style		: 'color:#669900',
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
		},{
			
			text 		: '报警列',
			flex		: 0.2,
			dataIndex 	: 'alarmColumn',
			style		: 'color:#669900',
			renderer	: function (value, metadata, record) {
				if (value == null || value == '') {
					return value;
				};
				var gridRecord=Ext.getStore('field.SelectedFields').findRecord('fieldName',value);//查询条件列表数据
				if (gridRecord != null) {
					return gridRecord.get('sourceName');
				}else{
					return value;
				}
			},
			editor		: {
                allowBlank		: true,
                xtype			: 'combobox',
        		editable		: false,
                forceSelection	: true,
                queryMode		: 'local',
                displayField	: 'sourceName',
                valueField		: 'fieldName',
                store:'field.SelectedFields'
            }
		}]
    },
    initComponent: function() {
    	this.buttonAdd = Ext.create('Ext.button.Button',{
     		action  : 'add_alarm_button',
     		disabled: true,
     		tooltip	: '新增', 
     		iconCls	: 'icon-add'
     	});
     	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'del_alarm_button',
     		disabled: true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
     		{xtype: 'label', text: '报警规则',style:'fontWeight:bold'}, 
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonDel
    	];
      	this.callParent(arguments);
       }
});