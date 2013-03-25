Ext.define('HummerApp.controller.Link', {
			extend : 'Ext.app.Controller',
			stores : [
//			'common.AvailableFieldCombo'
			
			],
			views : [
				'design.link.LinkParamSet'
			],

			init : function() {
				this.control({
							//表内链接列表
							"linkpanel" : {
//								celldblclick : this.linkCellEdit
								cellclick:this.linkCellEdit
							},
							
							//设置查询参数-弹出窗口
							"linkparamset":{
								afterlayout : this.setInitParamLinkValue
							},
							"linkparamset button[action=save_query_param]" :{
								click:this.setQueryParam
							},
							"linkparamset button[action=cancel_query_param]":{
								click:this.closeQueryParam
							},
							
							//设置URL链接-弹出窗口
							"linkurlset":{
								afterrender : this.setInitUrlLinkValue
							},
							"linkurlset button[action=save_link_url]" :{
								click:this.setQueryUrlLink
							},
							"linkurlset button[action=cancel_link_url]" :{
								click:this.closeQueryUrlLink
							}

						});
			},

			//获取选中的节点
			setQueryParam : function(){
				var queryId = Ext.getCmp('linkparamset').getQueryId();
				var queryName = Ext.getCmp('linkparamset').getQueryName();
		        Ext.getCmp("paramSetWindow").close();
		        
		        //将弹出页面中获取的值赋予当前行
		        var currentRecord = Ext.getCmp("linkPanel").getSelectionModel().getSelection()[0];
		        currentRecord.set("hyperlink.queryId",queryId);
		        currentRecord.set("hyperlink.queryName",queryName);
			},
			
			//取消参数设置，关闭窗口
			closeQueryParam : function(){
				Ext.getCmp("paramSetWindow").close();
			},
			
			//设置查询链接窗口的默认选中值
			setInitParamLinkValue:function(){
				var currentRecord = Ext.getCmp("linkPanel").getSelectionModel().getSelection()[0];
				var queryId = currentRecord.get('hyperlink.queryId');
				Ext.getCmp('linkparamset').setQueryId(queryId);
			},
			
			// 设置url链接
			setQueryUrlLink:function(srcObj, e, eOpts){
				var textEdit = srcObj.up("window").down('textedit');
				if(!textEdit.isValid())
					return;
				var urllink = Ext.getCmp("linkurledit").getValue();//.getText();
				Ext.getCmp("linkUrlSetWindow").close();
				
				//将弹出页面中获取的值赋予当前行
		        var currentRecord = Ext.getCmp("linkPanel").getSelectionModel().getSelection()[0];
		        currentRecord.set("hyperlink.url",urllink);

			},
			//取消url设置，关闭窗口
			closeQueryUrlLink:function(){
				Ext.getCmp("linkUrlSetWindow").close();
			},
			
			//设置url链接窗口的初始值
			setInitUrlLinkValue:function(){
				var linkurl = Ext.getCmp("linkPanel").getSelectionModel().getSelection()[0].get("hyperlink.url");
		        Ext.getCmp("linkurledit").setValue(linkurl);
			},
			
			
			/**
			 * 编辑表内链接中的参数设置
			 * 
			 * @param {}
			 *            table
			 * @param {}
			 *            td
			 * @param {}
			 *            cellIndex
			 * @param {}
			 *            record
			 * @param {}
			 *            tr
			 * @param {}
			 *            rowIndex
			 * @param {}
			 *            e
			 * @param {}
			 *            eOpts
			 */
			linkCellEdit : function(table, td, cellIndex, record, tr, rowIndex,
					e, eOpts) {
				if(table!=null&&td!=null){
					return null;
					}
				record=Ext.getCmp('linkPanel').getSelectionModel()
					.getSelection()[0];
				// 第四列为编辑查询连接的列
				if (cellIndex == 4  && (record.get('hyperlink.linkType') == 'querylink')) {
					var window = Ext.create('widget.window', {
								modal:true,
								resizable : false,
								width : 600,
								id: 'paramSetWindow',
								title:'设置查询及参数',
								height : 360,
								 layout: 'fit',
								 items:{
								 xtype: 'linkparamset'//'paramset'
								 }
							});
					window.show();
				}
				
				// 第五列为编辑URL的列
				if (cellIndex == 5 && (record.get('hyperlink.linkType') == 'urllink')) {
					var window = Ext.create('widget.window', {
								modal:true,
//								width : 600,
								id: 'linkUrlSetWindow',
								resizable : false,
								title:'设置URL',
								width : 727,
								height : 436,
								layout: 'fit',
								items:{
								 	xtype: 'linkurlset'
								 }
							});
					var txt = window.down("textareafield");
					txt.maxLength = 200;
					txt.validate( );
					window.show();
				}
				
				
			},
			
			//验证
			validBeforeSave:function(){
				
				var msg = '';
				var modifiedRecord = Ext.getCmp("linkPanel").getStore().getModifiedRecords();
				if(modifiedRecord.length > 0){
					for (var i = 0; i < modifiedRecord.length; i++) {
						var linkType = modifiedRecord[i].get("hyperlink.linkType");
						var queryId = modifiedRecord[i].get("hyperlink.queryId");
						var url = modifiedRecord[i].get("hyperlink.url");
						if(linkType == 'querylink' && (queryId == '' || queryId == null) ){
							msg = '请根据链接类型选择查询！';
						}
						if(linkType == 'urllink' && (url == '' || url == null)){
							msg = '请根据链接类型设置URL！';
						}
					}
				}else{
					msg = '-1';
				}
			//	msg =  '表内链接：***错误！';
				return msg;
				
			},
			//获取要保存或更新的数据
			getSaveObject:function(){
				var modifiedRecord = Ext.getCmp("linkPanel").getStore().getModifiedRecords();
				if(modifiedRecord.length > 0){
					for (var i = 0; i < modifiedRecord.length; i++) {
						var item = new Array();
						item.push(modifiedRecord[i].get("id"));
						item.push(modifiedRecord[i].get("hyperlink.linkType"));
						item.push(modifiedRecord[i].get("hyperlink.id"));
						item.push(modifiedRecord[i].get("hyperlink.queryName"));
						item.push(modifiedRecord[i].get("hyperlink.url"));

					}
				}
				
			}

		});