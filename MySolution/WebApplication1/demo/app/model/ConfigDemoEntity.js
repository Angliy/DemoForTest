/**
 * 定义demo entity模型
 * 
 * @author 叶振飞
 * @version 2012-6-6
 */
Ext.define('DEMO.model.ConfigDemoEntity',{
	extend : 'Ext.data.Model',
	fields : ['id' , 'configNo', 'configValue', 'note'],
	
	proxy: {
		type : 'ajax',
		url : '/hummer/application/controller/demo/GetConfigDemoList.action',
		//url : 'data/configDemos.json',
		 reader : {
			type 			: 'json',
			root 			: 'rows',
			successProperty	: 'success',
			totalProperty 	: 'totalCount'
		 }
	}
});