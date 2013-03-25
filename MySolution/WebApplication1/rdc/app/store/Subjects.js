Ext.define('HummerApp.store.Subjects', {
    extend: 'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url : '/hummer/application/controller/subject/FindSubjectTree.action',  //?categoryId=1
        reader: {
            type: 'json',
            root: 'children'
        }
    }
});
