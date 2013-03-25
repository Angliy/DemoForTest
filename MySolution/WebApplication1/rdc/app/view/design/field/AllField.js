Ext.define('HummerApp.view.design.field.AllField', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.allfield',
			// title: '可选字段',
			header : false,
			columnLines : true,
			border : true,
			tbar : [{
						xtype : 'label',
						text : '可用字段',
						style : 'fontWeight:bold; height:20px; vertical-align:middle'
					}],
			height : 400,
			enableDragDrop : true,
			// enableDrop:false,
			stripeRows : true,
			// allowCopy:true,
			viewConfig : {
				copy : true,
				enableDrop : false,
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : 'firstGridDDGroup'// ,
					// dropGroup: 'secondGridDDGroup'

				},
				listeners : {
					beforedrop : function(node, data, overModel, dropPosition) {
						return false;
					}
				}
			},
			store : 'field.AllFields',
//			selModel : Ext.create('Ext.selection.RowModel', {
//						singleSelect : true
//					}),
			columns : {
				items : [
						/*
						 * { text: "名称", flex: 0.4, dataIndex: "fieldName",
						 * hidden: true },{ text: "名称", flex: 0.4, dataIndex:
						 * "displayName", hidden: true },{ text: "类型", flex:
						 * 0.3, dataIndex: "dataType", hidden: true },
						 */{
							text : "名称",
							hideable : false,
							width : 130,
							dataIndex : "sourceName"
						}, {
							text : "类型",
							width : 50,
							hideable : false,
							dataIndex : "dataTypeZh"
						}, {
							text : "字段长度",
							// margins: '0 -1 0 0',
							minWidth : 60,
							flex : 1,
							hideable : false,
							dataIndex : "size"
						}]
			}
		});