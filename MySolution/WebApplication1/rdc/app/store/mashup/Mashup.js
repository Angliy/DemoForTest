/**
 * 查询store
 */

Ext.define('HummerApp.store.mashup.Mashup', {
    extend		: 'Ext.data.Store',
    requires	: 'HummerApp.model.Mashup',
    model		: 'HummerApp.model.Mashup',
    autoLoad	:  false,
    proxy		: {
    				type 	: 'ajax',
    				url 	: '/hummer/application/controller/mashup/FindLayoutQueryRelation.action',
    				reader 	:{
    							type 			: 'json',
    							successProperty	: 'success'	
    				}
    }
});

