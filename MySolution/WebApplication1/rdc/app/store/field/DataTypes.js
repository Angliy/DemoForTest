Ext.define('HummerApp.store.field.DataTypes', {
    extend: 'Ext.data.Store',
	fields:['value','name'],
    //autoLoad:true,
    data: [{name : '字符型',value : 'STRING'}, 
           	{name : '整型',value : 'INTEGER'}, 
           	{name : '数值型',value : 'FLOAT'}, 
//           	{name : '数值型',value : 'NUMBER'}, 
           	{name : '日期型',value : 'DATE'}]
});

