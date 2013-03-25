/**
 * 查询store
 */

Ext.define('HummerApp.store.option.Options', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.Option',
    model: 'HummerApp.model.Option',
//    data: [
//           {name: '查询条件布局', value:'自动'},
//           {name: '每页数据条数', value:'50'},
//           {name: '是否分页',value:'是'},
//           {name: '布局方式',value:'上下分栏 、左右分栏  混排时有效'}
//    ]
    autoLoad : false,
	 proxy: {
         		type : 'ajax',
         		url : '/hummer/application/controller/option/FindOption.action',
         		params:{queryId:'0'},
         		 reader : {
         			type 			: 'json',
         		//	successProperty	: 'success',
         			root: ''
         		 }
         	}
});

