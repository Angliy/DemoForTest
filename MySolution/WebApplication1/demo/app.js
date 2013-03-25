/**
 * 定义demo 首页JS
 * 
 * @author 叶振飞
 * @version 2012-6-6
 */
Ext.application({
	requires: ['Ext.container.Viewport'],
	name: 'DEMO',
	appFolder: 'app',
	alias: 'widget.configdemoapp',
	controllers: ['ConfigDemo','EditConfigDemo'],
	launch: function(){
		Ext.create('Ext.container.Viewport', {
			layout: 'fit',
			items: [
			    {
			    	xtype: 'configdemogrid',
			    	//title: '系统配置项demo',
			    	html: 'List of confoig will go here'
			    }
		     ]
		     
		});
	}
       
});
