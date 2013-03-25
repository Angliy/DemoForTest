

Ext.define('HummerApp.model.Mashup', {
    extend: 'Ext.data.Model',
    fields: ['id','layout','layoutId','layoutQuery.name','layoutQuery.id','layoutQuery.qtype','mashupQuery.id','mashupQuery.layout']
});

