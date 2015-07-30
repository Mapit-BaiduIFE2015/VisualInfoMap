
window.onload = function  () {
    getData();
    getAQIDataFromNet();
    getLocation();
    draw();   
}

var EC_READY = false;
var DATA_READY = false;
var myChart0;
var myChart1;
var myChart2;
var myChart3;
var myChart4;
var detailChart;
var result;
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
                 result = loadData("shanghai","month","peak");
                 result = loadData("shanghai","week","peak");
                 result = loadData("shanghai","quarter","peak");               
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
                myChart3.setOption(line);
                myChart4.hideLoading();
                myChart4.setOption(bar);
                }

            var ecConfig = require('echarts/config');
            myChart3.on(ecConfig.EVENT.HOVER, eConsole);
            myChart3.on(ecConfig.EVENT.MOUSEOUT, eConsole);
            myChart4.on(ecConfig.EVENT.HOVER, eConsole);
            myChart4.on(ecConfig.EVENT.MOUSEOUT, eConsole);
                
            }
        );
}


function eConsole(param) {
    var keyvalue = param.value;
    var str;
    console.log(keyvalue);
    var degs = ['优','良','轻度污染','中度污染','重度污染','严重污染'];
    var deg = keyvalue;
    if (deg < 50) {
        str = '优';
    }
    if (deg < 100&&deg>50) {
        str = '良';
    }
    if (deg < 150&&deg>100) {
        str = '轻度污染';
    }
    if (deg < 200&&deg>150) {
        str = '中度污染';
    }
    if (deg < 300&&deg>200) {
        str = '重度污染';
    }
    if (deg < 400&&deg > 300) {
        str = '严重污染';
    }

    var gauge = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    }, 
    grid:{
        x:'-10',
        y:'-10',
        x2:'-10',
        y2:'-10'
    },   
    series : [
        {
            name:'AQI指标',
            type:'gauge',
            splitNumber: 4,       // 分割段数，默认为5
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[1/8, '#68CB00'],[2/8, '#F6E200'],[3/8, '#FB890F'],
                    [4/8, '#DF2D00'],[5/8, '#B414BB'],[6/8, '#B414BB'],[7/8, '#6F0474'],
                    [8/8, '#6F0474']], 
                    width: 8
                }
            },
            min:0,
            max:400,
            axisTick: {            // 坐标轴小标记
                splitNumber: 5,   // 每份split细分多少段
                length :12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                length :30,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer : {
                width : 5
            },
            title : {
                show : true,
                offsetCenter: [0, '-30%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            detail : {
                formatter:'{value}',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontWeight: 'bolder'
                }
            },
            data:[{value: keyvalue, name: str  }]
        }
    ]
};
   
    if (param.type == 'hover') {
         document.getElementById('console').style.visibility = "visible";
         detailChart.setOption(gauge);

    }
     if (param.type == 'mouseout') {
       detailChart.clear();
       document.getElementById('console').style.visibility = "hidden";
    }
    
    console.log(param);
}



