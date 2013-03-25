/*
 * 报警公式项列表mode
 */

Ext.define('HummerApp.model.alarm.AlarmFormula', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'content', 'background','foreground','serial','isDefault','isValid','alarmGroupId','alarmMode','alarmColumn']
//--报警规则ID，--名称---报警公式内容---背景色----前景色---排序---是否默认----是否有效---报警项目ID---报警方式---报警列
});

