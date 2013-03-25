Ext.define('HummerApp.view.query.Querytree', {
	extend: 'Ext.tree.Panel',
	alias:'widget.querytree',
	width: 200,
    height: 150,
    store: 'Querytree',
    padding	:'-1 -1 -1 -1',
    useArrows 	: true,
    rootVisible: false
	
});