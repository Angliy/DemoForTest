Ext.define('HummerApp.store.Querytree', {
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
});
