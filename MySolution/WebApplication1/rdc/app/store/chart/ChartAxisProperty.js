Ext.define('HummerApp.store.chart.ChartAxisProperty', {
			extend : 'Ext.data.TreeStore',
			fields : ['propertyName', 'propertyValue', 'propertyColumn',
					'editor','displayState','propertyText']//,
//			root : {
//				propertyName : '标题11',
//				propertyValue : '09922',
//				propertyColumn : 'id',
//				expanded : true,
//				children : [{
//							propertyName : '标题',
//							propertyValue : '',
//							propertyColumn : 'title',
//							editor : 'TEXT',
//							iconCls:'icon-property',
//							expanded : false,
//							leaf : true
//
//						}, {
//							propertyName : '字段绑定',
//							propertyValue : '',
//							propertyColumn : 'fieldname',
//							editor : 'COMBOBOX_FIELD',
//							iconCls:'icon-property',
//							expanded : false,
//							leaf : true
//						}, {
//							propertyName : '最小刻度',
//							propertyValue : null,
//							propertyColumn : 'minimum',
//							editor : 'NUMBER',
//							iconCls:'icon-property',
//							expanded : true,
//							leaf : true
//
//						}, {
//							propertyName : '最大刻度',
//							propertyValue : null,
//							propertyColumn : 'maximum',
//							editor : 'NUMBER',
//							iconCls:'icon-property',
//							expanded : false,
//							leaf : true
//							// dishsize
//
//					}	, {
//							propertyName : '刻度线长度',
//							propertyValue : 3,
//							propertyColumn : 'dishsize',
//							editor : 'NUMBER_1_999999',
//							iconCls:'icon-property',
//							expanded : false,
//							leaf : true
//
//						}, {
//							propertyName : '标签',
//							propertyValue : '',
//							propertyColumn : 'label',
//							editor : '',
//							iconCls:'menu-folder-close',
//							expanded : false,
//							leaf : false,
//							children : [{
//										propertyName : '字体',
//										propertyValue : 'Tahoma',
//										propertyColumn : 'label_font',
//										editor : 'COMBOBOX_FONT',
//										iconCls:'icon-property',
//										expanded : false,
//										leaf : true
//
//									}, {
//										propertyName : '字号',
//										propertyValue : 12,
//										propertyColumn : 'label_size',
//										editor : 'NUMBER_1_100',
//										iconCls:'icon-property',
//										expanded : false,
//										leaf : true
//
//									}, {
//										propertyName : '颜色',
//										propertyValue : '#000000',
//										propertyColumn : 'label_color',
//										editor : 'COLOR',
//										iconCls:'icon-property',
//										expanded : false,
//										leaf : true
//
//									}, {
//										propertyName : '旋转角度',
//										propertyValue : 0,
//										propertyColumn : 'label_angle',
//										editor : 'NUMBER_0_360',
//										iconCls:'icon-property',
//										expanded : false,
//										leaf : true
//
//									}]
//						}, {
//							propertyName : '网格线',
//							propertyValue : '',
//							propertyColumn : 'grid_display',
//							editor : 'COMBOBOX_GRID',
//							iconCls:'menu-folder-close',
//							expanded : false,
//							leaf : false,
//							children : [{
//										propertyName : '颜色',
//										propertyValue : '#CCCCCC',
//										propertyColumn : 'grid_color',
//										editor : 'COLOR',
//										iconCls:'icon-property',
//										expanded : false,
//										leaf : true
//
//									}, {
//										propertyName : '透明度',
//										propertyValue : 1,
//										propertyColumn : 'grid_opacity',
//										editor : 'NUMBER_0_100',
//										iconCls:'icon-property',
//										expanded : false,
//										leaf : true
//									}
//
//							]
//						}, {
//							propertyName : '排序方式',
//							propertyValue : '',
//							propertyColumn : 'sort',
//							editor : 'COMBOBOX_SORT',
//							iconCls:'icon-property',
//							expanded : false,
//							leaf : true
//
//						}]
//			}
		});
