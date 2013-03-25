/**
 * 报警公式项store
 */

Ext.define('HummerApp.store.alarm.ColorStore', {
    extend: 'Ext.data.Store',
    fields	: ['name', 'icon','value','address'],
 	data	: [{name : '橙色',	value : '#FF8800',	icon : 'circle-orange',	address : "../hummer/images/icon/circle/circle-orange.png"}, 
 			   {name : '黑色',	value : '#212121',	icon : 'circle-black',	address : "../hummer/images/icon/circle/circle-black.png"}, 
 			   {name : '红色',	value : '#CC0000',	icon : 'circle-red',	address : "../hummer/images/icon/circle/circle-red.png"}, 
 			   {name : '黄色',	value : '#A7A400',	icon : 'circle-yellow',	address : "../hummer/images/icon/circle/circle-yellow.png"}, 
 			   {name : '蓝色',	value : '#0099CC',	icon : 'circle-light-blue',	address : "../hummer/images/icon/circle/circle-light-blue.png"}, 
 			   {name : '绿色',	value : '#669900',	icon : 'circle-green',	address : "../hummer/images/icon/circle/circle-green.png"},
 			   {name : '紫红色',	value : '#980034',	icon : 'circle-violet',	address : "../hummer/images/icon/circle/circle-violet.png"}, 
 			   {name : '紫罗兰',	value : '#180438',	icon : 'circle-purple',	address : "../hummer/images/icon/circle/circle-purple.png"}, 
 			   {name : '紫色',	value : '#9933CC',	icon : 'circle-light-purple',	address : "../hummer/images/icon/circle/circle-lightpurple.png"}]
});
