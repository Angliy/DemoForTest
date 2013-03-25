 /**
 * 控制按钮 控制器
 */
Ext.define('HummerApp.controller.Button',{
	extend: 'Ext.app.Controller',
	
	stores: ['button.Buttons'],
	
	views: 	[
	       	 	'Viewport',
	            'Design',
	            'query.List',
	            'design.button.Button',
	            'design.button.EditButton',
	            'design.button.ButtonParamSet',
	            'design.button.ButtonUrlSet'
	],
		        
	refs : [{ ref : 'editButton', selector : 'editButton'},
			{ ref : 'buttonparamset', selector : 'buttonparamset'},
			{ ref : 'buttonurlset', selector : 'buttonurlset'}],
	init: function(){
		this.control({
	        // 根据queryId控制grid中的数据
			'querylist':{
				select :this.querySelectionChange
	        },
            //控制按钮页面  点击grid cell
            'buttonpanel ':{
            	select:this.initButton,
				beforeedit:this.beforeedit,
				cellclick:this.editButtonCells
            },
	        // 控制按钮页面中的增加按钮
	        'buttonpanel button[action=add_button_button]':{
	        		click :this.addButton
	        },
	        // 控制按钮页面中的删除按钮
	        'buttonpanel button[action=delete_button_button]':{
	        		click :this.deleteButton
	        },
	        //连接地址 设置窗口 事件
	        "buttonparamset":{
	        	afterlayout : this.setInitParamLinkValue
	        },
            "buttonparamset button[action=save_query_param]" :{
				click:this.setLinkButtonParam
			},
			"buttonparamset button[action=cancel_query_param]":{
				click:this.closeLinkButtonParam
			},
			//URL 设置窗口 事件
			"buttonurlset":{
				afterlayout : this.setInitUrlLinkValue
			},
			"buttonurlset button[action=save_button_url]" :{
				click:this.setButtonUrlLink
			},
			"buttonurlset button[action=cancel_button_url]" :{
				click:this.closeButtonUrlLink
			}
		});
	},
	/**
	 * 控制按钮状态
	 * @param {} model
	 * @param {} record
	 * @param {} index
	 * @param {} eOpts
	 */
	 initButton:function(model, record, index, eOpts){
	 	var panel = Ext.getCmp('buttonPanel');
		var buttonDel = panel.buttonDel;
		var records = panel.getSelectionModel().getSelection();
		if (records.length > 0) {
			var btype = records[0].get('btype');
			switch (btype) {
				case 'preset' :// 控制按钮选项为当前活动页
					buttonDel.setDisabled(true);
					break;
				case 'separator' :
					buttonDel.setDisabled(true);
					break;
				default :
					buttonDel.setDisabled(false);
			}
		}
	 },
	/**
	 * 根据查询的类型展现可用的TAB页
	 * @param {} mode
	 * @param {} selected
	 * @param {} eOpts
	 */
	querySelectionChange: function(mode,record,eOpts ){
//		if(record.get("qtype")!='list') //如果不是列表类型的查询，直接返回
//        	return;
		var queryId;
		if(record!=null>0){
			queryId=record.get('queryId');
			this.getbuttons(queryId);
		}
    },
	/**
	 * 设置：
	 * 预置按钮、分离器 不可编辑
	 *  类型不可编辑
	 * @param {} editor
	 * @param {} e
	 */
	beforeedit :function(editor, e){
		//预置类型的按钮不可编辑
		if(e.record.get('btype') ==  'preset'&&e.colIdx!=3){
			e.cancel = true;
		};
		if(e.record.get('btype') ==  'separator'&&e.colIdx!=3){
			e.cancel = true;
		};
		//已保存的按钮的类型不可编辑
		if(e.record.get('id') != null && e.record.get('id')!='' && e.colIdx == 4){
			e.cancel = true;
		}
		//新增：显示方式 如果非窗口类型 则无高度和宽度的设置
		if(e.record.get('showin')!='window'&&( e.colIdx == 8||e.colIdx == 9)){
			e.cancel = true;
		}
	},

    /**
     * 根据按钮类型，判断连接/控制脚本 的设置方式
     * @param {} view
     * @param {} td
     * @param {} cellIndex
     * @param {} record
     * @param {} tr
     * @param {} rowIndex
     * @param {} e
     * @param {} eOpts
     */
    editButtonCells: function(view,td, cellIndex, record,tr,rowIndex,e,eOpts){
    	if(view!=null&&td!=null){
			return null;
		}
		record= Ext.getCmp('buttonPanel').getSelectionModel().getSelection()[0];
    	var buttonType = record.get("btype");
    	switch(cellIndex) {
			case 4:
				if(buttonType=='querylink'){
					var window = Ext.create('widget.window', {
							modal : 'true',
							width : 600,
							resizable : false,
							id: 'ButtonparamSetWindow',
							title:'设置查询及参数',
							height : 400,
							 layout: 'fit',
							 items:{
							 xtype: 'buttonparamset'
							 }
						});
					window.show();
				};
				break;
			case 5:
				if(buttonType=='urllink'){
					var window = Ext.create('widget.window', {
								modal : true,
								width : 727,
								height : 436,
								resizable : false,
								id: 'ButtonUrlSetWindow',
								title:'设置URL',
								 layout: 'fit',
								 items:{
								 	xtype: 'buttonurlset'
								 }
							});
//					var txt = window.down("textareafield");
//					txt.maxLength = 200;
//					window.show();
					window.down("textareafield").maxLength = 200;
					window.show();
				}
				break;
    	}
    },

    /**
     * 初始化 链接地址 弹出窗口中的值
     */
    setInitParamLinkValue : function(){
    	var currentRecord = Ext.getCmp("buttonPanel").getSelectionModel().getSelection()[0];
		var queryId = currentRecord.get('queryId');
		Ext.getCmp('buttonparamset').setQueryId(queryId);
    },
    
	/**
	 * 根据 链接地址 选择的查询选项 设置 grid中的cell
	 */
	setLinkButtonParam : function(){  //buttonparamset
		var queryId = Ext.getCmp('buttonparamset').getQueryId();
		var queryName = Ext.getCmp('buttonparamset').getQueryName();
		
        Ext.getCmp("ButtonparamSetWindow").close();
        
        var currentRecord = Ext.getCmp("buttonPanel").getSelectionModel().getSelection()[0];
        currentRecord.set("queryId",queryId);
        currentRecord.set("queryName",queryName);
	},
	
	/**
	 * 取消参数设置，关闭窗口
	 */
	closeLinkButtonParam : function(){
		Ext.getCmp("ButtonparamSetWindow").close();
	},
	
	/**
	 *  设置URL 设置窗口中的值
	 */
	setInitUrlLinkValue : function(){
		var buttonurl = Ext.getCmp("buttonPanel").getSelectionModel().getSelection()[0].get("url");
		Ext.getCmp("buttonurlset").setText(buttonurl);
	},
	/**
	 * 根据 设置URL 的设置  修改grid中的cell
	 */
	setButtonUrlLink  : function(srcObj, e, eOpts){
		var textEdit = srcObj.up("window").down('textedit');
		if(!textEdit.isValid())
			return;
		var url = Ext.getCmp("buttonurlset").getValue();//.getText();
		Ext.getCmp("ButtonUrlSetWindow").close();
		
		//将弹出页面中获取的值赋予当前行
        var currentRecord = Ext.getCmp("buttonPanel").getSelectionModel().getSelection()[0];
        currentRecord.set("url",url);
	},
	/**
	 * 设置URL 窗口  取消按钮设置
	 */
	closeButtonUrlLink : function(){
		Ext.getCmp("ButtonUrlSetWindow").close();
	},
	
    /**
     * 根据当前queryId获取控制按钮信息
     * @param {} queryId
     */
    getbuttons: function(queryId){
    	var queryStore = Ext.getStore('button.Buttons');
    	if(queryStore==''||queryStore==undefined){
    		return;
	    }
		queryStore.load({
	     	params : {
	     		query_id : queryId
	     	}
	    });
	},
	
	/**
	 * 控制按钮页面的新增事件
	 * @param {} btn
	 * @param {} e
	 * @param {} eOpt
	 */
	addButton : function(btn,e, eOpt){
//		console.log('add');
     	//grid添加一空行
		var store = btn.up('buttonpanel').getStore( );
		//可编辑
	    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	        clicksToEdit: 1
	    });
        var count = store.getCount();
        var row = Ext.create('HummerApp.model.Button', {
            name: '',
            display:'true',
            type: '',
            icon: '',
            url : '',
            script:'',
            queryId:'',
            queryName:'',
            showin:'',
            height:'',
            width:''
        });
        store.insert(count, row);
	},

	/**
	 * 控制按钮页面的删除事件
	 * @param {} btn
	 * @param {} e
	 * @param {} eOpt
	 */
	deleteButton : function(btn, e, eOpt){
		var store = Ext.getCmp('buttonPanel').getStore();
		var records = btn.up('buttonpanel').getSelectionModel().getSelection();
		//得到query_Id
		var upSelectRows=Ext.getCmp('queryList').getSelectionModel().getSelection();
		if(upSelectRows.length==0){
			Ext.Msg.alert('提示','请先选择一个查询');
			return;
		}
		var query_id = upSelectRows[0].get('queryId');
		
		if (records.length > 0) {
					var btype = records[0].get('btype');

					switch (btype) {
						case 'preset' :// 控制按钮选项为当前活动页
							Ext.Msg.alert('提示', '预置类型按钮不可删除');

							break;
						case 'separator' :
							Ext.Msg.alert('提示', '分离器类型按钮不可删除');
							break;
						default :
							// Ext.Msg.alert('提示','分离器类型按钮不可删除');
							Ext.MessageBox.confirm('提示', '确实删除  '+records[0].get('name')+' 按钮信息吗?', function(_btn) {
									if (_btn == 'yes') {
										store.remove(records);
										Ext.getCmp('buttonPanel').buttonDel.setDisabled(true);
									} else {
										return false;
									}
							});
					}
				} else {
			Ext.Msg.alert('提示', '请选择一条按钮信息进行删除！')
		}
	},
	
	/**
	 * 页面数据验证  
	 * @return {}
	 */
	validBeforeSave:function(){
		var msg = '';
		var store = Ext.getCmp('buttonPanel').getStore();
		if(store==''||store==undefined){
    		return;
	    }
		var removeRecords = store.getRemovedRecords();
		var modifyRecords = store.getModifiedRecords();
		var serials = this.getChangeSerial(store);
		if(removeRecords.length==0&&modifyRecords.length==0&&serials.length==0){
			return '-1';
		}else{
			if(store.getCount()>0){
				var names = new Array();
				for(var i = 0; i < store.getCount(); i++){
					var record = store.getAt(i);
					var name = record.get("name");
					//非空判断
					if(name==null||name==""){
						msg = msg+'按钮名称不能为空！';
						return msg;
					}
					var btype = record.get("btype");
					if(btype==null||btype==""){
						msg = msg+'"'+name+'"列类型不能为空！';
						return msg;
					}
					if(btype=='urllink'){
						if(record.get('url')==null||record.get('url')==''){
							msg = msg + '"'+name+'"链接地址不能为空！';
							return msg;
						}
					}
					if(btype=='querylink'){
						if(record.get('queryId')==null||record.get('queryId')==''||record.get('queryName')==null||record.get('queryName')==""){
							msg = msg + '"'+name+'"查询名称不能为空！';
							return msg;
						}
					}
					var showin = record.get("showin");
					if(showin=='window'){
//						console.log(record.get('height'));
//						if(record.get('height')==''||record.get('height')==null){
////							msg = msg + '"'+name+'"窗口高度不能为空！';
////							return msg;
//						}
//						if(record.get('width')==''||record.get('width')==null){
////							msg = msg + '"'+name+'"窗口宽度不能为空！';
////							return msg;
//						}
					}
					//验证是否重名
					if(names.length>0){
						//思路：对store中的数据进行遍历，new一个names数组，
						//如果store中的下一个数据与names中的值都不重复则添进去，重复则返回msg
						for(var j = 0; j < names.length; j++){
							if(name==names[j]){
								msg = msg + '"'+name+'"按钮已存在！';
								return msg;
							}
						}
					}
					names.push(name);
				}
			}
		}
		
		return msg;
	},
	/**
	 * 获取需要保存的对象
	 * @return {}
	 */
	getSaveObject:function(){
		var editStore = Ext.getCmp('buttonPanel').getStore();
		if(editStore==''||editStore==undefined){
    		return;
	    }
		//总的改变的数据
		var buttons = [];
		var remove = [];
		var modify = [];
		var serials = [];
		//处理删除数据
		var removeRecords = editStore.getRemovedRecords();
		if(removeRecords.length>0){
			for(var i = 0; i < removeRecords.length; i++){
				remove.push(removeRecords[i].get("id"));
			}
//			remove = Ext.encode(remove);
		};
		//处理 编辑数据 包括新增
		var modifyRecords = editStore.getModifiedRecords();
		if(modifyRecords.length>0){
			for(var i = 0; i < modifyRecords.length; i++){
				var record = modifyRecords[i];
				var serial = editStore.indexOf(record)+1;
				var item = new Array();
				item.push(record.get("id"));
				item.push(record.get("name"));
				item.push(record.get("icon"));
				item.push(record.get("display"));
				item.push(record.get("btype"));
				item.push(serial);
				item.push(record.get("url"));
				item.push(record.get("script"));
				item.push(record.get("queryId"));
				item.push(record.get("queryName"));
				
				item.push(record.get("showin"));
				if(record.get("showin")=='window'){
					item.push(record.get("height"));
					item.push(record.get("width"));
				}else{
					item.push('');
					item.push('');
				}
				modify.push(Ext.encode(item));				
			}
		}
		serials = this.getChangeSerial(editStore);
		//统一放入 buttons
		buttons.push(Ext.encode(remove));
		buttons.push(Ext.encode(modify));
		buttons.push(Ext.encode(serials));
		return Ext.encode(buttons);
	},

	
	getChangeSerial: function(editStore){
		//处理因拖拽而引起的序号改变 直接使用store
		var serials = [];
		if(editStore.getCount()>0){
			for(var i = 0; i < editStore.getCount(); i++){
				var item = new Array();
				var record = editStore.getAt(i);
				var index = editStore.indexOf(record)+1;
				var serial = record.get("serial");
				if(index!=serial){
					item.push(record.get('id'));
					item.push(index);
					serials.push(Ext.encode(item));
				}
			}
		}
		return serials;
	}
	
});