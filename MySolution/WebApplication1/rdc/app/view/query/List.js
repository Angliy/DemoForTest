/**
 *查询列表
 */
Ext.define('HummerApp.view.query.List', {
	extend: 'Ext.grid.Panel',
	alias:'widget.querylist1',
	store: 'Querys',
//	padding	:'-1 -1 -1 -1',
    indexId : 0,
    tbar: [
//           {xtype: 'label', text: '查询列表'},
           '->',// 以下按钮靠右
           {action : 'add_query_button', xtype: 'button', iconCls	: 'icon-add'},
           {action : 'edit_query_button', xtype: 'button', iconCls	: 'icon-edit'},
           {action : 'delete_query_button', xtype: 'button',iconCls	: 'icon-delete'}
         ],

    initComponent: function() {
    	qtypeSet = function(value){
        	if(value == 'list'){
        		return '列表';
        	}else if (value == 'chart'){
        		return '图表';
        	}else if (value == 'mashup'){
        		return '混排';
        	}
        };
        existPublished = function(value){
        	if(value){
        		return '是';
        	}else{
        		return '否';
        	}
        };
        Ext.apply(this, {
    		columns : [
    		            {header: '名称',  dataIndex: 'name',  flex: 0.6},
    		            {header: '类型', dataIndex: 'qtype', renderer : qtypeSet,  flex: 0.2},
    		            {header: '发布', dataIndex: 'published',renderer : existPublished, flex: 0.2, align:'center'}
    		        ]
    	});
        
        this.callParent(arguments);
       this.store.on('load',function(store,records,successful,eOpts){
    	   var queryPanel = Ext.getCmp('queryList');
    	   if(successful && records.length>0){
	     		if(queryPanel.indexId != null){
	     			var index = store.findExact('queryId',queryPanel.indexId);
	     			queryPanel.getSelectionModel().select(index)
	     		}else{
	     			queryPanel.getSelectionModel().select(0) ; 
		     	}
	     	}
        });
    }
});