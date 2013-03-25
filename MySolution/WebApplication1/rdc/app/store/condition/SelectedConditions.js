/**
 * 查询store
 */

Ext.define('HummerApp.store.condition.SelectedConditions', {
    extend: 'Ext.data.Store',
    requires: 'HummerApp.model.SelectedConditions',
    model: 'HummerApp.model.SelectedConditions',
//    data: [
//           {name: '所属月份', columnType:'整数',displayName:'月份',type:'下拉列表',operation:"等于",values:'201001、201002',defaultValue:'#当前月份',visible:'是',required:'是',cascade:''},
//           {name: '所属单位', columnType:'字符型',displayName:'单位',type:'下拉列表',operation:"等于",values:'',defaultValue:'',visible:'是',required:'是',cascade:'月份'},
//           {name: '电压等级', columnType:'字符型',displayName:'电压等级',type:'下拉列表',operation:"等于",values:'',defaultValue:'',visible:'是',required:'是',cascade:''}
//    ],
	autoLoad : false,
	proxy: {
         		type : 'ajax',
         		url : '/hummer/application/controller/condition/FindCondition.action',
         		 reader : {
         			type 			: 'json',
         		//	successProperty	: 'success',
         			root: ''
         		 }
         	}
});

