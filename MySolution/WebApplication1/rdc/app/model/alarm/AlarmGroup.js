/**
 * 报警公式已选字段列表model
 */

Ext.define('HummerApp.model.alarm.AlarmGroup', {
    extend: 'Ext.data.Model',
    fields: ['id','name','ftype','queryId','subjectId','isDefault']
    //标识，报警项名称，报警项类型，所属查询，所属主题，是否默认
});