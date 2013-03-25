/**
 * 主题查询展示区域
 */

Ext.define('HummerApp.view.Subject', {
    extend: 'Ext.panel.Panel',
    alias:'widget.subject',
    animCollapse: true,
    split: true,
    padding	:'-1 -1 -1 -1',
	border		:'-1',
	bodyPadding:'-1',
    layout:{
        type: 'accordion',
        animate: true
    },
    items: [],
    initComponent: function() {
    	var item = this.items;
    	var me = this;
    	Ext.Ajax.request({
 		   url: '/hummer/application/controller/subject/FindSubjectCategory.action',
 		   success: function(response,opts){
 			var subjects=Ext.JSON.decode(response.responseText);
 			Ext.each(subjects, function(subject){
 				var store = Ext.create('Ext.data.TreeStore', {
 	                   proxy: {
 	                        type: 'ajax',
 	                        url : '/hummer/application/controller/subject/FindSubjectTree.action?categoryId='+subject.id,
 	                        reader: {
 	                            type: 'json',
 	                            root: 'children'
 	                        }
 	                    }
 				});
 				me.add({
 	 				title:subject.name,
 	 				//id:"'"+subject.id+"'",
 	 				autoScroll: true,
 	 				xtype:'treepanel',
 	 				store: store,
 	 				rootVisible: false
 	 					}
 	 			);
 			});
 			me.doLayout();
 		   }
 		});
        this.callParent(arguments);
    }

});
