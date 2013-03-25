Ext.define('HummerApp.view.design.chart.ChartSeriesProperty', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.chartseriesproperty',
	bodyStyle : 'background:white;',
	id : 'chartSeriesFieldSetId',
	tbar : [{
				xtype : 'text',
				text : '序列'
			}, '->', {
				iconCls : 'icon-add',
				id : 'addChartSeriesId'
			}, {
				iconCls : 'icon-edit',
				id : 'editChartSeriesId',
				hidden : true

			}, {
				iconCls : 'icon-delete',
				id : 'delChartSeriesId'

			}],
	autoScroll : true,
	border : '0 0 0 0',
	layout : {
		type : 'vbox',
		padding : '4 0 0 0',
		align : 'stretch'
	}
//	,
//	items : [{
//		xtype : 'fieldset',
//		bodyStyle : 'background:transparent;',
//		region : 'center',
//		title : '序列1',
//		defaultType : 'textfield',
//		listeners : {
//			beforecollapse : function(f, eOpts) {
//				return false;
//			}
//		}
//		,
//		checkboxToggle : true,
//		collapsed : false,
//		layout : 'anchor',
//		padding : '5 0 0 0',
//		border : '1 0 0 0',
//		margins : '0 -2 0 -1',
//		defaults : {
//			anchor : '100%'
//		},
//		items : [{
//			xtype : 'charttreecontrol',
//			padding : '2 0 0 0',
//			height : 197,
//			maxHeight : 197,
//			minHeight : 197,
//			id : 'chartSeries_0',
//			store : Ext.create('HummerApp.store.chart.ChartSeriesProperty', {
//						proxy : {
//							type : 'ajax',
//							url : 'app/rdc/app/store/chart/ChartSeriesProperty.json'
//
//						}
//					}),
//			plugins : [Ext.create(
//					'HummerApp.view.design.chart.ChartCellEditing', {
//						clicksToEdit : 1
//					})]
//		}]
//	}]
});