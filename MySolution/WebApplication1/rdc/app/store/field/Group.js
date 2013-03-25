Ext.define('HummerApp.store.field.Group', {
    extend: 'Ext.data.TreeStore',

    root:{
    	text:'字段及分组',
    	iconCls:'menu-folder-close'
    },
    proxy: {
        type: 'ajax',
        url: '/hummer/application/controller/field/FindHeaderGroup.action',
	    reader: {
	         type: 'json',
	         root: 'children'
	     }
    },
    fields:['id','pid','text','serial','leaf']
});
