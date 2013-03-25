/**
 * 查询选项控制器
 */
Ext.define('HummerApp.controller.Option', {
	extend : 'Ext.app.Controller',

	views : ['Viewport', 'Design', 'design.option.Option', 'query.List'],
	refs : [ // 引用窗口中grid对象
	{
				ref : 'conditionlistcelleditor',
				selector : 'conditionlistcelleditor'
			}],

	init : function() {
		this.control({
					// 控制grid中的动作
					'querylist' : {
						select : this.querySelection
					}
				});
	},

	// 根据查询的类型展现可用的TAB页
	querySelection : function(mode, record, eOpts) {

		var queryId;
		if (record != null ) {
			queryId = record.get('queryId');
			this.getOptions(queryId);
		} 
	},
	getOptions : function(queryId) {
		if(!Ext.getCmp('optionPanel'))
			return;
		// 根据queryid查询查询选项
		var proxy = new Ext.data.proxy.Ajax({
			type : 'ajax',
			url : '/hummer/application/controller/option/FindOption.action?queryId='
					+ queryId,
			reader : {
				type : 'json',
				root : ''
			}
		});
		var optionStore = Ext.getCmp('optionPanel').getStore();
		optionStore.setProxy(proxy);
		optionStore.load();
		optionStore.commitChanges();

	},

	// 验证
	validBeforeSave : function() {

		var msg = '';
		var record = Ext.getCmp('optionPanel').getStore().getUpdatedRecords();
		if (record.length == 0) {
			return '-1';
		}
		return msg;

	},

	getSaveObject : function() {
		var record = Ext.getCmp('optionPanel').getStore().getUpdatedRecords(); // .getRange();//
		var fields = [];
		if (record.length > 0) {
			for (var i = 0; i < record.length; i++) {
				var items = [];
				items.push(record[i].get("name"));
				items.push(record[i].get("value"));
				fields.push(Ext.encode(items));
			}

		}

		return Ext.encode(fields);

	}
});
