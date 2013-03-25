Ext.define('HummerApp.store.condition.CustomComponentsList', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.CustomComponentsList',
    model: 'HummerApp.model.CustomComponentsList',
    data: [
           {name: '单位', value:'src/CustomComponents/danwei.js'},
           {name: '月份', value:'src/CustomComponents/month.js'},
           {name: '主题', value:'src/CustomComponents/subject.js'}
    ]
	,
    autoLoad : false
//	,
//	 proxy: {
//         		type : 'ajax',
//         		url : '/hummer/application/controller/condition/CustomComponentsList.action',
//         		 reader : {
//         			type 			: 'json',
//         		//	successProperty	: 'success',
//         			root: ''
//         		 }
//         	}
});
	