var funnel = {
	 title : {
        text: '北京市AQI(空气质量)天数',        
        x:'center',
        textStyle:{
        	fontSize:8,
        	color:'#777'
        }
    },
	tooltip: {
		show: true
	},
	legend: {
		data: ['比例']
	},
	
	calculable: true,
	legend: {
		orient: 'horizontal',
		x: 'center',
		y:'bottom',
		data: ['AQI<100', '100<AQI<200','AQI>200']
	},
	series: [{
		"name": "aqi",
		"type": "pie",
		radius: ['50%', '70%'],
		itemStyle: {
			normal: {
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			},
			emphasis: {
				label: {
					show: true,
					position: 'center',
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			}
		},
		"data": [{
			value: 186,
			name: 'AQI<100'
		}, {
			value: 132,
			name: '100<AQI<200'
		}, {
			value: 44,
			name: 'AQI>200'
		}]
	}]
};

var bar = {
	
	tooltip: {
		show: true,
		formatter:"AQI {c}<br/>{b}月平均值"
	},
	
	xAxis: [{
		type: 'category',
		data: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
		name:'月（时间）'
	}],
	grid:{
		x:'50',
		y:'20',
		x2:'62',
		y2:'25'
	},
	yAxis: [{
		type: 'value',
		name:'空气质量（AQI）'
	}],
	series: [{
		"name": "AQI",
		"type": "bar",
		'itemStyle': {                                
			normal: {                                    
				// color: 'tomato',
				color:function  (params) {					
				   var colorList = [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                       '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                       '#D7504B', '#C6E579'];
                   if (colorList[params.dataIndex]) {
                   	return colorList[params.dataIndex];
                   }
                   else
                   	{return 'tomato' ;}
				},
				barBorderColor: 'tomato',
				barBorderWidth: 1,
				barBorderRadius: 5			                                
			}                            
		},
		"data": aqiPerMonthBJ
	}]
};
var pie =  {
    title : {
        text: '北京市AQI(空气质量)天数',        
        x:'center',
        textStyle:{
        	fontSize:8,
        	color:'#777'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },    
    calculable : true,
    series : [
        {
            name:'AQI比例',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: [
            {name: 'AQI<100',value: 186},
            {name: '100<AQI<200',value: 132},
            {name: 'AQI>200',value: 44}
            ]
        }
    ]
};

var line = {
	
	tooltip: {
		show: true,
		formatter:"AQI {c}<br/>{b}月平均值"
	},
	
	xAxis: [{
		type: 'category',
		data: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
		name:'月（时间）'
	}],
	yAxis: [{
		type: 'value',
		name:'空气质量（AQI）'
	}],
	grid:{
		x:'50',
		y:'20',
		x2:'62',
		y2:'25'
	},
	series: [{
		"name": "AQI",
		"type": "line",
		"smooth":true,
		"data": aqiPerMonthBJ
	}]
};

var gaugedemo = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },    
    series : [
        {
            name:'AQI指标',
            type:'gauge',
            splitNumber: 8,       // 分割段数，默认为5
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
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            detail : {
                formatter:'{value}%',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontWeight: 'bolder'
                }
            },
            data:[{value: 50, name: '空气质量级别'}]
        }
    ]
};

