/*
这里是tasktwo的文件
*/

window.onload = function(){
    initalStatus();
    changeLayout();
    getData();  //获取数据
    draw();     //初始化绘图
}

// 任务二的图框
var myChart1;
var myChart2;
var myChart3;

// 初始化选项
var chart1opts;
var chart2opts;
var chart3opts;

//颜色是否随机

var randomColor = false;


require.config({
            paths: {
                // echarts: 'http://echarts.baidu.com/build/dist'
                echarts:'./js'
            }
        });

function draw () {
	require(
		[
			'echarts',
            'echarts/chart/pie', 
            'echarts/chart/bar',
            'echarts/chart/map',
            'echarts/chart/line',
            'echarts/chart/gauge'
		],
		function(ec){
			myChart1 = ec.init(document.getElementById('first-graph')).showLoading({effect:'bubble'}); 
			myChart2 = ec.init(document.getElementById('second-graph')).showLoading({effect:'bubble'}); 
			myChart3 = ec.init(document.getElementById('third-graph')).showLoading({effect:'bubble'}); 

			 chart1opts = bar0("beijing","week","peak");
			 chart2opts = line0("shanghai","month","average");
			 chart3opts = bar0("guangzhou","quarter","days");

			setTimeout(drawDelay,500);

			function drawDelay(){                
                myChart1.hideLoading();                
                myChart1.setOption(chart1opts);
                myChart2.hideLoading();
                myChart2.setOption(chart2opts);
                myChart3.hideLoading();
                myChart3.setOption(chart3opts);                
            }
	});
}