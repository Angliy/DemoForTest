

Ext.define('HummerApp.model.SelectedConditions', {
    extend: 'Ext.data.Model',
    fields: ['id','fieldName','dataType','displayName','dataTypeZh','operator','operatorIsNot',
             'values','defalultValue','display','required','cashcadeField','sourceName','serial',
             'editor.dataProvider','editor.id','editor.etype','editor.multi','editor.type',
             'editor.dataProviderType','editor.mask','mappedParam','editor.name','editor.isPublic']
            
});

