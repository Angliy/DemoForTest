/**
 * 用于监控 mashup tab 是否 改动
 */
Ext.define('HummerApp.store.mashup.MashupFlag', {
    extend	: 'Ext.data.Store',
    requires	: 'HummerApp.model.MashupFlag',
    model		: 'HummerApp.model.MashupFlag',
	data 	: [{layout: '',firstValue: '',secondValue:'',borderStr: ''}]
});