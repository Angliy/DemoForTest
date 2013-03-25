Ext.define('HummerApp.view.PublishWindow', {
    extend		: 'Ext.window.Window',
    alias 		: 'widget.publishwindow',
    layout		: 'center',
    autoShow	: true,
    initComponent: function() { 
     	Ext.apply(this, {
			title 	: '发布查询',
			width	:600,
			height	:340,
			layout	: 'fit'
    	});
     	this.callParent(arguments);
     }
})