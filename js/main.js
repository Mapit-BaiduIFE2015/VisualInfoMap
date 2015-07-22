
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


function draw ( ) {
	require.config({
            paths: {
                // echarts: 'http://echarts.baidu.com/build/dist'
                echarts:'./js'
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/pie', 
                'echarts/chart/bar',
                'echarts/chart/map',
                'echarts/chart/line'                              

            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                 myChart0 = ec.init(document.getElementById('map')).showLoading({effect:'bubble'}); 
                 myChart1 = ec.init(document.getElementById('roll-chart')).showLoading({effect:'bubble'}); 
                 myChart2 = ec.init(document.getElementById('pie-chart')).showLoading({effect:'bubble'}); 
                 myChart3 = ec.init(document.getElementById('line-chart')).showLoading({effect:'bubble'}); 
                 myChart4 = ec.init(document.getElementById('bar-chart')).showLoading({effect:'bubble'});
                 // 格式化数据            
                 data.format(localData);                
                // 为echarts对象加载数据 
                setTimeout(drawDelay,1500);
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
                
            }
        );
}

