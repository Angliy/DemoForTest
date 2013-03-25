/**
 * 报警项目store
 */

Ext.define('HummerApp.store.alarm.AlarmGroup', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.alarm.AlarmGroup',
    model: 'HummerApp.model.alarm.AlarmGroup',
    proxy: {
		type : 'ajax',
		url : '/hummer/application/controller/alarm/FindAlarmGroups.action',
		 reader : {
			type 			: 'json',
    		root:"rows",
    		successProperty:"success",
    		totalProperty:"totalCount"
		 }
	}
});