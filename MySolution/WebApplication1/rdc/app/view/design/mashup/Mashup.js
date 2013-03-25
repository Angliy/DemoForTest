Ext.define('HummerApp.view.design.mashup.Mashup', {
    extend	: 'Ext.panel.Panel',
    alias 	: 'widget.mashuppanel',
    plain 	: true,
	title 	: '布局设置',
	layout	: 'border',
	margin:'-2 0 -1 -1',
	width	: '100%',
	initComponent: function() {
		var firstPanelContent = Ext.create('Ext.form.Panel',{
    		id:'firstPanelContent',
    		title:'左',
    		margin:'-1 0 0 0',
    		constrain: true,
    		split: true,
    		region:'west',
    		width:'50%',
    		layout	: { 
	    		type	: 'hbox', 
		        pack	: 'center', 
		        align	: 'middle' 
			}, 
			items	: [{
				xtype	: 'label',
				id		: 'firstFormNameLabel',
				text	: '双击选择查询',
				disabled: true,
				hidden 	: false
			},{
				xtype	: 'label',
				id		: 'firstFormQueryIdLabel',
				text	: '',
				disabled: true,
				hidden 	: true
			},{
				xtype	: 'label',
				id		: 'firstFormLayoutIdLabel',
				text	: '',
				disabled: true,
				hidden 	: true
			},{
				xtype	: 'label',
				id		: 'firstFormLayoutRelationIdLabel',
				text	: '',
				disabled: true,
				hidden 	: true
			}]
		});
		var secondPanelContent = Ext.create('Ext.form.Panel',{
			id:'secondPanelContent',
			title:'右',
			margin:'-1 0 0 0',
			region:'center',
    		layout	: { 
	    		type	: 'hbox', 
		        pack	: 'center', 
		        align	: 'middle' 
			}, 
			items	: [{
				xtype	: 'label',
				id		: 'secondFormNameLabel',
				text	: '双击选择查询',
				disabled:true,
				hidden :false
			},{
				xtype	: 'label',
				id		: 'secondFormQueryIdLabel',
				text	: '',
				disabled:true,
				hidden :true
			},{
				xtype	: 'label',
				id		: 'secondFormLayoutIdLabel',
				text	: '',
				disabled:true,
				hidden :true
			},{
				xtype	: 'label',
				id		: 'secondFormLayoutRelationIdLabel',
				text	: '',
				disabled:true,
				hidden :true
			}]
		});
		var btn_row = Ext.create('Ext.button.Button',{
     		action  : 'button_row',
     		tooltip	: '行布局',
     		iconCls	: 'icon-top-bottom'
     	});
		var btn_column = Ext.create('Ext.button.Button',{
     		action  : 'button_column',
     		tooltip	: '列布局',
     		iconCls	: 'icon-left-right'
     	});
		this.tbar = [
           '->',
           btn_row,
           btn_column
     	];
		Ext.apply(this, {
			items:[
				firstPanelContent,
				secondPanelContent
			]
		});
		this.callParent(arguments);
	}
});

