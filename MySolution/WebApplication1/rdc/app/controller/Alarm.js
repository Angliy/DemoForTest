/**
 * 报警设置 控制器
 */
Ext.define('HummerApp.controller.Alarm', {
	extend : 'Ext.app.Controller',

	stores : [
			'alarm.AlarmFields', 
//			'alarm.AlarmFormulas', 
//			'alarm.FormulaItems',
			'field.AllFields',
			'alarm.ColorStore', 
			'alarm.AlarmGroup'
			,'alarm.AlarmFormula'
			,'alarm.AlarmFormulaContent'
			],

	views : [
			'design.alarm.Alarm', 
//			'design.alarm.AlarmList',
//			'design.alarm.FormulaList',
//			'design.alarm.FormulaItem', 
			'design.field.AllField',
			'design.alarm.AlarmGroup',
			'design.alarm.AlarmFormula',
			'design.alarm.AlarmFormulaContent'
			],

	refs : [
//			{ref : 'alarmlist',selector : 'alarmlist'}, 
//			{ref : 'formulaitem',selector : 'formulaitem'},
			{ref : 'formulalist',selector : 'formulalist'}, 
			{ref : 'allfield',selector : 'allfield'},
			{ref : 'alarmpanel',selector : 'alarmpanel'},
			{ref : 'alarmgroup',selector : 'alarmgroup'},
			{ref : 'alarmformula',selector : 'alarmformula'},
			{ref : 'alarmformulacontent',selector : 'alarmformulacontent'}],
	init : function() {
		this.control({
			// 根据queryId控制grid中的数据
			'querylist' : {
				select : this.queryAlarmList
			},
			//报警项目
			'alarmgroup':{
				select : this.selectAlarmGroup
			},
			'alarmgroup checkcolumn':{
				checkchange:this.alarmGroupCheck
			},
			//报警项目 面板中的 增加按钮
			'alarmgroup button[action = add_alarmGroup_button]':{
				click: this.addAlarmGroup
			},
			//报警项目 面板中的 删除按钮
			'alarmgroup button[action = dele_alarmGroup_button]':{
				click: this.delAlarmFormula
			},
			// 报警规则 
			'alarmformula':{
				select:this.selectAlarmFormula
			},
			// 报警规则  面板中的增加按钮
			'alarmformula button[action=add_alarm_button]' : {
				click : this.addAlarmFormula
			},
			// 报警规则  面板中的删除按钮
			'alarmformula button[action=del_alarm_button]' : {
				click : this.delAlarmFormula
			},
			'alarmformulacontent':{
				select:this.selectAlarmFormulaContent,
				afterrender:this.afterrenderAlarmFormulaContent
			},
			// 公式设置 面板中的增加按钮
			'alarmformulacontent button[action=add_formItem_button]' : {
				click : this.addAlarmformulacontent
			},
			// 公式设置 面板中的删除按钮
			'alarmformulacontent button[action=del_formItem_button]' : {
				click : this.delAlarmFormula
			},
			// 报警可用字段选中与取消选中时更改报警字段
			'gridpanel[id=gridAlarmField]':{
				select: this.selectAlarmField,
				deselect:this.deselectAlarmField
			},
			// 告警可用字段的选中需要在tabchange事件中执行
			'tabpanel[id=designTabpanel]':{
				tabchange : this.selectedAlarmField
			}
		});
		//报警字段
		Ext.getStore('alarm.AlarmFields').on({
			add:this.dataChanged,
     		update:this.dataChanged,
     		remove:this.dataChanged
		});
		//报警分组
		Ext.getStore('alarm.AlarmGroup').on({
			add:this.dataChanged,
     		update:this.dataChanged,
     		remove:this.dataChanged
		});
		//报警规则
		Ext.getStore('alarm.AlarmFormula').on({
			add:this.dataChanged,
     		update:this.dataChanged,
     		remove:this.dataChanged
		});
	},
	alarmGroupCheck:function(check, rowIndex, checked, eOpts){
		if(checked){
			var records = this.getStore('alarm.AlarmGroup').getRange();
			for(var i=0;i<records.length;i++){
				if(i!=rowIndex)
					records[i].set('isDefault',false);
			}
		}
		this.getAlarmgroup().getSelectionModel().select(rowIndex);
	},
	/**
	 * 选中 报警项目 的行时，过滤当前报警项目下的报警规则
	 * @param {} mode
	 * @param {} record
	 * @param {} index
	 * @param {} eOpts
	 */
	selectAlarmGroup:function(mode, record, index, eOpts){
		//控制按钮可用状态
		this.getAlarmgroup().buttonDel.setDisabled(false);//报警项目--删除按钮 可用
		this.getAlarmformula().buttonAdd.setDisabled(false);//报警规则--增加按钮 可用
		//暂时清空 报警公式设置的store
		this.resolveAlarmFormulaContent(1);//mode为1 表示 清空store 直接返回
		
		var alarmFormulaStore = Ext.getStore('alarm.AlarmFormula');
//		console.log(alarmFormulaStore);
		alarmFormulaStore.filterBy(function(record_h,id){
			if(record_h.get('alarmGroupId')==record.get('id')){
				return true;
			}else{
				return false;
			}
		})
		//选中过滤出的第一个报警列
		if(this.getAlarmformula().getStore().getCount()>0)
			this.getAlarmformula().getSelectionModel().select(0);
	},
	/**
	 * 选中 报警规则 的行时，重新加载当前报警规则下的公式设置内容
	 * @param {} mode
	 * @param {} record
	 * @param {} index
	 * @param {} eOpts
	 */
	selectAlarmFormula:function(mode, record, index, eOpts){
		//控制按钮可用状态
		this.getAlarmformula().buttonDel.setDisabled(false);//报警规则--删除按钮  可用
		this.getAlarmformulacontent().buttonAdd.setDisabled(false);//报警设置--增加按钮 可用
		//解析报警规则的content列，重新生成报警公式设置的store
		this.resolveAlarmFormulaContent(mode,record);
	},
	/**
	 * 选择可用字段时，添加到告警字段中
	 * @param {} rowModel
	 * @param {} record
	 * @param {} index
	 * @param {} eOpt
	 */
	selectAlarmField:function(rowModel, record, index, eOpt){
		var alarmFieldStore = this.getStore('alarm.AlarmFields');
		var model = alarmFieldStore.findRecord('fieldName', record.get('fieldName'));
		if(!model)
			model = Ext.create('HummerApp.model.AlarmFields');
		model.set('fieldName',record.get('fieldName'));
		model.set('sourceName',record.get('sourceName'));
		alarmFieldStore.add(model);
		Ext.getStore('alarmContentValueStore').add(model);
	}, 
	/**
	 * 取消选择可用字段时，删除告警字段
	 * @param {} rowModel
	 * @param {} record
	 * @param {} index
	 * @param {} eOpt
	 */
	deselectAlarmField:function(rowModel, record, index, eOpt){
		var alarmFieldStore = this.getStore('alarm.AlarmFields');
		alarmFieldStore.removeAt(alarmFieldStore.find('fieldName',record.get('fieldName')));
		var storeForAlarmContentValue = Ext.getStore('alarmContentValueStore');
		storeForAlarmContentValue.removeAt(storeForAlarmContentValue.find('fieldName',record.get('fieldName')));
	}, 
	/**
	 * 报警项目 面板中 新增按钮 功能
 	 * @param {} btn
	 * @param {} e
	 * @param {} eOpt
	 */
	addAlarmGroup:function(btn,e,eOpt){
		var subjectId = '';
		var queryId = '';
		var id = Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('id');
		var nodeType = Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('nodeType');
		if(nodeType==2||nodeType=='2'){
			queryId = id;
		}else if(nodeType==1||nodeType=='1'){
			subjectId = id;
		}
		//创建一个uuid生成器uuidGenerator
		var uuidGenerator = Ext.create('Ext.data.UuidGenerator',{id:'uuidGenerator'});
		var alarmGroupModel = Ext.create('HummerApp.model.alarm.AlarmGroup', {
			'id'		: '', 
			'isDefault' : false,
			'subjectId'	: subjectId,
			'queryId'	: queryId,
			'ftype'		: nodeType,
			'name'		: ''
		});
		alarmGroupModel.set('id',uuidGenerator.generate());
		var alarmGroupStore = btn.up('gridpanel').getStore();
		alarmGroupStore.add(alarmGroupModel)
		var index = alarmGroupStore.indexOf(alarmGroupModel);
		btn.up('gridpanel').getSelectionModel().select(index);
	},
	/**
	 * 新增一个报警公式项
	 * @param {}btn
	 * @param {}e
	 * @param {}eOpt
	 */
	addAlarmFormula : function(btn, e, eOpt) {
		var alarmGroupRecords = this.getAlarmgroup().getSelectionModel().getSelection();
		if (alarmGroupRecords.length == 0) {
			Ext.Msg.alert("提示信息", "请先选择报警项目然后再进行报警规则设置！");
			return false;
		}
		var alarmGroupId = alarmGroupRecords[0].get('id');
		var alarmGroupStore = this.getStore('alarm.AlarmGroup');
		if (alarmGroupStore.getCount() == 0) {
			Ext.Msg.alert("提示信息", "请先添加报警项目再进行报警公式设置！");
			return false;
		}
		var alarmFormulaModel = Ext.create('HummerApp.model.alarm.AlarmFormula', {
			'alarmGroupId':alarmGroupId,
			'isValid' : 1,
			'foreground' : '#212121',
//			'background' : '#CC0000',
			'background' : 'circle-red',
			'alarmMode' : 'SINGLECELL'
		});
		var alarmStore = btn.up('gridpanel').getStore();
		alarmStore.add(alarmFormulaModel);
		var index = alarmStore.indexOf(alarmFormulaModel);
		btn.up('gridpanel').getSelectionModel().select(index);
	},
	/**
	 * 新增一个报警公式
	 * @param {}btn
	 * @param {}e
	 * @param {}eOpt
	 */
	addAlarmformulacontent : function(btn, e, eOpt) {
		var alarmFormulaRecords = this.getAlarmformula().getSelectionModel().getSelection();
		if (alarmFormulaRecords.length == 0) {
			Ext.Msg.alert("提示信息", "请先选择 报警规则 然后再进行公式设置！");
			return false;
		}
		var alarmFormulaId = alarmFormulaRecords[0].get('id');
		var alarmStore = this.getStore('alarm.AlarmFormula');
		if (alarmStore.getCount() == 0) {
			Ext.Msg.alert("提示信息", "请先添加 报警规则 再进行报警公式设置！");
			return false;
		}
		var alarmFormulaContentModel = Ext.create('HummerApp.model.alarm.AlarmFormulaContent', {
			id			: alarmFormulaId,
			alarmItem 	: '',
			operation 	: '>',
			value1		: '',
			relation 	: '&&'
		});
		var alarmFormulaContentStore = btn.up('gridpanel').getStore();
		alarmFormulaContentStore.add(alarmFormulaContentModel);
		var index = alarmFormulaContentStore.indexOf(alarmFormulaContentModel);
		btn.up('gridpanel').getSelectionModel().select(index);
	},
	initButton : function(model, record, index, eOpts) {
		// 公式设置处按钮
		var itemPanel = Ext.getCmp('formulaitem');
		var itemButtonDel = itemPanel.buttonDel;
		var itemRecords = itemPanel.getSelectionModel().getSelection();
		if (itemRecords.length > 0) {
			itemButtonDel.setDisabled(false);
		}
	},
	closeColorWin : function(comp, e, eOpt) {
		var colorWin = Ext.getCmp('colorWinId');
		if (colorWin) {
			colorWin.close();
		}
	},
	showColorWin : function(cellIndex, record) {
		var left = event.clientX;
		var top = event.clientY;
		var colorValue = record.get(cellIndex == 4
				? 'foreground'
				: 'background');
		colorValue = colorValue.substring(1).toUpperCase();
		var bodyWidth = document.body.clientWidth;
		if (bodyWidth - left < 156)
			left = bodyWidth - 160;
		var colorWin = Ext.getCmp('colorWinId');
		var colorPanel = Ext.create('Ext.picker.Color', {
					value : colorValue,
					listeners : {
						select : function(picker, selColor) {
							record.set(cellIndex == 4
											? 'foreground'
											: 'background', '#' + selColor);
							Ext.getCmp('colorWinId').close();
						}
					}

				});
		if (colorWin) {
			colorWin.close();
		}
		colorWin = Ext.create('Ext.window.Window', {
					id : 'colorWinId',
					items : colorPanel,
					// header : false,
					resizable : false,
					modal : true,
					x : left,
					y : top

				});
		colorWin.show();
	},
	setCellColor : function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		if (cellIndex == 4 || cellIndex == 5) {
		} else {
			this.closeColorWin();
		}
	},
	/**
	 * 解析报警公式设置
	 * @param {}mode mode = 0 表示是验证时使用的 需要验证消息  不能修改store
	 * @param {}record
	 * @param {}index
	 * @param {}eOpts
	 */
	resolveAlarmFormulaContent : function(mode, record) {
		var msg = '';
		var alarmFormulaContentStore = this.getAlarmformulacontent().getStore();
		alarmFormulaContentStore.removeAll();
		if(mode==1){
			alarmFormulaContentStore.commitChanges();
			return ;
		}
		var alarmFormulaContent = record.get('content');
		alarmFormulaContentStore.removeAll();
		if(alarmFormulaContent==''||alarmFormulaContent==null){
			alarmFormulaContentStore.removeAll();
			return;
		}
		//去除字符串左右的空格
		alarmFormulaContent = this.lTrim(this.rTrim(alarmFormulaContent));
		var operationArray = ['>', '<', '==', '>=', '<='];
		//首先使用And分隔字符串
		var contentAnd = alarmFormulaContent.split('&&');
		for(var i = 0;i<contentAnd.length;i++){
			var alarmItem = '';
			var operation = '';
			var values = '';
			contentAnd[i] = this.lTrim(this.rTrim(contentAnd[i]));
			//使用分隔符 再次分割字符串
			for(var j = 0 ; j< operationArray.length;j++){
				var operIndex = contentAnd[i].indexOf(' '+operationArray[j]+' ');
				if (operIndex != -1) {
					alarmItem = contentAnd[i].substring(0, operIndex).replace(/(^\s*)|(\s*$)/g, "");
					if(alarmItem=='null'||alarmItem==null){
						alarmItem='';
					}
					operation = operationArray[j];
					values = contentAnd[i].substring(operIndex + operationArray[j].length+1)+' ';
					values = values.replace(/(^\s*)|(\s*$)/g, "");
					if(values=='null'||values==null){
						values='\"\"';
					}else{
						if(!isNaN(values)){
		//				    alert("是数字");
							values = '\"'+values+'\"';
						}else if(values.lastIndexOf('"')==-1){
							values = '\"'+values+'\"';
						}
					}
					break;
				}
			}
			//生成store
			var str = '[{"alarmItem":"'+alarmItem+'","operation":"'+operation+'","values":'+values+'}]';
			alarmFormulaContentStore.add(Ext.decode(str));
		}
		this.getAlarmformulacontent().getPlugin().completeEdit();
		if (alarmFormulaContentStore.getCount() > 0){
			this.getAlarmformulacontent().getSelectionModel().select(0);
		}
		alarmFormulaContentStore.commitChanges();
		
		
	},
	/**
	 * 只是解析 用来进行验证，不保存数据
	 * @param {} record
	 */
	checkAlarmFormulaContent:function(record){
		var msg = '';
		var alarmFormulaContent = record.get('content');
		if(alarmFormulaContent==null||alarmFormulaContent=='null'||alarmFormulaContent==''){
			return msg;
		}
		//去除字符串左右的空格
		alarmFormulaContent = this.lTrim(this.rTrim(alarmFormulaContent));
		var operationArray = ['>', '<', '==', '>=', '<='];
		//首先使用And分隔字符串
		var contentAnd = alarmFormulaContent.split('&&');
		for(var i = 0;i<contentAnd.length;i++){
			var alarmItem = '';
			var operation = '';
			var values = '';
			contentAnd[i] = this.lTrim(this.rTrim(contentAnd[i]));
			//使用分隔符 再次分割字符串
			for(var j = 0 ; j< operationArray.length;j++){
				var operIndex = contentAnd[i].indexOf(operationArray[j]);
				if (operIndex != -1) {
					alarmItem = contentAnd[i].substring(0, operIndex).replace(/(^\s*)|(\s*$)/g, "");//去掉空格
					if(alarmItem==''||alarmItem==null||alarmItem=='null'){
						msg += '第 ' + (i+1) + ' 行的报警项为空；';
					}else{
						//判断报警字段里是否还有该字段
						var alarmFieldsRecords = Ext.getStore('alarm.AlarmFields').getRange();
						var flag = false;
						for(var m = 0;m<alarmFieldsRecords.length;m++){
							var fieldName = alarmFieldsRecords[m].get('fieldName');
							if(fieldName==alarmItem){
								flag = true;
								break;
							}
						}
						if(!flag){
							msg += '第 ' + (i+1) + ' 行的报警项的值在报警字段中已经去除，请修改；';
						}
					}
					operation = operationArray[j];
					values = contentAnd[i].substring(operIndex + operationArray[j].length + 1)+' ';
					values = values.toString().replace(/(^\s*)|(\s*$)/g, "");//去掉空格
					if(values==''||values==null||values=='null'){
						msg += '第 ' + (i+1) + ' 行的值为空；';
					}
					break;
				}
			}
		}
		return msg;
	},
	/**
	 * 选择报警公式 公式设置 时  控制按钮
	 * @param {} mode
	 * @param {} record
	 * @param {} index
	 * @param {} eOpts
	 */
	selectAlarmFormulaContent:function(mode, record, index, eOpts){
		//使 删除按钮 可用
		this.getAlarmformulacontent().buttonDel.setDisabled(false);
	},
	/**
	 * 编辑公式设置后 将数据保存到报警公式的store中
	 * @param {} comp
	 * @param {} eOpts
	 */
	afterrenderAlarmFormulaContent:function(comp,eOpts){
		var me = this;
		var alarmFormulaContentStore = this.getAlarmformulacontent().store;
		alarmFormulaContentStore.on({
			datachanged:function(){
				var alarmFormulaRecords = me.getAlarmformula().getSelectionModel().getSelection();
				if(alarmFormulaRecords.length>0){
					var alarmFormulaContentRecords = me.getAlarmformulacontent().getStore().getRange();
					me.setContent(alarmFormulaContentRecords,1,alarmFormulaRecords[0]);//view为1  不进行验证了
				}
			},
			update:function(){
				var alarmFormulaRecords = me.getAlarmformula().getSelectionModel().getSelection();
				if(alarmFormulaRecords.length>0){
					var alarmFormulaContentRecords = me.getAlarmformulacontent().getStore().getRange();
					me.setContent(alarmFormulaContentRecords,1,alarmFormulaRecords[0]);//view为1  返回验证失败
				}
			}
		})
	},
	/**
	 * 反解析报警公式，把设置的值解析为存入数据库的字符串
	 * @param {}records
	 * @param alarmRecord  //alarmFormulaStore
	 * @return {}
	 */
	setContent : function(records, view, alarmFormulaRecord) {
		var alarmFormulaContent = '';
		for(var i = 0 ; i<records.length; i++){
			var index = i+1;//第index行
			var id = records[i].get('id');
			var alarmFormulaId = records[i].get('alarmFormulaId');
			var alarmItem = records[i].get('alarmItem');
			var operation = records[i].get('operation');
			//可输入 数据  去掉输入的空字符
			var values = records[i].get('values')+' ';
			values = values.toString().replace(/(^\s*)|(\s*$)/g, "");
			//判断values是不是数字，如果不是数字，则在保存是加上""
			if(values!=null && values!=''){
				if(!isNaN(values)){
//				    alert("是数字");
					values = values;
				}else{
					values = '\"'+values+'\"';
				}
			}
			var relation = '&&';
			alarmFormulaContent += relation + ' ' + alarmItem + ' ' + operation + ' ' + values+' ' ; 
		}
		if(alarmFormulaContent!=''&&alarmFormulaContent!=null){
			alarmFormulaContent = alarmFormulaContent.substr(3);//去掉第一个'And '
		}
		alarmFormulaRecord.set('content',alarmFormulaContent);
		Ext.getCmp('alarmformulacontent').getStore().commitChanges();
	},
	/**
	 * 选中查询时查询报警公式项及报警公式
	 * 
	 * @param {}mode
	 * @param {}selected
	 * @param {}eOpts
	 */
	queryAlarmList : function(mode, record, eOpts) {
		if(!record)
			return;
		var queryId = record.get('queryId');
		var nType= record.get('nodeType');
		var isQuery = (nType==2?true:(nType==1?false:null));
		if(nType == 0 || record.get('qtype')=='chart'||record.get('qtype')=='mashup')
			return;
		this.resolveAlarmFormulaContent(1);
		var me = this;
		var loadFormula = false, loadAlarmGroup = false;
		// 报警规则
		var alarmFormulaStore = Ext.getStore('alarm.AlarmFormula');
		alarmFormulaStore.load({
			scope:this,
			params : {
				queryOrSubjectId : queryId,
				isQuery : isQuery
			},
			callback:function(records,operation,success){
//				console.log(records);
				loadFormula = true;
			}
		});
		
//		console.log(alarmFormulaStore.getRange());
		
		//报警分组
		var alarmGroupStore = this.getStore('alarm.AlarmGroup');
		alarmGroupStore.load({
					scope : this,
					params : {
						queryId : queryId,
						queryType : nType
					},
					callback:function(records,operation,success){
						loadAlarmGroup = true;
					}
		});
		
		var loadCount = 0;
		// 加载报警可用字段
		Ext.getCmp('gridAlarmField').getStore().load({
					scope : this,
					params : {
						queryId : queryId,
						queryType : nType
					},
					callback:function(allFieldRecords,operation, success){
						loadCount ++;
						// 加载报警字段
					}
				});
		me.getStore('alarm.AlarmFields').load({
			scope : this,
			params : {
				queryId : queryId,
				queryType : nType
			},
			callback : function(alarmFieldRecords, operation1, success1) {
				// 给报警公式的值选择store赋值 csx
				var alarmFieldsForValue = Ext.getStore('alarmContentValueStore');
				for(var idx=0;idx<alarmFieldRecords.length;idx++){
					alarmFieldsForValue.add(alarmFieldRecords[idx]);
				}
				loadCount ++;
			}
		});
		
		// 等待两个store都加载完成之后再执行选中报警字段
		var timer = setInterval(function(){
			if(loadCount == 2){
				clearInterval(timer); // 清除等待
				me.selectedAlarmField();
			}
		},100);
		// 等待两个store都加载完成之后再执行选中报警字段
		var timer1 = setInterval(function(){
			if(loadFormula && loadAlarmGroup && loadCount == 2){
				clearInterval(timer1); // 清除等待
				//me.selectedAlarmField();
				if(alarmGroupStore.getRange().length>0)
					me.getAlarmgroup().getSelectionModel().select(0);
			}
		},100);
		
	},
	// 选中报警字段
	selectedAlarmField:function(tabPanel,newCard,oldCard){
		// 当前选中的是报警tab时或方法调用时执行，否则返回
		if(newCard && newCard.id != 'alarmPanel')
			return;
		var gridSelection = Ext.getCmp('gridAlarmField').getSelectionModel();
		if(gridSelection.getSelection().length>0)
			return;
		var selects = [];
		var alarmFieldRecords = this.getStore('alarm.AlarmFields').getRange();
		var alarmStore = Ext.getCmp('gridAlarmField').getStore();
		for(var n=0;n<alarmFieldRecords.length;n++){
			var rec = alarmStore.findRecord('fieldName',alarmFieldRecords[n].get('fieldName'));
			if(rec){
				selects.push(rec);
			}
		}
		//gridSelection.select(selects);
		
		gridSelection.select(selects);
		
		//选中分组
		if(this.getAlarmgroup().getStore().getRange().length>0)
			this.getAlarmgroup().getSelectionModel().select(0)
	},
	/**
	 * 公共的保存调用验证的方法
	 * @return {}
	 */
	validBeforeSave : function() {
		//思路 首先验证group 然后通过groupId去验证每个分组里的规则，验证规则的时候 验证其公式设置是否可行
		//验证包括 重名验证，非空验证
		var me = this;
		var msg = '';
		var alarmFieldsStore = Ext.getStore('alarm.AlarmFields');
		var alarmGroupStore = Ext.getStore('alarm.AlarmGroup');
		var alarmGroupRecords = alarmGroupStore.getRange();
		var alarmFormulaStore = Ext.getStore('alarm.AlarmFormula');
		var alarmFormulaRecords = alarmFormulaStore.getRange();
		//验证页面是否被改动过
		var alarmFieldsRecords_modified = alarmFieldsStore.getModifiedRecords();
		var alarmFieldsRecords_deleted = alarmFieldsStore.getRemovedRecords();
		var alarmGroupRecords_modified = alarmGroupStore.getModifiedRecords();
		var alarmGroupRecords_deleted = alarmGroupStore.getRemovedRecords();
		var alarmFormulaRecords_modified = alarmFormulaStore.getModifiedRecords();
		var alarmFormulaRecords_deleted = alarmFormulaStore.getRemovedRecords();
		var count = alarmFieldsRecords_modified + alarmFieldsRecords_deleted + alarmGroupRecords_modified.length + alarmGroupRecords_deleted.length + alarmFormulaRecords_modified.length + alarmFormulaRecords_deleted.length;
		if(count==0){
			//页面未改动
			return -1;
		}
		for(var i = 0; i < alarmGroupRecords.length; i++){
			//验证报警项目 名称是否合法
			var alarmGroupName = alarmGroupRecords[i].get('name')+' ';
			alarmGroupName = alarmGroupName.toString().replace(/(^\s*)|(\s*$)/g, "");
			if(alarmGroupName==''){
				msg += '第 '+(i+1)+' 行报警项目名称为空；';
			}else{
				for(var j = i+1; j < alarmGroupRecords.length; j++){
					var alarmGroupNameTemp = (alarmGroupRecords[j].get('name')+' ').toString().replace(/(^\s*)|(\s*$)/g, "");
					if(alarmGroupName==alarmGroupNameTemp){
//						msg += '第 '+(i+1)+' 行与第 '+(j+1)+'行报警项目名称重复；';
						msg += '报警项目 ' + alarmGroupName +' 的名称重复；';
					}
				}
			}
			var alarmGroupId = alarmGroupRecords[i].get('id');
				//验证报警规则 名称的合法性
			for(var m = 0;m<alarmFormulaRecords.length&&alarmFormulaRecords[m].get('alarmGroupId')==alarmGroupId;m++){
				var alarmFormulaName = alarmFormulaRecords[m].get('name')+' ';
				alarmFormulaName = alarmFormulaName.toString().replace(/(^\s*)|(\s*$)/g, "");
				if(alarmFormulaName == ''){
//					msg += '第 '+(i+1)+' 行报警项目中的第 '+(m+1)+' 行报警规则名称为空；';
					msg += '报警项目 ' + alarmGroupName +' 中的第 '+(m+1)+' 行报警规则名称为空；';
				}else{
					for(var n = m+1;n<alarmFormulaRecords.length&&alarmFormulaRecords[n].get('alarmGroupId')==alarmGroupId;n++){
						var alarmFormulaNameTemp = (alarmFormulaRecords[n].get('name')+' ').toString().replace(/(^\s*)|(\s*$)/g, "");
						if(alarmFormulaName==alarmFormulaNameTemp){
//							msg += '第 '+(i+1)+' 行报警项目中的第 '+(i+1)+' 行与第 '+(j+1)+'行报警规则名称重复；';
							msg += '报警项目 ' + alarmGroupName + ' 中的报警规则  ' + alarmFormulaName + ' 的名称重复；';
						}
					}
				}
				//验证 报警规则 报警列 的合法性
				var alarmColumn = alarmFormulaRecords[m].get('alarmColumn');
				if(alarmFormulaName==''||alarmFormulaName=='null'||alarmFormulaName==null){
//					msg += '第 '+(i+1)+' 行报警项目中的第 '+(m+1)+' 行报警规则报警列为空；';
					msg += '报警项目 ' + alarmGroupName + ' 中的报警规则 '+ alarmFormulaName +' 的报警列为空；';
				}
				//验证公式设置
				contentCheck = me.checkAlarmFormulaContent(alarmFormulaRecords[m]);
				if(contentCheck!=''){
//					msg += '第 '+(i+1)+' 行报警项目中第 '+(m+1)+' 行报警规则'+contentCheck;
					msg += '报警项目 ' + alarmGroupName + ' 中的报警规则 '+alarmFormulaName+' 的'+ contentCheck;
				}
			}
		}
		return msg;
	},
	/**
	 * 公共的保存调用方法
	 * @return {}
	 */
	getSaveObject : function() {
		var list = [], arr = [], rec, recFormula, arrFormula;
		// 告警字段
		var alarmFields = this.getStore('alarm.AlarmFields').getRange();
		for(var idx = 0; idx<alarmFields.length;idx++){
			rec = [];
			rec.push(alarmFields[idx].get('fieldName'));
			rec.push(alarmFields[idx].get('sourceName'));
			arr.push(Ext.encode(rec));
		}
		list.push(Ext.encode(arr));
		// 分组
		arr = []; 
		var alarmGroupStore = this.getStore('alarm.AlarmGroup');
		var alarmGroups = alarmGroupStore.getRange();//.getModifiedRecords();
		var alarmGroup_deleted = alarmGroupStore.getRemovedRecords();
		
		var alarmFormulaStore = this.getStore('alarm.AlarmFormula');
		alarmFormulaStore.clearFilter(true);
		var alarmFormul_deleted = alarmFormulaStore.getRemovedRecords();
		var alarmFormul_modified = alarmFormulaStore.getModifiedRecords();
		var groupId;
		for(idx=0;idx<alarmGroups.length;idx++){
			rec=[];arrFormula=[];
			groupId = alarmGroups[idx].get('id');
			rec.push(groupId);
			rec.push(alarmGroups[idx].get('name'));
			rec.push(alarmGroups[idx].get('isDefault'));
			// 报警规则
			Ext.Array.each(alarmFormul_modified, function(formula){
				if(formula.get('alarmGroupId')==groupId){
					recFormula=[];
					recFormula.push(formula.get('id'));
					recFormula.push(formula.get('name'));
					recFormula.push(formula.get('content'));
					recFormula.push(formula.get('background'));
					recFormula.push(formula.get('foreground'));
					recFormula.push(Ext.isNumeric(formula.get('serial'))?formula.get('serial'):1);
					recFormula.push(formula.get('isValid')=="1"?true:false);
					recFormula.push(formula.get('alarmMode'));
					recFormula.push(formula.get('alarmColumn'));
					arrFormula.push(Ext.encode(recFormula));
				}
			});
			rec.push(Ext.encode(arrFormula));
			arr.push(Ext.encode(rec));
		}
		list.push(Ext.encode(arr));
		arr = []; 
		for(idx=0;idx<alarmGroup_deleted.length;idx++){
			arr.push(alarmGroup_deleted[idx].get('id'));
		}
		list.push(Ext.encode(arr));
		
		arr = []; 
		for(idx=0;idx<alarmFormul_deleted.length;idx++){
			arr.push(alarmFormul_deleted[idx].get('id'));
		}
		list.push(Ext.encode(arr));
		return Ext.encode(list);
	},
	/**
	 * 删除一个报警公式项
	 * @param {}btn
	 * @param {}e
	 * @param {}eOpt
	 */
	delAlarmFormula : function(btn, e, eOpt) {
		var grid = btn.up('gridpanel');
		var formPanel = grid.getSelectionModel();
		var formRecords = formPanel.getSelection();
		if (formRecords.length > 0) {
			var formStore = formPanel.getStore();
			//锁定下一行 如果没有下一行 锁定上一行
			var index = formStore.indexOf(formRecords[0]);
			if (index != formStore.count() - 1) {
				index = index + 1;
			} else if (index != 0) {
				index = index - 1;
			}else{
				btn.setDisabled(true);//使删除按钮不可用
			}
			var record = formStore.getAt(index);
			// 先处理关联的的下一级
			if(grid.getId() == 'alarmgroup'){
				this.getAlarmformulacontent().getStore().removeAll();
				var formulaStore = this.getStore('alarm.AlarmFormula');
				var formulaIdx;
				while((formulaIdx = formulaStore.find('alarmGroupId',record.get('id')))!=-1){
					formulaStore.removeAt(formulaIdx);
				}
			}
			else if(grid.getId() == 'alarmformula'){
				this.getAlarmformulacontent().getStore().removeAll();
			}
			// 再删除自身
			formStore.remove(formRecords[0]);
			if (formStore.getCount() > 0) {
				formPanel.select(formStore.indexOf(record));
			} 
		}
	},
	// 去掉字符串左边空格
	lTrim : function(str) {
		if (str.charAt(0) == " ") {
			// 如果字串左边第一个字符为空格
			str = str.slice(1);// 将空格从字串中去掉
			// 这一句也可改成 str = str.substring(1, str.length);
			str = this.lTrim(str); // 递归调用
		}
		return str;
	},
	// 去掉字串右边的空格
	rTrim : function(str) {
		var iLength;
		iLength = str.length;
		if (str.charAt(iLength - 1) == " ") {
			// 如果字串右边第一个字符为空格
			str = str.slice(0, iLength - 1);// 将空格从字串中去掉
			// 这一句也可改成 str = str.substring(0, iLength - 1);
			str = this.rTrim(str); // 递归调用
		}
		return str;
	},
	/**
	 * 验证store是否改变
	 * @param {} store
	 */
	dataChanged : function(store){
		var modifiedCount = store.getModifiedRecords().length;
		var removeCount = store.getRemovedRecords().length;
		var v = (modifiedCount>0||removeCount>0);
		changeTitle('Alarm',v);
		if(hasChanged != v)
		{
			hasChanged = v;
		}
	}	
});
