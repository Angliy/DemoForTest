/**
 * 查询store
 */

Ext.define('HummerApp.view.design.chart.ChartData', {
    extend: 'Ext.data.Store',
    //requires: 'HummerApp.model.ChartTemplate',
    //model: 'HummerApp.model.ChartTemplate',
    fields: ['yearmonth','gdl','sdl','xsl','xsll'],
    data: [
           {yearmonth: '201201', gdl:2300,sdl:2000,xsl:10,xsll:8},
           {yearmonth: '201202', gdl:2500,sdl:2400,xsl:8,xsll:10},
           {yearmonth: '201203', gdl:2100,sdl:1800,xsl:6,xsll:12},
           {yearmonth: '201204', gdl:2600,sdl:2200,xsl:9,xsll:11},
           {yearmonth: '201205', gdl:2900,sdl:2400,xsl:13,xsll:8},
           {yearmonth: '201206', gdl:2400,sdl:2000,xsl:15,xsll:13},
           {yearmonth: '201207', gdl:1600,sdl:1200,xsl:12,xsll:8},
           {yearmonth: '201208', gdl:3800,sdl:2700,xsl:18,xsll:15}

    ]
});

