/**
 * 报警公式项中公式设置的model
 */

Ext.define('HummerApp.model.FormulaItem', {
    extend: 'Ext.data.Model',
    fields: ['alarmId','left','itemName','operation','value1','right','relation']
});

