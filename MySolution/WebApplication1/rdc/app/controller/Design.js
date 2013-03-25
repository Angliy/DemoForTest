/**
 * 设计界面控制器
 */
Ext.define('HummerApp.controller.Design', {
    extend: 'Ext.app.Controller',

    views: ['Viewport',
            'Design',
            'design.option.Option',
            'query.List'
            ],
        	init: function() {
        		proxy = this;
        		hasChanged = false;
        		//修改设计 及保存按钮状态
        		map = new Ext.util.HashMap();
        	    this.control({
        	        //控制grid中的动作
        	        'querylist': {
        	        	beforedeselect:this.isChange,
        	        	select:this.showDesignTab
                    },
        	    	'querylist button[action=save_design_button]':{
        	    		click:this.saveAllDesignPanel
        	    	}
        	    });
        	    changeTitle=this.changeTitle
        	},
    		changeTitle : function(tabName, isChange){
    			map.add(tabName, isChange);
    			var result = false;
    			map.each(function(key, value, length){
    				result = result || value;
    			});
    			var panel  = Ext.getCmp('queryList');//queryList  design
    			if(result){
    				//修改加星号
    				if(panel.buttonSave.isDisabled()==true){
		        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
		        		if(node!= null &&node!= undefined){//设置带*号
		        			node.set("text","<font color=red>*</font>"+node.get('text').replace("<font color=red>*</font>",""));
//			        			Ext.getCmp('queryList').getView().refresh(); 
		        		}
		        		panel.buttonSave.setDisabled(false);
		        		panel.buttonAdd.setDisabled(true);
		        		panel.buttonEdit.setDisabled(true);
		        		panel.buttonDel.setDisabled(true);
	        		}
	        		result = false;
    			}else{
    				if(panel.buttonSave.isDisabled()==false){
		        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
		        		if(node!= null &&node!= undefined){//设置不带*号
		        			node.set("text",node.get('text').replace("<font color=red>*</font>",""));
//			        			Ext.getCmp('queryList').getView().refresh(); 
		        		}
		        		panel.buttonSave.setDisabled(true);
			        	panel.buttonAdd.setDisabled(false);
		        		panel.buttonEdit.setDisabled(false);
		        		panel.buttonDel.setDisabled(false);
	        		}
    			}
    			result = false;
    			return;
    		},
        	
        	isChange:function(model,record,index,eOpts){
        		if(record==undefined||record==''||record=='undefined'||record==null){
	        		return;
        		}
        		var queryId = record.get('id');
        		var node = Ext.getCmp('queryList').getStore().getNodeById(queryId);
        		if(node== undefined || node=='' || node=='undefined' || node==null){
        			return;
        		}
        		var qtype = this.getQueryType();
        		if(qtype==''||qtype==undefined||qtype==null||qtype=='undefined'){
        			return;
        		}else{
        			//判断当前查询是否被修改，如果被修改，弹出提示信息
        		//if(qtype=='list'){
        			var panel = Ext.getCmp('queryList');// queryList design
					if (panel.buttonSave.isDisabled() == true) {//无修改
						if (node != null && node != undefined) {// 设置不带*号
							node.set("text", node.get('text').replace(
											"<font color=red>*</font>", ""));
//							Ext.getCmp('queryList').getView().refresh();
						}
						panel.buttonSave.setDisabled(true);
						return true;
					} else {// 有修改
						if (confirm("查询设计已修改，请先保存修改！")) {
							return false;
						} else {//不保存切换
							node.set("text", node.get('text').replace(
											"<font color=red>*</font>", ""));
							panel.buttonSave.setDisabled(true);
//							Ext.getCmp('queryList').getView().refresh();
							
						}
					}
        		}
	        },
        	
        	// 保存所有的设计页面
        	saveAllDesignPanel:function(){
        		var nType = '';
        		var isQuery = '';
        		var qtype = this.getQueryType();
        		if(!qtype){
        			return;
        		}
    			//列表信息
				if(Ext.getCmp('queryList').getSelectionModel().getSelection()[0] == undefined){
					Ext.Msg.alert('提示','请选择一个查询！');
					return;
				}else{
					queryId = Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('queryId');
					nType = Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('nodeType');
					isQuery = (nType==2?true:(nType==1?false:null));
				};
        		var allMsg = '';
				var paramArray = [];
				paramArray.push(queryId);
				paramArray.push(qtype);
				// 主题
				if(qtype=='subject'){
						
						var alarmArray = this.getController('Alarm').getSaveObject();
						/**
						 * 页面保存
						 */
						Ext.Ajax.request({
							url : "/hummer/application/controller/query/SaveQueryDesign.action",
							method : 'POST',
							params : {
								designArray : alarmArray,
								paramArray : paramArray   //queryId
							},
							success : function(response, opts) {
								if (response.responseText == "true") {
									
									var panel  = Ext.getCmp('queryList');
//					        		panel.setTitle('设计');
					        		panel.buttonSave.setDisabled(true);
					        		panel.buttonAdd.setDisabled(false);
					        		panel.buttonEdit.setDisabled(false);
					        		panel.buttonDel.setDisabled(false);
					        		hasChanged = false;
					        		map.clear();
					        		
					        		// 获得当前活动的tab页
					        		var tabPanel = Ext.getCmp('designTabpanel');
					        		var activeTabPanel = tabPanel.getActiveTab();
					        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
					        		if(node!= null &&node!= undefined){
					        			node.set("text",node.get('text').replace("<font color=red>*</font>",""));
					        			node.commit();
					        			Ext.getCmp('queryList').doLayout();
				        				Ext.getCmp('queryList').getSelectionModel().deselect(node);
					        		}
									Ext.Msg.alert('提示信息', '保存成功！');
									
									Ext.getCmp('queryList').getSelectionModel().select(node);
				        			tabPanel.setActiveTab(activeTabPanel);
				        			
//									//刷新各编辑页面
//									Ext.getStore('alarm.AlarmFields').load({params:{queryId:queryId,queryType:nType}});
//									var loadCount = 0;
//									Ext.getStore('alarm.AlarmGroup').load({
//										params:{
//											queryId:queryId,
//											queryType:nType
//										},
//										callback:function(){
////											if(Ext.getStore('alarm.AlarmGroup').getRange().length>0){
//												loadCount++;
////											}
//										}
//									});
//									Ext.getStore('alarm.AlarmFormula').load({
//										params:{queryOrSubjectId:queryId,isQuery:isQuery},
//										callback:function(){
////											if(Ext.getStore('alarm.AlarmFormula').getRange().length>0){
//												loadCount++;
////											}
//										}
//									});
//									// 等待两个store都加载完成之后再执行选中报警项目分组
//									var timer = setInterval(function(){
//										if(loadCount == 2){
//											clearInterval(timer); // 清除等待
//											Ext.getCmp('alarmgroup').getSelectionModel().select(0);
//										}
//									},100);
								}
							},
							failure:function(response, opts){
								Ext.Msg.alert('提示信息', '保存失败！<br/>' + response);
							}
						});
				}else if(qtype=='list'){
	        		/**
	        		 * 验证各个TAB页
	        		 */
					//查询选项
					var fieldMsg = this.getController('Field').validBeforeSave();
					var optionMsg = this.getController('Option').validBeforeSave();
					var alarmMsg = this.getController('Alarm').validBeforeSave();
					var linkMsg = this.getController('Link').validBeforeSave();
					var conditionMsg = this.getController('Condition').validBeforeSave();
					var buttonMsg = this.getController('Button').validBeforeSave();
					
					//查询条件
					if(conditionMsg != ''&&conditionMsg!='-1'){
						allMsg += '查询条件:' + conditionMsg + '<br/>';
					}
					//控制按钮
					if(buttonMsg != ''&&buttonMsg!='-1'){
						allMsg += '控制按钮:' + buttonMsg + '<br/>';
					}
					// 查询选项
					if(optionMsg != ''&&optionMsg!='-1'){
						allMsg += "查询选项："+ optionMsg + '<br/>';
					}
					//字段及表头
					if(fieldMsg != ''&&fieldMsg!='-1'){
						allMsg += '字段及表头:' + fieldMsg + '<br/>';
					}
					//报警设置
					if(alarmMsg != ''&&alarmMsg!='-1'){
						allMsg += '报警设置:' + alarmMsg + '<br/>';
					}
					//查询链接
					if(linkMsg != ''&&linkMsg!='-1'){
						allMsg += '表内链接:' + linkMsg + '<br/>';
					}
					
	        		if(allMsg != ''){
	        			Ext.Msg.alert('验证失败',allMsg);
	//        			return false;
	        		}else{
	        			//获取各编辑页面修改的数据
	        			var optionArray = this.getController('Option').getSaveObject();
//	        			var optionArray = null;   // 暂不处理 查询选项
	        			var fieldArray = this.getController('Field').getSaveObject();
	        			var linkArray = this.getController('Link').getSaveObject();
	        			var conditionArray = this.getController('Condition').getSaveObject();
	        			var alarmArray = this.getController('Alarm').getSaveObject();
	        			var buttonArray = this.getController('Button').getSaveObject();
	        			
	        			var designArray = new Array();
	        			designArray.push(optionArray);
	        			designArray.push(fieldArray);
	        			designArray.push(linkArray);
	        			designArray.push(conditionArray);
	        			designArray.push(alarmArray);
	        			designArray.push(buttonArray);
						/**
						 * 页面保存
						 */
						Ext.Ajax.request({
							url : "/hummer/application/controller/query/SaveQueryDesign.action",
							method : 'POST',
							params : {
								designArray : designArray,
								paramArray : paramArray   //queryId
							},
							success : function(response, opts) {
								if (response.responseText == "true") {
									
									var panel  = Ext.getCmp('queryList');
//					        		panel.setTitle('设计');
					        		panel.buttonSave.setDisabled(true);
					        		panel.buttonAdd.setDisabled(false);
					        		panel.buttonEdit.setDisabled(false);
					        		panel.buttonDel.setDisabled(false);
					        		hasChanged = false;
					        		map.clear();
					        		
					        		// 获得当前活动的tab页
					        		var tabPanel = Ext.getCmp('designTabpanel');
					        		var activeTabPanel = tabPanel.getActiveTab();
					        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
					        		if(node!= null &&node!= undefined){
					        			node.set("text",node.get('text').replace("<font color=red>*</font>",""));
					        			node.commit();
					        			Ext.getCmp('queryList').getSelectionModel().deselect(node);
					        		}
					        		
									Ext.Msg.alert('提示信息', '保存成功！');
				        			Ext.getCmp('queryList').getSelectionModel().select(node);
				        			tabPanel.setActiveTab(activeTabPanel);
//									//刷新各编辑页面
//									Ext.getStore('field.SelectedFields').load({params:{queryId:queryId}});
////									Ext.getStore('alarm.AlarmFormulas').load({params:{queryId:queryId}});
//									Ext.getStore('alarm.AlarmFields').load({params:{queryId:queryId,queryType:nType}});
//									var loadCount = 0;
//									Ext.getStore('alarm.AlarmGroup').load({
//										params:{
//											queryId:queryId,
//											queryType:nType
//										},
//										callback:function(){
//											if(Ext.getStore('alarm.AlarmGroup').getRange().length>0){
//												loadCount++;
//											}
//										}
//									});
//									Ext.getStore('alarm.AlarmFormula').load({
//										params:{queryOrSubjectId:queryId,isQuery:isQuery},
//										callback:function(records){
//											if(Ext.getStore('alarm.AlarmFormula').getRange().length>0){
//												loadCount++;
//											}
//										}
//									});
//									// 等待两个store都加载完成之后再执行选中报警项目分组
//									var timer = setInterval(function(){
//										if(loadCount == 2){
//											clearInterval(timer); // 清除等待
//											Ext.getCmp('alarmgroup').getSelectionModel().select(0);
//										}
//									},100);
//									Ext.getCmp('optionPanel').getStore().load();
//									Ext.getStore('button.Buttons').load({params:{query_id : queryId}});
//									Ext.getStore('condition.SelectedConditions').load({params:{queryId:queryId}});
//									Ext.getStore('field.Group').load({params:{queryId:queryId}});
								}
							},
							failure:function(response, opts){
								Ext.Msg.alert('提示信息', '保存失败！<br/>' + response);
							}
						});
		        	}
        		}else if(qtype=='chart'){
        			var me=this;
        			//图表信息
	        		/**
	        		 * 验证各个TAB页
	        		 */
	        		//var allMsg = '';
					//查询选项
					var chartMsg = this.getController('Chart').validBeforeSave();
					var optionMsg = this.getController('Option').validBeforeSave();
					var conditionMsg = this.getController('Condition').validBeforeSave();
					var buttonMsg = this.getController('Button').validBeforeSave();
					
					//查询条件
					if(conditionMsg != ''&&conditionMsg!='-1'){
						allMsg += '查询条件:' + conditionMsg + '<br/>';
					}
					//控制按钮
					if(buttonMsg != ''&&buttonMsg!='-1'){
						allMsg += '控制按钮:' + buttonMsg + '<br/>';
					}
					// 查询选项
					if(optionMsg != ''&&optionMsg!='-1'){
						allMsg += "查询选项："+ optionMsg + '<br/>';
					}
					
					//图表定义
					if(chartMsg != ''&&chartMsg!='-1'){
						allMsg += '图表定义:' + chartMsg + '<br/>';
					}
					
	        		if(allMsg != ''){
	        			Ext.Msg.alert('验证失败',allMsg);
//	        			return false;
	        		}else{
	        			//获取各编辑页面修改的数据
	        			var conditionArray = this.getController('Condition').getSaveObject();
	        			var chartArray = this.getController('Chart').getSaveObject();
	        			var buttonArray = this.getController('Button').getSaveObject();
	        			var optionArray = this.getController('Option').getSaveObject();
	        			
	        			var designArray = new Array();
	        			designArray.push(conditionArray);
	        			designArray.push(chartArray);
	        			designArray.push(buttonArray);
	        			designArray.push(optionArray);
						/**
						 * 页面保存
						 */
						Ext.Ajax.request({
							url : "/hummer/application/controller/query/SaveQueryDesign.action",
							method : 'POST',
							params : {
								designArray : designArray,
								paramArray : paramArray   //queryId
							},
							success : function(response, opts) {
								if (response.responseText == "true") {
									
									var panel  = Ext.getCmp('queryList');
					        		panel.buttonSave.setDisabled(true);
					        		panel.buttonAdd.setDisabled(false);
					        		panel.buttonEdit.setDisabled(false);
					        		panel.buttonDel.setDisabled(false);
					        		hasChanged = false;
					        		map.clear();
					        		// 获得当前活动的tab页
					        		var tabPanel = Ext.getCmp('designTabpanel');
					        		var activeTabPanel = tabPanel.getActiveTab();
					        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
					        		if(node!= null &&node!= undefined){
					        			node.set("text",node.get('text').replace("<font color=red>*</font>",""));
					        			node.commit();
					        			Ext.getCmp('queryList').doLayout();
					        			Ext.getCmp('queryList').getSelectionModel().deselect(node);
					        		}
									Ext.Msg.alert('提示信息', '保存成功！');
									Ext.getCmp('queryList').getSelectionModel().select(node);
				        			tabPanel.setActiveTab(activeTabPanel);
									
//									//刷新各编辑页面
//									Ext.getStore('condition.SelectedConditions').load({params:{queryId:queryId}});
//									Ext.getStore('chart.ChartBasicProperty').load({params:{queryId : queryId}});
//									Ext.getStore('button.Buttons').load({params:{query_id : queryId}});
//									Ext.getCmp('optionPanel').getStore().load();
//
//									me.getController('Chart').getChartAxisSeries(queryId);//添加修改后保存方法
								}
							},
							failure:function(response, opts){
								Ext.Msg.alert('提示信息', '保存失败！<br/>' + response);
							}
						});
        			}
	        	}else if(qtype=='mashup'){
	        		/**
	        		 * 验证各个TAB页
	        		 */
//	        		var allMsg = '';
					//查询选项
					var conditionMsg = this.getController('Condition').validBeforeSave();
					var buttonMsg = this.getController('Button').validBeforeSave();
					var mashupMsg = this.getController('Mashup').validBeforeSave();
					// 如果全部没有编辑，则不用保存，直接返回
					if(mashupMsg != ''&&mashupMsg!='-1'){
						allMsg += "布局设置："+ mashupMsg + '<br/>';
					}
					
					
					//查询条件
					if(conditionMsg != ''&&conditionMsg!='-1'){
						allMsg += '查询条件:' + conditionMsg + '<br/>';
					}
					//控制按钮
					if(buttonMsg != ''&&buttonMsg!='-1'){
						allMsg += '控制按钮:' + buttonMsg + '<br/>';
					}
					
	        		if(allMsg != ''){
	        			Ext.Msg.alert('验证失败',allMsg);
	        		}else{
	        			//获取各编辑页面修改的数据
	        			var conditionArray = this.getController('Condition').getSaveObject();
	        			var buttonArray = this.getController('Button').getSaveObject();
	        			var mashupArray = this.getController('Mashup').getSaveObject();
	        			
	        			var designArray = new Array();
	        			designArray.push(conditionArray);
	        			designArray.push(buttonArray);
	        			designArray.push(mashupArray);
						/**
						 * 页面保存
						 */
						Ext.Ajax.request({
							url : "/hummer/application/controller/query/SaveQueryDesign.action",
							method : 'POST',
							params : {
								designArray : designArray,
								paramArray : paramArray   //queryId
							},
							success : function(response, opts) {
								if (response.responseText == "true") {
									
									var panel  = Ext.getCmp('queryList');
					        		panel.buttonSave.setDisabled(true);
					        		panel.buttonAdd.setDisabled(false);
					        		panel.buttonEdit.setDisabled(false);
					        		panel.buttonDel.setDisabled(false);
					        		hasChanged = false;
					        		map.clear();
					        		
					        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
					        		if(node!= null &&node!= undefined){
					        			node.set("text",node.get('text').replace("<font color=red>*</font>",""));
					        			node.commit();
					        			Ext.getCmp('queryList').doLayout();
					        		}
									Ext.Msg.alert('提示信息', '保存成功！');
					        		
					        		
					        		// 获得当前活动的tab页
					        		var tabPanel = Ext.getCmp('designTabpanel');
					        		var activeTabPanel = tabPanel.getActiveTab();
					        		var node=Ext.getCmp('queryList').getSelectionModel().getSelection()[0];
					        		if(node!= null &&node!= undefined){
					        			node.set("text",node.get('text').replace("<font color=red>*</font>",""));
					        			node.commit();
					        			Ext.getCmp('queryList').doLayout();
					        			Ext.getCmp('queryList').getSelectionModel().deselect(node);
					        		}
					        		
									Ext.Msg.alert('提示信息', '保存成功！');
									Ext.getCmp('queryList').getSelectionModel().select(node);
				        			tabPanel.setActiveTab(activeTabPanel);
//				        			
//									//刷新各编辑页面
////									Ext.getCmp('mashup.Mashup').getStore().load();
//									Ext.getCmp('firstPanelContent').getForm().reset();
//									Ext.getStore('button.Buttons').load({params:{query_id : queryId}});
//									Ext.getStore('condition.SelectedConditions').load({params:{queryId:queryId}});
//									Ext.getStore('mashup.MashupFlag').commitChanges();
								}
							},
							failure:function(response, opts){
								Ext.Msg.alert('提示信息', '保存失败！<br/>' + response);
							}
						});
		        	}
        		
	        	}
	        },
            //根据查询的类型展现可用的TAB页
            showDesignTab: function(view,record){
    	  		var qtype = this.getQueryType();
    	  		var ctp = Ext.getCmp('chartPanel');
				var fp = Ext.getCmp('fieldPanel');
				var lp = Ext.getCmp('linkPanel');
				var cp = Ext.getCmp('conditionPanel');
				var bp = Ext.getCmp('buttonPanel');
				var ap = Ext.getCmp('alarmPanel');
				var op = Ext.getCmp('optionPanel');
				var mp = Ext.getCmp('mashupPanel');
    	  		var tabPanel = Ext.getCmp('designTabpanel');
    	  		
    	  		if(Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('nodeType')=='1'){ //主题
    	  			
    	  			if(ctp &&ctp.close){
    	  				ctp.close();
    	  			}
    	  			if(mp && mp.close){
    	  				mp.close();
    	  			}
    	  			if(fp && fp.close){
	    	  			fp.close();
    	  			}
    	  			if(lp && lp.close){
	    	  			lp.close();
    	  			}
    	  			if(cp && cp.close){
	    	  			cp.close();
    	  			}
    	  			if(bp && bp.close){
	    	  			bp.close();
    	  			}
    	  			if(!ap){
	    	  			var ap_ = Ext.create("HummerApp.view.design.alarm.Alarm",{id:'alarmPanel'});
	    	  			tabPanel.insert(0,ap_);
    	  			}
    	  			if(op && op.close){
	    	  			op.close();
    	  			}
    	  			tabPanel.setActiveTab(0);
    	  			tabPanel.show();
    	  		}else if(qtype == ''||qtype== undefined){
    	  			tabPanel.hide();
    	  			if(ctp && ctp.close){
    	  				ctp.close();
    	  			}
    	  			if(fp && fp.close){
    	  				fp.close();
    	  			}
    	  			if(lp && lp.close){
    	  				lp.close();
    	  			}
    	  			if(cp && cp.close){
    	  				cp.close();
    	  			}
    	  			if(bp && bp.close){
    	  				bp.close();
    	  			}
    	  			if(ap && ap.close){
    	  				ap.close();
    	  			}
    	  			if(op && op.close){
    	  				op.close();
    	  			}
    	  			if(mp && mp.close){
    	  				mp.close();
    	  			}
    	  		}else if(qtype=='list'){
    	  			if(ctp && ctp.close){
    	  				ctp.close();
    	  			}
    	  			if(mp && mp.close){
    	  				mp.close();
    	  			}
    	  			if(!fp ){
	    	  			var fp_ = Ext.create("HummerApp.view.design.field.Field",{id:'fieldPanel'});
	    	  			tabPanel.insert(0,fp_);
    	  			}
    	  			if(!lp ){
	    	  			var lp_ = Ext.create("HummerApp.view.design.link.Link",{id:'linkPanel'});
	    	  			tabPanel.insert(1,lp_);
    	  			}
    	  			if(!cp ){
	    	  			var cp_ = Ext.create("HummerApp.view.design.condition.Condition",{id:'conditionPanel'});
	    	  			tabPanel.insert(2,cp_);
    	  			}
    	  			if(!bp ){
	    	  			var bp_ = Ext.create("HummerApp.view.design.button.Button",{id:'buttonPanel'});
	    	  			tabPanel.insert(3,bp_);
    	  			}
    	  			if(!ap ){
	    	  			var ap_ = Ext.create("HummerApp.view.design.alarm.Alarm",{id:'alarmPanel'});
	    	  			tabPanel.insert(4,ap_);
    	  			}
    	  			if(!op ){
	    	  			var op_ = Ext.create("HummerApp.view.design.option.Option",{id:'optionPanel'});
	    	  			tabPanel.insert(5,op_);
    	  			}
    	  			tabPanel.setActiveTab(0);
    	  			tabPanel.show();
    	  		}else if(qtype=='chart'){
    	  			if(fp && fp.close){
    	  				fp.close();
    	  			}
    	  			if(lp && lp.close){
    	  				lp.close();
    	  			}
    	  			if(ap && ap.close){
    	  				ap.close();
    	  			}
//    	  			if(op && op.close){
//    	  				op.close();
//    	  			}
    	  			if(mp && mp.close){
    	  				mp.close();
    	  			}
    	  			if(!cp ){
	    	  			var cp_ = Ext.create("HummerApp.view.design.condition.Condition",{id:'conditionPanel'});
	    	  			tabPanel.insert(0,cp_);
    	  			}
    	  			if(!ctp ){
    	  				var ctp_ = Ext.create("HummerApp.view.design.chart.Chart",{id:'chartPanel'});
    	  				tabPanel.insert(1,ctp_);
    	  			}else{
    	  				ctp.close();
    	  				var ctp_ = Ext.create("HummerApp.view.design.chart.Chart",{id:'chartPanel'});
    	  				tabPanel.insert(1,ctp_);
    	  			}
    	  			if(!bp ){
	    	  			var bp_ = Ext.create("HummerApp.view.design.button.Button",{id:'buttonPanel'});
	    	  			tabPanel.insert(2,bp_);
    	  			}
     	  			if(!op ){
	    	  			var op_ = Ext.create("HummerApp.view.design.option.Option",{id:'optionPanel'});
	    	  			tabPanel.insert(3,op_);
    	  			}
   	  				tabPanel.setActiveTab(0);
    	  			tabPanel.show();
    	  		}else if(qtype=='mashup'){
    	  			if(fp && fp.close){
    	  				fp.close();
    	  			}
    	  			if(ctp && ctp.close){
    	  				ctp.close();
    	  			}
    	  			if(lp && lp.close){
    	  				lp.close();
    	  			}
    	  			if(ap && ap.close){
    	  				ap.close();
    	  			}
    	  			if(op && op.close){
    	  				op.close();
    	  			}
    	  			if(!cp ){
	    	  			var cp_ = Ext.create("HummerApp.view.design.condition.Condition",{id:'conditionPanel'});
	    	  			tabPanel.insert(0,cp_);
    	  			}
    	  			if(!bp ){
	    	  			var bp_ = Ext.create("HummerApp.view.design.button.Button",{id:'buttonPanel'});
	    	  			tabPanel.insert(1,bp_);
    	  			}
    	  			if(!mp ){
	    	  			var mp_ = Ext.create("HummerApp.view.design.mashup.Mashup",{id:'mashupPanel'});
	    	  			Ext.getCmp('firstPanelContent').getForm().reset();
	    	  			Ext.getCmp('secondPanelContent').getForm().reset();
	    	  			tabPanel.insert(2,mp_);
    	  			}
    	  			tabPanel.setActiveTab(0);
    	  			tabPanel.show();
    	  		}
            },
			
            /**
             * 获得查询查询的类型,也可能是主题
             */
            getQueryType:function(){
            	var queryList = Ext.getCmp('queryList');
            	if(!queryList ){
            		return;
            	}
            	var selectedQueryModel = queryList.getSelectionModel().getSelection();
    	  		var qtype = "";
    	  		if(selectedQueryModel.length>0){
    	  			if(selectedQueryModel[0].get('nodeType')=='1')
    	  				qtype = 'subject'; 
    	  			else
    	  				qtype = selectedQueryModel[0].get('qtype');
    	  		}
	            return qtype;
            }
});
