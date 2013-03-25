/**
 * 表头及字段设计面板
 */

Ext.define('HummerApp.view.Preview', {
	extend: 'Ext.panel.Panel',
	alias:'widget.previewpanel',
    defaults :{
        autoScroll: true,
        bodyPadding: 30
    },
	title:'预览',
	hideMode: 'visibility',
	margin : '0 -2 -1 -2',
	html:''
//	html:'<iframe name="viewframe" src="report.action" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>'

});