Ext.define('HummerApp.controller.Main', {
	extend : 'Ext.app.Controller',
	subjectId : null,// 主题ID
	stores : [
			'Querys',
			'Querytree',// 弹出框所只用的主题树
			'Subjects',
			'QueryPanelTree',// 主题panel区域使用的主题树
			// 报警设置
			'alarm.AlarmFields',
			'alarm.AlarmFormulas',
			'alarm.FormulaItems',
			// 查询条件
			'condition.SelectedConditions', 'condition.ConditionMapped',

			'option.Options'],
	models : ['FormulaItem','QueryTree'],
	views : ['Viewport', 'Subject', 'Design',
			'Preview',
			'SubjectTree',
			'PublishWindow',
			'query.Edit',
			'query.Querytree',// 弹出框主题数view
			// 查询选项
			'design.option.Option',
			// 查询条件
			'design.condition.Condition',
			'design.condition.ConditionList',
			// 按钮
			'design.button.Button',
			// 报警设置
			'design.alarm.Alarm', 'design.alarm.AlarmList',
			'design.alarm.FormulaList', 'design.alarm.FormulaItem',
			// 表内链接
			'design.link.Link', 'design.link.ParamMapped',
			'design.link.ParamSet', 'design.link.LinkUrlSet'
			],
	refs : [ 
			// 引用窗口中grid对象
			{ref : 'queryedit',selector : 'queryedit'},
			{ref : 'querylist',selector : 'querylist'}, 
			{ref : 'subject',selector : 'subject'}, 
			{ref : 'publishwindow',selector : 'publishwindow'}],
	init : function() {
		this.control({
					// 点击主题刷新查询列表信息
					'subject treepanel' : {
//						select : this.selectLeaf
						// itemclick : this.selectLeaf
					},
					// 注册查询列表面板中新增操作
					'querylist button[action=add_query_button]' : {
						click : this.addQueryWin
					},
					// 注册查询面板编辑操作
					'querylist button[action=edit_query_button]' : {
						click : this.editQueryWin
					},
					// 注册查询面板编辑操作
					'querylist button[action=delete_query_button]' : {
						click : this.deleteQuery
					},
					// 查询列表双击事件编辑查询信息
					'querylist' : {
						select : this.selectSubjectTree,
						itemdblclick : this.dblClickNode
					},
					// 编辑查询窗口中的关闭按钮
					'queryedit button[action=edit_cancel_button]' : {
						click : this.cancelWindow
					},
					// 编辑查询窗口中的保存按钮
					'queryedit button[action=edit_save_button]' : {
						click : this.addQuery
					},
					// 设计、预览 tab切换
					'tabpanel[id=designAndPrePanel]' : {
						beforetabchange : this.beforetabChange,
						tabchange : this.tabpanelChange
						// 选项卡改变事件
					},
					// 注册发布按钮-默认发布到菜单上
					'querylist button[action=publish_button]': {
						click : this.queryPublish
					},
					// 注册发布按钮
					'querylist button[action=publish_button] #buttonPublishMenu': {
						click : this.queryPublish
					},
					// 注册发布按钮
					'querylist button[action=publish_button] #buttonPublishComment': {
						click : this.queryPublish
					}
				});
	},
	/**
	 * 打开远程控制中心窗口
	 * 
	 * @param {}
	 *            eagle2Url eagle2的链接地址
	 * @param {}
	 *            record 查询节点参数
	 */
	openPublishWindow : function(eagle2Url, record,buttonType, buttonModels) {
		var queryId = record.get('queryId');
		var queryName = record.get('text');
		var width = '';
		var height = '';
		
		var buttonIds = [];
		var buttonNames = [];
		for(var idx in buttonModels){
			buttonIds.push(buttonModels[idx].get('id'));
			buttonNames.push(buttonModels[idx].get('name'));
		}
		menuUrl = '/report.action?queryId=' + queryId
		if(buttonType == '注册到菜单' ){
			var webUrl = eagle2Url
					+ '/coc/application/controller/resource/RegMenu.action?'
					+ 'relevanceId=' + queryId + '&menuName=' + encodeURI(queryName)
					+ '&menuUrl=' + menuUrl + '&origin=HUMMER'
					+ '&buttonIds=' + buttonIds.join(',') + '&buttonNames=' + buttonNames.join(',');
			 width = 600;
//			 height = 330;
			 height = 380;
		}else if(buttonType == '注册首页组件'){
			var webUrl = eagle2Url
					+ '/coc/application/controller/resource/RegPortlet.action?'
					+ 'relevanceId=' + queryId + '&portletTitle=' + encodeURI(queryName)
					+ '&portletUrl=' + menuUrl + '&origin=HUMMER';
			 width = 400;
			 height = 180;
		}
		remote.showInWindow(buttonType,webUrl,width,height,null,null);

	},
	// 供远程调用的关闭窗口方法
	closeMenuWindow : function(btn, e, eOpt) {
		Ext.getCmp('publishwindow').close();
	},
	/**
	 * 查询远程eagle2的链接地址，在回调函数中调用打开窗口的方法
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */
	queryPublish : function(btn, e, eOpt) {
		var records = this.getQuerylist().getSelectionModel().getSelection();
		if (records.length == 0 || records[0].get('nodeType') != '2')
			return;
		else {
			//按钮信息
			var buttonModels = Ext.getCmp('buttonPanel').getStore().getRange();
			var eagle2Url = '';
			var proxy = this;
			var buttonType = btn.text;
			Ext.Ajax.request({
				url : '/hummer/application/controller/query/GetEagle2Url.action',
				callback : function(recs, operation, success) {
//					if(btn.text=='注册菜单'){
//						buttonType = '注册菜单';
//					}else if(btn.text=='注册组件'){
//						buttonType = '注册组件'
//					}
					eagle2Url = Ext.decode(success.responseText);
					if (eagle2Url == null || eagle2Url == ''
							|| eagle2Url == 'undefined') {
						Ext.MessageBox.alert('提示', '查询发布路径未定义！')
						return;
					} else{
						if(btn.tooltip=='发布'){
							proxy.openPublishWindow(eagle2Url, records[0],'注册到菜单', buttonModels);
						}else{
							proxy.openPublishWindow(eagle2Url, records[0],buttonType, buttonModels);
						}
					}
				}
			});
		}
	},

	/**
	 * 点击主题刷新查询的列表信息
	 * 
	 * @param {}
	 *            view
	 * @param {}
	 *            record
	 * @param {}
	 *            item
	 * @param {}
	 *            index
	 */
	selectLeaf : function(m, record, index, e) {// (view,record,item,index){
		var queryStore = this.getStore('Querys');
		var issubject = record.raw.ISSUBJECT;
		// 判断若是主题调用刷新query列表
		if (issubject == 1) {
			subjectId = record.raw.categoryId;
			this.queryListIndex(null);
		} else {
			subjectId = null;
			queryStore.removeAll();
		}
	},
	/**
	 * 获得主题ID
	 */
	selectSubjectTree : function(m, record, index, e) {
		var panel = Ext.getCmp('queryList');
		var buttonAdd = panel.buttonAdd;
		var buttonEdit = panel.buttonEdit;
		var buttonDel = panel.buttonDel;
		var buttonPublish = panel.buttonPublish;
		
		var subjectId = null;
		var nodeType = record.get('nodeType');
		var parentNodeType = record.parentNode.get('nodeType');
		if (nodeType == '2' && parentNodeType == '1') {
			buttonAdd.setDisabled(false);
			buttonEdit.setDisabled(false);
			buttonDel.setDisabled(false);
			buttonPublish.setDisabled(false);
			this.subjectId = record.parentNode.get('queryId');
		} else if (nodeType == '1') {
			buttonAdd.setDisabled(false);
			buttonEdit.setDisabled(true);
			buttonDel.setDisabled(true);
			buttonPublish.setDisabled(true);
			this.subjectId = record.get('queryId');
		} else {
			buttonAdd.setDisabled(true);
			buttonEdit.setDisabled(true);
			buttonDel.setDisabled(true);
			buttonPublish.setDisabled(true);
			this.subjectId = null;
		}
		this.querySelection(m, record, e);
	},
	/**
	 * 新增查询
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */
	addQueryWin : function(btn, e, eOpt) {
		if (this.subjectId == null || this.subjectId == '') {
			this.pointMsg('提示', '请选择主题！');
			return;
		}
		var addWin = this.getQueryedit();
		if (!addWin) {
			addWin = Ext.create('HummerApp.view.query.Edit');
		};
		var editForm = addWin.down('form').getForm();
		editForm.reset();
		editForm.findField('qtype').select('list');
		editForm.findField('menuable').select(true);
		editForm.findField('mashupLayout').setVisible(false);
		editForm.findField('qtype').setReadOnly(false);
		editForm.findField('mashupLayout').setReadOnly(false);
		addWin.title = '新增查询';
		addWin.show();
	},
	/**
	 * 查询列表改变事件
	 * 
	 * @param {}mode
	 * @param {}selected
	 * @param {}eOpts
	 */
	querySelection : function(mode, record, eOpts) {
		var queryId = record.get('queryId');
		if (Ext.getCmp('designAndPrePanel').getActiveTab().id == 'previewpanel' && record.get('nodeType')=='2') {// 设计tab选中执行
				Ext.getCmp('previewpanel').body
						.update('<iframe name="viewframe" src="report.action?queryId='
								+ queryId
								+ '&preview=true&currentUser='+currentUser
								+'&currentUnit='+currentUnit
								+'&currentMonth='+currentYearMonth
								+'" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>');
//			if (record != null && record.get('qtype') == 'list') {
//			} else {
//				Ext.getCmp('previewpanel').body
//						.update('<iframe name="viewframe" src="" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>');
//			}
//			console.log(queryId);
		}else{  // 
//			// 可用字段(原始+计算)
//			var nType=record.get('nodeType');
//			if(nType == 0)
//				return;
//			var allFieldStore = this.getStore("field.AllFields");
//			//allFieldStore.removeAll();
//			allFieldStore.load({
//						scope : this,
//						params : {
//							queryId : queryId,
//							queryType : nType
//						},
//						callback:function(records){
//							console.log(Ext.getCmp('gridAlarmField').getStore());
//						}
//					});
		}
		
	},
	/**
	 * 双击节点时判断节点类型是否为查询
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */
	dblClickNode : function(btn, e, eOpt) {
		var records = btn.up('treepanel').getSelectionModel().getSelection();
		if (records[0].get('nodeType') != '2')
			return;
		else
			this.editQueryWin(btn, e, eOpt);
	},
	/**
	 * 编辑查询信息
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */

	editQueryWin : function(btn, e, eOpt) {
		if (this.subjectId == null || this.subjectId == '') {
			this.pointMsg('提示', '请选择主题！');
			return;
		}
		var records = btn.up('treepanel').getSelectionModel().getSelection();
		if (records.length > 0 && records[0].get('nodeType') == '2') {
			var editWin = this.getQueryedit();
			if (!editWin) {
				editWin = Ext.create('HummerApp.view.query.Edit');
			};
			var editForm = editWin.down('form').getForm();
			var queryId = records[0].get('queryId');
			Ext.Ajax.request({
						url : '/hummer/application/controller/query/FindQuery.action',
						params : {
							queryId : queryId
						},
						scope : this,
						success : function(response) {
							var retmsg = Ext.decode(response.responseText);
							editForm.reset();
							if (retmsg.qtype == 'mashup') {
								editForm.findField('mashupLayout')
										.setVisible(true);
								editForm.findField('mashupLayout')
										.select(retmsg.layout);
							} else {
								editForm.findField('mashupLayout')
										.setVisible(false);
							}
							editForm.findField('queryId').setValue(retmsg.id);
							editForm.findField('name').setValue(retmsg.name.toString().replace(/(^\s*)|(\s*$)/g, ""));
							editForm.findField('menuable').select(retmsg.menuable);
							if(retmsg.qtype=='mashup'){
								editWin.setHeight(210);
							}else{
								editWin.setHeight(178);
							}
									
							editForm.findField('qtype').select(retmsg.qtype);
							editForm.findField('qtype').setReadOnly(true);

							editWin.setTitle('编辑查询');
							editWin.show();
						}
					});

		} else {
			this.pointMsg('提示', '请选择一条查询信息！');
		}
	},
	/**
	 * 删除查询
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */
	deleteQuery : function(btn, e, eOpt) {
		var records = this.getQuerylist().getSelectionModel().getSelection();
		var queryStore = this.getQuerylist().getStore()
		var delProxy = this;
		if (records.length > 0 && records[0].get('nodeType') == '2') {
			Ext.MessageBox.confirm('提示', '确实删除  ' + records[0].get('text')
							+ '  查询信息吗?', function(_btn) {
					if (_btn == 'yes') {
						var queryId = records[0].get('queryId');
						if(remote){
							var regMenuBack = remote.delCocRegMenu(queryId);
							var regPortletBack = remote.delCocRegPortlet(queryId);
						}
//						if(regMenuBack && regPortletBack){
						// 提交后台删除操作
						Ext.Ajax.request({
							url : '/hummer/application/controller/query/DeleteQuery.action',
							params : {
								queryId : queryId
							},
							success : function(response) {
								var msgText = '';
								var func = '';
								if(response.responseText=='false'||response.responseText==false){
									msgText = '存在级联关系，不可删除！';
								}else{
									msgText = '删除成功！';
									func = delProxy.aftreDelSelectNode(queryId);
								}
								Ext.MessageBox.show({
									scope : this,
									title : '提示',
									width : 200,
									msg : msgText,
									modal : true,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO,
									fn : func
								})
							}
						});
//							}else{
//								Ext.Msg.alert('提示信息','删除失败！');
//							}
						}else{
							return;
						}
					})
		} else {
			this.pointMsg('提示', '请选择一条查询信息！');
		}
	},
	/**
	 * 删除节点后选中节点
	 * 
	 * @param {}
	 *            queryId
	 */
	aftreDelSelectNode : function(queryId) {
		var treePanel = this.getQuerylist();
		var delNode = treePanel.getStore().getNodeById(queryId);
		var index = delNode.get('index');
		var parentNode = treePanel.getStore().getNodeById(this.subjectId);
		if (!delNode.get('isLast')) {
			index = index + 1;
		} else {
			index = index - 1;
		}
		var selectNode = parentNode.getChildAt(index);
		delNode.remove();
		if (selectNode == null)
			treePanel.getSelectionModel().select(parentNode);
		else
			treePanel.getSelectionModel().select(selectNode);
	},
	/**
	 * 保存
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */
	addQuery : function(btn, e, eOpt) {
		var editForm = btn.up('form').getForm();
		var name = editForm.findField('name').getValue().toString().replace(/(^\s*)|(\s*$)/g, "");
		var qtype = editForm.findField('qtype').getValue();
		var mashupLayout = editForm.findField('mashupLayout').getValue();
		var queryId = editForm.findField('queryId').getValue();
		if (this.subjectId == null || this.subjectId == '') {
			this.pointMsg('提示', '请选择主题！');
			return;
		} else if (name == null || name == '' ) {
			this.pointMsg('提示', '名称不能为空！');
			return;
		} else if (name.length > 200) {
			this.pointMsg('提示', '名称不能超过200个字符！');
			return;
		} else if (qtype == null || qtype == '') {
			this.pointMsg('提示', '查询类型不能为空！');
			return;
		} else if (qtype != null && qtype != '' && qtype == 'mashup'
				&& (mashupLayout == null || mashupLayout == '')) {
			this.pointMsg('提示', '混合排序类型不能为空！');
			return;
			// } else if (serial != null && serial != '' &&
			// !/^[0-9]*$/.test(serial)){
			// this.pointMsg('提示','顺序号只能为数字！');
			// return ;
		} else {
			// 提交表单
			editForm.submit({
						scope : this,
						url : '/hummer/application/controller/query/AddQuery.action',
						success : function(form, action) {
							if (action.result.success == 'success') {
								var retmsg = action.result.queryId;
								this.saveSuccess(retmsg + '#$' + qtype + '#$'
										+ name);
							}
						},
						params : {
							subjectId : this.subjectId
						}
					})
		}
	},
	/**
	 * 按节点类型返回相应的图标样式
	 * 
	 * @param {}
	 *            qtype
	 * @return {String}
	 */
	setNodeIconCls : function(qtype) {
		if (qtype == 'list') {
			return 'icon-list';
		} else if (qtype == 'chart') {
			return 'icon-chart';
		} else {
			return 'icon-mashup';
		}
	},
	/**
	 * 新增与更新后选中的节点
	 * 
	 * @param {}
	 *            msg
	 */
	selectNode : function(msg) {
		var treePanel = Ext.getCmp('queryList');
		var values = msg.split('#$');
		var node = treePanel.getStore().getNodeById(values[0]);
		if (node != null) {
			node.set('text', values[2]);
		} else {
			var parentNode = treePanel.getStore().getNodeById(this.subjectId);
			node = Ext.create('Ext.data.NodeInterface', {
						leaf : true
					});
			node = parentNode.createNode(node);
			node.set('id', values[0]);
			node.set('queryId', values[0]);
			node.set('nodeType', '2');
			node.set('qtype', values[1]);
			node.set('iconCls', this.setNodeIconCls(values[1]));
			node.set('text', values[2]);
			parentNode.appendChild(node);
			if (!parentNode.get('expanded ')) {
				parentNode.expand();
			}
		}
		treePanel.getSelectionModel().select(node);
	},
	/**
	 * 退出编辑窗口
	 * 
	 * @param {}
	 *            btn
	 * @param {}
	 *            e
	 * @param {}
	 *            eOpt
	 */
	cancelWindow : function(btn, e, eOpt) {
		btn.up('window').hide();
	},
	/**
	 * 页面提示信息
	 * 
	 * @param {}
	 *            title
	 * @param {}
	 *            msg
	 */
	pointMsg : function(title, msg) {
		Ext.MessageBox.show({
					title : title,
					width : 200,
					scope : this,
					msg : msg,
					modal : true,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				})

	},
	/**
	 * 保存成功提示窗口
	 */
	saveSuccess : function(queryId) {
		Ext.MessageBox.show({
					title : '提示',
					width : 200,
					scope : this,
					msg : '保存成功!',
					modal : true,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO,
					fn : this.closeWindow(queryId)
				})
	},
	/**
	 * 保存成功后关闭窗口，并刷新列表信息
	 */
	closeWindow : function(queryId) {
		// 并关闭当前窗口, 刷新grid
		var editWin = this.getQueryedit();
		editWin.hide();
		this.selectNode(queryId);
	},
	/**
	 * 设计、预览 tab切换改变前
	 */
	beforetabChange : function(tabPanel, newCard, oldCard, eOpts) {
//		if (newCard.id == 'previewpanel') {
//			var selectRows = this.getQuerylist().getSelectionModel()
//					.getSelection();
//			if (selectRows.length > 0) {
//				var buttonState = this.getController('Design').isChange(null,
//						selectRows[0], null, null);// 点击确定返回false ,点击取消返回true
//				if (buttonState != null && buttonState != undefined) {
//					if (!buttonState) {
//						return false;// 停留在当前设计页面
//					} else {
//						// this.getController('Design').saveAllDesignPanel();//
//						// 执行保存
//					}
//				}
//			} else {
//				Ext.Msg.alert('提示', '请选择一个查询！');
//				
//				return false;// 停留在当前设计页面
//			}
//
//		}
		if (newCard.id == 'previewpanel') {
			if(!Ext.getCmp('queryList').buttonSave.isDisabled( )){
				if (confirm("查询设计已修改，切换时只能看到修改前的数据！")) {
					return true;
				}else{
					return false;
				}
			}
		}
		

	},
	/**
	 * 设计、预览 tab切换
	 */
	tabpanelChange : function(tabPanel, newCard, oldCard, eOpts) {
		if (newCard.id == 'previewpanel') {// 预览
			var selectRows = this.getQuerylist().getSelectionModel().getSelection();
			if (selectRows.length > 0 &&　selectRows[0].get('nodeType')=='2') {
					Ext.getCmp('previewpanel').body
							.update('<iframe name="viewframe" src="report.action?queryId='
									+ selectRows[0].get('id')
									+ '&preview=true&currentUser='+currentUser
									+'&currentUnit='+currentUnit
									+'&currentMonth='+currentYearMonth
									+'" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>');

//				if (selectRows[0].get('qtype') == 'list' || selectRows[0].get('qtype') == 'chart') {
//				}else if(selectRows[0].get('qtype') == 'chart'){
//					Ext.getCmp('previewpanel').body
//							.update('<iframe name="viewframe" src="report.action?queryId='
//									+ selectRows[0].get('id')
//									+ '" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>');
//				}else {
//					Ext.getCmp('previewpanel').body
//							.update('<iframe name="viewframe" src="" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>');
//				}
			}
		} else {

		}
	}
});
