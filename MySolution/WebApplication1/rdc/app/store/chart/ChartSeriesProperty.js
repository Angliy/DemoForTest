Ext.define('HummerApp.store.chart.ChartSeriesProperty', {
			extend : 'Ext.data.TreeStore',
			fields : ['propertyName', 'propertyValue','propertyText', 'propertyColumn',
					'editor','displayState','propertyText']
//					,
//					proxy: {
//						type: 'ajax',
//						 url: 'app/rdc/app/store/chart/ChartSeriesProperty.json'
//        
//					}
//			root : {
//				propertyName : '标题11',
//				propertyValue : '09922',
//				propertyColumn : 'id',
//				expanded : true,
//				children : [{
//							propertyName : '显示类型',
//							propertyValue : 'zhutu',
//							propertyColumn : 'title',
//							editor : 'COMBOBOX_CHART',
//							expanded : true,
//							leaf : true
//
//						}, {
//							propertyName : '轴绑定',
//							propertyValue : '',
//							propertyColumn : 'title',
//							editor : 'COMBOBOX_DIRECTION',
//							expanded : true,
//							leaf : true
//
//						}, {
//							propertyName : 'X轴字段',
//							propertyValue : '',
//							propertyColumn : 'title',
//							editor : 'COMBOBOX_FIELD',
//							expanded : true,
//							leaf : true
//
//						}, {
//							propertyName : 'Y轴字段',
//							propertyValue : '',
//							propertyColumn : 'title',
//							editor : 'COMBOBOX_FIELD',
//							expanded : true,
//							leaf : true
//
//						}, {
//							propertyName : '显示到图示框',
//							propertyValue : true,
//							propertyColumn : 'title',
//							editor : 'COMBOBOX_YES_NO',
//							expanded : true,
//							leaf : true
//
//						}, {
//							propertyName : '标签',
//							propertyValue : '',
//							propertyColumn : 'title',
//							editor : '',
//							expanded : true,
//							leaf : false,
//							children : [{
//										propertyName : '内容',
//										propertyValue : '',
//										propertyColumn : 'title',
//										editor : 'TEXT',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '字体',
//										propertyValue : '',
//										propertyColumn : 'title',
//										editor : 'COMBOBOX_FONT',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '字号',
//										propertyValue : 10,
//										propertyColumn : 'title',
//										editor : 'NUMBER_1_100',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '颜色',
//										propertyValue : '#000000',
//										propertyColumn : 'title',
//										editor : 'COLOR',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '旋转角度',
//										propertyValue : 0,
//										propertyColumn : 'title',
//										editor : 'NUMBER_0_360',
//										expanded : true,
//										leaf : true
//
//									}]
//
//						}, {
//							propertyName : '提示框',
//							propertyValue : '',
//							propertyColumn : 'title',
//							editor : '',
//							expanded : true,
//							leaf : false,
//							children : [{
//										propertyName : '内容',
//										propertyValue : '',
//										propertyColumn : 'title',
//										editor : 'TEXT',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '宽度',
//										propertyValue : 100,
//										propertyColumn : 'title',
//										editor : 'NUMBER_1_999999',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '高度',
//										propertyValue : 100,
//										propertyColumn : 'title',
//										editor : 'NUMBER_1_999999',
//										expanded : true,
//										leaf : true
//
//									}, {
//										propertyName : '跟随鼠标显示',
//										propertyValue : true,
//										propertyColumn : 'title',
//										editor : 'COMBOBOX_YES_NO',
//										expanded : true,
//										leaf : true
//
//									}]
//
//						}, {
//							propertyName : '堆积显示',
//							propertyValue : true,
//							propertyColumn : 'title',
//							editor : 'COMBOBOX_YES_NO',
//							expanded : true,
//							leaf : true
//
//						}]
//			}
		});