/**
 * 表头及字段设计面板
 */

Ext.define('HummerApp.view.design.field.Field', {
	extend: 'Ext.panel.Panel',
	alias:'widget.fieldpanel',
	title:'表头设置',
    layout: 'border',
    items: [
        {
        	region:'west',  
		    width:"24%", 
            xtype: 'availablefield',
            margins: '-1 0 0 -1',
            animCollapse: true,
            split: true,
	        collapsible: true
        },
        {
        	region:'center',
		    width:"60%", 
            xtype: 'fieldlist',
            margins: '-3 0 0 0',
            id:'fieldlist'
        },
        {
        	region: 'east',
			width:"16%",
            xtype: 'grouppanel',
            margins: '-3 1 0 0',
            id:'groupPanel',
//            title:'设置表头',
	        animCollapse: true,
	        split: true,
	        collapsible: true,
	        collapsed : false
        }
    ]
    
});