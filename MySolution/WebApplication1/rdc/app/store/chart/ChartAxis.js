/**
 * 查询store
 */
Ext.define('HummerApp.store.chart.ChartAxis', {
    extend		: 'Ext.data.Store',
    requires	: 'HummerApp.model.chart.ChartAxis',
    model		: 'HummerApp.model.chart.ChartAxis'
//    ,
//    autoLoad	:  false,
//    proxy		: {
//    				type 	: 'ajax',
//    				url 	: '/hummer/application/controller/button/FindButtons.action',
//    				reader 	:{
//    							type 			: 'json',
//    							successProperty	: 'success'	
//    				}
//    }

});