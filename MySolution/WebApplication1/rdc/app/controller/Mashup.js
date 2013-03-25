Ext.define('HummerApp.controller.Mashup', {
	extend : 'Ext.app.Controller',
	stores : ['mashup.Mashup',
			'mashup.MashupFlag'],
	views : [
			'design.mashup.Mashup'
	],
	refs : [{ ref : 'mashuppanel', selector : 'mashuppanel'},
			{ ref : 'querytree', selector : 'querytree'}
			],
	init : function() {
		this.control({
	        // 根据queryId控制grid中的数据
			'querylist':{
				select :this.querySelection
	        },
	        'mashuppanel':{
//	        	render: this.click,
	        	resize:this.resetBorder
	        },
	        'panel[id=firstPanelContent]':{
	        	render:this.render,
	        	resize:this.resetBorder
	        },
	        'panel[id=secondPanelContent]':{
	        	render: this.render
	        },
	        'querytree[id=mashupQueryTree]':{
	        	celldblclick: this.celldblclick
	        },
	        'mashuppanel button[action=button_row]':{
	        	click :this.buttonRow
	        },
	        'mashuppanel button[action=button_column]':{
	        	click :this.buttonColumn
	        }
		});
		Ext.getStore('mashup.MashupFlag').on({
			add		: this.mashupFlagChanged,
			update	: this.mashupFlagChanged,
			remove	: this.mashupFlagChanged
		})
	},
	//通过监听标志store来判断混排页面是否被改变过
	mashupFlagChanged:function(store){
		var mashupFlag = Ext.getStore('mashup.MashupFlag');
		var updateRecords = Ext.getStore('mashup.MashupFlag').getModifiedRecords();
		var v = false;
		if(updateRecords.length>0){
			v = true;
		}else{
			v = false;
		}
		if(hasChanged!=v){
				hasChanged = v;
			}
		changeTitle('Mashup',v);
	},
	firstPanelBorderStr:'',
	mashupPanelBorderStr:'',
	borderPercent:'50%',
	//panel的边距发生变化
	resetBorder:function(comp,width,height,oldWidth,oldHeight){
		var str = width+','+height;
		if(comp.id=='firstPanelContent'){
			this.firstPanelBorderStr = str;
		}else if(comp.id=='mashupPanel'){
			this.mashupPanelBorderStr = str;
		}
		if(oldWidth=='undefined'||oldWidth==undefined){
			return;
		}
		Ext.getStore('mashup.MashupFlag').getRange()[0].set('borderStr',str);
	},
	querySelection : function(mode, record, eOpts) {
		var queryId;
		if (record != null && record.get('qtype') == 'mashup') {
			var projectId = record.parentNode.get("queryId");
			queryId = record.get('queryId');
			this.getMashup(queryId);
		}
	},
	render:function(cmp){
		cmp.getEl().on({
		'dblclick':function(){
			var winId ;
			if(cmp.id=='firstPanelContent'){
				winId = 'firstQueryTreeSetWin';
			}
			else if(cmp.id=='secondPanelContent'){
				winId = 'secondQueryTreeSetWin';
			}
			var window = Ext.create('widget.window', {
					modal : 'true',
					width : 350,
					resizable : false,
					id: winId,
					title:'设置查询',
					height : 300,
					layout: 'fit',
					items:{
						 xtype: 'querytree',
						 id:	'mashupQueryTree'
					 }
				});
			window.show();
		}
		})
	},
//	click:function(cmp){
//		var me = this;
//		cmp.getEl().on({
//			'click':function(){
////				var mashupFlag = Ext.getStore('mashup.MashupFlag');
////				var updateRecords = Ext.getStore('mashup.MashupFlag').getModifiedRecords();
////				var v = false;
////				if(updateRecords.length>0){
////					v = true;
////				}else{
////					v = false;
////				}
////				if(hasChanged!=v){
////						hasChanged = v;
////					}
////				changeTitle('Mashup',v);
//				me.borderPercent = me.getBorderPercent();
//			}
//		})
//		console.log(me.borderPercent);
//	},
	getMashup : function(queryId) {
		var me = this;
		Ext.Ajax.request({
	    	url		: '/hummer/application/controller/mashup/FindLayoutQueryRelation.action',
	    	method:'post',
	    	params:{
	      		queryId : queryId
	      	},
	      	callback:function(record, operation, success){
				if(success.responseText==""){
					return ;
				}else{
		    		var records = Ext.decode(success.responseText);
		    		for(var i = 0;i<records.length;i++){
		    			var mashupFlag = Ext.getStore('mashup.MashupFlag').getRange();
						var layout = records[i].layout;
						//只改变第一个panel的布局设置
						if(layout=='TOP'||layout=='BOTTOM'){
							mashupFlag[0].set('layout','TOP_BOTTOM');
							if(layout=='TOP'){
								me.borderPercent = records[i].layoutWidth;
							}
							me.buttonRow();
						}else if(layout=='LEFT'||layout=='RIGHT'){
							mashupFlag[0].set('layout','LEFT_RIGHT');
							if(layout=='LEFT'){
								me.borderPercent = records[i].layoutWidth;
							}
							me.buttonColumn();
						}
						//设置两个panel的显示内容
						if(layout=='TOP'||layout=='LEFT'){
							var firstPanel = Ext.getCmp('firstPanelContent');
							if(records[i].layoutQuery!=null){
								mashupFlag[0].set('firstValue',records[i].layoutQuery.name);
								firstPanel.items.items[0].setText(records[i].layoutQuery.name);
								firstPanel.items.items[2].setText(records[i].layoutId);
							}else{
								mashupFlag[0].set('firstValue',"");
								firstPanel.items.items[0].setText("双击选择查询");
								firstPanel.items.items[2].setText("");
							}
							firstPanel.items.items[1].setText(queryId);
							firstPanel.items.items[3].setText(records[i].id);
						}else if(layout=='BOTTOM'||layout=='RIGHT'){
							var secondPanel = Ext.getCmp('secondPanelContent');
							if(records[i].layoutQuery!=null){
								mashupFlag[0].set('secondValue',records[i].layoutQuery.name);
								secondPanel.items.items[0].setText(records[i].layoutQuery.name);
								secondPanel.items.items[2].setText(records[i].layoutId);
							}else{
								mashupFlag[0].set('firstValue',"");
								secondPanel.items.items[0].setText("双击选择查询");
								secondPanel.items.items[2].setText("");
							}
							secondPanel.items.items[1].setText(queryId);
							secondPanel.items.items[3].setText(records[i].id);
						}
			    	}
			    	Ext.getStore('mashup.MashupFlag').commitChanges( );
				}
	    	}
		 });
	},
	celldblclick : function(table,td,cellIndex,record,tr,rowIndex,e,eOpts){
		if(record.get('nodeType')==2){
			//nodeType=2   说明该节点是一个查询（query）
			var mashupFlag = Ext.getStore('mashup.MashupFlag').getRange();
			var id = record.get('id');
			var text = record.get('text');
			var winId = table.up('panel').up('panel').id;
			if(winId=='firstQueryTreeSetWin'){
				var firstPanel = Ext.getCmp('firstPanelContent');
				firstPanel.items.get(0).setText(text);
				firstPanel.items.get(2).setText(id);
				mashupFlag[0].set('firstValue',text);
			}else if(winId=='secondQueryTreeSetWin'){
				var secondPanel = Ext.getCmp('secondPanelContent');
				secondPanel.items.get(0).setText(text);
				secondPanel.items.get(2).setText(id);
				mashupFlag[0].set('secondValue',text);
			}
			Ext.getCmp(winId).close();
		}
	},
	buttonRow:function(){
		var mashupFlag = Ext.getStore('mashup.MashupFlag').getRange();
		mashupFlag[0].set('layout','TOP_BOTTOM');
		var firstPanel = Ext.getCmp('firstPanelContent');
		firstPanel.setTitle('上');
		firstPanel.split = true;
		firstPanel.region = 'north';
		firstPanel.height = this.borderPercent;	
		firstPanel.width = '';
		var secondPanel = Ext.getCmp('secondPanelContent');
		secondPanel.setTitle('下');
		var mashupPanel = Ext.getCmp('mashupPanel');
		if(mashupPanel.items.lenght>0){
			mashupPanel.remove(firstPanelContent,false);
			mashupPanel.remove(secondPanelContent,false);
		}
		mashupPanel.insert(0,firstPanel);
		mashupPanel.insert(1,secondPanel);
	},
	buttonColumn:function(){
		var mashupFlag = Ext.getStore('mashup.MashupFlag').getRange();
		mashupFlag[0].set('layout','LEFT_RIGHT');
		var firstPanel = Ext.getCmp('firstPanelContent');
		firstPanel.setTitle('左');
		firstPanel.region = 'west';
		firstPanel.height = '';	
		firstPanel.width = this.borderPercent;
		var secondPanel = Ext.getCmp('secondPanelContent');
		secondPanel.setTitle('右');
		var mashupPanel = Ext.getCmp('mashupPanel');
		if(mashupPanel.items.lenght>0){
			mashupPanel.remove(firstPanelContent,false);
			mashupPanel.remove(secondPanelContent,false);
		}
		mashupPanel.insert(0,firstPanel);
		mashupPanel.insert(1,secondPanel);
	},
	/**
	 * 页面数据验证  
	 * @return {}
	 */
	validBeforeSave:function(){
		var firstPanel = Ext.getCmp('firstPanelContent');
		var first_0 = firstPanel.items.get(1).text;//queryId(所属查询ID)
//		var first_1 = firstPanel.title;//layout(布局)
		var first_1 = this.getLayoutName(firstPanel.title);
		var first_2 = firstPanel.items.get(2).text;//layoutId(包含查询ID)
		if(first_0==null||first_0==''||first_2==null||first_2==''){
			return first_1+'查询不能为空';
		}
		var secondPanel = Ext.getCmp('secondPanelContent');
		var second_0 = firstPanel.items.get(1).text;//queryId(所属查询ID)
//		var second_1 = firstPanel.title;//layout(布局)
		var second_1 = this.getLayoutName(firstPanel.title);
		var second_2 = firstPanel.items.get(2).text;//layoutId(包含查询ID)
		if(second_0==null||second_0==''||second_2==null||second_2==''){
			return second_1+'查询不能为空';
		}
		return '';
	},
	/**
	 * 通过panel名称 转化成布局
	 * @param {} title
	 */
	getLayoutName:function(title){
		if(title=='左'){
			return 'LEFT';
		}else if(title=='上'){
			return 'TOP';
		}else if(title=='右'){
			return 'RIGHT';
		}else if(title=='下'){
			return 'BOTTOM';
		}
	},
	/**
	 * 获取需要保存的对象
	 * @return {}
	 */
	getSaveObject:function(){
		var firstPanelPercent = this.getBorderPercent();//左边panel所占的百分比
		var firstBorder = firstPanelPercent+'%';
		var secondBorder = (100-firstPanelPercent)+'%';
		
		var mashup = [];
		var firstPanel = Ext.getCmp('firstPanelContent');
		var itemFirst = new Array();
		itemFirst.push(firstPanel.items.get(1).text);//queryId(所属查询ID)
		itemFirst.push(this.getLayoutName(firstPanel.title));//layout(布局)
		itemFirst.push(firstPanel.items.get(2).text);//layoutId(包含查询ID)
		itemFirst.push(firstPanel.items.get(3).text);//ID(对应关系ID)
		itemFirst.push(firstBorder);//layoutWidth(比例)
		
		var secondPanel = Ext.getCmp('secondPanelContent');
		var itemSecond = new Array();
		itemSecond.push(secondPanel.items.get(1).text);//queryId(所属查询ID)
		itemSecond.push(this.getLayoutName(secondPanel.title));//layout(布局)
		itemSecond.push(secondPanel.items.get(2).text);//layoutId(包含查询ID)
		itemSecond.push(secondPanel.items.get(3).text);//ID(对应关系ID)
		itemSecond.push(secondBorder);//layoutWidth(比例)
		
		mashup.push(Ext.encode(itemFirst));
		mashup.push(Ext.encode(itemSecond));
		return Ext.encode(mashup);
	},
	/**
	 * 返回第一个panel所占的百分比
	 * @return {}
	 */
	getBorderPercent:function(){
		var layout = Ext.getStore('mashup.MashupFlag').getRange()[0].get('layout');
		var percent = 0;
		var firstBorder = '';
		var mashupBorder = '';
		if(layout=='LEFT_RIGHT'){
			firstBorder = this.firstPanelBorderStr.split(',')[0];
			mashupBorder = this.mashupPanelBorderStr.split(',')[0];
		}else if(layout=='TOP_BOTTOM'){
			firstBorder = this.firstPanelBorderStr.split(',')[1];
			mashupBorder = this.mashupPanelBorderStr.split(',')[1];
		}
		percent = firstBorder/mashupBorder;
		percent = Math.round(percent*100);
		this.borderPercent = percent+'%';
		return percent;
	}
});