/**
 * 定义demo控制器
 * 
 * @author 叶振飞
 * @version 2012-6-3
 */
Ext.define('DEMO.controller.ConfigDemo',{
	extend : 'Ext.app.Controller',
	
	views	: ['ConfigDemoGrid'],
	stores	: ['ConfigDemoEntities'],
	refs : [
	        { ref : 'configdemogrid', selector : 'configdemogrid'},
	        { ref : 'editconfigdemowindow', selector : 'editconfigdemowindow'}
	        ],
	   	 /**
	   	  * 组件相关的事件注册
	   	  */   	
	   	init 	: function(){
	   		this.control(
	   			{
	   				'configdemogrid button[action=add_demo_button]' : {	// 注册新增按钮操作
	   					click : this.addDemo
	   			},
	   				'configdemogrid button[action=edit_demo_button]' : {	// 注册编辑按钮操作
	   					click : this.editDemo
	   			},
	   				'configdemogrid button[action=del_demo_button]' : {	// 注册编辑按钮操作
	   					click : this.delDemo
	   			},
	   			'configdemogrid':{
					itemdblclick: this.editDemo
				}
	   		})
	   	},
	   	
	   	addDemo : function (){
	   	// 显示window,载入指定的信息
			var editWin = this.getEditconfigdemowindow();
			if (!editWin) {
				editWin = Ext.create('DEMO.view.EditConfigDemoWindow');
			}
			editWin.setTitle('新增Demo');
			editWin.down('form').getForm().reset();
			editWin.show();
	   	},
	   	
	   	editDemo : function (btn, e, eOpt){
			// 获取当前选中的记录
			var records = btn.up('gridpanel').getSelectionModel().getSelection();
			if (records.length <= 0) {
				Ext.MessageBox.show({
					title 	: '提示',
					width 	: 200,
					scope	: this,
					msg 	: '请选择需要编辑的记录！',
					modal 	: true,
					buttons : Ext.Msg.OK,
					icon 	: Ext.Msg.WARNING
				});
				
				return;
			}
			
			// 显示window,载入指定的信息
			var editWin = this.getEditconfigdemowindow();
			if (!editWin) {
				
				editWin = Ext.create('DEMO.view.EditConfigDemoWindow');
			}
			
			editWin.setTitle('编辑Demo');
			var form = editWin.down('form').getForm();
			form.loadRecord(records[0]);	// 实现应用要从台获取值注入到form当中
					
			editWin.show();
	   	},
	   	
	   	
	   	delDemo : function (btn, e, eOpt){
			this.demoGrid = this.getConfigdemogrid();
			
			// 获取当前选中记录的ID
			var records = this.demoGrid.getSelectionModel().getSelection();
			if (records.length > 0) {
				var demoId = records[0].get('id');
				
				// 提交后台删除操作
				Ext.Ajax.request({
				    url: '/hummer/application/controller/demo/DelConfigDemo.action',
				    params: {
				        id: demoId
				    },
				    scope	: this,
				    success: function(response){			    	
						Ext.MessageBox.show({
							title 	: '提示',
							width 	: 200,
							scope	: this,
							msg 	: '删除成功！',
							modal 	: true,
							buttons : Ext.Msg.OK,
							icon 	: Ext.Msg.INFO,
							fn		: function(){
				    			this.demoGrid.getStore().load();
							}
							
						});
				    }
				});
				
			}else{
				Ext.MessageBox.show({
					title 	: '提示',
					width 	: 200,
					scope	: this,
					msg 	: '请选择需要删除的记录！',
					modal 	: true,
					buttons : Ext.Msg.OK,
					icon 	: Ext.Msg.WARNING
				});
				
			}
	   	}
	   	
	   	
})