/**
 * 表头及字段设计面板
 */

Ext.define('HummerApp.view.design.condition.Condition', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.conditionpanel',
	title : '查询条件',
	layout: 'border',
	items : [ {
		region:'west',
		width:"25%",
		xtype : 'availablefield',//allfield(原始字段+计算字段)  availablefield(原始字段)
		margins: '-1 0 0 -1',
        animCollapse: true,
        split: true,
        collapsible: true
	}, {
		region:'center',
		width:"75%",
		xtype : 'conditionlist',
		margins: '-3 0 0 0',
		id:'conditionList'
	}

	]
});