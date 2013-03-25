/**
 *查询设计工具 程序入口
 * 
 */


Ext.application({
    name: 'HummerApp',
    appFolder: 'app',
    
    //autoCreateViewport: true,
    
    controllers: [
        'Main',
        'Design',
        'Field',
        'Option',
        'Button',
        'Alarm',
        'Link',
		'Condition',
		'Chart',
		'Mashup'
        
    ],
    launch: function() {
        Ext.create('HummerApp.view.Viewport',{ });
    }
 });    


