Ext.define('HummerApp.view.design.link.ParamSet', {
	extend: 'Ext.panel.Panel',
	alias:'widget.paramset',
	layout: 'border',
	border:0,
     items: [{  
     	region:'west',
     	id:'querytree',
        xtype: 'querytree',
     	listeners: {
            select: {
                fn: function (m, record) {
                    var mappedStore = Ext.getCmp('parammapped').getStore();
					mappedStore.removeAll();
					//选择查询时，重新加载store
					if(record.raw.nodeType == '2'){
						mappedStore.load({
									params : {
										queryId : record.raw.queryId
									}
							});
						}
	                }
	            }
	     	}
    	},{
	    	region:'center',
	    	id:'parammapped',
	        xtype: 'parammapped'
    	}
    ],
    
    getQueryId:function(){
    	var selNode = Ext.getCmp('querytree').getSelectionModel().getSelection()[0];
    	if(selNode!=null && selNode!=undefined && selNode!='undefined' && selNode.raw.nodeType == '2'){
    		return selNode.raw.queryId;
    	}else{
    		return '';
    	}

    },
    getQueryName:function(){
    	var selNode = Ext.getCmp('querytree').getSelectionModel().getSelection()[0];
    	if(selNode!=null && selNode!=undefined && selNode!='undefined' && selNode.raw.nodeType == '2'){
    		return selNode.raw.text;
    	}else{
    		return '';
    	}
    },
    
    setQueryId:function(queryId){
    	if(!Ext.getCmp('querytree'))
    		return;
    	if(queryId != undefined ){
    		var store = Ext.getCmp('querytree').getStore();
	    	var node = store.getNodeById(queryId);
//	    	Ext.getCmp('querytree').getSelectionModel().select(node);
	    	if(node!=''&&node!=undefined){
	    		var paths = node.getPath().split('/');
	    		for(var i = 2;i<paths.length;i++){
	    			var selNode = store.getNodeById(paths[i]);
	    			if(selNode.get('nodeType')=='2'){
	    				Ext.getCmp('querytree').getSelectionModel().select(selNode);
	    				break;
	    			}
	    			if(!selNode.get('expanded')){
	    				selNode.expand();
	    			}
	    		}
	    	}
	    	
    	}else{
    		Ext.getCmp('querytree').getSelectionModel().select(0);
    	}
    }
    
    
	
	
});