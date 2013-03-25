Ext.define('HummerApp.store.condition.Component', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.Component',
    model: 'HummerApp.model.Component',
        autoLoad : true,
        autoSync	: false,
	 proxy: {
         		type : 'ajax',
         		url : '/hummer/application/controller/condition/FindComponent.action',
         		 reader : {
         			type 			: 'json',
         		//	successProperty	: 'success',
         			root: ''
         		 }
//         		 ,  
//         		 actionMethods: { read: 'POST'},
//
//
//		api	: {
//			update	:'/hummer/application/controller/condition/UpdateComponent.action',
//			create	:'/hummer/application/controller/condition/AddComponent.action',
//			destroy :'/hummer/application/controller/condition/DeleteComponent.action'
//		}
         	}
});