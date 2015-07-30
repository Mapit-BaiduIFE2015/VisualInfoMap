function  loadData(cityname,timespan,yaxis) {
	
	var odata = {
	aqiData : [],  // aqi平均值
	aqiMax : [],   // aqi峰值
	daysData : [],  // ＜100的天数
	xCategory : []  // 横坐标
	};
	var result = {
		rData : [],
		rCategory : []
	};
	var i;
	var j;
	var length = persheet.length; 
	// 处理时间粒度为周的变量
	var tempaqi = 0;  
	var tempdays = 0;
	var weekcount = 1;
	var tempmax = 0;
	// 处理时间粒度为季度的变量，通过月->季度。
	var aqimonth = [];
	var daysmonth = [];
	var maxmonth = [];
	// 初始化变量
	if (timespan === 'month') {
		for (j = 0; j<12;j++){
			odata.aqiData[j] = 0;
			odata.daysData[j] = 0;
			odata.aqiMax[j] = 0;
		}
	}

	if (timespan === 'quarter') {
		for (j = 0; j<12;j++){
			aqimonth[j] = 0;
			daysmonth[j] = 0;
			maxmonth[j] = 0;
		}
	}	
	//开始数据处理，persheet来自于之前的getData();
	for(i=0;i<length;i++){
		obj = persheet[i];
		var str = obj.日期;
		var aqi = obj[cityNames[cityname]];
		aqi = parseInt(aqi);
		var temp = str.substr(1, 1);
		if (temp != '/') {
			temp = parseInt(str.substr(0, 2));
		} else {
			temp = parseInt(str.substr(0, 1));
		}

		if (timespan === 'week')
		{			
			if (aqi > tempmax) {tempmax = aqi;}; // 获取最大值
			tempaqi += aqi;
			if (aqi < 100) { tempdays++;};			
			if(!((i+1)%7)){    // 一周7天，逢7一周期，注意判断条件，不要忘了括号
				odata.aqiData.push(parseInt(tempaqi/7));
				odata.daysData.push(tempdays);				
				odata.xCategory.push(weekcount);
				odata.aqiMax.push(tempmax);				
				tempaqi = 0;
				tempdays = 0;
				tempmax = 0;
				weekcount++;
			}
		}
		// 月的处理方式与taskone类似，通过temp-1去匹配
		if (timespan === 'month') {
			if (aqi > odata.aqiMax[temp-1] ) {
				odata.aqiMax[temp-1] = aqi;
			}
			odata.aqiData[temp-1] += aqi;
			if (aqi < 100) {
				odata.daysData[temp-1]++;
			};
		}
		// 为避免统计具体的天数，通过月来过渡
		if (timespan === 'quarter') {

			if (aqi > maxmonth[temp - 1]) {
				maxmonth[temp - 1] = aqi;
			}
			aqimonth[temp-1] += aqi;
			if (aqi < 100) {
				daysmonth[temp-1]++;
			};			
		}

	}

	//数据进行归一化处理，并加入横坐标的label。
	if (timespan === 'month') {
		odata.xCategory = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
		for( i =0;i<12;i++){
			odata.aqiData[i] = parseInt(odata.aqiData[i]/daysPerMonth[i]);
		}
	}

	if (timespan === 'quarter') {
		odata.xCategory = ['春','夏','秋','冬'];
		var tempmonth = 0;
		var tempdays = 0;
		var tempmax = 0;
		for( i =0;i<12;i++){
			aqimonth[i] = parseInt(aqimonth[i]/daysPerMonth[i]);
		}

		for(i = 0;i<12;i++){	
			tempmonth += aqimonth[i];
			tempdays += daysmonth[i];
			if (maxmonth[i] > tempmax) { tempmax = maxmonth[i]};
			if (!((i+1)%3)) {
				odata.aqiData.push(parseInt(tempmonth/3));
				odata.daysData.push(parseInt(tempdays));
				odata.aqiMax.push(tempmax);
				tempmonth = 0;
				tempdays = 0;
				tempmax = 0;
			}
		}
	}

    if (yaxis === 'peak') {
    	result.rData = odata.aqiMax;
    	result.rCategory = odata.xCategory;
    };

    if (yaxis === 'average') {
    	result.rData = odata.aqiData;
    	result.rCategory = odata.xCategory;
    };

      if (yaxis === 'days') {
    	result.rData = odata.daysData;
    	result.rCategory = odata.xCategory;
    };
    
    return result;
    // 统一思路，通过setOption来实现不同指标的控制。

}