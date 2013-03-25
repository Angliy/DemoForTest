/**
 * @author csx
 */
Ext.define('HummerApp.view.design.field.TextEdit', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.textedit',
 	border: 0,
    //layout: 'border',
    autoShow: true,
    initComponent: function() {
    	//this.addEvents('render');
		this.selectionStart=0;
		this.selectionEnd=0;
        this.items = [
			{
				region:'north',
                xtype: 'panel',
//                border: 0,
                title:'公式编辑框',
                 
                //width:"60%", 
                items: [
                {
                    xtype			: 'textareafield',
                    width			: '100%',
                    height			: 100,
                    maxLength		: 200,
	 				enableKeyEvents	: true,
	 				validator		: this.myValidator,
	 				validateOnChange:false,
                    name 			: 'formula',
					listeners		:{
						blur:{
							fn:function(ta, the, eOpts){
								//console.log(ta.inputEl.dom.selectionStart);
								//console.log(ta.getPosition());
								ta.up("textedit").selectionStart = ta.inputEl.dom.selectionStart;
								ta.up("textedit").selectionEnd = ta.inputEl.dom.selectionEnd;
							}
						}
					}

                },{
                    xtype:'toolbar',
                     border:0,
                     padding:'0 0 5 0',
                    ui:'footer',
                    items:['->',{
                        action:'add_button',
                        text:'+',
						handler:this.btnOpClick  
                    },{
                        action:'subs_button',
                        text : '-',
						handler:this.btnOpClick
                    },{
                        action:'multi_button',
                        text:'*',
						handler:this.btnOpClick
                    },{
                        action:'devide_button',
                        text:'/',
						handler:this.btnOpClick
                    },{
                        action:'percent_button',
                        text:'%',
						handler:this.btnOpClick
                    },{
                        action:'quete_button',
                        text:'(',
						handler:this.btnOpClick
                    },{
                        action:'quete_button',
                        text:')',
						handler:this.btnOpClick
                    }]
					
                }]
            },
			{
				
				xtype:'selectorpanel',
				id:'selectorPanel',
				region:'center'
			}
        ];

        this.callParent(arguments);
    },
	insertValue:function(value){
		var ta = this.down("textareafield");
		var oriValue = ta.getValue().toString();
		//console.log(this.selectionStart);
		//console.log(this.selectionEnd);
		ta.setValue(oriValue.substring(0,this.selectionStart) + value + oriValue.substring(this.selectionEnd))
		this.selectionStart += value.length;
		this.selectionEnd += value.length;
	},
	btnOpClick:function(srcObj, record){  
        srcObj.up("textedit").insertValue(" " + srcObj.getText()+" ");  
    },
		/*
	 * 分析验证计算公式
	 */
	analysisResult:function(value){
		//return "1";
		var vFields = this.down("grid[key=field]").getStore().getRange();
		var result = value;
		// 替换可选字段
		for(var i=0;i<vFields.length;i++){
			var reg = new RegExp("\\${F:"+(vFields[i].get("sourceName").replace('(','\\(').replace(')','\\)'))+"}","gi");
//			console.log(reg + "    " + vFields[i].get("fieldName"));
			result = result.replace(reg,vFields[i].get("fieldName"));
//			console.log(result);
		}
		//替换查询条件
		//根据王帅的要求，查询条件不用解析
//		var vCondition = this.down("grid[key=condition]").getStore().getRange();
//		for(var i=0;i<vCondition.length;i++){
//			var reg = new RegExp("\\${C:"+vCondition[i].get("sourceName")+"}","gi");
////			console.log(reg + "    " + vFields[i].get("fieldName"));
//			result = result.replace(reg,"${C:"+vCondition[i].get("fieldName")+"}");
//			//console.log(result);
//		}
		//替换变量
		var vVariant = this.down("grid[key=variant]").getStore().getRange();
		for(var i=0;i<vVariant.length;i++){
			var reg = new RegExp("\\${V:"+vVariant[i].get("sourceName")+"}","gi");
			//console.log(reg + "    " + vFields[i].get("fieldName"));
			result = result.replace(reg,"${V:"+vVariant[i].get("value")+"}");
//			console.log(result);
		}

		return Ext.String.trim(result);
	},
	getText:function(){
		return Ext.String.trim(this.down('textareafield').getValue());
	},
	getValue:function(){
		return this.analysisResult(this.down('textareafield').getValue());
	},
	isValid:function(){
		return this.down('textareafield').isValid();
	},
	myValidator:function(value){
		return true; // 验证不合适，比如url等不能验证，所以把验证去掉 csx 20130313
		var v1 = value;
		var reg = new RegExp("\\${(F|C|V):[^}]+}","gi");
		v1 = v1.replace(reg,'var123');
		//console.log(v1);
		try{
			eval(v1);
			return true;
		}catch(ex){
			//console.log(ex);
			return '输入信息不正确，请修改。';
		}
	},
	setText:function(text){
		this.down('textareafield').setValue(text);
	},
	setValue:function(value){
		var vFields = this.down("grid[key=field]").getStore().getRange();
		var result = value;
		if(result){
			// 替换可选字段
			for(var i=0;i<vFields.length;i++){
				//var reg = new RegExp("\\${F:"+(vFields[i].get("sourceName").replace('(','\\(').replace(')','\\)'))+"}","gi");
				var reg = new RegExp("\\b"+vFields[i].get("fieldName")+"\\b","gi");
	//			console.log(reg + "    " + vFields[i].get("fieldName"));
				result = result.replace(reg,"${F:"+vFields[i].get("sourceName")+"}");
	//			console.log(result);
			}
			//替换查询条件
			//根据王帅的要求，查询条件不用解析
	//		var vCondition = this.down("grid[key=condition]").getStore().getRange();
	//		for(var i=0;i<vCondition.length;i++){
	//			var reg = new RegExp("\\${C:"+vCondition[i].get("sourceName")+"}","gi");
	////			console.log(reg + "    " + vFields[i].get("fieldName"));
	//			result = result.replace(reg,"${C:"+vCondition[i].get("fieldName")+"}");
	//			//console.log(result);
	//		}
			//替换变量
			var vVariant = this.down("grid[key=variant]").getStore().getRange();
			for(var i=0;i<vVariant.length;i++){
				//var reg = new RegExp("\\${V:"+vVariant[i].get("sourceName")+"}","gi");
				var reg = new RegExp("\\${V:"+vVariant[i].get("value")+"}","gi");
				//console.log(reg + "    " + vFields[i].get("fieldName"));
				result = result.replace(reg,"${V:"+vVariant[i].get("sourceName")+"}");
	//			console.log(result);
			}
		}
		this.down('textareafield').setValue(result);
	}
});