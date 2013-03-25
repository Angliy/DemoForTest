Ext.define('HummerApp.store.QueryPanelTree', {
    extend: 'Ext.data.TreeStore',
    root: {
		text:"root",
		expanded: true
    },
//    fields: ['id','queryId','nodeType','qtype','iconCls','text'],
    model: 'HummerApp.model.QueryTree',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : '/hummer/application/controller/query/FindQueryTree.action'
    }
//    ,
//    listeners: {
//    	load : {
//    		element: 'el',
//    		fn: function(){
//    			//默认选中一个查询
//    			var queryId = '297efe17394d079101394d6268410000';
//				var store = Ext.getCmp('queryList').getStore();
//		    	var node = store.getNodeById(queryId);
//		    	if(node!=''&&node!=undefined){
//    			console.log('加载树。。。');
//		    		var paths = node.getPath().split('/');
//		    		for(var i = 2;i<paths.length;i++){
//		    			var ddd = store.getNodeById(paths[i]);
//		    			if(ddd.get('nodeType')=='2'){
//		    				Ext.getCmp('queryList').getSelectionModel().select(ddd);
//		    				break;
//		    			}
//		    			if(!ddd.get('expanded')){
//		    				ddd.expand();
//		    			}
//		    		}
//		    	}
//    		}
//    	}
//    	
//    }
});

