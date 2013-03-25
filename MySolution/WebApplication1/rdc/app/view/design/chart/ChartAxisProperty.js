Ext.define('HummerApp.view.design.chart.ChartAxisProperty', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.chartaxisproperty',
			tbar : [{
						xtype : 'label',
						text : '  轴',
						heigth : 50
					}, '->', {
//						id:'tempAddSave',
//						iconCls : 'icon-save'
						 disabled:true//为使抬头高度统一使用，成高抬头

					}],
			autoScroll : true,
			border : '0 0 0 0',
			layout : {
				type : 'vbox',
				padding : '5 0 0 0',
				align : 'stretch'
			},
			items : [{
				xtype : 'fieldset',
				id:'fieldsetLeft',
				padding : '4 0 0 0',
				border : '1 0 0 0',
				margins : '0 -2 0 -1',
				checkboxToggle : true,
				title : '左轴',
				defaultType : 'textfield',
				collapsed : true,
				layout : 'anchor',
				defaults : {
					anchor : '100%'
				},
				items : [{
					xtype : 'charttreecontrol',
					padding : '2 0 0 0',
					height :197,
					maxHeight : 197,
					minHeight : 197,
					id : 'leftAxis',
					store : 'chart.ChartAxisProperty',
					plugins : [Ext.create(
							'HummerApp.view.design.chart.ChartCellEditing', {
								clicksToEdit : 1
							})]
				}]
			}, {
				xtype : 'fieldset',
				id:'fieldsetBottom',
				padding : '4 0 0 0',
				border : '1 0 0 0',
//				margins : '-3 0 0 0',
				margins : '-3 -2 0 -1',
				checkboxToggle : true,
				title : '下轴',
				defaultType : 'textfield',
				collapsed : true,
				layout : 'anchor',
				defaults : {
					anchor : '100%'
				},
				items : [{
					xtype : 'charttreecontrol',
					padding : '2 0 0 0',
					id : 'bottomAxis',
					height :197,
					maxHeight : 197,
					minHeight : 197,
					store : 'chart.ChartAxisPropertyBottom',
					plugins : [Ext.create(
							'HummerApp.view.design.chart.ChartCellEditing', {
								clicksToEdit : 1
							})]
				}]
			}, {
				xtype : 'fieldset',
				id:'fieldsetRight',
				padding : '4 0 0 0',
				border : '1 0 0 0',
//				margins : '-3 0 0 0',
				margins : '-3 -2 0 -1',
				checkboxToggle : true,
				title : '右轴',
				defaultType : 'textfield',
				collapsed : true,
				layout : 'anchor',
				defaults : {
					anchor : '100%'
				},
				items : [{
					xtype : 'charttreecontrol',
					padding : '2 0 0 0',
					id : 'rightAxis',
					height :197,
					maxHeight : 197,
					minHeight : 197,
					store : 'chart.ChartAxisPropertyRight',
					plugins : [Ext.create(
							'HummerApp.view.design.chart.ChartCellEditing', {
								clicksToEdit : 1
							})]
				}]
			}, {
				xtype : 'fieldset',
				id:'fieldsetTop',
				padding : '4 0 0 0',
				border : '1 0 0 0',
//				margins : '-3 0 0 0',
				margins : '-3 -2 0 -1',
				checkboxToggle : true,
				title : '上轴',
				defaultType : 'textfield',
				collapsed : true,
				layout : 'anchor',
				defaults : {
					anchor : '100%'
				},
				items : [{
					xtype : 'charttreecontrol',
					padding : '2 0 0 0',
					id : 'topAxis',
					height :197,
					maxHeight : 197,
					minHeight : 197,
					store : 'chart.ChartAxisPropertyTop',
					plugins : [Ext.create(
							'HummerApp.view.design.chart.ChartCellEditing', {
								clicksToEdit : 1
							})]
				}]
			}]
		});