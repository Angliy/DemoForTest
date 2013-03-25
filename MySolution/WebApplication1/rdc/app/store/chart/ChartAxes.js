Ext.define('HummerApp.store.chart.ChartAxes', {
    extend: 'Ext.data.Store',
    //fields: ['gridId','fields','axisType', 'position','title','dishSize','grid','label','minimum','maximum'],
    requires: 'HummerApp.model.chart.ChartAxis',
    model: 'HummerApp.model.chart.ChartAxis',

    data: [
//           {fields:'gdl,sdl', axisType: 'Numeric', position:'left',title:'左轴供售电量',dishSize:5,grid:"{odd: {opacity: 1,fill: '#ddd',stroke: '#bbb','stroke-width': 1}}",label:"{color: 'black',font: '12px 宋体',rotate: {degrees: 315}}",minimum:'',maximum:''},
//           {fields:'yearmonth',axisType: 'Category', position:'bottom',title:'X轴年月',dishSize:'',grid:'',label:'',minimum:'',maximum:''},
//           {fields:'xsl,xsll',axisType: 'Numeric', position:'right',title:'右轴线损率',dishSize:'',grid:'',label:'',minimum:'',maximum:'40'}
    ]
});

