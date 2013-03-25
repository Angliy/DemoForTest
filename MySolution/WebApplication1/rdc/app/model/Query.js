

Ext.define('HummerApp.model.Query', {
    extend: 'Ext.data.Model',
    fields: ['name','qtype','published','queryId','subjectId'],
    proxy: {
		type : 'ajax',
		url : '/hummer/application/controller/query/FindQuerys.action',
		 reader : {
			type 			: 'json',
			successProperty	: 'success'
		 }
	}
});

