
/**
 * 定义demo store
 * 
 * @author 叶振飞
 * @version 2012-6-6
 */
Ext.define('DEMO.store.ConfigDemoEntities', {
	extend 		: 'Ext.data.Store',
	requires 	: 'DEMO.model.ConfigDemoEntity',
	pageSize	: pageSize,
	name		: 'CofigDemoEntities',
	autoLoad	: true,
	model		: 'DEMO.model.ConfigDemoEntity'
	
	
})