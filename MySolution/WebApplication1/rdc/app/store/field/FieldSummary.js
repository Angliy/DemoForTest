Ext.define('HummerApp.store.field.FieldSummary', {
    extend: 'Ext.data.Store',
	fields:['value','name'],
    //autoLoad:true,
    data: [{name : '计数',value : 'count'}, 
           	{name : '求和',value : 'sum'}, 
           	{name : '求最小值',value : 'min'}, 
           	{name : '求最大值',value : 'max'}, 
           	{name : '求平均数',value : 'average'},
           	{name : '清空',   value:''}]
});

