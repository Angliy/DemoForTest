/**
 * 公式设置store
 */

Ext.define('HummerApp.store.alarm.FormulaItems', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.FormulaItem',
    model: 'HummerApp.model.FormulaItem' 
//    autoLoad : false,
//    proxy: {
//		type : 'ajax',
//		url : '/hummer/application/controller/alarm/GetAlarmContent.action',
//		 reader : {
//			type 			: 'json',
//			//successProperty	: 'success',
//		//	root			: 'rows',
//			storeId: 'rows'
//		 }
//	}
});

