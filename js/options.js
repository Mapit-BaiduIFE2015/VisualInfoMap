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

function gauge0(keyvalue,str)  {
	var deg = keyvalue;
	var str;
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
}
return gauge;
}

var ylabel = {'peak':'AQI峰值','average':'AQI平均值','days':'AQI<100的天数'};
var xlabel = {"week":"周","month":"月","quarter":"季度"};
var ticks = [1,10,20,30,40,50];

function line0(cityname,timespan,yaxis){
	var result = loadData(cityname,timespan,yaxis);
	var tag = xlabel[timespan];
	var thisline = {
		tooltip: {
		trigger:"axis",
		show: true,
		formatter:function (params,ticket,callback) {

			return setTooltips(params,yaxis,timespan);
		}
	},
	title:{
		x:20,
		y:0,
		show:true,
		text:ylabel[yaxis],
		textStyle:{
			fontSize:14,
			color:"#888888",
			fontWeight:"lighter"
		}
	},
	xAxis: [{
		type: 'category',
		data: result.rCategory,
		name: xlabel[timespan],
		splitLine:{
		show:true,
		lineStyle:{
			color: "rgba(196,196,196,0.5)",
			type:  "dashed"
		}
	},
	axisLabel:{
		interval:function(index,dataIndex){
			return setLabelInterval(timespan,index);}
	},
	axisLine:{
		show:true
	},
	axisTick:{
		show:false
	}
	}],
	grid:{
		x:'50',
		y:'20',
		x2:'62',
		y2:'25'
	},
	yAxis: [{
		type: 'value',
		name: ylabel[yaxis],
		splitLine:{
		show:true,
		lineStyle:{
			color: "rgba(196,196,196,0.5)",
			type:  "dashed"
		}
	},
	axisLine:{
		show:false
	}
	}],
	series: [{
		"name": "AQI",
		"type": "line",
		"smooth":true,
		"symbol":'none',
		// "symbol":"droplet",
		// "symbolSize":[2,1],
		'itemStyle': {                                
			normal: {                                    
				// color: 'tomato',
				color: function(params){
					return setColors(cityname);
				},
				lineStyle:{
					shadowBlur:5
				}	                                
			}                            
		},
		"data": result.rData
	}]
	};
	return thisline;
}

function bar0(cityname,timespan,yaxis) {
	var result = loadData(cityname,timespan,yaxis);
	console.log(result);
	var tag = xlabel[timespan];
	console.log(tag);
	var thisbar = {
		tooltip: {
		show: true,
		formatter:function  (params,ticket,callback) {

		return setTooltips(params,yaxis,timespan);
		}
	},
	title:{
		x:20,
		y:0,
		show:true,
		text:ylabel[yaxis],
		textStyle:{
			fontSize:14,
			color:"#888888",
			fontWeight:"lighter"
		}
	},
	xAxis: [{
		type: 'category',
		data: result.rCategory,
		name: xlabel[timespan],
		min:0,
		axisTick:{
			show:false
		},
		axisLabel:{
			interval: function(index,dataIndex){
				return setLabelInterval(timespan,index);
			}
		},
	splitLine:{
		show:true,
		lineStyle:{
			color: "rgba(196,196,196,0.5)",
			type:  "dashed"
		}
	},
	axisLine:{
		show:true
	}
	}],
	grid:{
		x:'50',
		y:'20',
		x2:'62',
		y2:'25'
	},
	yAxis: [{
		type: 'value',
		name: ylabel[yaxis],
		splitLine:{
		show:true,
		lineStyle:{
			color: "rgba(196,196,196,0.5)",
			type:  "dashed"
		}
	},
	axisLine:{
		show:false
	}
	}],
	series: [{
		"name": "AQI",
		"type": "bar",
		'itemStyle': {                                
			normal: {                                    
				// color: 'tomato',
				color: function(params){
					return setColors(cityname);
				},
				barBorderRadius: 5			                                
			}                            
		},
		"data": result.rData
	}]
	};
	console.log(thisbar);
	return thisbar;
}

// set tooltips

function setTooltips(params,yaxis,timespan){

	/*
	因为可能存在多组数据的原因，所以当tooltip的trigger为axis时,
	params为一个数组，因此本例中需要做出判断，并显示第一个。
	*/
	if(typeof(params[0]) == 'object')
	{
		params = params[0];
	}

	if(yaxis == 'average'){
			if (timespan === 'week') {
				return "AQI  "+params.value+"<br/>"+params.name+"周平均值";
			}
			if (timespan === 'month') {
				return "AQI  "+params.value+"<br/>"+params.name+"月平均值";
			}
			if (timespan === 'quarter') {
				return "AQI  "+params.value+"<br/>"+params.name+"季平均值";
			}
		}
			if(yaxis == 'days'){
				if (timespan === 'week') {
				return params.name+"  周<br/>AQI<100的天数为: "+params.value;
			}
			if (timespan === 'month') {
				return params.name+"  月<br/>AQI<100的天数为: "+params.value;
			}
			if (timespan === 'quarter') {
				return params.name+"  季<br/>AQI<100的天数为: "+params.value;
			}
			}

			if(yaxis == 'peak'){
			if (timespan === 'week') {
				return "AQI  "+params.value+"<br/>"+params.name+"周最大值";
			}
			if (timespan === 'month') {
				return "AQI  "+params.value+"<br/>"+params.name+"月最大值";
			}
			if (timespan === 'quarter') {
				return "AQI  "+params.value+"<br/>"+params.name+"季最大值";
			}
		}

}



/**
 * set color by cityname
 * @param {[type]} cityname [description]
 */
function setColors(cityname){
    if(!randomColor){
        var colors = { "beijing":"rgba(108,189,137,0.8)",
                    "shanghai": "rgba(241,145,72,0.8)",
                    "guangzhou":"rgba(249,25,76,0.8)"};
        return colors[cityname];
    }
}



/**
 * set color by yaxis
 * @param {[type]} yaxis [description]
 */
function setColor(yaxis) {

	if(!randomColor){
		var colors = { "peak":"rgba(240,145,73,0.8)",
					"average": "rgba(249,25,76,0.8)",
					"days":"rgba(107,189,138,0.8)"};
		return colors[yaxis];
	}
	else{
	var rand = Math.floor(Math.random()*0xFFFFFF).toString(16);
	console.log(rand);
	if (rand.length == 6) {
		return '#' + rand;
	}
	else {
		return setColor(yaxis);
	}

	}
}

function setLabelInterval(timespan,index){
		if(timespan == "week"){
				if (ticks.indexOf(index+1) != -1 ) {
					return true;
				}
				else
					return false;
			}
			return true;
	}
