Ext.define('HummerApp.view.design.condition.CustomComponents', {
    extend: 'Ext.window.Window',
    alias: 'widget.customcomponents',
	id:'customComponents',
    layout: 'center',
    autoShow: true,
    initComponent: function(){

        Ext.apply(this, {
            title: '自定义组件',
            name: 'conditionlistcelleditor',
			height : 275,
			width : 458,
            modal: true,
            resizable : false,
            layout: 'fit'
        });
     var mePanel=this;
     mePanel.rowEditor=Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					});

				
        this.formList = Ext.create('Ext.grid.Panel', {
            border: true,
			maxHeight : 195,
			minHeight : 195,
			columnLines:true,
			autoScroll:true,
			plugins :[mePanel.rowEditor],
			id:'customComponentsList',
            store: 'condition.Component',
            tbar: [{
                xtype: 'label',
                text: '自定义组件列表'
            },'->',
             {
						action 		: 'add_component_button',
						iconCls 	: 'icon-add'
			},{
					action 		: 'del_component_button',
					iconCls 	: 'icon-delete '
			}
			,{
					action 		: 'save_component_button',
					iconCls 	: 'icon-save '
			}
            ],
            columns: [
//            	new Ext.grid.RowNumberer({
//										align : 'center'
//									}), 
            	{
            	header: '编号',
            	hidden : true,
				hideable : false,
                dataIndex: 'id'
            },{
                header: '组件名称',
                dataIndex: 'name',
                hideable: false,
                editor: {
                	allowBlank: false
           		 	}
            }, {
                header: '组件路径',
                dataIndex: 'path',
                hideable: false,
                flex: 1,
                editor: {
                	allowBlank: false
           		 	}
            }]
        });
        
        this.items = [{
            xtype: 'form',
			bodyPadding : '5',
			frame : true,
			fieldDefaults : {
				msgTarget : 'side',
				labelWidth : 75,
				labelAlign : 'right',
				defaultType : 'textfield'
			},
			defaults : {
				anchor : '100%'
			},
            items: [this.formList],
            buttons: [{
                text: '确定',
                iconCls: 'icon-submmit',
                action: 'save'
            }, {
                action: 'edit_cancel_button',
                iconCls: 'icon-remove',
                text: '取消',
                scope: this,
                handler: this.close
            }]
        }]
        this.callParent(arguments);
    }
    
});
