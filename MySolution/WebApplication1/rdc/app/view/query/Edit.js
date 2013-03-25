/**
 * 编辑查询的基本属性
 */

Ext.define('HummerApp.view.query.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.queryedit',
    layout : 'center',
    autoShow: true,
    
    initComponent: function() { 
    	Ext.apply(this, {
    		title 	: '新增查询',
			name	: 'queryedit',
			width 	: 350,
			height:178,
			modal 	: true,
			resizable : false,
			layout	: 'fit'
    	});
       /**
        * 是否菜单项下拉框
        */
    	this.menuableComb = Ext.create('Ext.form.ComboBox',{
    		name : 'menuable',
    		collapsed	: true,
            store : Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data : [
                    {"name":true, "value":"是"},
                    {"name":false, "value":"否"}
                ]
            }),
            displayField: 'value',
            valueField: 'name',
            
            labelAlign	: 'right',
            fieldLabel: '<font color=red>*</font>是否菜单项'
    	});
    	this.setMashUpLayoutCombDisabled = function(combo,records,Eopts){
    		if(records[0].get('name') == 'mashup'){
    			this.mashupLayoutComb.setVisible(true);  
    			this.setHeight(210);
    		}else{
    			this.mashupLayoutComb.setVisible(false);  
    			this.setHeight(178);
    		 
    			
    		}
    	};
    	/**
    	 * 查询类型下拉框
    	 */
    	this.qtypeComb = Ext.create('Ext.form.ComboBox',{
    		name : 'qtype',
    		collapsed	: true,
            store : Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data : [
                    {"name":"list", "value":"列表"},
                    {"name":"chart", "value":"图表"},
                    {"name":"mashup", "value":"混排"}
                ]
            }),
            displayField: 'value',
            valueField: 'name',
            labelAlign	: 'right',
            fieldLabel: '<font color=red>*</font>查询类型',
            emptyText : '请选择……',
            listeners:{
            	scope : this,
                'select': this.setMashUpLayoutCombDisabled
           }
    	});
    	this.mashupLayoutComb = Ext.create('Ext.form.ComboBox',{
    		name : 'mashupLayout',
    		collapsed	: true,
            store : Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data : [
                    {"name":"TOP_BOTTOM", "value":"上下式"},
                    {"name":"LEFT_RIGHT", "value":"左右式"}
                ]
            }),
            displayField: 'value',
            valueField: 'name',
            labelAlign	: 'right',
            fieldLabel: '<font color=red>*</font>混排布局方式',
            emptyText : '请选择……',
            hidden : true
    	});
    	
        this.items = [
            {
                xtype: 'form',
                bodyPadding	: '5',
                frame : true,
                fieldDefaults : {
    				msgTarget : 'side',
    				labelWidth : 86,
    				labelAlign : 'right'
    			},
    			defaults : {
    				anchor : '100%'
    			},
    			items : [{
    				xtype : 'fieldset',
    				collapsible : false,
    				defaultType : 'textfield',
    				bodyStyle : 'background:transparent;',
    				frame : true,
    				padding	: '10 10 5 5',
    				defaults : {
    					anchor : '100%'
    				},
		                items: [
		                    {
		                        xtype: 'textfield',
		                        name : 'name',
		                        maxLength : 100,
		                        maxLengthText :'输入字符的最大长度不可超过100位',
		                        fieldLabel: '<font color=red>*</font>名称'
		                    },
		                    this.qtypeComb,
		                    this.mashupLayoutComb,
		                    this.menuableComb ,
		                    {
		                    	xtype : 'hiddenfield',
		                    	name : 'queryId'
		                    }
		                ]
    			}],
            buttons : [
                            {
                                text: '确定',
                                iconCls	: 'icon-submmit',
                                action: 'edit_save_button'
                            },
                            {
                            	action	: 'edit_cancel_button',
                            	iconCls	: 'icon-remove',
                                text: '取消'
                            }
                        ]
            }
        ];
        
        

        this.callParent(arguments);
    }
});