/**
 * 新增编辑所选字段的窗口
 */

Ext.define('HummerApp.view.design.button.EditButton',{
	extend	: 'Ext.window.Window',
	alias	: 'widget.editButton',
	layout: 'fit',
	autoShow: true,
		resizable : false,
	initComponent: function(){
		Ext.apply(this, {
			title 	: '新增按钮',
			name	: 'editbutton',
			height 	: 270,
			width 	: 320,
			modal 	: true,
			layout	: 'fit'
    	});
		    	
		/**
		 * 根据按钮‘类型’判断显示下面字段
		 */
		this.setButtonQueryListCombDisable = function(combo,records,Eopts){
			if(records[0].get('value') == 'QueryLinkButton'){
				this.buttonQueryListComb.setVisible(true);
				this.urlTextField.setVisible(false);
				this.scriptTextAreaField.setVisible(false);
			}else if(records[0].get('value') == 'URLLinkButton'){
				this.buttonQueryListComb.setVisible(false);
				this.urlTextField.setVisible(true);
				this.scriptTextAreaField.setVisible(true);
			}
		};
		
		/**
		 * 按钮  类型  下拉列表
		 */
		this.buttonTypeComb = Ext.create('Ext.form.ComboBox',{
    		name : 'buttonType',
            store : Ext.create('Ext.data.Store', {
                fields	: ['name', 'value'],
                data 	: [
                     	   {"name" : '查询', "value" : 'QueryLinkButton'},
                     	   {"name" : 'URL', "value" : 'URLLinkButton'}
                ]
            }),
            displayField: 'name',
            valueField: 'value',
            
            labelAlign	: 'right',
            fieldLabel	: '<font color=red>*</font>类型',
            emptyText : '请选择......',
            	listeners:{
            	scope		: this,
                'select' 	: this.setButtonQueryListCombDisable
           }
    	});
		
		/**
		 * 查询列表  下拉列表
		 */
		this.buttonQueryListComb = Ext.create('Ext.form.ComboBox',{
    		name : 'buttonQueryList',
            store : Ext.create('Ext.data.Store', {
                fields	: ['name', 'value'],
                data 	: [
                     	   {"name" : '变电站月历史', "value":'hi'},
                     	   {"name" : '变电站月损耗图表', "value":'hh'}
                ]
            }),
            displayField: 'name',
            valueField: 'value',
            labelAlign	: 'right',
            fieldLabel	: '<font color=red>*</font>查询列表'
    	});
		
		/**
		 * URL text类型
		 */
		this.urlTextField = Ext.create('Ext.form.field.Text',{
			name : 'url',
			labelAlign	: 'right',
            fieldLabel	: '<font color=red>*</font>URL'
		});
		
		/**
		 * 脚本 textarea类型
		 */
		this.scriptTextAreaField = Ext.create('Ext.form.field.TextArea',{
			name : 'script',
			labelAlign	: 'right',
            fieldLabel	: '脚本'
		});
		
		/**
		 * id text类型
		 */
		this.idTextField = Ext.create('Ext.form.field.Text',{
			name : 'id',
			labelAlign	: 'right',
            fieldLabel	: '<font color=red>*</font>ID'
		});
		this.serialTextField = Ext.create('Ext.form.field.Text',{
			name : 'serial',
			labelAlign	: 'right',
            fieldLabel	: '<font color=red>*</font>顺序号'
		});
		this.items = [
		              {
		                  xtype: 'form',
		                  bodyPadding	: '5 5 0',
		                  items: [
		                      {
		                       		xtype: 'textfield',
		                          	name : 'name',
		                          	labelAlign	: 'right',
		                          	fieldLabel: '<font color=red>*</font>按钮名称'
		                      },
		                      {
			                   		fieldLabel 	: '图标',
									xtype		: 'combobox',
							        name		: 'icon',
							        store 		: Ext.create('Ext.data.Store',{
							        				fields	: ['name', 'icon','value'],
							        				autoLoad:true,
										    		proxy	:{
										    				type	:'ajax',
										    				url 	:  '../hummer/app/rdc/app/store/button/icon.json'
										    		},
										    		reader	: {
		                    								type	: 'json'
		                    						}
										    	}),
									labelAlign	: 'right',
									tpl:'<tpl for="."><div x-boundlist-item:qtip="{icon}" class="x-boundlist-item"><img src="{icon}" width="16" height="16">&nbsp;{name}</div></tpl>',
									displayField: 'name',
            						valueField  : 'value',
									editable	: false,
									multiSelect : false		                      	
		                      },
		                      this.buttonTypeComb,
		                      this.buttonQueryListComb,
		                      this.urlTextField,
		                      this.scriptTextAreaField,
		                      this.idTextField,
		                      this.serialTextField
		                  ],
		              buttons : [
		                              {
		                                  text		: '保存',
		                                  action	: 'edit_save_button'
		                              },
		                              {
		                            	  text		: '取消',
		                              	  action	: 'edit_cancel_button'
		                              }
		                          ]
		              }
		          ];              
		               
		this.callParent(arguments);                    

	}
	
});
