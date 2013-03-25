Ext.define('HummerApp.view.design.chart.ChartCellEditing', {
	extend : 'Ext.grid.plugin.CellEditing',
	alias : 'plugin.chartCellEditing',

	constructor : function() {
		this.callParent(arguments);
	},
	getEditor : function(record, column) {
		var me = this;
		var editorClass = record.get('editor');
		if (editorClass === 'TEXT') {// 文件编辑就
			return this.createEditor(new Ext.form.field.Text({
						selectOnFocus : true
							// 验证错误之后的提示信息,
						}), 'editor_text_id');

		} else if (editorClass === 'DATE') {// 日期控件
			return this.createEditor(new Ext.form.field.Date({
								selectOnFocus : true,
								editable : false
							}), 'editor_date_id');

		} else if (editorClass === 'NUMBER') {// 数字控件
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								minValue : 0,
								value : 99,
								maxValue : 999999999,
								negativeText :'值不能为负数'
							}), 'editor_number_id');

		} else if (editorClass === 'NUMBER_1_999999') {// 数字控件
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								minValue : 1,
								value : 99,
								maxValue : 999999999,
								negativeText :'值不能为负数'
							}), 'editor_number_1_max_id');

		} else if (editorClass === 'NUMBER_1_99999') {// 数字控件
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								minValue : 1,
								value : 99,
								maxValue : 99999,
								negativeText :'值不能为负数'
							}), 'editor_number_1_99999_id');

		} else if (editorClass === 'NUMBER_1_100') {// 数字控件1到100
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								minValue : 1,
								value : 12,
								maxValue : 100,
								negativeText :'值不能为负数'
							}), 'editor_number_1_100_id');

		} else if (editorClass === 'NUMBER_0_100') {// 数字控件1到100
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								minValue : 0,
								value : 12,
								maxValue : 100,
								negativeText :'值不能为负数'
							}), 'editor_number_0_100_id');

		} else if (editorClass === 'NUMBER_0_100') {// 数字控件0到100  透明度
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								decimalPrecision:2,
								step:0.1,
								minValue : 0,
								value : 0.5,
								maxValue : 1,
								negativeText :'值不能为负数'
							}), 'editor_number_0_100_id');

		} else if (editorClass === 'NUMBER_0_360') {// 数字控件0到360
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								allowDecimals : false,
								minValue : -360,
								value : 0,
								maxValue : 360
							}), 'editor_number_0_360_id');

		} else if (editorClass === 'NUMBER_0_1') {// 数字控件0到360
			return this.createEditor(new Ext.form.field.Number({
								selectOnFocus : true,
								decimalPrecision:2,
								step:0.1,
								minValue : 0,
								value : 0.5,
								maxValue : 1,
								negativeText :'值不能为负数'
							}), 'editor_number_0_1_id');
		
		}else if (editorClass === 'COMBOBOX_SORT') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								action:'editor_combobox_sort_id',
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : '',
														disValue : '不排序'
													}, {
														selValue : 'ASC',
														disValue : '升序'
													}, {
														selValue : 'DESC',
														disValue : '降序'
													}]
										})
							}), 'editor_combobox_sort_id');

		}else if (editorClass === 'COMBOBOX_AXIS_TYPE') {// 下拉框-轴类型
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								action:'editor_axis_type_id',
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'Numeric',
														disValue : '数值'
													}, {
														selValue : 'Category',
														disValue : '分组'
													}]
										})
							}), 'editor_combobox_axis_type_id');

		} else if (editorClass === 'COMBOBOX_GRID') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								action:'editor_grid_id',
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'false',
														disValue : '不显示'
													}, {
														selValue : 'even',
														disValue : '单色显示'
													}, {
														selValue : 'odd',
														disValue : '隔行变色显示'
													}]
										})
							}), 'editor_combobox_grid_id');

		} else if (editorClass === 'COMBOBOX_FONT') {// 下拉框字体
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'Tahoma',
														disValue : 'Tahoma'
													}, {
														selValue : 'SimSun',
														disValue : '宋体'
													}, {
														selValue : 'SimHei',
														disValue : '黑体'
													}, {
														selValue : 'KaiTi',
														disValue : '楷体'
													}]
										})
							}), 'editor_combobox_font_id');

		} else if (editorClass === 'COMBOBOX_FIELD') {// 下拉框轴字段
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'fieldName',
								displayField : 'sourceName',
								queryMode : 'local',
								multiSelect : true,
								store : 'field.AvailableFields'
							}), 'editor_combobox_field_id');

		} else if (editorClass === 'COMBOBOX_FIELD_NAME') {// 下拉框轴字段,为能设置显示值定义
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'fieldName',
								displayField : 'sourceName',
								queryMode : 'local',
								multiSelect : true,
								store : 'field.AvailableFields'
							}), 'editor_combobox_field_name_id');

		} else if (editorClass === 'COMBOBOX_YES_NO') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : true,
														disValue : '是'
													}, {
														selValue : false,
														disValue : '否'
													}]
										})
							}), 'editor_combobox_yes_no_id');

		} else if (editorClass === 'COMBOBOX_DIRECTION') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'left',
														disValue : '左轴'
													}, {
														selValue : 'bottom',
														disValue : '下轴'
													}, {
														selValue : 'right',
														disValue : '右轴'
													}, {
														selValue : 'top',
														disValue : '上轴'
													}]
										})
							}), 'editor_combobox_direction_id');

		} else if (editorClass === 'COMBOBOX_CHART') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								action:'editor_chart_id',
								valueField : 'type',
								displayField : 'name',
								queryMode : 'local',
								store : Ext
										.create('HummerApp.store.chart.AvailableChart')
							}), 'editor_combobox_chart_id');

		} else if (editorClass === 'COLOR') {// 颜色选择器
			return this.createEditor(Ext
							.create('HummerApp.view.design.chart.ColorField'),
					'editor_color_id');

		} else if (editorClass === 'COMBOBOX_OPEN_CLOSE') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : true,
														disValue : '开启'
													}, {
														selValue : false,
														disValue : '关闭'
													}]
										})
							}), 'editor_combobox_open_close_id');
		} else if (editorClass === 'COMBOBOX_SHOW_NOT') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : true,
														disValue : '显示'
													}, {
														selValue : false,
														disValue : '不显示'
													}]
										})
							}), 'editor_combobox_show_not_id');
		} else if (editorClass === 'COMBOBOX_POSITION') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'top',
														disValue : '上'
													}, {
														selValue : 'bottom',
														disValue : '下'
													}, {
														selValue : 'left',
														disValue : '左'
													}, {
														selValue : 'right',
														disValue : '右'
													}]
										})
							}), 'editor_combobox_position_id');
		} else if (editorClass === 'COMBOBOX_LINE_TYPE') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'solid',
														disValue : '实线'
													}, {
														selValue : 'dotted',
														disValue : '点线'
													}]
										})
							}), 'editor_combobox_line_type_id');
		} else if (editorClass === 'COMBOBOX_FILL_TYPE') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : '',
														disValue : '无'
													}, {
														selValue : 'fill',
														disValue : '纯色填充'
													}, {
														selValue : 'gradient',
														disValue : '渐变填充'
													}]
										})
							}), 'editor_combobox_fill_type_id');
		} else if (editorClass === 'COMBOBOX_THEME_COLOR') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'Base',
														disValue : '基本'
													}, {
														selValue : 'Green',
														disValue : '绿色'
													}, {
														selValue : 'Sky',
														disValue : '天空蓝'
													}, {
														selValue : 'Red',
														disValue : '红色'
													}, {
														selValue : 'Purple',
														disValue : '紫色'
													}, {
														selValue : 'Blue',
														disValue : '蓝色'
													}, {
														selValue : 'Yellow',
														disValue : '黄色'
													}]
										})
							}), 'editor_combobox_theme_color_id');
		} else if (editorClass === 'COMBOBOX_DISPLAY') {// 下拉框
			return this.createEditor(new Ext.form.field.ComboBox({
								editable : false,
								valueField : 'selValue',
								displayField : 'disValue',
								store : Ext.create('Ext.data.Store', {
											fields : ['selValue', 'disValue'],
											data : [{
														selValue : 'rotate',
														disValue : '旋转'
													}, {
														selValue : 'middle',
														disValue : '中间'
													}, {
														selValue : 'insideStart',
														disValue : '内部（起点）'
													}, {
														selValue : 'insideEnd',
														disValue : '内部（终点）'
													}, {
														selValue : 'outside',
														disValue : '外部'
													}, {
														selValue : 'over',
														disValue : '覆盖'
													}, {
														selValue : 'under',
														disValue : '下侧'
													}]
										})
							}), 'editor_combobox_display_id');
		}
	},

	/**
	 * 自定义控件
	 * 
	 * @param {}
	 *            field
	 * @param {}
	 *            editorId
	 * @return {}
	 */
	createEditor : function(field, editorId) {
		var me = this, editor;

		editor = new Ext.grid.CellEditor({
					editorId : editorId,
					field : field,
					ownerCt : me.grid
				});

		editor.editingPlugin = me;
		editor.isForTree = me.grid.isTree;
		editor.on({
					scope : me,
					specialkey : me.onSpecialKey,
					complete : me.onEditComplete,
					canceledit : me.cancelEdit
				});
		me.editors.add(editor);
		return editor;
	}

});