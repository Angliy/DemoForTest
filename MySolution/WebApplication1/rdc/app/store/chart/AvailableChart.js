/**
 * 查询store
 */

Ext.define('HummerApp.store.chart.AvailableChart', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.AvailableChart',
    model: 'HummerApp.model.AvailableChart',
    data: [
           {name: '柱状图', type:'column'},//COLUMN
           {name: '折线图', type:'line'},//LINE
           {name: '饼状图', type:'pie'}//,//PIE
//           {name: '区域图', type:'AREA'}//,column区域图，目前不实现
//           {name: '柱状图', type:'column'},
//           {name: '柱状图', type:'column'}

    ]
});

