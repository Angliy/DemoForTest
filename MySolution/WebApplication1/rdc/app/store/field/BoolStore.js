Ext.define('HummerApp.store.field.BoolStore', {
    extend: 'Ext.data.Store',
	fields:['value','name'],
    //autoLoad:true,
	data : [{name : '是',value : true}, 
		{name : '否',value : false}]
});

