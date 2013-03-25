Ext.define('HummerApp.store.condition.SubjectList', {
	    extend: 'Ext.data.Store',
		autoLoad : true,
	requires: 'HummerApp.model.Subject',
    model: 'HummerApp.model.Subject',
		    proxy: {
        type: 'ajax',
        url : '/hummer/application/controller/subject/FindSubjectAll.action', 
        reader: {
            type: 'json',
            root: ''
        }
    }
});