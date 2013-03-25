Ext.define('HummerApp.view.design.chart.ChartBasicProperty', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.chartbasicproperty',
			layout : 'fit',
			items : [{
				xtype : 'charttreecontrol',
				margins : '0 -2 -2 -2',
				id : 'chartStyle',
				autoScroll : true,

				store : 'chart.ChartBasicProperty',
				plugins : [Ext.create(
						'HummerApp.view.design.chart.ChartCellEditing', {
							clicksToEdit : 1
						})]
			}]
		});
