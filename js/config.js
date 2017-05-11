/*!
	config  配置文件
*/

require.config({
	baseUrl: '',
	paths: {
		"jquery": "js/lib/jquery_1.11.3.min",
		"jquery4": "js/lib/jquery-1.4.2.min",
		"highcharts": "js/plug/highcharts",
		"cookie":"js/plug/jquery.cookie",
		"handle": 'js/js/handle',
		"fen-handle": 'js/js/fen-handle',
		"fangdajing": 'js/js/fangdajing',
		"goods": 'js/js/goods',
		"nav": 'js/js/nav',
		"fen-nav": 'js/js/fen-nav',
		"keywords":'js/js/keywords',
		"banner":'js/js/banner',
		"timecount":'js/js/timecount'

	},
	//处理非AMD规范
	shim: {
		"highcharts": ['jquery'],
		"cookie": ['jquery'],
		"jqzoom": ['jquery']
	}
});