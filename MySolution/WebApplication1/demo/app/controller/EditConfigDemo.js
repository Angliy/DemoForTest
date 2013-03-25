/**
 * 定义编辑demo操作主控制器
 * 
 * @author 叶振飞
 * @version 2012-6-7
 */
Ext.define('DEMO.controller.EditConfigDemo',{
	extend 	: 'Ext.app.Controller',
	requires: ['DEMO.view.EditConfigDemoWindow', 'DEMO.store.ConfigDemoEntities'],
	
	views	: ['ConfigDemoGrid'],
	stores	: ['ConfigDemoEntities'],
	
	refs : [	// 引用demoGrid对象
	    		{ ref : 'configdemogrid', selector : 'configdemogrid'},
	    		{ ref : 'editconfigdemoform', selector : 'editconfigdemoform'},
	    		{ ref : 'editconfigdemowindow', selector : 'editconfigdemowindow'}
	    	],	
	    	
	 /**
	  * 组件相关的事件注册
	  */   	
	init 	: function(){
		this.control({
				'editconfigdemoform button[action=edit_save_button]' : {	// 注册编辑保存操作
					click : this.saveDemo
			},
				'editconfigdemoform button[action=edit_cancel_button]' : {	// 注册编辑退出操作
					click : this.cancelWindow
			}
		})
		
	},
	
	/**
	 * 保存demo
	 */
	saveDemo	: function(btn, e, eOpt){
		var formPanel = btn.up('form');
		
		// 提交表单
		formPanel.getForm().submit({
			scope	: this,
			url		: '/hummer/application/controller/demo/SaveConfigDemo.action',
			success	:  function(form, action){
				this.saveSuccess();
			}
		
		});
	},
	
	/**
	 * 退出编辑窗口
	 * @param {} btn
	 * @param {} e
	 * @param {} eOpt
	 */
	cancelWindow	: function(btn, e, eOpt){
		btn.up('window').hide();
	},
	
	/**
	 * 保存成功提示窗口
	 */
	saveSuccess : function(){
		Ext.MessageBox.show({
			title 	: '提示',
			width 	: 200,
			scope	: this,
			msg 	: '保存成功!',
			modal 	: true,
			buttons : Ext.Msg.OK,
			icon 	: Ext.Msg.INFO,
			fn :	this.closeWindow
		});
	
	},
	
	/**
	 * 保存成功后的操作
	 */
	closeWindow : function() {
		// 并关闭当前窗口, 刷新grid
		var editWin = this.getEditconfigdemowindow();
		editWin.hide();
		this.getConfigdemogrid().getStore().load();
	}
});