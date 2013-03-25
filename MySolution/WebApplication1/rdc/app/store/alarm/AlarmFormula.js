/**
 * 报警公式项store
 */
 Ext.define('HummerApp.store.alarm.AlarmFormula', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.alarm.AlarmFormula',
    model: 'HummerApp.model.alarm.AlarmFormula',
    proxy: {
		type : 'ajax',
		url : '/hummer/application/controller/alarm/FindAlarmFormula.action',
		 reader : {
			type 			: 'json',
			successProperty	: 'success'
		 }
	}
//    data:[
//    	{id:'0', name:'供电量小于售电量',content:'供电量 < 售电量 And 供电量 > 100', background:'#CC0000',foreground:'#212121',serial:'1',isValid:1,alarmGroupId:'2',alarmMode:'SINGLECELL',alarmColumn:''},
//	    {id:'1', name:'供电量小于1000',content:'供电量 < 1000', background:'#CC0000',foreground:'#212121',serial:'1',isValid:1,alarmGroupId:'1',alarmMode:'SINGLECELL',alarmColumn:'供电量'},
//	    {id:'2', name:'售电量大于1000',content:'售电量 > 1000', background:'#FF8800',foreground:'#212121',serial:'1',isValid:1,alarmGroupId:'1',alarmMode:'SINGLECELL',alarmColumn:'售电量'}
//    ]
});

