/**
 * 表头及字段设计面板
 */

Ext.define('HummerApp.view.design.chart.ChartType', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.charttypepanel',
	title : '图表类型',
	layout : 'border',
	border : 0,
	margins : '-1 0 0 -1',
	initComponent : function() {
		this.callParent(arguments);
		var chartMonitorStore = Ext.getStore('chart.ChartMonitor');
		chartMonitorStore.on({
					update : this.chartMonitor
				});
	},

	items : [{
				// columnWidth:.1,
				xtype : 'grid',
				title : '图表类型',
				margins : '0 0 -1 0',
//				 border : 0,
//				bodyBorder:false,
//				bodyStyle : 'border-width:0px 0px 0px 0px;',
				animCollapse : true,
				split : true,
				collapsible : true,

				region : 'west',
				id : 'chartType',
				width : "20%",
				store : 'chart.AvailableChart',
				columns : {
					items : [{
								text : "名称",
								flex : 1,
								dataIndex : "name"
							}, {
								text : "类型",
								hidden : true,
								hideable : false,// 彻底隐藏
								dataIndex : "type"
							}]
				}
			}, {
				xtype : 'chartControlPanel',
				id : 'chartControlPanelType',
				title : '预览',
				bodyStyle : 'background:white;',
				margins : '0 0 -1 0',
				// border : 0,
				bbar : [{
							xtype : 'combo',
							id : 'multiChartY',
							editable : false,
							labelAlign : 'right',
							labelWidth : 40,
							fieldLabel : '多Y轴',
							store : 'chart.MultiChartY',
							displayField : 'name',
							valueField : 'value',
							value : '无',
							queryMode : 'local'
						}, {
							xtype : 'combo',
							id : 'multiChartYType',
							editable : false,
							labelAlign : 'right',
							labelWidth : 90,
							fieldLabel : '多Y轴序列类型',
							store : 'chart.AvailableChart',
							displayField : 'name',
							valueField : 'type',
							value : 'LINE',
							queryMode : 'local'
						}],
				region : 'center'
			}

	],
	chartMonitor : function() {
		var v = (Ext.getStore('chart.ChartMonitor').getModifiedRecords().length > 0);
		// changeTitle('ChartType', v);
		// if (hasChanged != v) {
		// hasChanged = v;
		// }
	}
}

);