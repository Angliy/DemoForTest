/**
 * 图表 轴 model
 */
Ext.define('HummerApp.model.chart.ChartAxis', {
    extend: 'Ext.data.Model',
    fields: ['gridId','fieldname','axistype', 'position','title','dashsize','grid','label','minimum','maximum','sort']
});