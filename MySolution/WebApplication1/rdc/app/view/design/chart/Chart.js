Ext.define('HummerApp.view.design.chart.Chart', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.chartpanel',// 图表总panel
			title : '图表定义',
			layout : 'border',
			border : '0 0 0 0',
			margins: '-1 0 0 -1',
			items : [{
						region : 'west',
						width : "32%",
						xtype : 'chartaxisproperty',
						animCollapse : true,
						split : true

					}, {
						region : 'center',
						margins: '-2 0 0 -1',
						
						xtype : 'chartseriesproperty'
						
					}, {
						xtype : 'panel',
						padding : '0 0 0 0',
						region : 'east',
						width : "36%",
//						autoScroll : true,
						animCollapse : true,
						split : true,
						layout : 'border',
						items : [{
									xtype : 'panel',
									id:'chartView',
									region : 'center',
									 layout: {
									        type: 'vbox',
									        align: 'center'
									    },
								
									bodyStyle : 'border-width:1px 0 1px 0;background:white;',
									dockedItems: [{
												    xtype: 'toolbar',
												    style: {
												             marginTop: '-3px',
												             marginLeft: '-1px'
												        },
												    dock: 'top',
												    items: [
												        { 
													        xtype: 'label',
													       	text: '预览' 
												        }, 
												        '->',
												        { 
													         xtype: 'textfield', 
													         fieldLabel:'预览记录数',
													         value : '10',
													         maxWidth:140,
													         maxHeight:20,
													         labelAlign:'right',
													         id:'chartViewNumber' 
												         },
												         '-',
												         { 
												        	iconCls : 'icon-refresh',
															id : 'chartRefreshId'	
//												        	disabled:true
												         }
												    ]
										}]
//									html:'<iframe name="viewframe" src="report.action?queryId='+queryId+' frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>'
								}, {
									xtype : 'panel',
									animCollapse : true,
									split : true,
									id:'southPanel',
									region : 'south',
//									border : 0,
									layout : 'border',
									height : 248,
									bodyStyle : 'border-width:1px 0 0 0;background:red;',
									dockedItems: [{
												    xtype: 'toolbar',
												    style: {
												             marginLeft: '-1px',
												             marginBottom: '-1px'
												        },
												    dock: 'top',
												    items: [
												        { xtype: 'label', text: '选项' }, '->',{ disabled:true}
												    ]
										}],
									items : [{
												id : 'chartBasicProperty',
												xtype : 'chartbasicproperty',
												border : 0,
												region : 'center',
												margins : '0 -2 -2 -2'
											}]
								}]

					}]
		});