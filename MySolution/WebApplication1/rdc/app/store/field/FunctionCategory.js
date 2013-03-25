/**
 * @author csx
 */
Ext.define('HummerApp.store.field.FunctionCategory', {
    extend: 'Ext.data.Store',
    
	fields:['key','name'],
    //autoLoad:true,
    data: [
           {name: '查询条件', key:'condition'},
           {name: '变量', key:'variant'},
           {name: '可用字段', key:'field'},
		   {name: '函数', key:'function'}
    ]

});

