/**
 * @author 常绍新
 * @描述：选择器
 */
Ext.define('HummerApp.view.design.field.Selector',{
	extend: 'Ext.panel.Panel',
	alias:'widget.selectorpanel',
	width:'100%',
	 border: 0,
	layout: {
        type: 'hbox',
        
        align: 'stretch'
    },
	items:[
		{
			flex: 0.5,
		    height:200,
			id:'catetoryGrid',
		    xtype: 'grid',
		    margin :'-2 -2 0 0',
			columns:[{header:'名称',dataIndex:'name', flex:1}],
			store:'field.FunctionCategory',
			listeners:{
				afterrender:{
					fn:function(grid){
						//console.log(grid);
						if(grid.getSelectionModel().getSelection()<1)
							grid.getSelectionModel().select(0);
					}
				},
				beforerender:{
					fn:function(grid){
						grid.getStore().clearFilter();
					}
				},
				selectionchange:{
					fn:function(model,selected,eOpts){
						var myItems = Ext.getCmp('selectorPanel').items;
						var queryId = Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('queryId');
						myItems.each(function(item, idx){
							if(idx != 0 && item.key != selected[0].get('key'))
								item.hide();
							else{
								if(item.key=="condition" && item.getStore().getCount()==0){
									//var queryId = this.getQueryId();
									item.getStore().load({params:{
										queryId: queryId
									}});
								}
									//console.log(item.getStore().getCount()==0)
								item.show();
							}
						});
						
					}
				}
			}
		},
		{
			flex: 0.5,
		    height:200,
			key:'condition',
		    xtype: 'grid',
		    margin :'-2 0 0 0',
			columns:[{header:'查询条件',dataIndex:'displayName', flex:1}],
			store:'condition.SelectedConditions',
			listeners:{
				itemdblclick:{
					fn:function(view,record,item,index,e,eOpts){
						view.up("textedit").insertValue("${C:" + record.get("displayName") + "}");
					}
				}
			}

		},
		{
			flex: 0.5,
		    height:200,
			key:'variant',
			hidden:true,
		    xtype: 'grid',
		    margin :'-2 0 0 0',
			columns:[{header:'变量名称',dataIndex:'sourceName', flex:1}],
			store:'field.MyVariants',
			listeners:{
				itemdblclick:{
					fn:function(view,record,item,index,e,eOpts){
						view.up("textedit").insertValue("${V:" + record.get("sourceName")+ "}");
					}
				}
			}
		},
		{
			flex: 0.5,
		    height:200,
			key:'field',
			hidden:true,
		    xtype: 'grid',
		    margin :'-2 0 0 0',
			columns:[{header:'字段名称',dataIndex:'sourceName', flex:1}],
			store:'field.AvailableFields',
			listeners:{
				itemdblclick:{
					fn:function(view,record,item,index,e,eOpts){
						view.up("textedit").insertValue("${F:" + record.get("sourceName") + "}");
					}
				}
			}
		},
		{
			flex: 0.5,
		    height:200,
			key:'function',
			hidden:true,
		    xtype: 'grid',
		    margin :'-2 0 0 0',
			columns:[{header:'函数名称',dataIndex:'sourceName', flex:1}],
			store:'field.Functions',
			listeners:{
				itemdblclick:{
					fn:function(view,record,item,index,e,eOpts){
						view.up("textedit").insertValue(record.get("value"));
					}
				}
			}
		}

	]//,
//	selectFunctionDetail:function(view,record,item,index,e,eOpts){
//		//console.log("catetoryGridw");
//		//console.log(view.up("grid[id='catetoryGridw']")); // catetoryGrid
//		var grid = view.up("grid");
//		var value = "";
//		switch(grid.key) {
//			case 'field':	// 可用字段直接替换
//			    value = "${F:" + record.get("sourceName") + "}";
//				break;
//			case 'condition':	// 查询条件运行时替换
//			    value = "${C:" + record.get("sourceName") + "}";
//				break;
//			case 'variant':		// 变量和函数直接显示实际替换
//			case 'function':
//			    value = record.get("value") ;
//				break;
//			default: 
//				
//				break;
//		}
//		view.up("textedit").insertValue(value);
//	}

	
});
