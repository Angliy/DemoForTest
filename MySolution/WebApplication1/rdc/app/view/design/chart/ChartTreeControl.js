Ext.define('HummerApp.view.design.chart.ChartTreeControl', {
	extend 	: 'Ext.tree.Panel',
	alias 	: 'widget.charttreecontrol',
	
	initComponent : function() {
		Ext.apply(this, {
			rootVisible : false,
			rowEdit 	: false,
			columnLines : true,
			rowLines 	: true,
			forceFit 	: true,
			layout 		: 'fit',
			selType 	: 'rowmodel',
			useArrows 	: true, // 树节点图标使用三角形
			scroll:'vertical',
			viewConfig:{
				getRowClass: function(record,rowIndex, rowParams, store){ 
					//displayState:1显示，2隐藏
					if(record.get('displayState')==2||record.get('propertyName')=='透明度'){
						return 'grid-row-hide';
					}
				}
			},
			columns : [{
						xtype 		: 'treecolumn',
						header 		: '属性名',// Property
						width 		: 100,
						align 		: 'left',
						sortable	: false,
						dataIndex 	: 'propertyName'
					}, {
						header 		: '属性值',
						sortable	: false,
						dataIndex 	: 'propertyValue',
						style 		: 'text-align:center',
						align 		: 'left',
						width 		: 100,
						editor 		: {
								xtype : 'textfield'
						},
						renderer 	: formatValueView
					}]
		});
		this.storeChange = function(){
//     		var v = (panelStore.getModifiedRecords().length>0 || panelStore.getRemovedRecords().length>0);
////     		console.log(Ext.getCmp('chartPanel'));
//// 			Ext.getCmp('chartPanel').getView().refresh(); //刷新view，render内容显示
//			changeTitle('Chart',v);
//			if(hasChanged != v)
//    		{
//    			hasChanged = v;
//    		}
     	};
        this.callParent(arguments);
        var panelStore = this.store;
     	panelStore.on({
        	add:this.storeChange,
     		update:this.storeChange,
     		remove:this.storeChange
        }); 
	},
	listeners: {
		edit:function(editor, e ,eOpt){
			var newOption = e.value;//修改后的value
			
			
		}
	}
});

/**
 * 渲染日期和下拉框显示
 * 
 * @param {}
 *            value
 * @param {}
 *            metaData
 * @param {}
 *            record
 * @param {}
 *            rowIdx
 * @param {}
 *            colIdx
 * @param {}
 *            store
 * @param {}
 *            view
 * @return {}
 */
function formatValueView(value, metaData, record, rowIdx, colIdx, store, view) {

	var editorClass = record.get('editor');
	if(editorClass == 'TEXT_WIN')
	{
	    var treeId=this.id;
	    var tempValue= new Array();
	    tempValue.push(value);
		metaData.style ="cursor: default";
		var text = '';
		text = '<div style="float:left">' + text + '</div>';
			return text
					+ '<a href="#" onclick="chartSeriesClickEvents(\''+tempValue+'\',\''+treeId+'\')"><img src="images/icon/function.png" title="编辑查看" style="margin-bottom: -3px;margin-right: -5px;" align="right"></a>';
	}else if (editorClass == 'DATE') {// 格式化日期
		var dateFormat = record.get('dateFormat')
				? record.get('dateFormat')
				: 'm/d/Y';
		return value ? Ext.Date.format(new Date(value), dateFormat) : '';

	} else if (editorClass == 'COMBOBOX_YES_NO') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		return value ? '是' : '否';
	} else if (editorClass == 'COMBOBOX_FONT') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'Tahoma':
				displayValue ='Tahoma';
				break;
			Tahoma
			case 'SimSun' :
				displayValue = '宋体';
				break;
			case 'SimHei' :
				displayValue = '黑体';
				break;
			case 'KaiTi' :
				displayValue = '楷体';
				break;
			case 'Microsoft YaHei' :
				displayValue = '微软正黑体';
				break;

		}
		return displayValue;
	} else if (editorClass == 'COMBOBOX_GRID') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'false' :
				displayValue = '不显示';
				break;
			case 'even' :
				displayValue = '单色显示';
				break;
			case 'odd' :
				displayValue = '隔行变色显示';
				break;
		}
		return displayValue;
	} else if (editorClass == 'COMBOBOX_FIELD') {// 显示COMBOBOX对应的sourceName
		var items = record.get('propertyValue');
		if(typeof(items)!='object'){
			items=items.split(',');
		}
		var displayValue =new Array();
		var storeFields = Ext.getStore('field.AvailableFields');
		for (var i = 0; i < items.length; i++) {
			var record = storeFields.findRecord('fieldName', items[i]);
			if (record != null) {
				
				displayValue.push(record.get('sourceName'));
			}
		}
		return displayValue.join(',');
	} else if (editorClass == 'COMBOBOX_FIELD_NAME') {// 显示COMBOBOX对应的sourceName,设置显示值
		var items = record.get('propertyValue');
		
		if(typeof(items)!='object'){
			items=items.split(',');
		}
		var displayValue =new Array();
		var storeFields = Ext.getStore('field.AvailableFields');
		for (var i = 0; i < items.length; i++) {
			var record = storeFields.findRecord('fieldName', items[i]);
			if (record != null) {
				displayValue.push(record.get('sourceName'));
			}
		}
		 
			var record= view.up('charttreecontrol').getStore();
		    record.tree.root.childNodes[rowIdx].set('propertyText',displayValue.join(','));
		    if(items.length>0){
			}else{
			 record.set('propertyValue','');
			}

		return displayValue.join(',');
	}  else if (editorClass == 'COMBOBOX_DIRECTION') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'left' :
				displayValue = '左轴';
				break;
			case 'bottom' :
				displayValue = '下轴';
				break;
			case 'right' :
				displayValue = '右轴';
				break;
			case 'top' :
				displayValue = '上轴';
				break;
		}
		return displayValue;
	} else if (editorClass == 'COMBOBOX_SORT') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case '' :
				displayValue = '不排序';
				break;
			case 'ASC' :
				displayValue = '升序';
				break;
			case 'DESC' :
				displayValue = '降序';
				break;
		}
		return displayValue;
	}else if(editorClass == 'COMBOBOX_AXIS_TYPE'){
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'Numeric' :
				displayValue = '数值';
				break;
			case 'Category' :
				displayValue = '分组';
				break;
		}
		return displayValue;
	}else if (editorClass == 'COMBOBOX_CHART') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = '';
		var storeFields = Ext.getStore('chart.AvailableChart');
		for (var i = 0; i < items.length; i++) {

			var record = storeFields.findRecord('type', items[i]);
			if (record != null) {
				displayValue = record.get('name');
				break;
			}
		}
		if (displayValue.length > 0) {
			displayValue = displayValue.substring(0, displayValue.length);
		}
		return displayValue;
	} else if (editorClass == 'COLOR') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = items;
		if (items.length > 0) {
			// background-color: #FFFF00; color: #FFFFFF;
			if (items == "#000000") {
				metaData.style = "color: #FFFFFF;background-color: " + items
						+ ";";
			} else {
				metaData.style = "color: #000000;background-color: " + items
						+ ";";
			}
		}

		return displayValue;
	}

	// else if(editorClass=='COMBOBOX'){//显示COMBOBOX对应的displayField
	// var items = record.get('selectItems');
	// var retmsg = Ext.decode(items)
	//		
	// for(var i=0; i<retmsg.length; i++){
	// if(value==retmsg[i].selValue){
	// return retmsg[i].disValue ;
	// }
	// }
	//		COMBOBOX_SHOW_NOT
	// }
	else if(editorClass=='COMBOBOX_OPEN_CLOSE'){//开启动画效果
		var items = record.get('propertyValue');
		return value ? '开启' : '关闭';
	}
	else if(editorClass=='COMBOBOX_SHOW_NOT'){//是否显示
		var items = record.get('propertyValue');
		return value ? '显示' : '不显示';
	}else if (editorClass == 'COMBOBOX_POSITION') {// 显示COMBOBOX对应的displayField
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'top' :
				displayValue = '上';
				break;
			case 'bottom' :
				displayValue = '下';
				break;
			case 'left' :
				displayValue = '左';
				break;
			case 'right' :
				displayValue = '右';
				break;
		}
		return displayValue;
	}else if(editorClass=='COMBOBOX_LINE_TYPE'){//
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'solid' :
				displayValue = '实线';
			case 'real' :
				displayValue = '实线';
				break;
			case 'dotted' :
				displayValue = '点线';
				break;
		}
		return displayValue;
	}else if (editorClass == 'COMBOBOX_FILL_TYPE') {
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case '' :
				displayValue = '无';
				break;
			case 'fill' :
				displayValue = '纯色填充';
				break;
			case 'gradient' :
				displayValue = '渐变填充';
				break;
		}
		return displayValue;
	}else if (editorClass == 'COMBOBOX_THEME_COLOR') {
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'Base' :
				displayValue = '基本';
				break;
			case 'Green' :
				displayValue = '绿色';
				break;
			case 'Sky' :
				displayValue = '天空蓝';
				break;
			case 'Red' :
				displayValue = '红色';
				break;
			case 'Purple' :
				displayValue = '紫色';
				break;
			case 'Blue' :
				displayValue = '蓝色';
				break;
			case 'Yellow' :
				displayValue = '黄色';
				break;
		}
		return displayValue;
	}else if (editorClass == 'COMBOBOX_DISPLAY') {
		var items = record.get('propertyValue');
		var displayValue = '';
		switch (items) {
			case 'rotate' :
				displayValue = '旋转';
				break;
			case 'middle' :
				displayValue = '中间';
				break;
			case 'insideStart' :
				displayValue = '内部（起点）';
				break;
			case 'insideEnd' :
				displayValue = '内部（终点）';
				break;
			case 'outside' :
				displayValue = '外部';
				break;
			case 'over' :
				displayValue = '覆盖';
				break;
			case 'under' :
				displayValue = '下侧';
				break;
		}
		return displayValue;
	}else {
		return value;//COMBOBOX_OPEN_COLSE
	}
}
	/**
	 * 模拟调用点击表格点击事件
	 * 
	 * @param {}value 要编辑的内容
	 * @param {}treeId 被编辑树的id
	 */
function chartSeriesClickEvents(value,treeId) {
	console.log(value);
	Ext.getCmp('editChartSeriesId').fireEvent('click', value, treeId, null);
};
