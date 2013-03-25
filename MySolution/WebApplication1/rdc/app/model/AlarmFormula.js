/*
 * 报警公式项列表mode
 */

Ext.define('HummerApp.model.AlarmFormula', {
    extend: 'Ext.data.Model',
    fields: ['alarmId', 'alarmName', 'alarmContent', 'isDefault','isValid','foreground','background','alarmMode'],
    proxy: {
		type : 'ajax',
		url : '/hummer/application/controller/alarm/FindAlarmItems.action',
		 reader : {
			type 			: 'json',
			successProperty	: 'success'
		 }
	}
});

