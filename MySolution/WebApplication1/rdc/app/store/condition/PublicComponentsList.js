Ext.define('HummerApp.store.condition.PublicComponentsList', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.PublicComponentsList',
    model: 'HummerApp.model.PublicComponentsList',
    autoLoad : true,
//     autoLoad : false,
	 proxy: {
         		type : 'ajax',
         		url : '/hummer/application/controller/condition/FindPublicCellEditor.action',
         		 reader : {
         			type 			: 'json',
         		//	successProperty	: 'success',
         			root: ''
         	}
		}
//		,
//		listeners:{
//			load:{
//				fn:function(store, records){
//						this.insert(0,{id:'',name:'非模板控件-测试时期无使用'});
//				}
//			}
//		}
});