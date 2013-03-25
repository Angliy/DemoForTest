/**
 * @author csx
 */
Ext.define('HummerApp.store.field.FieldFormats', {
    extend: 'Ext.data.Store',
	fields:['name', 'value','datatype'],
    data: [
        {name: 'yyyy-MM-dd', value:'Y-m-d',datatype:'date'},
       {name: 'yyyy-MM', value:'Y-m',datatype:'date'},
       {name: 'MM-dd', value:'m-d',datatype:'date'},
       {name: 'yyyy年', value:'Y年',datatype:'date'},
       {name: 'MM月', value:'m月',datatype:'date'},
       {name: 'dd日', value:'d日',datatype:'date'},
       {name: 'hh24:mi:ss', value:'H:i:s',datatype:'date'},
       {name: 'hh24:mi', value:'H:i',datatype:'date'},
       {name: 'hh24时', value:'H时',datatype:'date'},
       {name: 'yyyy-MM-dd hh24:mi:ss', value:'Y-m-d H:i:s',datatype:'date'},
       {name: 'yyyy-MM-dd hh24:mi', value:'Y-m-d H:i',datatype:'date'},
       {name: 'yyyy-MM-dd hh24时', value:'Y-m-d H时',datatype:'date'},
       {name: 'MM-dd hh24:mi:ss', value:'m-d H:i:s',datatype:'date'},
       {name: 'MM-dd hh24:mi', value:'m-d H:i',datatype:'date'},
       {name: 'MM-dd hh24时', value:'m-d H时',datatype:'date'}
	
	]

});

