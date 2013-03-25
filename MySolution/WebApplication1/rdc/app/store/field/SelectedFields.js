/**
 * 查询store
 */

Ext.define('HummerApp.store.field.SelectedFields', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.SelectedFields',
    model: 'HummerApp.model.SelectedFields',
	groupField: 'ftype',
	//sorters: ['ftype','sourceName'],
	groupDir:'DESC',
    proxy:{
    	type:"ajax",
    	url: "/hummer/application/controller/field/FindDisplayField.action",
    	
    	reader:{
    		dataType:"json",
    		root:"rows",
    		successProperty:"success",
    		totalProperty:"totalCount"
    	}
    }
});

