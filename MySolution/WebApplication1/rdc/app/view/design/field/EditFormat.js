/**
 * @author csx
 */
Ext.define('HummerApp.view.design.field.EditFormat', {
	extend : 'Ext.window.Window',
	alias : 'widget.editformat',
	title : '格式编辑',
	layout : 'fit',
	modal : true,
	resizable : false,
//	width : 305,
//	height:183,

	autoShow : true,
	setDataType : function(dataType, value) {
		var pnlNumber = this.down('panel[id=pnlNumber]');
		var pnlDate = this.down('panel[id=pnlDate]');
		var pnlPercent = this.down('panel[id=pnlPercent]');
		//console.log(dataType);
		switch (dataType) {
			case 'integer' :
				var numField = this.down("panel[id='pnlNumber'] numberfield");
				numField.hide();
				numField.setValue(0);
			case 'number' :
			case 'float' :
				
				pnlDate.hide();
				pnlNumber.show();
				pnlPercent.hide();
				// console.log(value);
				// 设置初始格式值
				var regEx = /^(0,)?0{3}(\.(0+))?$/;
//				console.log(value);
				var result = regEx.exec(value);
//				console.log("显示：" + result);
				if (result != null) {
					this.down("panel[id='pnlNumber'] numberfield")
							.setValue(!result[3] ? 0 :result[3].length);
					this.down("panel[id='pnlNumber'] checkboxfield")
							.setValue(result[1]!=null);

				}
				this.setNumberSample();
				break;
			case 'date' :
				pnlDate.show();
				pnlNumber.hide();
				pnlPercent.hide();
				// pnlDate.setHeight(380);
				var gridDate = pnlDate.down("grid");
//				console.log("显示：" + value);
				var selNum = gridDate.getStore().find("value",value);
				selNum = selNum>0?selNum:0;
//				console.log("查找结果：" + selNum);
				gridDate.getSelectionModel().select(selNum);
				// this.setDateSample("");
				break;
			case 'percent' :
				pnlDate.hide();
				pnlNumber.hide();
				pnlPercent.show();
				// 设置初始格式值
				var regEx = /{P:([0-8])}/
				var result = regEx.exec(value);
				if (result != null) {
					this.down("panel[id='pnlPercent'] numberfield")
							.setValue(result[1]);

				}
				this.setPercentSample();
				break;
			default :
				pnlDate.hide();
				pnlNumber.hide();
				pnlPercent.hide();
				// this.setPercentSample();
				break;
		}
		// pnlNumber.show();
	},
	initComponent : function() {
		this.items = [{
			xtype : 'form',
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
			items : [{
				xtype : 'fieldset',
				title : '',
				collapsible : false,
				defaultType : 'textfield',
				margin:'0 0 -3 0',
				layout : 'anchor',
				defaults : {
					anchor : '100%'
				},
				items : [{
					xtype : 'panel',
					// title : '数值',
					bodyStyle : 'background:transparent;',
					id : 'pnlNumber',
					//height : 48,
					border : 0,
					margin : '5 0 5 0',
					items : [{
								xtype : 'numberfield',
								value : 2,
								width:243,
								minValue : 0,
								maxValue : 8,
								decimalPrecision:0,
								nanText	: '小数位数只能是0到8的整数',
								negativeText:'小数位数不能为负数',
								fieldLabel : '小数位数',
								listeners : {
									change : {
										fn : function(field, newValue, oldValue) {
											this.up("window").setNumberSample();
										}
									}
								}
							}, {
								xtype : 'checkboxfield',
								fieldLabel : '使用千分位',
								bodyStyle : 'background:transparent;',
								checked : true,
								listeners : {
									change : {
										fn : function(field, newValue, oldValue) {
											this.up("window").setNumberSample();
										}
									}
								}

							}]
				}, {
					xtype : 'panel',
					title : '百分数',
					bodyStyle : 'background:transparent;',
					id : 'pnlPercent',
					//height : 48,
					margin : '5 0 5 0',
					items : [{
								xtype : 'numberfield',
								value : 2,
								minValue : 0,
								maxValue : 8,
								fieldLabel : '小数位数',
								listeners : {
									change : {
										fn : function(field, newValue, oldValue) {
											this.up("window")
													.setPercentSample();
										}
									}
								}

							}]
				}, {
					xtype : 'panel',
					// title: '日期',
					id : 'pnlDate',
					bodyStyle : 'background:transparent;',
					layout : 'hbox',
					margin : '-1 0 5 0',
					autoScroll : true,
					layout : 'fit',
					// height:'500',
					items : [{
						xtype : 'grid',
						height:90,
						flex : 1,
						columns : {
							items : [{
										text : "日期",
										dataIndex : 'name',
										flex : 1,
										sortable : false
									}]
						},
						store : 'field.FieldFormats',
						listeners : {
							selectionchange : {
								fn : function(model, selected, item, index) {
									this.up("window").setDateSample(selected[0]);
									// lblSample.setText(record.get('name'));
								}
							}
						}

							/*
							 * xtype: 'multiselect', layout:'fit',
							 * autoScroll:true, height:'400', maxSelections:1,
							 * minSelections:1, fieldLabel: '日期', displayField:
							 * 'name', valueField: 'value', listeners:{ change:{
							 * //element: 'el', fn:function(sel, newValue,
							 * oldValue,eOpts){ //sel.clearValue();
							 * if(oldValue!=undefined && newValue.length>0){
							 * console.log(sel); console.log("newValue" +
							 * newValue); console.log(oldValue); newValue = []; } } } }
							 * 
							 */}]
				}, {
					xtype : 'panel',
					// title:'示例',
					bodyStyle : 'background:transparent;',
					border : 0,
					margin : '0 0 0 0',
					items : [
					{
								xtype : 'label',
								// height:'',
								margin : '0 0 0 0',
								text : '示例:'
							}, {
								xtype : 'label',
								id : 'lblSample',
								// height:'',
								margin : '10 0 0 0',
								text : '正常显示'
							}

					]
				}]
			}],
			buttons : [{
						text : '清除',
						iconCls: 'icon-delete',
						action : 'clear'
					},{
						text : '确定',
						iconCls: 'icon-submmit',
						action : 'save'
					}, {
						text : '取消',
						iconCls: 'icon-remove'
					}]
		}];

		/*
		 * 显示数值的小数位和千分位
		 */
		this.setNumberSample = function() {
			var decimalDigits = this.down("panel[id='pnlNumber'] numberfield");
			var useThousands = this.down("panel[id='pnlNumber'] checkboxfield");

			var sample = "1234567";
			if (useThousands.checked)
				sample = "1,234,567";

			var dCount = decimalDigits.getValue();
			if (dCount > decimalDigits.maxValue)
				dCount = decimalDigits.maxValue;
			else if (dCount < decimalDigits.minValue)
				dCount = decimalDigits.minValue;

			if (dCount > 0)
				sample += ".";
			// if(dCount > )
			for (var i = dCount - 1; i >= 0; i--) {
				sample += i;
			}
			this.down("label[id='lblSample']").setText(sample);
			var isInt = this.down("panel[id='pnlNumber'] numberfield").isHidden( );
//			this.fieldFormat = "{N:" + (isInt ? "" :dCount + ",") // 整数的处理
//					+ (useThousands.checked ? "1" : "0") + "}";
			this.fieldFormat = (useThousands.checked ? "0," : "") + "000"
					+ (isInt || dCount==0 ? "" : ("." + this.padLeft("","0",dCount))) ;// 整数的处理
//			console.log("设定：" + this.fieldFormat);					
		};
		this.setPercentSample = function() {
			var decimalDigits = this.down("panel[id='pnlPercent'] numberfield");

			var sample = "23";
			var dCount = decimalDigits.getValue();
			if (dCount > decimalDigits.maxValue)
				dCount = decimalDigits.maxValue;
			else if (dCount < decimalDigits.minValue)
				dCount = decimalDigits.minValue;
			// console.log(dCount);
			if (dCount > 0)
				sample += ".";
			for (var i = dCount - 1; i >= 0; i--) {
				sample += i;
			}
			this.down("label[id='lblSample']").setText(sample + "%");
			this.fieldFormat = "{P:" + dCount + "}";
		};
		this.setDateSample = function(model) {
			this.down("label[id='lblSample']").setText(model.get("name"));
			this.fieldFormat = model.get("value");
//			console.log("设定：" + this.fieldFormat);	
		};
		// 自定义函数，用给定的字符pad在字符串str的前面加到给定的长度count
		this.padLeft = function(str, pad, count){
			    if(!pad)
	        return str;
	        while(str.length<count)
				str=pad+str;
			return str;
		};
		this.isValid = function(){
			return this.down("panel[id='pnlNumber'] numberfield").isValid();
		};
		this.callParent(arguments);
		
	}
});