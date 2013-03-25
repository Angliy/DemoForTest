/**
 * 查询store
 */

Ext.define('HummerApp.store.Querys', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.Query',
    model: 'HummerApp.model.Query',
    autoLoad : false
});

