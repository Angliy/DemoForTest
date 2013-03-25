/**
 * 定义颜色选择器ColorField
 * 
 * @author chm
 * @version 2012-10-24
 */

Ext.define('HummerApp.view.design.chart.ColorField', {
			extend : 'Ext.form.field.Picker',
			alias : 'widget.colorfield',
			requires : ['Ext.picker.Color'],
			triggerCls : 'x-form-color-trigger',
			editable : false,

			createPicker : function() {
				var me = this;

				return Ext.create('Ext.picker.Color', {
							pickerField : me,
							floating : true,
							hidden : true,
							focusOnShow : true,

							style : {
								backgroundColor : "#fff"
							},

							listeners : {
								select : function(picker, selColor) {
									me.setValue("#" + selColor);

									// 实现根据选择的颜色来改变背景颜色,根据背景颜色改变字体颜色,防止看不到值
									var r = parseInt(selColor.substring(0, 2),
											16);
									var g = parseInt(selColor.substring(2, 4),
											16);
									var b = parseInt(selColor.substring(4, 6),
											16);
									var a = new Ext.draw.Color(r, g, b);
									var l = a.getHSL()[2];
									if (l > 0.5) {
										me.setFieldStyle('background:#'
												+ selColor + ';color:#000000');
									} else {
										me.setFieldStyle('background:#'
												+ selColor + ';color:#FFFFFF');
									}
								}
							}
						});
			}
		});
