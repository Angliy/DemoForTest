/**
 * 查询store
 */

Ext.define('HummerApp.store.chart.ChartBasicProperty', {
    extend		: 'Ext.data.TreeStore',
    requires	: 'HummerApp.model.chart.ChartBasicProperty',
    model		: 'HummerApp.model.chart.ChartBasicProperty',
    autoLoad	: false,
    root: {
		text:"root",
		expanded: true
    },
    proxy		: {
            type	: 'ajax',
            url 	: '/hummer/application/controller/chart/FindChartBasic.action'
    }
//    fields : [
//    	'propertyName',
//    	'propertyValue',
//    	'propertyColumn',
//    	'editor'
//    			],
//    ,
//    root : {
//				expanded : true,
//				children : [{
//							id				: 'title',
//							propertyName 	: '标题',
//							propertyValue 	: '',
//							propertyColumn 	: 'title',
//							editor 			: 'TEXT',
//							iconCls			: 'icon-property',
//							expanded 		: false,
//							leaf 			: true
//						}, {
//							id				: 'size',
//							propertyName 	: '尺寸',
//							propertyValue 	: '',
//							propertyColumn 	: 'size',
//							editor 			: '',
//							iconCls			: 'menu-folder-close',
//							expanded 		: false,
//							leaf			: false,
//							children 		: [{
//												id				: 'width',
//												propertyName 	: '宽度',
//												propertyValue 	: '100%',
//												propertyColumn 	: 'width',
//												editor 			: 'TEXT',
//												iconCls			: 'icon-property',
//												expanded 		: false,
//												leaf 			: true
//											}, {
//												id				: 'height',
//												propertyName 	: '高度',
//												propertyValue 	: '100%',
//												propertyColumn 	: 'height',
//												editor 			: 'TEXT',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}, {
//												id				: 'minWidth',
//												propertyName 	: '最小宽度',
//												propertyValue 	: null,
//												propertyColumn 	: 'minWidth',
//												editor 			: 'NUMBER_1_999999',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}, {
//												id				: 'minHeight',
//												propertyName 	: '最小高度',
//												propertyValue 	: null,
//												propertyColumn 	: 'minHeight',
//												editor 			: 'NUMBER_1_999999',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}, {
//												id				: 'maxWidth',
//												propertyName 	: '最大宽度',
//												propertyValue 	: null,
//												propertyColumn 	: 'maxWidth',
//												editor 			: 'NUMBER_1_999999',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}, {
//												id				: 'maxHeight',
//												propertyName 	: '最大高度',
//												propertyValue 	: null,
//												propertyColumn 	: 'maxHeight',
//												editor 			: 'NUMBER_1_999999',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}]
//						}, {
//							id				: 'legend',
//							propertyName 	: '图示框',
//							propertyValue 	: true,
//							propertyColumn 	: 'legend',
//							editor 			: 'COMBOBOX_SHOW_NOT',
//							iconCls			: 'menu-folder-close',
//							expanded 		: false,
//							leaf 			: false,
//							children 		: [{
//												id				: 'legendPosition',
//												propertyName 	: '显示位置',
//												propertyValue 	: 'BOTTOM',
//												propertyColumn 	: 'legendPosition',
//												editor 			: 'COMBOBOX_POSITION',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}]
//						}, {
//							id				: 'border',
//							propertyName 	: '边框',
//							propertyValue 	: false,
//							propertyColumn 	: 'border',
//							editor 			: 'COMBOBOX_SHOW_NOT',
//							iconCls			: 'menu-folder-close',
//							expanded 		: false,
//							leaf			: false,
//							children 		: [{
//												id				: 'borderHeight',
//												propertyName 	: '宽度',
//												propertyValue 	: 1,
//												propertyColumn 	: 'borderHeight',
//												editor 			: 'NUMBER_1_999999',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											},{
//												id				: 'borderColor',
//												propertyName 	: '颜色',
//												propertyValue 	: '黑色',
//												propertyColumn 	: 'borderColor',
//												editor 			: 'COLOR',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											},{
//												id				: 'lineType',
//												propertyName 	: '线型',
//												propertyValue 	: 'dotted',
//												propertyColumn 	: 'lineType',
//												editor 			: 'COMBOBOX_LINE_TYPE',
//												iconCls			: 'icon-property',
////												expanded 		: true,
//												leaf 			: true
//											}]
//						}, {
//							id				: 'backGround',
//							propertyName 	: '背景',
//							propertyValue 	: '',
//							propertyColumn 	: 'backGround',
//							editor 			: 'COMBOBOX_FILL_TYPE',
//							iconCls			: 'menu-folder-close',
//							expanded 		: false,
//							leaf			: false,
//							children 		: [{
//												id				: 'pure',
//												propertyName 	: '纯色填充',
//												propertyValue 	: '',
//												propertyColumn 	: 'pure',
//												editor 			: '',
//												iconCls			: 'menu-folder-close',
//												expanded 		: false,
//												leaf			: false,
//												children 		: [{
//																	id				: 'pureColor',
//																	propertyName 	: '颜色',
//																	propertyValue 	: '白色',
//																	propertyColumn 	: 'pureColor',
//																	editor 			: 'COLOR',
//																	iconCls			: 'icon-property',
////																	expanded 		: true,
//																	leaf 			: true
//																}, {
//																	id				: 'diaphaneity',
//																	propertyName 	: '透明度',
//																	propertyValue 	: 1,
//																	propertyColumn 	: 'diaphaneity',
//																	editor 			: 'NUMBER_0_100',
//																	iconCls			: 'icon-property',
////																	expanded 		: true,
//																	leaf 			: true
//															}]
//											}, {
//												id				: 'change',
//												propertyName 	: '渐变填充',
//												propertyValue 	: '',
//												propertyColumn 	: 'change',
//												editor 			: '',
//												iconCls			: 'menu-folder-close',
//												expanded 		: false,
//												leaf			: false,
//												children 		: [{
//																	id				: 'angle',
//																	propertyName 	: '角度',
//																	propertyValue 	: 45,
//																	propertyColumn 	: 'angle',
//																	editor 			: 'NUMBER_0_360',
//																	iconCls			: 'icon-property',
////																	expanded 		: true,
//																	leaf 			: true
//																}, {
//																	id				: 'strColor',
//																	propertyName 	: '起始颜色',
//																	propertyValue 	: '#CCCCCC',
//																	propertyColumn 	: 'strColor',
//																	editor 			: 'COLOR',
//																	iconCls			: 'icon-property',
////																	expanded 		: true,
//																	leaf 			: true
//																}, {
//																	id				: 'endColor',
//																	propertyName 	: '终止颜色',
//																	propertyValue 	: '#EEEEEE',
//																	propertyColumn 	: 'endColor',
//																	editor 			: 'COLOR',
//																	iconCls			: 'icon-property',
////																	expanded 		: true,
//																	leaf 			: true
//															}]
//											}]
//						}, {
//							id				: 'animate',
//							propertyName 	: '动画效果',
//							propertyValue 	: true,
//							propertyColumn 	: 'animate',
//							editor 			: 'COMBOBOX_OPEN_CLOSE',
//							iconCls			: 'icon-property',
//							expanded 		: false,
//							leaf 			: true
//						},{
//							id				: 'themeColor',
//							propertyName 	: '主题颜色',
//							propertyValue 	: 'base',
//							propertyColumn 	: 'themeColor',
//							editor 			: 'COMBOBOX_THEME_COLOR',
//							iconCls			: 'icon-property',
//							expanded 		: false,
//							leaf 			: true
//						}, {
//							id				: 'sizeOper',
//							propertyName 	: '调整大小',
//							propertyValue 	: false,
//							propertyColumn 	: 'sizeOper',
//							editor 			: 'COMBOBOX_YES_NO',
//							iconCls			: 'icon-property',
//							expanded 		: false,
//							leaf 			: true
//						}]
//			}
});

