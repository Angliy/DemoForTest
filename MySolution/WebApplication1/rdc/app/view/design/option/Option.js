/**
 * 查询选项面板
 */

Ext.define('HummerApp.view.design.option.Option', {
			extend : 'Ext.grid.property.Grid',
			alias : 'widget.optionpanel',
			width : 20,
			autoShow : true,
			padding : '-1 -1 -1 -1',
			title : '查询选项',
			initComponent : function() {
				this.customEditors['查询条件布局'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'seleLayout',
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['seleLayout'],
										data : [['自动'], ['手动']]
									})
						});
				var transformFun = function(v) {// 前台显示
					if (v == 'true' || v == true) {
						return '是';
					} else {
						return '否';
					}
				};

				this.customEditors['自动查询数据'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'layoutStyle',
							valueField : 'value',
							forceSelection : true,
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['layoutStyle', 'value'],
										data : [['是', 'true'], ['否', 'false']]
									})
						});
				this.customRenderers['自动查询数据'] = transformFun;

				this.customEditors['是否分页'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'splitPage',
							valueField : 'value',
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['splitPage', 'value'],
										data : [['是', 'true'], ['否', 'false']]
									})
						});
				this.customRenderers['是否分页'] = transformFun;

				this.customEditors['是否可编辑'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'splitPage',
							valueField : 'value',
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['splitPage', 'value'],
										data : [['是', 'true'], ['否', 'false']]
									})
						});
				this.customRenderers['是否可编辑'] = transformFun;
				var nu = new Ext.form.field.Number({
							selectOnFocus : true,
							allowDecimals: false,//不能为小数
							allowNegative: false,//需为正数
							allowBlank: false,
							minValue  : 1,
							maxValue  : 999999999
						});

				this.customEditors['每页数据条数'] = nu;
				
				this.customEditors['是否合计'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'layoutStyle',
							valueField : 'value',
							forceSelection : true,
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['layoutStyle', 'value'],
										data : [['是', 'true'], ['否', 'false']]
									})
						});
				this.customRenderers['是否合计'] = transformFun;
						
				this.customEditors['合计行显示位置'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'seleLayout',
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['seleLayout'],
										data : [['首页'], ['尾页']]
									})
						});		
						
				this.customEditors['是否显示分组小计'] = new Ext.form.ComboBox({
							editable : false,
							displayField : 'layoutStyle',
							valueField : 'value',
							forceSelection : true,
							mode : 'local',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['layoutStyle', 'value'],
										data : [['是', 'true'], ['否', 'false']]
									})
						});		
				this.customRenderers['是否显示分组小计'] = transformFun;
				this.callParent(arguments);
				
			},
			customEditors : {
			},
			customRenderers : {
			},
			propertyNames : {
				tested : 'QA',
				borderWidth : 'Border Width'
			},
			source : {},
			onUpdate : function(store, record, operation) {
				var oldValue = record.modified.value;
				var v = false;
				if(oldValue==undefined||oldValue=='undefined'){
					v = false;
				}else{
					v = true;
				}
				changeTitle('Option',v);
				if(hasChanged != v)
	    		{
	    			hasChanged = v;
	    		}
				record.set('value', '' + record.get('value'));
			}
		});
