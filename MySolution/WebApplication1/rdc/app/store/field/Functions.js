/**
 * @author csx
 */
Ext.define('HummerApp.store.field.Functions', {
    extend: 'Ext.data.Store',
    
	fields:['value','sourceName'],
    //autoLoad:true,
    data: [
           {sourceName: 'sqrt(x:number):number', value:'Math.sqrt(x)'},
           {sourceName: 'round(x:number):number', value:'Math.round(x)'},
           {sourceName: 'floot(x:number):number', value:'Math.floot(x)'},
           {sourceName: 'ceil(x:number):number', value:'Math.ceil(x)'},
		   {sourceName: 'substr(start:number,length:number):String', value:'String("string to replace").substr(start,length)'},
		   {sourceName: 'substring(start:number,to:number):String', value:'String("string to replace").substring(start,to)'},
		   {sourceName: 'parseFloat(x:string):number', value:'parseFloat(\'x\')'},
		   {sourceName: 'parseInt(x:string):number', value:'parseInt(\'x\')'},
		   {sourceName: 'String(x):String', value:'String(x)'}
    ]

});

