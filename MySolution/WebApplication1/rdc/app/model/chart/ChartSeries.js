/**
 * 图表 序列model
 */
Ext.define('HummerApp.model.chart.ChartSeries', {
    extend: 'Ext.data.Model',
    fields: ['gridId','seriestype','axis','xfield','yfield','sourceName','label','showlegend','stacked','tips','fill']
});