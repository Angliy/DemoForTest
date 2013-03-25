/**
 * 查询设计
 */

Ext.define('HummerApp.view.Design', {
    extend: 'Ext.panel.Panel',
    alias:'widget.design',
    plain: true,
    layout:'fit',
    title:'设计',
    margin : '0 -2 -1 -2',
    items: [
         {
        	xtype:'tabpanel',
        	hidden:true,
        	margin : '-1 -2 0 1',
        	id:'designTabpanel',
            items:[
				{
					xtype:'fieldpanel',
					margin : '0 0 -1 0',
					id:'fieldPanel'
				},
				{
					xtype:'linkpanel',
					id:'linkPanel'
				},
				{
					xtype:'conditionpanel',
					margin : '0 0 -1 0',
					id:'conditionPanel'
				},
				{
					xtype:'buttonpanel',
					margin : '-2 0 0 0',
					id:'buttonPanel'
				},
				{
					xtype:'alarmpanel',
					margin : '0 0 -1 0',
					id:'alarmPanel'
				},
				{
					xtype:'optionpanel',
					id:'optionPanel'
				},
				{
					xtype:'chartpanel',
					id:'chartPanel'
				},
				{
					xtype:'mashuppanel',
					id:'mashupPanel'
				}
            ]
        	 
         }

        	      
    ],
    initComponent: function() {
      this.callParent(arguments);
     }
});
