/**
 * 查询store
 */
Ext.define('HummerApp.store.button.Buttons', {
    extend		: 'Ext.data.Store',
    requires	: 'HummerApp.model.Button',
    model		: 'HummerApp.model.Button',
    autoLoad	:  false,
    proxy		: {
    				type 	: 'ajax',
    				url 	: '/hummer/application/controller/button/FindButtons.action',
    				reader 	:{
    							type 			: 'json',
    							successProperty	: 'success'	
    				}
    }

});

