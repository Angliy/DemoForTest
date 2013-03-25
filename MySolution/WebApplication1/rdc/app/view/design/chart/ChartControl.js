Ext.define('HummerApp.view.design.chart.ChartControl', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.chartControlPanel',
			layout : 'border',
//			title : '预览',
			items : [{
						// columnWidth:.7,
						xtype : 'chart',
//						id : 'columnChart',
						title : '图表示例',
						legend : {
							position : 'right'
						},
						border : true,
						height : "100%",
						width : "70%",
						// region : 'center',
						store : 'chart.ChartTemplate',
						axes : [{
							title : '电量',
							type : 'Numeric',
							position : 'left',
							fields : ['gdl', 'sdl'],
							minimum : 0
								// maximum: 5600
							}, {
							title : '线损率',
							type : 'Numeric',
							position : 'right',
							fields : ['xsl'],
							minimum : 0,
							maximum : 20
						}, {
							title : '年月',
							type : 'Category',
							position : 'bottom',
							groupBy : 'yearmonth',
							fields : ['yearmonth']

						}],
						series : [{
									type : 'line',
									axis : 'right',
									// highlight: true,
									// color:"#0FF",
									xField : 'yearmonth',
									yField : ['xsl']
								}, {
									type : 'line',
									axis : 'right',
									xField : 'yearmonth',
									yField : ['xsll']
								}, {
									type : 'column',
									axis : 'left',
									highlight : true,
									xField : 'yearmonth',
									yField : ['gdl', 'sdl']
								}]
					}, {
						// columnWidth:.7,
						xtype : 'chart',
						legend : {
							position : 'right'
						},
//						id : 'lineChart',
						title : '图表示例',
						border : true,
						hidden : true,
						height : "100%",
						width : "70%",
						store : 'chart.ChartTemplate',
						axes : [{
							title : '电量',
							type : 'Numeric',
							position : 'left',
							fields : ['gdl', 'sdl'],
							minimum : 0
								// maximum: 5600
							}, {
							title : '线损率',
							type : 'Numeric',
							position : 'right',
							fields : ['xsl'],
							minimum : 0,
							maximum : 20
						}, {
							title : '年月',
							type : 'Category',
							position : 'bottom',
							groupBy : 'yearmonth',
							fields : ['yearmonth']

						}],
						series : [{
									type : 'line',
									axis : 'right',
									// highlight: true,
									// color:"#0FF",
									xField : 'yearmonth',
									yField : ['xsl']
								}, {
									type : 'line',
									axis : 'right',
									xField : 'yearmonth',
									yField : ['xsll']
								}, {
									type : 'line',
									axis : 'left',
									highlight : true,
									xField : 'yearmonth',
									yField : ['gdl']
								}, {
									type : 'line',
									axis : 'left',
									highlight : true,
									xField : 'yearmonth',
									yField : ['sdl']
								}

						]
					}, {
						// columnWidth:.7,
						xtype : 'chart',
//						id : 'areaChart',
						legend : {
							position : 'right'
						},
						hidden : true,
						title : '图表示例',
						border : true,
						height : "100%",
						width : "70%",
						store : 'chart.ChartTemplate',
						axes : [{
							title : '电量',
							type : 'Numeric',
							position : 'left',
							fields : ['gdl', 'sdl'],
							minimum : 0
								// maximum: 5600
							}, {
							title : '线损率',
							type : 'Numeric',
							position : 'right',
							fields : ['xsl'],
							minimum : 0,
							maximum : 20
						}, {
							title : '年月',
							type : 'Category',
							position : 'bottom',
							groupBy : 'yearmonth',
							fields : ['yearmonth']

						}],
						series : [{
									type : 'area',
									axis : 'left',
									highlight : true,
									xField : 'yearmonth',
									yField : ['gdl', 'sdl']
								}

						]
					}, {
						// columnWidth:.7,
						xtype : 'chart',
//						id : 'pieChart',
						title : '图表示例',
						border : true,
						height : "100%",
						legend : {
							position : 'right'
						},
						width : "70%",
						hidden : true,
						// region : 'center',
						store : 'chart.ChartTemplate',
						series : [{
									type : 'pie',
									highlight : true,
									showInLegend : true,
									// donut: donut,
									// color:"#0FF",
									field : ['xsl'],
									label : {
										field : 'yearmonth',
										display : 'rotate',
										contrast : true,
										font : '12px Arial'
									}
								}]
					}]
		});