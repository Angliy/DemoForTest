/**
 *已选字段列表面板
 */
Ext.define('HummerApp.view.design.alarm.AlarmGroup', {
	extend	: 'Ext.grid.Panel',
	alias	: 'widget.alarmgroup',
	columnLines : true,
    store	: 'alarm.AlarmGroup',
    plugins		: [
       Ext.create('Ext.grid.plugin.CellEditing', {
      	 clicksToEdit: 1
       })
  	],
	columns	: {
    	items : [{
        	header		: '报警项目名称',
        	dataIndex	: 'name',
//        	width 		: 200,
        	flex		: 0.7,
        	style		: 'color:#669900',
        	editor		: {
            	xtype 		: 'textfield',
            	maxLength 	: 50,
            	maxLengthText: '字符串长度不能超过50个字符',
            	allowBlank 	: false
        	}
		},{
			header		: '默认',
			dataIndex	: 'isDefault',
            xtype 		: 'checkcolumn',
//			width 		: 40,
            flex		: 0.3,
			style		: 'color:#669900'
		}
//		,{
//			header		: '描述',
//        	dataIndex	: '',
//        	flex		: 1,
//        	width 		: 100,
//        	style		: 'color:#669900'
//		}
		]
    },
    initComponent: function() {
     	this.buttonAdd = Ext.create('Ext.button.Button',{
     		action 	: 'add_alarmGroup_button',
     		disabled:false,
     		tooltip	: '增加',
     		iconCls	: 'icon-add'
     	});
    	this.buttonDel = Ext.create('Ext.button.Button',{
     		action 	: 'dele_alarmGroup_button',
     		disabled:true,
     		tooltip	: '删除',
     		iconCls	: 'icon-delete'
     	});
     	this.tbar= [
     		{xtype: 'label', text: '报警项目',style:'fontWeight:bold'},
           '->',// 以下按钮靠右
           this.buttonAdd,
           this.buttonDel
     	];
    	this.callParent(arguments);
    }
    
});