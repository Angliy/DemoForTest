/**
 * 整体页面布局
 */

Ext.define('HummerApp.view.Viewport', {
	extend : 'Ext.container.Viewport',
    layout:'border',
    items: [
    	{
	    	region 		: 'west',
	        layout 		: 'border',
	        border:0,
			collapsible : true,
			header : false,
//			title 		: '主题查询',
//			margin : '-2 0 -1 -2',
			split 		: true,
			width 		: "20%",
			items 		: [
					{
						xtype	:'tabpanel',
					region	: 'center',
					margin : '-1 0 -1 -1',
//					border:0,
						items:[
						{
						xtype	: 'querylist',
						margin : '-2 0 0 0',
						title 	: '主题查询 ',
						id	 	: 'queryList',
						width:'100%',
						region	: 'center'
						}
						]
						
					}
			]        	
    	},
    	{
        	region	: 'center',
        	height	: 200,
        	width 	: "80%",
        	layout	: 'border',
        	 border:'0 1 1 1',
        	margin : '-2 -2 -1 0',
        	items	: [
	        		{
	            		region	: 'west',
	            		xtype 	: 'tabpanel',
	            		tabPosition :'bottom',
	            		margin : '0 -2 -1 -1',
	            		id 		: 'designAndPrePanel',
	            		width 	: "100%",
	            		items 	: [
		            			{
		            				id	 	: 'design',
		            				xtype 	: 'design'
		            			}, {
		            				id		:'previewpanel',
		            				xtype 	: 'previewpanel'
		            			}
	            		]
	        		}
        	]
    	}
    ]
});

