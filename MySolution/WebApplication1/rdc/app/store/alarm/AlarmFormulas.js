/**
 * 报警公式项store
 */

Ext.define('HummerApp.store.alarm.AlarmFormulas', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.AlarmFormula',
    model: 'HummerApp.model.AlarmFormula',
    autoLoad : false
});

