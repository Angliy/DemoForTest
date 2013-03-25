

Ext.define('HummerApp.model.SelectedFields', {
    extend: 'Ext.data.Model',
    fields: ['id','ftype','fieldName','dataType','displayName','sourceName','colWidth',
    'formula','fixedable','format','groupable','sortable','groupId','serial','editable','summary', 'codeConvert', 
    'hyperlink.id','hyperlink.url','hyperlink.queryId','hyperlink.queryName','hyperlink.linkType']

});

