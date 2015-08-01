
window.onload = function  () {
    getData();
    getAQIDataFromNet();
    getLocation();
    draw();   
}

var EC_READY = false;
var DATA_READY = false;

//任务一的图框
var myChart0;
var myChart1;
var myChart2;
var myChart3;
var myChart4;

var randomColor = false;



// 详细信息的gauge图，作为补充，可视化方式有待考虑
var detailChart;

require.config({
            paths: {
                // echarts: 'http://echarts.baidu.com/build/dist'
                echarts:'./js'
            }
        });

function draw ( ) {	
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/pie', 
                'echarts/chart/bar',
                'echarts/chart/map',
                'echarts/chart/line',
                'echarts/chart/gauge'
                            ],
            function (ec) {

                
                // 基于准备好的dom，初始化echarts图表
                 myChart0 = ec.init(document.getElementById('map')).showLoading({effect:'bubble'}); 
                 myChart1 = ec.init(document.getElementById('roll-chart')).showLoading({effect:'bubble'}); 
                 myChart2 = ec.init(document.getElementById('pie-chart')).showLoading({effect:'bubble'}); 
                 myChart3 = ec.init(document.getElementById('line-chart')).showLoading({effect:'bubble'}); 
                 myChart4 = ec.init(document.getElementById('bar-chart')).showLoading({effect:'bubble'});
                 detailChart = ec.init(document.getElementById('console'));
                 // 格式化数据            
                 data.format(localData); 
                var testbar = bar0("guangzhou","month","average");
                var testline = line0("guangzhou","week","days");        
                // 为echarts对象加载数据 
                setTimeout(drawDelay,500);
                function drawDelay(){
                myChart0.hideLoading();
                myChart0.setOption(option0('aqi'));
                myChart1.hideLoading();                
                myChart1.setOption(funnel);
                myChart2.hideLoading();
                myChart2.setOption(pie);
                myChart3.hideLoading();
                myChart3.setOption(testline);
                myChart4.hideLoading();
                myChart4.setOption(testbar);
                }
            
            var ecConfig = require('echarts/config');
            // myChart3.on(ecConfig.EVENT.HOVER, eConsole);
            // myChart3.on(ecConfig.EVENT.MOUSEOUT, eConsole);
            // myChart4.on(ecConfig.EVENT.HOVER, eConsole);
            // myChart4.on(ecConfig.EVENT.MOUSEOUT, eConsole);
                
            }
        );
}


function eConsole(param) {
    var keyvalue = param.value;    
    if (param.type == 'hover') {
         document.getElementById('console').style.visibility = "visible";
         detailChart.setOption(gauge0(keyvalue));

    }
     if (param.type == 'mouseout') {
       detailChart.clear();
       document.getElementById('console').style.visibility = "hidden";
    }
    
    console.log(param);
}



