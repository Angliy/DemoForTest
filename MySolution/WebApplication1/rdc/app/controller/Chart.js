Ext.define('HummerApp.controller.Chart', {
	extend : 'Ext.app.Controller',

	stores : ['field.AvailableFields', 'chart.ChartBasicProperty',
			'chart.AvailableChart', 'chart.ChartAxisProperty',
			'chart.ChartAxisPropertyBottom', 'chart.ChartAxisPropertyRight',
			'chart.ChartAxisPropertyTop', 'chart.ChartSeriesProperty',
			'chart.ChartAxes','chart.ChartSeries','chart.ChartStyle','option.Options'],

	views : [
			// 图表
			'design.chart.Chart', 'design.chart.ChartBasicProperty',
			'design.chart.ChartAxisProperty', 'design.chart.ChartTreeControl',
			'design.chart.ChartSeriesProperty'],

	init : function() {
		this.control({
			// 查询列表查询
			'querylist' : {
				select : this.querySelection
			},
			'chartseriesproperty button[id=addChartSeriesId]' : {
				click : this.addChartSeriesButton
			},
			'chartseriesproperty button[id=delChartSeriesId]' : {
				click : this.delChartSeries
			},
			'treepanel':{
				edit:this.chartDesignEdit
			},
			'chartseriesproperty button[id=editChartSeriesId]' : {
				click : this.editChartSeries
			},'panel button[id=chartRefreshId]':{//刷新图表显示
				click : this.previewChartOnLoad
			},
			'panel[id=chartView]':{
				resize:this.resizeChart
			},
			'chart[id=chartPreview]':{
				render:this.chartPanelRender
			},
			'chartaxisproperty fieldset':{
				expand: this.fieldsetExpand,
				collapse:function(f){
					var treepanel = f.down('treepanel');
					treepanel.getStore().getNodeById('id').set('propertyText',false);
					this.deleteChartAxisModel(f.down('treepanel').id);
				}
			},'panel[id=southPanel]':{//改变图表定义中选项panel大小，下级跟着联动
				resize:this.changeSouthPanelResize
			},'panel[id=chartPanel] ':{//图表定义总panel 
				afterrender:this.chartAfterrender//当显示后增加监控 

			},'combobox[action=editor_combobox_sort_id]':{//comboboxSortChange
				expand:this.comboboxSortChange
			},'combobox[action=editor_axis_type_id]':{//comboboxAxisTypeSelect  轴-类型
				select:this.comboboxAxisTypeSelect
			},'combobox[action=editor_chart_id]':{//comboboxChartSelect  序列-显示类型
				select:this.comboboxChartSelect
			},'combobox[action=editor_grid_id]':{//comboboxGridSelect  轴-网格线
				select:this.comboboxGridSelect
			}
		});
		
	},
	/**
	 * 处理rect的y与height为NaN的问题
	 * @param {} panel
	 */
	chartPanelRender:function(panel){
		//					console.log(Ext.getDoc().dom.getElementsByTagName('svg'));
//					var rectArr = panel.getEl().dom.getElementsByTagName('rect');
//					Ext.iterate(v,function(value){console.log(value);});
//					console.log(rectArr);
//					console.log(rectArr.length);
//					var forEach = Array.prototype.forEach;
//					forEach.call(rectArr, function(rect){ // 未发现有浏览器不支持
////					  link.style.color = '#0F0';
//					  console.log(rect);
//					});
////					console.log(length);
					//console.log(panel.getEl().dom)
//					panel.getEl().setHTML(panel.getEl().getHTML().replace('NaN','0'));
//					console.log(panel.getEl().getHTML())

	},
	storeAxesSeriesStyleChange:function(){
		var v=Ext.getStore('chart.ChartAxes').getModifiedRecords().length>0
			||Ext.getStore('chart.ChartAxes').getRemovedRecords().length>0
			||Ext.getStore('chart.ChartSeries').getModifiedRecords().length>0
			||Ext.getStore('chart.ChartSeries').getRemovedRecords().length>0
			||Ext.getStore('chart.ChartStyle').getModifiedRecords().length>0
			||Ext.getStore('chart.ChartStyle').getRemovedRecords().length>0
			
			changeTitle('Chart',v);
			if(hasChanged != v)
    		{
    			hasChanged = v;
    		}
	},
	fieldsetExpand:function(f){
		// 轴展开时是新加一个轴
		var axesStore = Ext.getStore("chart.ChartAxes");
		var treepanel = f.down('treepanel');
		var axisData = treepanel.getStore().tree.root.childNodes;
		var gridId = treepanel.id;
//		console.log(treepanel.getStore().getNodeById('id').get('propertyText'));
		
		treepanel.getStore().getNodeById('id').set('propertyText',true);
//		console.log(treepanel.getStore().getNodeById('id').get('propertyText'));
		
		//console.log(gridId);
		//创建model并填充数据
		var model = Ext.create('HummerApp.model.chart.ChartAxis');
		model.set('gridId', gridId);
		var position = /(\w+)Axis/.exec(gridId)[1];
		model.set('position', position);
		model.set('axistype', treepanel.getStore().getNodeById('axistype').data.propertyValue);
		model.set('dashsize', 3);
		//添加轴并刷新图表
		axesStore.add(model);
		//console.log(axesStore);
//		this.previewChartOnLoad();
	},
	
	/**
	 * treepanel编辑完成后，修改图表预览Store中值
	 * @param {} editor
	 * @param {} e
	 * @param {} eOpts
	 * @author 常绍新
	 * @date 20121107
	 */
	chartDesignEdit :function(editor, e, eOpts){
		
		var gridId = e.grid.id;
		var store, model, record;
		var fieldName= e.record.data.propertyColumn;
		
//		console.log(e.originalValue + ":  " + e.value);
		if(e.originalValue == e.value)
			return;
		//console.log(gridId.search("Axis"));
		if(gridId.search("Axis")!=-1 && fieldName.match(/grid/)){	// 图表轴
			store = Ext.getStore('chart.ChartAxes');
			if(fieldName == 'grid')
				this.editAxisGrid(store.findRecord('gridId',gridId), e.record);
			else
				this.editAxisGrid(store.findRecord('gridId',gridId), e.record.parentNode);
//			console.log(store);
		}
		else {
			if(gridId.search("Axis")!=-1)	// 图表轴
				store = Ext.getStore('chart.ChartAxes');
			else if(gridId.search("chartStyle")!=-1){	// 图表样式
				store = Ext.getStore('chart.ChartStyle');
			}
			else if(gridId.search("chartSeries")!=-1){	// 序列
				store = Ext.getStore('chart.ChartSeries');
			}
			var level = e.record.data.propertyColumn.split('_').length;
			if(level==3){
				record = e.record.parentNode.parentNode;
			}
			else if(level==2){
				record = e.record.parentNode;
			}
			else 
				record = e.record;
			//console.log(gridId);
			this.editModel(store.findRecord('gridId',gridId), record);
		}
//		this.previewChartOnLoad();
		//console.log(gridId);
	},
	/**
	 * 处理轴的网络线属性
	 * @param {} model
	 * @param {} record
	 */ 
	editAxisGrid:function(model, record){
		//var model = store.findRecord('gridId',gridId);
		var gridData, value = record.data.propertyValue, subNames;
		if(value == 'false')
			model.set(record.data.propertyColumn,value);
		else{
			gridData = {};
			gridData[value] = {};
			for(var idx in record.childNodes){
				var subProp = record.childNodes[idx].data;
				subNames = subProp.propertyColumn.split('_');
				gridData[value][subNames[1]] = subProp.propertyValue;
			}
			if(value == 'odd'){
//				console.log("odd");
				gridData[value]['fill'] = gridData[value]['color'];
//				console.log(gridData)
			}
		}
		//console.log(gridData);
		model.set(record.data.propertyColumn,Ext.JSON.encode(gridData));
		
	},
	/**
	 * 设置treeStore指定model的值
	 * @param {} model
	 * @param {} fieldName
	 * @param {} value
	 * @author 常绍新
	 * @date 20121107
	 */
	editModel:function(model, record){
		var fieldValue, fieldName, value,propData, record, subNode, subProp;
//		console.log(model);
		if(model != null)
		{
			fieldName = record.data.propertyColumn;
			value = record.data.propertyValue;
			var fullName = fieldName.split('_');
		 
			if(value == 'false' 
			||(record.get('propertyColumn')=='background'&&value==false)
			||  (value == false && value.toString().length>0) || !record.childNodes || record.childNodes.length==0){
//				console.log("gggg");
				model.set(fullName[0],value);
			}
			else if(record.childNodes && record.childNodes.length>0){
//				console.log("1234");
				propData = {};
				for(var idx in record.childNodes){
					subNode = record.childNodes[idx];
					subProp = subNode.data;
					subNames = subProp.propertyColumn.split('_');
					// 如果有二级子属性
					if(subNode.childNodes && subNode.childNodes.length>0){
						if(value == subNames[1]){ // 子属性名和父属性值相等
							propData[subNames[1]] = {};
							for(var subIdx in subNode.childNodes){
								var sub2Prop = subNode.childNodes[subIdx].data;
								var sub2Names = sub2Prop.propertyColumn.split('_');
								if(sub2Prop.propertyColumn.match(/background_gradient_\d+/)){ // 对渐变填充
									if(!propData[subNames[1]]['stops'])
										propData[subNames[1]]['stops'] = {};
									propData[subNames[1]]['stops'][sub2Names[2]] = {color:sub2Prop.propertyValue};
								}
								else if(sub2Prop.propertyColumn.match(/background_fill_.+/)){ // 对纯色填充
									if(sub2Names[2] == 'color')
										propData['fill'] = sub2Prop.propertyValue;
									else
										propData[sub2Names[2]] = sub2Prop.propertyValue;
								}
								else
									propData[subNames[1]][sub2Names[2]] = sub2Prop.propertyValue;
							}
						}
					}
					else{
						propData[subNames[1]] = subProp.propertyValue;
					}
				}
				model.set(fullName[0],Ext.JSON.encode(propData));
			}
		}
	},
	
	/**
	 * 从轴的树形store中加载数据到图表预览所需的轴Store
	 * @param {} store
	 * @author 常绍新
	 * @DATE 20121108
	 */
	loadAxisStoreFromTreeRecords:function(records){
		var chartAxesStore = Ext.getStore("chart.ChartAxes");
		chartAxesStore.removeAll();
//		if(!chartAxesStore)
//			chartAxesStore = Ext.create("HummerApp.store.chart.ChartAxes",{});
		this.loadStoreFromRecords(records, chartAxesStore, 'HummerApp.model.chart.ChartAxis');
		//console.log(chartAxesStore.getRange());
		this.bChartArr[1]=true;
		
		chartAxesStore.commitChanges( );
	},
	/**
	 * 从序列的树形store中加载数据到图表预览所需的序列Store
	 * @param {} store
	 * @author 常绍新
	 * @DATE 20121108
	 */
	loadSeriesStoreFromTreeRecords:function(records){
		var chartSeriesStore = Ext.getStore("chart.ChartSeries");
		chartSeriesStore.removeAll();
//		if(!chartSeriesStore)
//			chartSeriesStore = Ext.create("HummerApp.store.chart.ChartSeries");
		this.loadStoreFromRecords(records, chartSeriesStore, 'HummerApp.model.chart.ChartSeries');
		//console.log(chartSeriesStore.getRange());
		this.bChartArr[2]=true;
		
		chartSeriesStore.commitChanges( );
	},
	/**
	 * 从样式的树形store中加载数据到图表预览所需的样式Store
	 * @param {} store
	 * @author 常绍新
	 * @DATE 20121108
	 */
	loadChartSyleStoreFromTreeRecords:function(records){
		//console.log(records);
		var chartStyleStore = Ext.getStore("chart.ChartStyle");
		chartStyleStore.removeAll();
		//this.loadStoreFromRecords(records,chartStyleStore,'HummerApp.model.chart.ChartStyle');
		
		var model = Ext.create('HummerApp.model.chart.ChartStyle');
		var subFieldJson, propValue;
		var subRec, subRecData;
		for(var idx in records){
			subRec =  records[idx];
			subRecData = subRec['raw'];
			propValue = subRecData['propertyValue'];
			//console.log(subRec);
			if((propValue == false || propValue == 'false') && subRecData["propertyColumn"] != 'size'){
				model.set(subRecData["propertyColumn"],propValue);
			}
			else if(subRecData["propertyColumn"] == 'background'){
				this.editModel(model,records[idx]);
//				if(propValue == "")
//					model.set(subRecData["propertyColumn"],propValue);
//				else if(propValue == "fill"){ // 纯色填充
//					model.set(subRecData["propertyColumn"],{'fill':subRec.childNodes[0]['raw']['propertyValue']});
//				}
//				else if(propValue == "gradient"){	// 渐变填充
//					
//				}
			}
			else if(subRec.childNodes.length==0 )
				model.set(subRecData["propertyColumn"],propValue);
			else{
				subFieldJson = {};
				for(var subIdx in subRec.childNodes){
					var skeys = subRec.childNodes[subIdx]['raw']["propertyColumn"].split("_");
					if(subRec.childNodes[subIdx].childNodes.length>0){  // 二级子属性
						if(skeys[1] == propValue || propValue == ''){  // 只在子属性名和属性值相等时才处理二级子属性
							var sub2FieldJson = {};
							for(var sub2Idx in subRec.childNodes[subIdx].childNodes){
								var sub2Data = subRec.childNodes[subIdx].childNodes[sub2Idx]['raw'];
								var sub2keys = sub2Data['propertyColumn'].split('_');
								sub2FieldJson[sub2keys[2]] =  sub2Data["propertyValue"];
							}
							subFieldJson[skeys[1]] = sub2FieldJson;
						}
					}
					else{
						
						subFieldJson[skeys[1]]=subRec.childNodes[subIdx]['raw']["propertyValue"];
					}
				}
				model.set(subRecData["propertyColumn"],Ext.JSON.encode(subFieldJson));
			}
		}
		model.set('gridId','chartStyle');
		//console.log(model);
		chartStyleStore.add(model);
		this.bChartArr[0]=true;
		
		chartStyleStore.commitChanges( );
	},
	/**
	 * 删除序列时，同时在预览store中删除
	 * @param {} gridId
	 * @Date 20121114
	 * @author csx
	 */
	deleteChartSeriesModel:function(gridId){
		var chartSeriesStore = Ext.getStore("chart.ChartSeries");
		chartSeriesStore.removeAt(chartSeriesStore.findExact('gridId',gridId));
//		this.previewChartOnLoad();
	},
	/**
	 * 删除轴时，同时在预览store中删除
	 * @param {} gridId
	 * @Date 20121114
	 * @author csx
	 */
	deleteChartAxisModel:function(gridId){
		var chartAxesStore = Ext.getStore("chart.ChartAxes");
		chartAxesStore.removeAt(chartAxesStore.findExact('gridId',gridId));
//		this.previewChartOnLoad();
	},
	
	
	/**
	 * 监测chart的样式、轴、序列的store是否加载完成
	 * @author 常绍新
	 * @date 20121114
	 */
	lookAtChartStore:function(){
		var me = this;
		this.bChartArr = [false,false,false,false];
		var timer = setInterval(function(){
			if(me.bChartArr[0] && me.bChartArr[1] && me.bChartArr[2] /*&& me.bChartArr[3]*/){
				clearInterval(timer); // 清除等待
				
				me.previewChartOnLoad();
			}
		},100);
	},
	/**
	 * 当图表的store加载完成时，生成预览的chart
	 * @author 常绍新
	 * @date 20121114
	 */
	previewChartOnLoad: function(){
		var  modelsAxis, modelsSeries, idx;
		var groupFields = [], valueFields = [];
		var chartAxisStore = Ext.getStore('chart.ChartAxes');
		var chartStyleStore = Ext.getStore("chart.ChartStyle");
		var chartSeriesStore = Ext.getStore('chart.ChartSeries');

		modelsAxis = chartAxisStore.getRange();
		modelsSeries = chartSeriesStore.getRange();
		
		var axes = this.createAxes(modelsAxis);
        var mySeries = this.createSeries(modelsSeries);
        var chartStyle = chartStyleStore.getRange();
        var sortFields = [], sortField, fieldName;
        var seriesLegend = false;
        // 得到轴中的字段
        for(idx in modelsAxis){
        	fieldName = modelsAxis[idx].get('fieldname');
        	if(!fieldName)
        		continue;
//        	console.log(modelsAxis[idx].get('sort'));
        	if(modelsAxis[idx].get('sort')){ // 排序
        		if(fieldName instanceof Array){
        		}
        		else{
        			fieldName = fieldName.split(',');
        		}
    			for(var i in fieldName){
        			sortField = {};
    				sortField['property'] = fieldName[i];
    				sortField['direction'] = modelsAxis[idx].get('sort');
    				sortFields.push(sortField);
    			}
        	}
        	if(modelsAxis[idx].get('axistype') == 'Category'){
	        	if(fieldName instanceof Array)
					groupFields = Ext.Array.merge(groupFields,fieldName);
				else
					groupFields = Ext.Array.merge(groupFields,fieldName.split(','));
        	}
        	else{
	        	if(fieldName instanceof Array)
					valueFields = Ext.Array.merge(valueFields,fieldName);
				else
					valueFields = Ext.Array.merge(valueFields,fieldName.split(','));
        		
        	}
		}
        // 得到序列中的字段
        for(idx in modelsSeries){
        	if(modelsSeries[idx].get('xfield') instanceof Array)
				groupFields = Ext.Array.merge(groupFields,modelsSeries[idx].get('xfield'));
			else
				groupFields = Ext.Array.merge(groupFields,modelsSeries[idx].get('xfield').split(','));
        	if(modelsSeries[idx].get('yfield') instanceof Array)
				valueFields = Ext.Array.merge(valueFields,modelsSeries[idx].get('yfield'));
			else
				valueFields = Ext.Array.merge(valueFields,modelsSeries[idx].get('yfield').split(','));
			seriesLegend = seriesLegend || modelsSeries[idx].get('showlegend');
		}
		// 如果分组轴的字段为空，则使用序列的x字段值
		for(idx in axes){
			//console.log(axes[idx]['type'] + "--" + axes[idx]['fields'] + "-- " + groupFields.length);
			if(axes[idx]['type'] == 'Category' && axes[idx]['fields'] == '' && groupFields.length>0){
				//axes[idx]['fields'] = groupFields[0];
				axes[idx]['drawLabel'] = function(){};
				//drawLabel:function(){},
				//console.log(groupFields[0]);
			}
		}

        var store = this.createChartStore();
        var pageNum = Ext.getCmp('chartView').down('textfield').value;
//        console.log('{groupFields:"'+groupFields.join(',')+'",valueFields:"'+valueFields.join(',')+'"}');
        var constantValue = [currentUser,currentUnit,currentYearMonth, pageNum];
        var title = [];
        store.load({
				params:{ fields:'{groupFields:"'+groupFields.join(',')+'",valueFields:"'+valueFields.join(',')+'"}',constantValue:constantValue},
				scope:this,
				callback:function(records){
					if(modelsSeries.length>=1 && modelsSeries[0].get('seriestype')=='pie'){ // 饼图的title要特别处理
			        	for(idx = 0;idx<records.length;idx++){
			        		title.push(records[idx].get( modelsSeries[0].get('xfield')));
			        	}
//			        	console.log(title);
						mySeries[0]['title'] = title;
					}
				}
	    		});
	    store.sort(sortFields);  // 排序
	    
//        if(modelsSeries.length>=1 && modelsSeries[0].get('seriestype')=='pie'){ // 饼图的title要特别处理
//        	var title = [];
//        	var chartData = store.getRange();
//        	for(idx = 0;idx<chartData.length;idx++){
//        		title.push(chartData[idx].get('xfield'));
//        	}
//        	console.log(title);
//        	mySeries[0]['title'] = title;
//        }
	    
        var myLegend = chartStyle[0].get("legend") ;
        // 当没有显示位置或所有的序列都不显示图示时，不显示图示
        if(myLegend == 'false' || myLegend == false||myLegend=='{"position":""}' ||　!seriesLegend){
        	myLegend = false;
        }
        else{
	        myLegend = (myLegend == null || myLegend == '') ? {position: 'bottom'} : Ext.JSON.decode(myLegend.toLowerCase());
			if(!myLegend['position'])
				myLegend['position'] = 'bottom';
        }
        var background = chartStyle[0].get("background");
        if(background instanceof String)
        	background = Ext.JSON.decode(background);
        if(background != null && background != '')
        	background = Ext.JSON.decode(background);
        var border = chartStyle[0].get("border");
        var myBorder, myStyle={}, borderColor, borderType;
        if(border){
        	myBorder = /"?width"?:"?(\d+)"?/i.exec(border)[1];
        	borderColor = /"?borderColor"?:"([^"]+)"/i.exec(border)[1];
        	borderType = /"?type"?:"(\w+)"/i.exec(border)[1];
        	myStyle = {"borderColor":borderColor,"borderStyle":borderType};
        }
        var myChart = Ext.create("Ext.chart.Chart",{
            id: 'chartPreview',
            width:200,
            height:100,
            insetPadding:24,
            xtype: 'chart',
//            autoSize:true,gradient
            background :background,
            shadow: true,
            legend: myLegend,
            theme:chartStyle[0].get("theme"),
            animate: chartStyle[0].get("animate"),
            border : myBorder , //Ext.JSON.decode(chartStyle[0].get("border")),
            style: myStyle ,
            resizable : chartStyle[0].get("resizable"),
            //shadow: true,
            store: store,
            axes: axes,
            series: mySeries
        });
        // 设置图表的尺寸，如果是百分比尺寸，则由resize事件处理
//        console.log(chartStyle[0].get('size'));
        var chartSize = Ext.JSON.decode(chartStyle[0].get('size'));
        var re = /\d+%/;
        if(Ext.isNumber(chartStyle[0].get('width')))
        	myChart.setWidth(chartStyle[0].get('width'));
        else if(Ext.isNumber(chartSize['width']))
        	myChart.setWidth(chartSize['width']);
        else if(chartStyle[0].get('width').match(re))
        	this.chartWidth = chartStyle[0].get('width').replace('%','');
        else if(chartSize['width'].match(re))
        	this.chartWidth = chartSize['width'].replace('%','');
        if(Ext.isNumber(chartStyle[0].get('height')))
        	myChart.setHeight(chartStyle[0].get('height'));
        else if(Ext.isNumber(chartSize['height']))
        	myChart.setWidth(chartSize['height']);
        else if(chartStyle[0].get('height').match(re))
        	this.chartHeight = chartStyle[0].get('height').replace('%','');
        else if(chartSize['height'].match(re))
        	this.chartHeight = chartSize['height'].replace('%','');
        	
        if(Ext.isNumber(chartStyle[0].get('minWidth')))
        	myChart.minWidth = chartStyle[0].get('minWidth');
        if(Ext.isNumber(chartStyle[0].get('maxWidth')))
        	myChart.maxWidth = chartStyle[0].get('maxWidth');
        if(Ext.isNumber(chartStyle[0].get('minHeight')))
        	myChart.minHeight = (chartStyle[0].get('minHeight'));
        if(Ext.isNumber(chartStyle[0].get('maxHeight')))
        	myChart.maxHeight = (chartStyle[0].get('maxHeight'));
        	
        var panel = Ext.getCmp('chartView');
//        console.log(myChart);
        panel.removeAll();
        if(chartStyle[0].get("title")){
//         panel.add( {html:'<div style="font-size:20px; text-align:center;border: none!important;">'+chartStyle[0].get("title")+'</div>'});
         panel.add(
            Ext.create("Ext.form.Label",{
            text:chartStyle[0].get("title"),
             style: {
             	fontSize:'20px'
             },
            padding :'3 0 3 0'
            })
         );
        }
        panel.add( myChart);
		//myChart.updateLayout( );
        panel.doLayout();
		this.resizeChart();
        myChart.doAutoRender( );
	},
	resizeChart:function(){
		var container = Ext.getCmp('chartView');
		//console.log(container);
		var chart = Ext.getCmp('chartPreview');
		if(chart && container){
			try{
				if(this.chartWidth){
					//console.log(this.chartWidth);
					chart.setWidth((container.getWidth()-10) / 100 * this.chartWidth-1);
				}
				if(this.chartHeight){
					//console.log(this.chartHeight);
					var tHeight = container.down('toolbar').getHeight( )+ container.down('label').getHeight()+16;
					//console.log(container.down('toolbar').getHeight( ));
					chart.setHeight((container.getHeight()-tHeight) / 100 * this.chartHeight-1);
				}
				chart.doComponentLayout();
				//console.log(chart.getWidth());
			}
			catch(ex){}
			//Ext.getCmp('chartCmp').setSize(container.getWidth(), container.getHeight()-100);
		}
	},

	createSeries:function(seriesRecords){
		var series = [];
		var ser,labelStr, label, tipStr, tips, title,fill;
		var fField, yField,xField ;
		for(var idx=0;idx<seriesRecords.length;idx++){
			fField = seriesRecords[idx].get('yfield');
			if(fField instanceof Array)
				yField = fField;
			else
				yField = fField.toUpperCase().split(',');
//			console.log(yField);
			title = this.getSeriesTitle(fField);
//			console.log(title);
			fField = seriesRecords[idx].get('xfield');
			if(fField instanceof Array)
				xField = fField;
			else
				xField = fField.toUpperCase().split(',');
			
			labelStr = seriesRecords[idx].get('label');
			if(labelStr==false){
				labelStr='';
			}
			label = labelStr==''?"":Ext.JSON.decode(labelStr);
//			var labelDisplay = 'insideEnd';
//			if(seriesRecords[idx].get('stacked'))
//				labelDisplay = 'insideEnd';
			if(label['size']){
				if(label['font'].search(/\d+px/)==-1){
					label['font'] = label['size'] + 'px ' + label['font'];
//					label['display']=labelDisplay;
//					label['contrast']=true;
//					label['field']=yField;
				}else{
					label['font'] = label['size'].replace(/\d+px/,label['size'] + 'px');
				}
//				label['display']=labelDisplay;
				label['contrast']=true;
				label['field']=yField;
				label['renderer']=function(storeItem, item) {
//					console.log(item);
//					console.log(storeItem);
					if(Ext.isNumeric(storeItem))
                    	return Math.round(storeItem*100)/100;
                  }
			}
			
			if(label==''){
				label="{}";
			}
			
			tipStr = seriesRecords[idx].get('tips');
			tips = tipStr==''?"":Ext.JSON.decode(tipStr);
			fill=seriesRecords[idx].get('fill');//是否填充；只对折线图有效
//			console.log(seriesRecords[idx].get('yfield'));
			ser = {            
				type: seriesRecords[idx].get('seriestype'),
	            axis: seriesRecords[idx].get('axis'),
	            highlight: true,
	            title : title,
	            tips : tips,
	            label: label,
	            showMarkers:true,
	            markerConfig:{
	                color: '#F00'
	            },
	            showInLegend : seriesRecords[idx].get('showlegend'),
	            stacked: seriesRecords[idx].get('stacked'),
	            xField: xField,
	            yField: yField,
	            angleField: yField,
	            fill:fill
			};
			series.push(ser);
		}
		return series;
	},
	getSeriesTitle:function(fieldArr){
		var fieldStore = Ext.getStore('field.AvailableFields');
		//var fieldArr = fields.split(',');
		var result = [], model;
		if(!(fieldArr instanceof Array))
			fieldArr = fieldArr.split(',');
//		console.log(fieldArr);
		for(var num = 0; num<fieldArr.length;num++){
			model = fieldStore.findRecord('fieldName',fieldArr[num]);
//			console.log(model);
//			console.log(fieldArr[num]);
			if(model!=null && model.get('fieldName') == fieldArr[num]){
				result.push( model.get('sourceName') );
			}
		}
//		console.log(result);
		return result;
	},
	createAxes:function(axisRecords){
		var axes = [];
		var axis;
		for(var idx = 0; idx<axisRecords.length;idx++)
		{
			var gridStr = axisRecords[idx].get('grid');
			var grid  = gridStr==""?false:Ext.JSON.decode(gridStr.replace('color','stroke'));
			var labelStr = axisRecords[idx].get('label');
			var label = labelStr==''?"":Ext.JSON.decode(labelStr);
			var axisField = axisRecords[idx].get('fieldname');
//			
			if(label['angle']){
				label['rotate'] = {degrees:label['angle']}
			}
			if(label['size']){
				if(label['font'].search(/\d+px/)==-1)
					label['font'] = label['size'] + 'px ' + label['font'];
				else
					label['font'] = label['size'].replace(/\d+px/,label['size'] + 'px');
			}
			if(grid==null){
				grid=false;
			}else{
				if(grid['odd']){
					grid['odd']['stroke-width']=1;
					grid['odd']['fill']=grid['odd']['stroke'];
				}
				else if(grid['even']){
					grid=true;
				}
			}


			var axisType, position;
			if(axisField){
				if(axisField instanceof Array)
					axisField = axisField;
				else
					axisField = axisField.toUpperCase().split(',');
			}
			axisType = axisRecords[idx].get('axistype');
			var position = /(\w+)Axis/.exec(axisRecords[idx].get('gridId'))[1];
			if(axisType == 'Category' && axisField.length>0)
				axisField = axisField[0];
			axis = {
				type: axisType,
			    position: position,
			    fields: axisField,
			    title: axisRecords[idx].get('title'),
			    dashSize:axisRecords[idx].get('dashsize'),
			    label : label,
			    grid : grid
			};
			if(Ext.isNumber(axisRecords[idx].get('minimum')))
				axis.minimum = axisRecords[idx].get('minimum');
			else
				axis.minimum = 0;
			if(Ext.isNumber(axisRecords[idx].get('maximum') ))
				axis.maximum = axisRecords[idx].get('maximum');
			//console.log(axis);
			axes.push(axis);
		}
		return axes;
	},
	createChartStore:function(){
		var seriesRecords = Ext.getStore('chart.ChartSeries').getRange();
		var axisRecords = Ext.getStore('chart.ChartAxes').getRange();
		var fieldArr = [];
		var idx;
		for(idx = 0;idx<axisRecords.length;idx++){
			fields = axisRecords[idx].get('fieldname');
			if(fields !=null && fields != ""){
				if(fields instanceof Array)
					fieldArr = Ext.Array.merge( fieldArr, fields);
				else
					fieldArr = Ext.Array.merge( fieldArr, fields.toUpperCase().split(','));
			}
		}
		for(idx = 0;idx<seriesRecords.length;idx++){
			fields = seriesRecords[idx].get('xfield');
			if(fields instanceof Array)
				fieldArr = Ext.Array.merge( fieldArr,fields);
			else if(fields !=null && fields != "")
				fieldArr = Ext.Array.merge( fieldArr,fields.toUpperCase().split(','));
			fields = seriesRecords[idx].get('yfield');
			if(fields instanceof Array)
				fieldArr = Ext.Array.merge( fieldArr,fields);
			else if(fields !=null && fields != "")
				fieldArr = Ext.Array.merge( fieldArr,fields.toUpperCase().split(','));
		}
//		console.log(fieldArr);
//		var data = this.generateData(fieldArr);
		var store = Ext.create('Ext.data.Store', {
	    	//pageSize :pageSize,
		    fields:fieldArr,
//		    data:data
	        proxy: {
				type : 'ajax',
				url : '/hummer/application/controller/run/FindChartData.action',
				reader 	: {
					type : 'json',
					root : 'rows',
					totalProperty : 'totalCount'
				}
			},
		    autoLoad : false
 		});
 		//store.loadData(this.generateData());
 		var pageNum ;
// 		console.log(Ext.getCmp("optionPanel").getStore());
 		var optionModel = Ext.getCmp("optionPanel").getStore().findRecord('name','每页数据条数');
		if(optionModel)
			pageNum = optionModel.get('value');
		else
			pageNum = 50;
 		//	加载前，获取页面参数值	
 		var queryId = Ext.getCmp('queryList').getSelectionModel().getSelection()[0].get('queryId');
		store.on('beforeload', function (store, options) {
			//var conditionValues =  Ext.getCmp('conditionForm').getForm().getValues();
			var constantValue = [currentUser,currentUnit,currentYearMonth, pageNum];
		    var params = {queryId:queryId,paramsValue:"",constantValue:constantValue};
		    Ext.apply(store.proxy.extraParams, params);
		});
		return store;
	},

	generateData:function(fieldArr){
		var data = [], aData, floor = 20;
		//console.log(fieldArr);
		for(var idx=0;idx<10;idx++){
			aData={};
			for(var num=0;num<fieldArr.length;num++){
				//console.log(fieldArr[num]);
				if(fieldArr[num].match(/yearmonth/i))
					aData[fieldArr[num]] = '2012' + Ext.String.leftPad(idx+1,2,'0')
				else
					aData[fieldArr[num]] = Math.floor(Math.max((Math.random() * 100), floor))
			}
			data.push(aData);
		}
		return data;
	},
	/**
	 * 根据树形Store创建图表的常规store
	 * @param {} records
	 * @param {} store
	 * @param {} modelName
	 * @author 常绍新
	 * @DATE 20121113
	 */
	loadStoreFromRecords : function(records, store, modelName){
		var record, model, subfield, subFieldJson, skeys, prop, propValue, gridValue;
		for(var idx in records){  // 记录信息
			record =  records[idx];
			// Fuck, 非要用propertyText标识是否轴是否有效
			if(record['gridId'].match(/Axis/) && !record['propertyText'])
				continue;
//			console.log(modelName + ": " + (record['propertyText']==false));
			model = Ext.create(modelName);
			model.set('gridId', record['gridId']);
			for(var subIdx in record.children){   // 属性信息
				subfield = record.children[subIdx];
				if(record.children[subIdx]["propertyValue"] == 'false')
					model.set(record.children[subIdx]["propertyColumn"],false);
				else if(!subfield.children )
					model.set(record.children[subIdx]["propertyColumn"],record.children[subIdx]["propertyValue"]);
				else{ // 有子属性
					subFieldJson = {};
					for(var sub2Idx in subfield.children){
						skeys = subfield.children[sub2Idx]["propertyColumn"].split("_");
						subFieldJson[skeys[1]]=subfield.children[sub2Idx]["propertyValue"];
					}
					if(record.children[subIdx]["propertyColumn"] == 'grid'){ //对grid的特别处理
						gridValue = {};
						gridValue[record.children[subIdx]["propertyValue"]] = subFieldJson;
						model.set(record.children[subIdx]["propertyColumn"],Ext.JSON.encode(gridValue));
					}
					else
						model.set(record.children[subIdx]["propertyColumn"],Ext.JSON.encode(subFieldJson));
				}
			}
			
			store.add(model);
		}
		//console.log(store);
	},
	/**
	 * 查询列表查询
	 * 
	 * @param {}
	 *            model
	 * @param {}
	 *            record
	 * @param {}
	 *            eOpts
	 */
	querySelection : function(mode, record, eOpts) {
		var queryId;
		if (record != null && record.get('qtype') == 'chart') {
			var projectId = record.parentNode.get("queryId");
			queryId = record.get('queryId');
			var fieldStore = Ext.getStore("field.AvailableFields");
			fieldStore.load({
						scope : this,
						params : {
							subjectId : projectId
						},
						// 回调函数中调用报警公式设置的查询方法 yzf 20120801
						callback : function(records, operation, success) {
						}
					});
			
            this.getChartAxisSeries(queryId);
			this.getChartBasic(queryId);
			
			this.lookAtChartStore();

		}
	},
	loadChartData:function(queryId){
		var fieldStore = Ext.getStore("field.AvailableFields");
			fieldStore.load({
						scope : this,
						params : {
							subjectId : projectId
						},
						// 回调函数中调用报警公式设置的查询方法 yzf 20120801
						callback : function(records, operation, success) {
						}
					});
			
            this.getChartAxisSeries(queryId);
			this.getChartBasic(queryId);
			
			this.lookAtChartStore();
	},
	/**
	 * 图标保存方法
	 */
	getSaveObject : function() {// 图形保存，临时不完整
		var chart = [];
		var chartAxis = [];
		var chartSeries = [];
		var chartStyle = [];
		// start轴保存
		
		var storeLeft=Ext.getCmp('leftAxis').getStore();
		var storeBottom=Ext.getCmp('bottomAxis').getStore();
		var storeRight=Ext.getCmp('rightAxis').getStore();
		var storeTop=Ext.getCmp('topAxis').getStore();
	
		
		if(storeLeft.getUpdatedRecords().length>0
		||(storeLeft.getNodeById('id').get('propertyText')==false
		  &&storeLeft.getNodeById('id').get('propertyValue').length>0)
		||(storeLeft.getNodeById('id').get('propertyText')==true
		  &&storeLeft.getNodeById('id').get('propertyValue').length==0)
		){
			chartAxis.push(Ext.encode(this.getAxisRowData('leftAxis',
			'fieldsetLeft', 'left', 'Numeric')));
		}
		if(storeBottom.getUpdatedRecords().length>0
		||(storeBottom.getNodeById('id').get('propertyText')==false
		  &&storeBottom.getNodeById('id').get('propertyValue').length>0)
		||(storeBottom.getNodeById('id').get('propertyText')==true
		  &&storeBottom.getNodeById('id').get('propertyValue').length==0)
		){
			chartAxis.push(Ext.encode(this.getAxisRowData('bottomAxis',
			'fieldsetBottom', 'bottom', 'Category')));
		}
		if(storeRight.getUpdatedRecords().length>0
		||(storeRight.getNodeById('id').get('propertyText')==false
		  &&storeRight.getNodeById('id').get('propertyValue').length>0)
		||(storeRight.getNodeById('id').get('propertyText')==true
		  &&storeRight.getNodeById('id').get('propertyValue').length==0)
		){
			chartAxis.push(Ext.encode(this.getAxisRowData('rightAxis',
			'fieldsetRight', 'right', 'Numeric')));
		}
		if(storeTop.getUpdatedRecords().length>0
		||(storeTop.getNodeById('id').get('propertyText')==false
		  &&storeTop.getNodeById('id').get('propertyValue').length>0)
		||(storeTop.getNodeById('id').get('propertyText')==true
		  &&storeTop.getNodeById('id').get('propertyValue').lenght==0)
		){
			chartAxis.push(Ext.encode(this.getAxisRowData('topAxis', 'fieldsetTop',
			'top', 'Category')));
		}
		// end 轴保存

		// start序列保存
		if(this.delChartSeriesIds!=null&&this.delChartSeriesIds!='undefined'&&this.delChartSeriesIds!=''){
			
			var delSerieses= this.delChartSeriesIds.split(',');
			for(var i=0;i<delSerieses.length;i++){
				var seriesColArray = new Array();
				seriesColArray.push('delete;'+delSerieses[i]);
			 chartSeries.push(Ext.encode(seriesColArray));
			}
		}
		this.delChartSeriesIds='';//删除序列的编号在保存后清除
		
		for (var i = 0; i < Ext.getCmp('chartSeriesFieldSetId').items.items.length; i++) {//保存
			var treeControl=Ext.getCmp('chartSeriesFieldSetId').items.items[i].down('charttreecontrol');
			var store=treeControl.getStore();
			if(store.getUpdatedRecords().length>0
			||store.getNodeById('id').get('propertyValue').length==0
			){//序列有改变才保存
			  chartSeries.push(Ext.encode(this.getSeriesRowData(treeControl.id)));
			}
		}
		// end 序列保存

		// start 图表样式保存
		chartStyle = this.neatenChartStyle();
		// end 图表样式保存

		chart.push(Ext.encode(chartAxis));
		chart.push(Ext.encode(chartSeries));
		chart.push(Ext.encode(chartStyle));
		return Ext.encode(chart);
	},
		/**
	 * @author LCL
	 * 图表样式 验证 及整理成list
	 */
	neatenChartStyle : function() {
		var chartBasicPropertyStore = Ext.getStore('chart.ChartBasicProperty');
		var chartStore = Ext.getStore('chart.ChartStyle' );
		var title = chartBasicPropertyStore.getNodeById('title').data.propertyValue.toString().replace(/(^\s*)|(\s*$)/g, "");
		var width = chartBasicPropertyStore.getNodeById('width').data.propertyValue.toString().replace(/(^\s*)|(\s*$)/g, "");
		var height = chartBasicPropertyStore.getNodeById('height').data.propertyValue.toString().replace(/(^\s*)|(\s*$)/g, "");
		var minWidth = chartBasicPropertyStore.getNodeById('minWidth').data.propertyValue;
		var minHeight = chartBasicPropertyStore.getNodeById('minHeight').data.propertyValue;
		var maxWidth = chartBasicPropertyStore.getNodeById('maxWidth').data.propertyValue;
		var maxHeight = chartBasicPropertyStore.getNodeById('maxHeight').data.propertyValue;
		var legend = chartBasicPropertyStore.getNodeById('legend').data.propertyValue;
		if(legend==true||legend=='true'){
			var legendPosition = chartBasicPropertyStore.getNodeById('legendPosition').data.propertyValue;
			legend = '{"position":"' + legendPosition + '"}';
		}else{
			legend=null;
		}
		var border = chartBasicPropertyStore.getNodeById('border').data.propertyValue;
		if(border == true||border=='true'){
			var borderWidth = chartBasicPropertyStore.getNodeById('borderWidth').data.propertyValue;
			var borderColor = chartBasicPropertyStore.getNodeById('borderColor').data.propertyValue;
			var lineType = chartBasicPropertyStore.getNodeById('lineType').data.propertyValue;
			border = '{"border":"' + borderWidth + '","style":{"borderColor":"'+ borderColor + '","borderStyle":"' + lineType + '"}}';
		}else{
			border = null;
		}
		var background = chartStore.getRange()[0].get('background'); // 背景直接使用显示图表时解析好的内容
		
		var animate = chartBasicPropertyStore.getNodeById('animate').data.propertyValue;
		var themeColor = chartBasicPropertyStore.getNodeById('themeColor').data.propertyValue;
		var reSizAble = chartBasicPropertyStore.getNodeById('reSizAble').data.propertyValue;

		var item = new Array();
		item.push(title);
		item.push(width);
		item.push(height);
		item.push(minWidth);
		item.push(minHeight);
		item.push(maxWidth);
		item.push(maxHeight);
		item.push(legend);
		item.push(border);
		item.push(background.replace('null','0'));
		item.push(animate);
		item.push(themeColor);
		item.push(reSizAble);
		return item;
	},
	/**
	 * 页面数据验证
	 */
	validBeforeSave : function() {
		var msg = '';
		// 轴 验证       
        var msgChartAxis=this.validChartAxis();

		
		var msgChartSeries=this.validChartSeries();

        var msgChartStyle=this.vaildChartStyle();
        if(msgChartAxis==-1&&msgChartSeries==-1&&msgChartStyle==-1){//图表定义没有改变
          return - 1;
        }else{
         if(msgChartAxis!=-1&&msgChartAxis!=''){
			return msg+msgChartAxis;
		}
		if(msgChartSeries!=-1&&msgChartSeries!=''){
			return msg+msgChartSeries;
		}
		if(msgChartStyle!=-1&&msgChartStyle!=''){
			return msg+msgChartStyle;
		}
        }
		return msg;
	},
    
	/**
	 * 轴数据验证
	 */
	validChartAxis:function(){
		var message="";

		var storeLeft=Ext.getCmp('leftAxis').getStore();
		var storeBottom=Ext.getCmp('bottomAxis').getStore();
		var storeRight=Ext.getCmp('rightAxis').getStore();
		var storeTop=Ext.getCmp('topAxis').getStore();

		if(storeLeft.getNodeById('id').get('propertyText')==true){
			if(storeLeft.getNodeById('title').get('propertyValue').length>100){
				message = message+'左轴标题过长,请不要超过100个字符！';
			}
			if(typeof(storeLeft.getNodeById('fieldname').get('propertyValue'))=='string'){
				if(storeLeft.getNodeById('fieldname').get('propertyValue').length>100){
					message = message+'左轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
				}
			}else{
				if(typeof(storeLeft.getNodeById('fieldname').get('propertyValue'))=='object'){
					if(storeLeft.getNodeById('fieldname').get('propertyValue').join(",").length>100){
						message = message+'左轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
					}
				}
			}
			

			if(storeLeft.getNodeById('axistype').get('propertyValue')=='Numeric'){

				var minVal=storeLeft.getNodeById('minimum').get('propertyValue');
				var maxVal=storeLeft.getNodeById('maximum').get('propertyValue');
				if(minVal!=null&&maxVal!=null
				){
					if(minVal>=maxVal){
						message = message+'左轴最大刻度必须大于最小刻度！';
					}
				}
				
			}
			
			if(storeLeft.getNodeById('label_size').get('propertyValue')==null){
			    storeLeft.getNodeById('label_size').set('propertyValue',12);
			}
		}

		if(storeBottom.getNodeById('id').get('propertyText')==true){
			if(storeBottom.getNodeById('title').get('propertyValue').length>100){
				message = message+'下轴标题过长,请不要超过100个字符！';
			}
			if(typeof(storeBottom.getNodeById('fieldname').get('propertyValue'))=='string'){
				if(storeBottom.getNodeById('fieldname').get('propertyValue').length>100){
					message = message+'下轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
				}
			}else{
				if(typeof(storeBottom.getNodeById('fieldname').get('propertyValue'))=='object'){
					if(storeBottom.getNodeById('fieldname').get('propertyValue').join(",").length>100){
						message = message+'下轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
					}
				}
			}
//			if(storeBottom.getNodeById('fieldname').get('propertyValue').length>5){
//				message = message+'字段过多！';
//			}
			if(storeBottom.getNodeById('axistype').get('propertyValue')=='Numeric'){
				var minVal=storeBottom.getNodeById('minimum').get('propertyValue');
				var maxVal=storeBottom.getNodeById('maximum').get('propertyValue');
				if(minVal!=null&&maxVal!=null
				){
					if(minVal>=maxVal){
						message = message+'下轴最大刻度必须大于最小刻度！';
					}
				}
				
			}
			if(storeBottom.getNodeById('label_size').get('propertyValue')==null){
			    storeBottom.getNodeById('label_size').set('propertyValue',12);
			}
		}

		if(storeRight.getNodeById('id').get('propertyText')==true){
			if(storeRight.getNodeById('title').get('propertyValue').length>100){
				message = message+'右轴标题过长,请不要超过100个字符！';
			}
			if(typeof(storeRight.getNodeById('fieldname').get('propertyValue'))=='string'){
				if(storeRight.getNodeById('fieldname').get('propertyValue').length>100){
					message = message+'右轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
				}
			}else{
				if(typeof(storeRight.getNodeById('fieldname').get('propertyValue'))=='object'){
					if(storeRight.getNodeById('fieldname').get('propertyValue').join(",").length>100){
						message = message+'右轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
					}
				}
			}
//			if(storeRight.getNodeById('fieldname').get('propertyValue').length>5){
//				message = message+'字段过多！';
//			}
			
			if(storeRight.getNodeById('axistype').get('propertyValue')=='Numeric'){
				var minVal=storeRight.getNodeById('minimum').get('propertyValue');
				var maxVal=storeRight.getNodeById('maximum').get('propertyValue');
				if(minVal!=null&&maxVal!=null
				){
					if(minVal>=maxVal){
						message = message+'右轴最大刻度必须大于最小刻度！';
					}
				}
				
			}
			if(storeRight.getNodeById('label_size').get('propertyValue')==null){
			    storeRight.getNodeById('label_size').set('propertyValue',12);
			}
		}

		if(storeTop.getNodeById('id').get('propertyText')==true){
			if(storeTop.getNodeById('title').get('propertyValue').length>100){
				message = message+'上轴标题过长,请不要超过100个字符！';
			}
			if(typeof(storeTop.getNodeById('fieldname').get('propertyValue'))=='string'){
				if(storeTop.getNodeById('fieldname').get('propertyValue').length>100){
					message = message+'上轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
				}
			}else{
				if(typeof(storeTop.getNodeById('fieldname').get('propertyValue'))=='object'){
					if(storeTop.getNodeById('fieldname').get('propertyValue').join(",").length>100){
						message = message+'上轴字段绑定总体长度过长,请选择的字段总长度不要超过100字符！';
					}
				}
				
			}
//			if(storeTop.getNodeById('fieldname').get('propertyValue').length>5){
//				message = message+'字段过多！';
//			}
			if(storeTop.getNodeById('axistype').get('propertyValue')=='Numeric'){
				var minVal=storeTop.getNodeById('minimum').get('propertyValue');
				var maxVal=storeTop.getNodeById('maximum').get('propertyValue');
				if(minVal!=null&&maxVal!=null
				){
					if(minVal>=maxVal){
						message = message+'上轴最大刻度必须大于最小刻度！';
					}
				}
				
			}
			if(storeTop.getNodeById('label_size').get('propertyValue')==null){
			    storeTop.getNodeById('label_size').set('propertyValue',12);
			}
		}

	    return message;
	},
	/**
	 * 序列数据验证
	 * @return {}
	 */
	validChartSeries:function(){
	 var message="";
	 if(Ext.getCmp('chartSeriesFieldSetId').items.items.length==0){
	  return '图表定义序列最少有一个,你目前没有添加序列';
	 }
	 //序列验证
	 for(var i=0;i<Ext.getCmp('chartSeriesFieldSetId').items.items.length;i++){
	  var storeSeries= Ext.getCmp('chartSeriesFieldSetId').items.items[i].down('charttreecontrol').getStore();
	 
	  if(typeof(storeSeries.getNodeById('xfield').get('propertyValue'))=='string'){
	  	if(storeSeries.getNodeById('xfield').get('propertyValue').length>100){
	  		message = message+'X轴字段所选字段总体长度过长,请选择的字段总长度不要超过100字符！';
	  	}
	  }else{
	  	if(typeof(storeSeries.getNodeById('xfield').get('propertyValue'))=='object'){
	  		if(storeSeries.getNodeById('xfield').get('propertyValue').join(",").length>100){
		  		message = message+'X轴字段所选字段总体长度过长,请选择的字段总长度不要超过100字符！';
		  	}
	  	}
	  } 
	  
	  if(typeof(storeSeries.getNodeById('yfield').get('propertyValue'))=='string'){
	  	if(storeSeries.getNodeById('yfield').get('propertyValue').length>100){
	  		message = message+'Y轴字段所选字段总体长度过长,请选择的字段总长度不要超过100字符！';
	  	}
	  }else{
	  	if(typeof(storeSeries.getNodeById('yfield').get('propertyValue'))=='object'){
	  		if(storeSeries.getNodeById('yfield').get('propertyValue').join(",").length>100){
		  		message = message+'Y轴字段所选字段总体长度过长,请选择的字段总长度不要超过100字符！';
		  	}
	  	}
	  } 
//	  if(storeSeries.getNodeById('xfield').get('propertyValue').length>5){
//				message = message+'X轴所选字段过多！';
//		}
//		 if(storeSeries.getNodeById('yfield').get('propertyValue').length>5){
//				message = message+'Y轴所选字段过多！';
//		}	
	 }

	if(message.length>0){
		 return message;
	}
     return '';
	},
	/**
	 * 验证 图表样式
	 * @author LCL
	 */
	vaildChartStyle:function(){
		var msg = '';
		var updateRecords = Ext.getCmp('chartStyle').getStore().getUpdatedRecords();
		var store = Ext.getCmp('chartStyle').getStore();
		if(updateRecords.length==0){
			return -1;
		}else{
			var title = store.getNodeById('title').data.propertyValue.toString().replace(/(^\s*)|(\s*$)/g, "");
//			if(title==''||title==null){
//				msg = msg+'图表标题不能为空！';
//			}
			if(title.length>100){
				msg = msg+'图表标题不能超过100个字符！';
			}
			var width = store.getNodeById('width').data.propertyValue.toString().replace(/(^\s*)|(\s*$)/g, "");
//			if(width==''||width==null){
//				msg = msg+'图表宽度不能为空！';
//			}
			if(width.length>20){
				msg = msg+'图表宽度设置超长！';
			}
			 var reg = /^[1-9](([0-9]*%)|[0-9]*)$/;
			 var r = width.match(reg); 
			 if(r==null){
			 	msg = msg+'图表宽度必须是数字或者百分数';
			 }
			
			var height = store.getNodeById('height').data.propertyValue.toString().replace(/(^\s*)|(\s*$)/g, "");
			if(height==''||height==null){
				msg = msg+'图表高度不能为空！';
			}
			if(height.length>20){
				msg = msg+'图表高度设置超长！';
			}
			
			r = height.match(reg); 
			if(r==null){
			 	msg = msg+'图表高度必须是数字或者百分数';
			}
			var minWidth = store.getNodeById('minWidth').data.propertyValue;
			var minHeight = store.getNodeById('minHeight').data.propertyValue;
			var maxWidth = store.getNodeById('maxWidth').data.propertyValue;
			var maxHeight = store.getNodeById('maxHeight').data.propertyValue;
			if(maxWidth<minWidth){
				msg = msg+'图表最大宽度应该大于最小宽度！';
			}
			if(maxHeight<minHeight){
				msg = msg+'图表最大高度应该大于最小高度！';
			}
			var backgroungtype = store.getNodeById('backGround').data.propertyValue;
			var diaphaneity = store.getNodeById('diaphaneity').data.propertyValue;
			if(backgroungtype=='fill'){
				if(diaphaneity>1||diaphaneity<0){
					msg = msg+'图表透明度应该是一个0-1之间的数！';
				}
			}
			return msg;
		}
	},

	/**
	 * 更新轴数据
	 * @param {} dataTree 轴数据
	 */
	updateChartAxis :function(rec){
	  var record = Ext.clone(rec);
	  switch(record.propertyName.toLowerCase()){
	    case 'left':
			if(record.children[1].propertyValue.length>0){
				
			    record.children[1].propertyValue=record.children[1].propertyValue.split(',');//将字符串转换成数组
			}
			if(record.propertyText==false){
				
			}else{
				Ext.getCmp('fieldsetLeft').expand( );
			}
		    Ext.getCmp('leftAxis').getStore().setRootNode(record);
//		    Ext.getCmp('leftAxis').getStore().getNodeById('fieldname')
//		    .set('propertyValue',
//		     Ext.getCmp('leftAxis').getStore().getNodeById('fieldname')
//		     .data.propertyValue
//		    );
		    rec['gridId']= 'leftAxis';
		   break;
	   case 'bottom':
	   		if(record.children[1].propertyValue.length>0){
			    record.children[1].propertyValue=record.children[1].propertyValue.split(',');//将字符串转换成数组
			}
			if(record.propertyText==false){
				
			}else{
				Ext.getCmp('fieldsetBottom').expand( );
			}
		    Ext.getCmp('bottomAxis').getStore().setRootNode(record);
		    rec['gridId']= 'bottomAxis';
		   break;
	   case 'right':
		    if(record.propertyText==false){
		    }else{
		    	if(record.children[1].propertyValue.length>0){
				    record.children[1].propertyValue=record.children[1].propertyValue.split(',');//将字符串转换成数组
				}
		    	Ext.getCmp('fieldsetRight').expand( );
		    }
		     Ext.getCmp('rightAxis').getStore().setRootNode(record);//将字符串转换成数组
		    rec['gridId']= 'rightAxis';
		   break;
	   case 'top':
		  
		    if(record.propertyText==false){
		    }else{
		    	if(record.children[1].propertyValue.length>0){
				    record.children[1].propertyValue=record.children[1].propertyValue.split(',');//将字符串转换成数组
				}
		    	Ext.getCmp('fieldsetTop').expand( );
		    }
		      Ext.getCmp('topAxis').getStore().setRootNode(record);
		    rec['gridId']= 'topAxis';
	   break;
	  }
	},
	/**
	 * 删除序列
	 */
	delChartSeries:function(){
		var me = this;
		var chartSeriesCount = Ext.getCmp('chartSeriesFieldSetId').items.items.length;
		if (chartSeriesCount > 0) {
			var tempDelNum=0;
			for (var i = chartSeriesCount - 1; i >= 0; i--) {
				var field = Ext.getCmp('chartSeriesFieldSetId').items.items[i];
				if (field.checkboxCmp.getValue()) {
					tempDelNum++;
				}
			}
			if(tempDelNum<1){
				Ext.MessageBox.alert('提示', '目前您没有勾选没有序列，不能删除');
				return ;
			}
			Ext.MessageBox.confirm('提示', '确实删除 已选勾选的序列吗?',
					function(_btn) {
						if (_btn == 'no'||_btn=='cancel') {
							return;
						} else {

							for (var i = chartSeriesCount - 1; i >= 0; i--) {
								var field = Ext.getCmp('chartSeriesFieldSetId').items.items[i];
								if (field.checkboxCmp.getValue()) {
									var delSeriesId = field.down('charttreecontrol')
											.getStore().tree.root.data.propertyValue;// 删除的序列编号
									if (delSeriesId != '') {
										if (me.delChartSeriesIds == null
												|| this.delChartSeriesIds == 'undefined') {
											me.delChartSeriesIds = '';
										}
										if (me.delChartSeriesIds == '') {
											me.delChartSeriesIds = delSeriesId;

										} else {
											me.delChartSeriesIds += ','
													+ delSeriesId;
										}
									}
									
									//删除时刷新预览
									//console.log(field.down('treepanel').id);
									me.deleteChartSeriesModel(field.down('treepanel').id);
									
									Ext.getCmp('chartSeriesFieldSetId').remove(
											field, true);
									
		
								}
							}

						}
					});
		}else{
		 Ext.MessageBox.alert('提示', '目前没有序列，不能删除');
		}
		
	},
		/**
	 * 添加按钮从后台添加序列
	 */
	addChartSeriesButton : function() {
		var me=this;
		Ext.Ajax.request({//序列动态添加多个
				url : "/hummer/application/controller/chart/ReturnNewChartSeriesTree.action",
				method : 'POST',
				success : function(response, opts) {
					
					var records = Ext.decode(response.responseText);
					 me.addChartSeries(records[0], 'addAuto');
					Ext.getCmp('chartSeriesFieldSetId').doLayout( );
					// 更新chartSeriesStore
					//console.log(records);
					me.loadStoreFromRecords(records, Ext.getStore("chart.ChartSeries"), 'HummerApp.model.chart.ChartSeries');
//					me.previewChartOnLoad();
				}
			});
	
	},
	/**
	 * 序列添加
	 * @param {} dataTree 序列数据
	 * @param {} opt 添加表示，当为addAuto是从后台读取数据
	 */
	addChartSeries : function(record, opt) {
	 
		var rootData = Ext.clone(record);
		var serialNumber = 0;
		var chartSeriesCount = Ext.getCmp('chartSeriesFieldSetId').items.items.length;
		if (chartSeriesCount > 0) {
			var tempId = Ext.getCmp('chartSeriesFieldSetId').items.items[chartSeriesCount
					- 1].down('charttreecontrol').id;

			serialNumber = Number(tempId.replace('chartSeries_', ''));
			serialNumber++;
		}

		var chartTreeControlNum = Ext.getCmp('chartSeriesFieldSetId').items
				.getCount();

		var chartTreeControlPanel;
		record['gridId']='chartSeries_' + serialNumber;
		if (opt == 'addAuto') {// 从数据库中获得
			//var rootData= Ext.decode(dataTree);
			if(rootData.children[2].propertyValue.length>0){
				var fieldTemp=rootData.children[2].propertyValue.split(',');
			 	rootData.children[2].propertyValue=rootData.children[2].propertyValue.split(',');
			}
			if(rootData.children[3].propertyValue.length>0){
			 	rootData.children[3].propertyValue=rootData.children[3].propertyValue.split(',');
			}
			
			
			chartTreeControlPanel = Ext.create(
					'HummerApp.view.design.chart.ChartTreeControl', {
						padding : '2 0 0 0',
						height : 197,
						maxHeight : 197,
						minHeight : 197,
						id : 'chartSeries_' + serialNumber,
						store : Ext.create(
								'HummerApp.store.chart.ChartSeriesProperty', {
									root : rootData
								}),
						plugins : [Ext.create(
								'HummerApp.view.design.chart.ChartCellEditing',
								{
									clicksToEdit : 1
								})]
								,
						listeners : {
							"itemclick":function(){
					 				var panelStore = this.store;
					 				var v = (panelStore.getModifiedRecords().length>0 || panelStore.getRemovedRecords().length>0);
									if(hasChanged != v)
									{
										hasChanged = v;
									}
									changeTitle('Chart',v);
							}
						}						
//						initComponent : function() {
//							this.storeChange = function(){
//						 		var v = (panelStore.getModifiedRecords().length>0 || panelStore.getRemovedRecords().length>0);
//								if(hasChanged != v)
//								{
//									hasChanged = v;
//								}
//								changeTitle('Chart',v);
//						 	};
//						    this.callParent(arguments);
//						    var panelStore = this.store;
//						    console.log(panelStore);
//						 	panelStore.on({
//						 		update:this.storeChange
//						    }); 
//						}
					});
		} else {
			chartTreeControlPanel = Ext.create(
					'HummerApp.view.design.chart.ChartTreeControl', {
						padding : '2 0 0 0',
						height : 197,
						maxHeight : 197,
						minHeight : 197,
						id : 'chartSeries_' + serialNumber,
						store : Ext.create(
								'HummerApp.store.chart.ChartSeriesProperty', {
									proxy : {
										type : 'ajax',
										url : 'app/rdc/app/store/chart/ChartSeriesProperty.json'

									}

								}),
						plugins : [Ext.create(
								'HummerApp.view.design.chart.ChartCellEditing',
								{
									clicksToEdit : 1
								})]
					});
		}

		var fieldsetPanel = Ext.create('Ext.form.FieldSet', {
					alias : 'widget.fieldset',
					padding : chartTreeControlNum == 0 ? '5 0 0 0' : '4 0 0 0',
					border : '1 0 0 0',
					margins : chartTreeControlNum == 0
							? '0 -2 0 -1'
							: '-3 -2 0 -1',
					title : '序列' + (chartTreeControlNum + 1),
					defaultType : 'textfield',
					listeners : {
						beforecollapse : function(f, eOpts) {
							return false;
						}
					},
					checkboxToggle : true,
					collapsed : false,
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					},
					items : [chartTreeControlPanel]
				});
		Ext.getCmp('chartSeriesFieldSetId').add(fieldsetPanel);

	},
	/**
	 * 弹出序列内容更改框
	 * 
	 * @param {}buttonThis
	 * @param {}e
	 * @param {}eOpts
	 */
	saveChartSeriesWin : function(buttonThis, e, eOpts) {
		var treeId = buttonThis.id.substring(5, buttonThis.id.length);// 树id，次编号与保存按钮类似多tree_前缀
		var records = Ext.getCmp(treeId).getSelectionModel().getSelection();// 获得选中内容
		var win = Ext.getCmp('editChartSeriesWinId');
		if (records.length > 0) {
			records[0].set('propertyValue', win.down('textareafield')
							.getValue());
		}
		win.close();
	},
	/**
	 * 弹出序列内容更改框
	 * 
	 * @param {}value
	 *            要编辑的内容
	 * @param {}treeId
	 *            被编辑树的id
	 */
	editChartSeries : function(value, treeId, eOpts) {
		if (eOpts != null) {
			return;
		}
		var records = Ext.getCmp(treeId).getSelectionModel().getSelection();
		if (records.length > 0) {
			var win = Ext.create('widget.window', {
						layout : 'fit',
						width : 727,
						height : 436,
						alias : 'widget.editFieldChartSeries',
						id : 'editChartSeriesWinId',
						resizable : false,
						modal : true,
						items : [{
							xtype : 'form',
							bodyPadding : '5',
							frame : true,
							fieldDefaults : {
								msgTarget : 'side',
								labelWidth : 75,
								labelAlign : 'right',
								defaultType : 'textfield'
							},
							defaults : {
								anchor : '100%'
							},
							items : [{

										xtype : 'textedit'
									}],
							buttons : [{
										text : '确定',
										scope : this,
										id : 'tree_' + treeId,
										action : 'save',
										iconCls : 'icon-submmit',
										handler : this.saveChartSeriesWin
									}, {
										text : '取消',
										action : 'cancel',
										iconCls : 'icon-remove',
										handler : function() {
											Ext.getCmp('editChartSeriesWinId')
													.close();
										}
									}]
						}]
					});
			if (win.down('panel').down('panel').down('panel').title != null
					&& win.down('panel').down('panel').down('panel').title.length > 0) {
				win.down('panel').down('panel').down('panel')
						.setTitle('SQL变量值编辑框');
			}
			win.down('textareafield').setValue(records[0].get('propertyValue'));

			var catetoryStore = Ext.getCmp('catetoryGrid').getStore();

			catetoryStore.clearFilter();

			win.down("textareafield").maxLength = 1000;
			win.show();

		}

	},
	/**
	 * 初始化轴、序列数据
	 * @param {} queryId
	 */
	getChartAxisSeries: function(queryId){
			var me = this;
			Ext.getCmp('chartSeriesFieldSetId').removeAll(true);//删除所有控件
			this.delChartSeriesIds='';
			
			Ext.Ajax.request({//轴动态添加多个
				url : "/hummer/application/controller/chart/FindChartAxisTree.action",
				method : 'POST',
				params : {
					queryId : queryId
					// queryId
				},
				success : function(response, opts) {
					var records = Ext.decode(response.responseText);
					for(var i=0;i<records.length;i++){
						me.updateChartAxis( records[i]);
					}
					me.loadAxisStoreFromTreeRecords(records);
				}
			});
			Ext.Ajax.request({//序列动态添加多个
				url : "/hummer/application/controller/chart/FindChartSeriesTree.action",
				method : 'POST',
				params : {
					queryId : queryId
					// queryId
				},
				success : function(response, opts) {
					var records = Ext.decode(response.responseText);
				
					for(var i=0;i<records.length;i++){
					 	me.addChartSeries(records[i], 'addAuto');
					}
					Ext.getCmp('chartSeriesFieldSetId').doLayout( );
					me.loadSeriesStoreFromTreeRecords(records);
				}
			});
			Ext.getStore("chart.ChartStyle").commitChanges( );
	},
	getChartBasic : function(queryId) {
		var me = this;
		var chartBasicStore = Ext.getStore('chart.ChartBasicProperty');
		if (chartBasicStore == '' || chartBasicStore == undefined) {
			return;
		}
		chartBasicStore.load({
					params : {
						queryId : queryId
					},
					// 加载图表样式到常规Store中
					callback:function(records){
						
						me.loadChartSyleStoreFromTreeRecords(records);
//						Ext.getCmp('chartStyle').getStore().setRootNode(records);
					}
				});
	},
/**
 * 保存轴时，获得轴一行数据
 * @param {}
 *            leftAxis 轴
 * @param {}
 *            fieldsetLeft 轴状态 是否勾选
 * @param {}
 *            position 轴位置
 * @param {}
 *            axistype 轴类型 Numeric、Category
 * @return {}
 */
	getAxisRowData : function(leftAxis, fieldsetLeft, position, axistype) {
		// start轴保存
		var storeLeft = Ext.getCmp(leftAxis).getStore();
		var tempValue = "";
		var nodes = storeLeft.tree.root.childNodes;
		
		var axisColArray = new Array();
		var checkLeft = Ext.getCmp(fieldsetLeft).checkboxCmp.getValue();
		if (checkLeft == false&&storeLeft.tree.root.data.propertyValue=='') {
			return axisColArray;
		}
		
		axisColArray.push(storeLeft.tree.root.data.propertyValue);// id
		axisColArray.push(checkLeft);// 是否选中
		axisColArray.push(position);// 位置

		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].childNodes.length > 0) {
				
				if (nodes[i].data.propertyName == "标签") {// 标签
					tempValue = "{font:'"
							+ nodes[i].childNodes[1].data.propertyValue + "px "
							+ nodes[i].childNodes[0].data.propertyValue + "'";
					tempValue += ",color:'"
							+ nodes[i].childNodes[2].data.propertyValue + "'";
					tempValue += ",rotate: {degrees:"
							+ nodes[i].childNodes[3].data.propertyValue + "}}";
				} else {
					if (nodes[i].data.propertyValue == "false") {
						tempValue = "";
					} else {
						tempValue = "{" + nodes[i].data.propertyValue + ":";
						tempValue += "{stroke:'"
								+ nodes[i].childNodes[0].data.propertyValue
								+ "'";
						tempValue += ",opacity:"
								+ nodes[i].childNodes[1].data.propertyValue;
							   
						if(nodes[i].data.propertyValue=='odd'){
							tempValue += ",fill:'" 
											+ nodes[i].childNodes[0].data.propertyValue+"'";
						}
								
								
								tempValue+= "}}";
					}
				}

			} else {
				tempValue = nodes[i].data.propertyValue;
			}
			if (tempValue instanceof Array) {
				tempValue = tempValue.join(',');
			}
			if(tempValue==null){
				axisColArray.push("");
			}else{
				axisColArray.push(tempValue);
			}
			
		}
		axisColArray.push(axistype);// 轴类型
		return axisColArray;// 轴1一行数据
	},
	/**
	 * 保存序列时，获得序列一行数据
	 * @param {} leftSeries
	 * @return {}
	 */
	getSeriesRowData : function(leftSeries) {
		var seriesColArray = new Array();
		
		var seriesCol = Ext.getCmp(leftSeries).getStore();
		var tempValue = "";
		var nodes = seriesCol.tree.root.childNodes;
		if(seriesCol.tree.root.data.propertyValue!=''&&seriesCol.tree.root.data.propertyValue!=''){
		  seriesColArray.push(seriesCol.tree.root.data.propertyValue);// id
		}else{
			seriesColArray.push("");// id
		}
		
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].childNodes.length > 0) {

				if (nodes[i].data.propertyName == "标签") {// 标签
					if (nodes[i].data.propertyValue == true) {
						tempValue = "{font:'"
								+ nodes[i].childNodes[1].data.propertyValue
								+ "px "
								+ nodes[i].childNodes[0].data.propertyValue
								+ "'";
						tempValue += ",color:'"
								+ nodes[i].childNodes[2].data.propertyValue
								+ "'";
//						tempValue += ",rotate: {degrees:"
//								+ nodes[i].childNodes[3].data.propertyValue
//								+ "}";
						tempValue += ",rotate: {degrees:0},display: '"+nodes[i].childNodes[3].data.propertyValue+"',contrast:true";//序列必须值

						if (typeof(nodes[i - 2].data.propertyValue) == 'object') {
							tempValue += ",field:['"
									+ nodes[i - 2].data.propertyValue
											.join('\',\'') + "']";
							tempValue += ",renderer: Ext.util.Format.numberRenderer()}";
						} else {
							tempValue += "}";
						}
					} else {
						tempValue = "";
					}
				}

			} else {
				tempValue = nodes[i].data.propertyValue;
			}
			if (tempValue instanceof Array) {
				tempValue = tempValue.join(',');
			}
			if(tempValue==null){
				seriesColArray.push('');
			}else{
				seriesColArray.push(tempValue);
			}
			
		}
		seriesColArray.push(nodes[3].data.propertyText);// y轴显示名称，对应数据库sourcename
		return seriesColArray;// 序列1一行数据
	},
	changeSouthPanelResize:function(panelThis,width,height){
		Ext.getCmp('chartStyle').setHeight(height-248+197);
	},
	chartAfterrender:function(){
		var storeChartAxes=Ext.getStore('chart.ChartAxes') ;
		var storeChartSeries=Ext.getStore('chart.ChartSeries') ;
		var storeChartStyle=Ext.getStore('chart.ChartStyle') ;
		storeChartAxes.on({
			update:this.storeAxesSeriesStyleChange,
			add:this.storeAxesSeriesStyleChange,
			remove:this.storeAxesSeriesStyleChange
		});
		storeChartSeries.on({
			update:this.storeAxesSeriesStyleChange,
			add:this.storeAxesSeriesStyleChange,
			remove:this.storeAxesSeriesStyleChange
		});
		storeChartStyle.on({
			update:this.storeAxesSeriesStyleChange,
			add:this.storeAxesSeriesStyleChange,
			remove:this.storeAxesSeriesStyleChange
		});
	},
	comboboxSortChange:function(meThis,newValue,oldValue,eOpts){

		if (newValue != '') {
			var tempControl = meThis.up('charttreecontrol');

			if (tempControl.getStore().getNodeById('axistype').data.propertyValue == 'Category') {
				var nodeLeft = Ext.getCmp('leftAxis').getStore()
						.getNodeById('sort');
				var nodeBottom = Ext.getCmp('bottomAxis').getStore()
						.getNodeById('sort');
				var nodeRight = Ext.getCmp('rightAxis').getStore()
						.getNodeById('sort');
				var nodeTop = Ext.getCmp('topAxis').getStore()
						.getNodeById('sort');
				if (nodeLeft.data.propertyValue == ''
						&& nodeBottom.data.propertyValue == ''
						&& nodeRight.data.propertyValue == ''
						&& nodeTop.data.propertyValue == '') {

				} else {
					if (oldValue == 'undefined' || oldValue == '') {
						Ext.MessageBox.alert('提示信息', '只有一个轴可以排序!');
						meThis.setValue('');
					}
				}

			} else {
				Ext.MessageBox.alert('提示信息', '只有类型为分组的轴才可以排序!');
				meThis.setValue('');
			}
		}	
	},comboboxAxisTypeSelect:function(meThis,records,eOpts){
		if(records!=null&&records.length>0){
			var tempControl = meThis.up('charttreecontrol');
			var tempStore = tempControl.getStore();
			if(records[0].get('selValue')=='Category'){
				tempStore.getNodeById('minimum').set('displayState',2);
				tempStore.getNodeById('maximum').set('displayState',2);
				tempStore.getNodeById('sort').set('displayState',1);
				tempStore.getNodeById('sort').set('propertyValue','');
				
			}else if(records[0].get('selValue')=='Numeric'){
				tempStore.getNodeById('minimum').set('displayState',1);
				tempStore.getNodeById('maximum').set('displayState',1);
				tempStore.getNodeById('sort').set('displayState',2);
			}
	
		}

	},comboboxChartSelect:function(meThis,records,eOpts){
		if(records!=null&&records.length>0){
			var tempControl = meThis.up('charttreecontrol');
			var tempStore = tempControl.getStore();
			switch(records[0].get('type').toLowerCase()){
				case 'column':
				tempStore.getNodeById('stacked').set('displayState',1);
				tempStore.getNodeById('fill').set('displayState',2);
				break;
				case 'line':
				tempStore.getNodeById('stacked').set('displayState',2);
				tempStore.getNodeById('fill').set('displayState',1);
				break;
				case 'pie':
				tempStore.getNodeById('stacked').set('displayState',2);
				tempStore.getNodeById('fill').set('displayState',2);
				break;
			}
		}
	},
	comboboxGridSelect:function(meThis,records,eOpts){
		if (records != null && records.length > 0) {
			var tempControl = meThis.up('charttreecontrol');
			var tempStore = tempControl.getStore();
			switch (records[0].get('selValue').toLowerCase()) {
				case 'even' :
					tempStore.getNodeById('grid_display').set('iconCls','icon-property');
					tempStore.getNodeById('grid_color').set('displayState', 2);
					break;
				default :
					tempStore.getNodeById('grid_display').set('iconCls','menu-folder-close');
					tempStore.getNodeById('grid_color').set('displayState', 1);
					break;
			}
		}
	}
});