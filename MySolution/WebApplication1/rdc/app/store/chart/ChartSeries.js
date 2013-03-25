Ext.define('HummerApp.store.chart.ChartSeries', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.chart.ChartSeries',
    model: 'HummerApp.model.chart.ChartSeries',
//    fields: ['gridId','seriesType','axis','xField','yField','sourceName','label','showLegend','stacked','tips'],
    data: [
//           {seriesType:'column',axis:'left',xField:'yearmonth',yField:'gdl,sdl',sourceName:'供电量,售电量',
//           		label:"{display: 'insideEnd','text-anchor': 'middle',field: ['gdl','sdl'],renderer: Ext.util.Format.numberRenderer('0'),contrast:true,rotate: {degrees: 45},color: '#000'}",
//           		showLegend:true,stacked:false,tips:"{trackMouse: true,width: 140, renderer: function(storeItem, item) {var  vField, vFieldName;if(item.yField)  {vField = item.yField;}if(vField == 'gdl') vFieldName = '供电量';else if(vField=='sdl') vFieldName = '售电量';else if(vField == 'xsl' ||  vField == 'xsll' )  vFieldName = '线损率';this.setTitle(vFieldName + ': ' + storeItem.get(vField) + 'kWh');}}"},
//           {seriesType:'line',axis:'right',xField:'yearmonth',yField:'xsl',sourceName:'线损率',
//           		label:"{display: 'insideEnd','text-anchor': 'middle',field: 'xsl',renderer: Ext.util.Format.numberRenderer('0'),contrast:true,rotate: {degrees: -45},color: '#F00'}",
//           		showLegend:true,stacked:false,tips:"{trackMouse: true,width: 140, renderer: function(storeItem, item) {this.setTitle('线损率' + ': ' + storeItem.get(item.series.yField) + '%');}}"},
//           {seriesType:'line',axis:'right',xField:'yearmonth',yField:'xsll',sourceName:'',
//           		label:"{display: 'insideEnd','text-anchor': 'middle',field: 'xsll',renderer: Ext.util.Format.numberRenderer('0'),contrast:true,rotate: {degrees: 90},color: '#00F'}",
//           		showLegend:false,stacked:false,tips:"{trackMouse: true,width: 140, renderer: function(storeItem, item) {this.setTitle('线损率' + ': ' + storeItem.get(item.series.yField) + '%');}}"}

    ]
});

