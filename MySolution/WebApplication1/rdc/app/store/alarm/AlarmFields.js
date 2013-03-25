/**
 * 已选字段store
 */

Ext.define('HummerApp.store.alarm.AlarmFields', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.AlarmFields',
    model: 'HummerApp.model.AlarmFields',
    autoLoad : false,
    proxy: {
		type : 'ajax',
		url : '/hummer/application/controller/alarm/FindAlarmFields.action',
		 reader : {
			type 			: 'json',
			successProperty	: 'success'
		 }
	}
    
//    data: [
//           {name: '分压名称', type:'字符型'},
//           {name: '供电量', type:'数值型'},
//           {name: '售电量', type:'数值型'},
//           {name: '线损率', type:'数值型'}
//    ]
});

