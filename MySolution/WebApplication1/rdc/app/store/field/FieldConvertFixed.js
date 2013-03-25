Ext.define('HummerApp.store.field.FieldConvertFixed', {
    extend: 'Ext.data.Store',
	fields:['value','code'],
    //autoLoad:true,
    data: [{code:0,value:'否'},{code:1,value:'是'},{code:2,value:'未知'}]
});

