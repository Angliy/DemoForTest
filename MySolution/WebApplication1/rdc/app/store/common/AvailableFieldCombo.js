Ext.define('HummerApp.store.common.AvailableFieldCombo', {
    extend: 'Ext.data.Store',
    
    requires: 'HummerApp.model.AvailableFields',
    model: 'HummerApp.model.AvailableFields',
    //autoLoad:true,
    proxy:{
    	type:"ajax",
    	url: "/hummer/application/controller/field/FindAvailableField.action",

    	reader:{
    		type:"json",
    		root:"rows",
    		successProperty:"success",
    		totalProperty:"totalCount"
    	}
    }

});