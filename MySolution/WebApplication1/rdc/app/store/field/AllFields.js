Ext.define('HummerApp.store.field.AllFields', {
    extend: 'Ext.data.Store',
    
    requires: 'HummerApp.model.AvailableFields',
    model: 'HummerApp.model.AvailableFields',
    //autoLoad:true,
    proxy:{
    	type:"ajax",
    	url: "/hummer/application/controller/field/FindAllField.action",

    	reader:{
    		type:"json",
    		root:"rows",
    		successProperty:"success",
    		totalProperty:"totalCount"
    	}
    }

});

