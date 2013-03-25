/**
 * 编辑查询的基本属性
 */

Ext.define('HummerApp.view.report.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.reportedit',

    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: '名称'
                    },
                    {
                        xtype: 'textfield',
                        name : 'published',
                        fieldLabel: '发布'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: '保存',
                action: 'save'
            },
            {
                text: '取消',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});