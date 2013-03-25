/**
 * @author csx
 */
Ext.define('HummerApp.store.field.MyVariants', {
    extend: 'Ext.data.Store',
	fields:['value','sourceName'],
    data: [
           {sourceName: '当前月份', value:'CURRENT_MONTH'},
           {sourceName: '当前单位', value:'CURRENT_UNIT'},
           {sourceName: '当前用户', value:'CURRENT_USER'},
           {sourceName: '系统日期', value:'CURRENT_DATE'}
    ]
});

