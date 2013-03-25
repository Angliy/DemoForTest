/**
 * 表头及字段设计面板
 */

Ext.define('HummerApp.view.design.link.Link', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.linkpanel',
	title : '表内链接',
	store : 'field.SelectedFields',
	columnLines : true,
	initComponent : function() {
		Ext.apply(this, {
			plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					})],
			columns : {
				items : [{
							text : "名称",
							// flex: 0.2,
							width : 130,
							locked : false,
							dataIndex : "sourceName"
						}, {
							text : "类型",
							// flex: 0.15,
							width : 100,
							dataIndex : "dataType",
							renderer : function(value, metaData, record,
									rowIndex, colIndex, store) {
								var myStore = Ext.getStore('field.DataTypes');
								var record = myStore.findRecord('value', value);
								if (record != null)
									return record.get('name');
								return value;
							}
						}, {
							text : "显示名称",
							// flex: 0.2,
							width : 130,
							dataIndex : "displayName"
						}, {
							text : "链接类型",
							// flex: 0.1,
							width : 80,
							style : 'color:#669900',
							dataIndex : "hyperlink.linkType",
							renderer : function(value, metaData, record) {
								if (value == 'querylink') {
									return '内部链接';
								} else if (value == 'urllink') {
									return '外部链接';
								} else {
									return '';
								}
								// alert(record.get('linkType'));
								// return value?value:record.get('linkType');
							},
							// hidden:true,
							editor : {
								xtype : 'combo',
								editable : false,
								forceSelection : true,
								queryMode : 'local',
								displayField : 'name',
								valueField : 'value',
								store : {
									fields : ['value', 'name'],
									data : [{
												name : '选择类型...',
												value : ''
											}, {
												name : '内部链接',
												value : 'querylink'
											}, {
												name : '外部链接',
												value : 'urllink'
											}]
								}
							}
						}, {
							text : "查询名称",
							dataIndex : "hyperlink.queryName", // hyperlink.url
							// flex: 0.22,
							width : 180,
							style : 'color:#669900',
							renderer : function(value, metadata, record) {
								if (record.get('hyperlink.linkType') == 'querylink') {
									var text = "";
									value == null ? text = '' : text = value;
									if (value != null && value.length == 0) {
										text = '';
									}
									text='<div style="float:left">'+text+'</div>';
									return text
											+ '<a href="#" onclick="linkSimulationClickEvents(4)"><img src="images/icon/dot.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -5px;" align="right"></a>';
								}
							}
						}, {
							text : "链接地址",
							style : 'color:#669900',
							dataIndex : "hyperlink.url", // hyperlink.url
							flex : 1,
							minWidth : 100,
							renderer : function(value, metadata, record) {
								if (record.get('hyperlink.linkType') == 'urllink') {
									var text = "";
									value == null ? text = '' : text = '已设置';
									if (value != null && value.length == 0) {
										text = '';
									}
									text='<div style="float:left">'+text+'</div>';
									return text
											+ '<a href="#" onclick="linkSimulationClickEvents(5)"><img src="images/icon/function.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -2px;" align="right"></a>';
								}
								// else{
								// return value;
								// }
							}
						}]
				// ,
				// defaults: {
				// flex: 1
				// }
			}
		});
		this.storeChange = function(){
     		var v = (panelStore.getModifiedRecords( ).length>0 || panelStore.getRemovedRecords().length>0);
 			Ext.getCmp('linkPanel').getView().refresh(); //刷新view，render内容显示
			changeTitle('Link',v);
			if(hasChanged != v)
    		{
    			hasChanged = v;
    		}
     	};
		this.callParent(arguments);
		var panelStore = this.store;
     	panelStore.on({
        	add:this.storeChange,
     		update:this.storeChange,
     		remove:this.storeChange
        }); 
	}

});

// 模拟调用点击表格点击事件
function linkSimulationClickEvents(value) {
	Ext.getCmp('linkPanel').fireEvent('cellclick', null, null, value);
};