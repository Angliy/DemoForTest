/**
 * 报警公式项中公式设置的model
 */

Ext.define('HummerApp.model.alarm.AlarmFormulaContent', {
    extend: 'Ext.data.Model',
    fields: ['id','alarmFormulaId','alarmItem','operation','values','relation']
    //----主键ID,----报警规则ID，--报警项，--操作符，-----值，----关系 默认全为and
});

