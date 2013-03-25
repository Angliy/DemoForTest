/**
 * 用于查询条件 与 参数的对应的store
 * 表内链接、按钮链接  设置时，查看打开的查询对应的参数
 */
Ext.define('HummerApp.store.condition.ConditionMapped', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.SelectedConditions',
    model: 'HummerApp.model.SelectedConditions',
    autoLoad : false,
	 proxy: {
         		type : 'ajax',
         		url : '/hummer/application/controller/condition/FindCondition.action',
         		 reader : {
         			type 			: 'json',
         		//	successProperty	: 'success',
         			root: ''
         		 }
         	}
});

