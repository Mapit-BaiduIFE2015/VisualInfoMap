/* Data Processing*/

// Variables
var aqiPerMonthBJ = [];  // Average AQI for every month
var aqiPerMonthSH = [];
var aqiPerMonthGZ = [];
var aqiCatogoryBJ = [];  // Classify the level according to the AQI
var aqiCatogorySH = [];
var aqiCatogoryGZ = [];
var daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var localPm="localPm";
var localData;
var persheet;
var timeSpan = {'week':7,'month':daysPerMonth,'quarter':daysPerMonth};
var cityNames = {'beijing':'北京','shanghai':'上海','guangzhou':'广州'};


// Step 0. Initial Variables 
function initialData() {
	var i;
	for(i = 0; i < 12; i++){
		aqiPerMonthBJ[i] = 0;
		aqiPerMonthSH[i] = 0;
		aqiPerMonthGZ[i] = 0;
	}
	for (i = 0; i < 3; i++){
		aqiCatogorySH[i]=0;
		aqiCatogoryBJ[i]=0;
		aqiCatogoryGZ[i]=0;
	}

}

// Step 1. Get local AQI Data from .xlsx
function getData() {
	initialData();
	var url = "data.xlsx";
	var oReq = new XMLHttpRequest();
	oReq.open("GET",url,true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(e) {
		var arraybuffer = oReq.response;

		/* convert data to binary string */
		var data = new Uint8Array(arraybuffer);
		var arr = new Array();
		for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
		var bstr = arr.join("");

		/* Call XLSX */
		var workbook = XLSX.read(bstr, {
			type: "binary"
		});

		/* DO SOMETHING WITH workbook HERE */		
		var sheet_name_list = workbook.SheetNames;	// Get sheets list	
		var worksheet = workbook.Sheets[sheet_name_list[0]]; // First sheet
		persheet = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to json

		/* Process the json data*/
		for (var i = 0; i < persheet.length; i++) {
			var obj = persheet[i];
			var str = obj.日期;
			var aqibj = obj.北京;
			aqibj = parseInt(aqibj);
			var aqish = obj.上海;
			aqish = parseInt(aqish);
			var aqigz = obj.广州;
			aqigz = parseInt(aqigz);
			str.toString();
			var temp = str.substr(1, 1);
			if (temp != '/') {
				temp = parseInt(str.substr(0, 2));
			} else {
				temp = parseInt(str.substr(0, 1));
			}
			//计算总值			
			aqiPerMonthBJ[temp-1] += aqibj;
			aqiPerMonthSH[temp-1] += aqish;
			aqiPerMonthGZ[temp-1] += aqigz;

			//分类统计--北京
			if (aqibj < 100) {
				aqiCatogoryBJ[0]++;
			} else if (aqibj > 100 && aqibj < 200) {
				aqiCatogoryBJ[1]++;
			} else if (aqibj > 200) {
				aqiCatogoryBJ[2]++;
			};
			//分类统计--上海
			if (aqish < 100) {
				aqiCatogorySH[0]++;
			} else if (aqish > 100 && aqish < 200) {
				aqiCatogorySH[1]++;
			} else if (aqish > 200) {
				aqiCatogorySH[2]++;
			};
			//分类统计--广州
			if (aqigz < 100) {
				aqiCatogoryGZ[0]++;
			} else if (aqigz > 100 && aqigz < 200) {
				aqiCatogoryGZ[1]++;
			} else if (aqigz > 200) {
				aqiCatogoryGZ[2]++;
			};
		}
		for (var m = aqiPerMonthBJ.length - 1; m >= 0; m--) {
			aqiPerMonthBJ[m] /= daysPerMonth[m];
			aqiPerMonthSH[m] /= daysPerMonth[m];
			aqiPerMonthGZ[m] /= daysPerMonth[m];
			aqiPerMonthBJ[m] = aqiPerMonthBJ[m].toFixed(1);
			aqiPerMonthSH[m] = aqiPerMonthSH[m].toFixed(1);
			aqiPerMonthGZ[m] = aqiPerMonthGZ[m].toFixed(1);
		};
		console.log("Ready");
		 
	}
	oReq.send();	
}

// Step 2. Get AQI data from net
function getAQIDataFromNet(){   
    jQuery.support.cors = true;
    var curDate = new Date();
    var curHours = curDate.getHours();
    localData = JSON.parse(localStorage.getItem(localPm)) || [];
    if (localData[0]) {
    	var dataHours = parseInt(localData[0].time_point.substr(11, 2));
    	if(curHours!=dataHours){
    		console.log("数据需要更新,因为"+dataHours + "!=" + curHours);
    		$.ajax({
		type:"GET",
		url:'./all_cities.json',  //考虑访问限制原因，这里只调用测试数据
		dataType:"json",
		crossDomain:true,
		success:netData,
		error:function(data,textStatus,errorThrown){
			getLocalPm();
			console.log("更新失败，调用本地数据，原因是：");
			console.log("您这个小时内的API请求次数用完了，休息一下吧！" + "error"+ " " + JSON.stringify(data)+textStatus+errorThrown);
			
		}
	});
    	}
    	else{
    		console.log("无需更新，调用本地数据");
    		console.log(curHours + "=" + dataHours + "  "+ "不重复请求");
    		getLocalPm ();    		
    	}

    }
    else{
    	console.log("本地无缓存，请求远程数据");
    	$.ajax({
		type:"GET",
		url:'./all_cities.json',
		dataType:"json",
		crossDomain:true,
		success:netData,
		error:function(data,textStatus,errorThrown){
			getLocalPm();
			console.log("请求失败，调用本地存储数据，原因是:");
			console.log("您这个小时内的API请求次数用完了，休息一下吧！" + "error"+ " " + JSON.stringify(data)+textStatus+errorThrown);
		}
	});
    }
    	
	
}

function getLocalPm () {
	localData = JSON.parse(localStorage.getItem(localPm))||[];
	var length = localData.length;
	if (length < 10) {
		console.log("啊哦，本地未存储数据");
		return;
	};
	
}

function netData (data) {
	var localTempData = data;
	window.localStorage.setItem(localPm,JSON.stringify(localTempData));
	localData = JSON.parse(localStorage.getItem(localPm))||[];	
	getLocalPm();

}


/********************************/
/*以下对获取的数据进行格式化处理*/
/********************************/
var cityGeo = {};
var geoX = [];
var geoY = [];
var station_codes = [];
var cityName = {};
var top10AQI = [];

function getLocation () {
	$.ajax({
		url:"./station_code.txt",
		async:false,
		success:geoProcess
	});	
}
function geoProcess(data)
{
	var geoData = data;
	var count =0;
	var j = 0;	
	while(count < 509)
	{
		var weidu = geoData.substr(j,7);		
		geoX.push(weidu);
		j = j + 8;
		var jingdu =geoData.substr(j,7);
		geoY.push(jingdu)
		j = j + 8;
		var temp_code = geoData.substr(j,5);
		station_codes.push(temp_code);
		//j = j + 7;  //此处是关键，换行符占两个字节
		j = j + 6;  //服务器端要用这个。。
		count++;
	}
	for(var i = 0; i<509;i++){
		cityGeo[station_codes[i]] = {x:geoY[i],y:geoX[i]};	
}

}

var data = {
    oriData : [],
    cityToData : {},
    //cityArray : [],
    aqi : [],   aqiMin:0,   aqiMax:400,
    pm25 : [],  pm25Min:0,  pm25Max:800,
    pm10 : [],  pm10Min:0,  pm10Max:800,
    co : [],    coMin:0,    coMax:15,
    no2 : [],   no2Min:0,   no2Max:300,
    o3 : [],    o3Min:0,    o3Max:300,
    so2 : [],   so2Min:0,   so2Max:500,
    geoCoord : {}
};
data.format = function (oriData) {
    data.oriData = oriData;
    var city;
    var cityToData = {};
    //var cityArray = [];
    var geoCoord = {};
    var citycode;
    function pushData(key, city, value) {
        data[key].push({name:city, value:value});
        // data[key+'Min'] = Math.min(data[key+'Min'], value);
        // data[key+'Max'] = Math.max(data[key+'Max'], value);
    }
    console.log(oriData);
    var singleData;
    for ( var j = 0; j<oriData.length;j++){
    	singleData = oriData[j];        
        citycode = singleData.station_code;
        city = singleData.position_name;
        cityName[citycode] = city;
    }
    for (var i = 0, l = oriData.length; i < l; i++) {
        singleData = oriData[i];        
        citycode = singleData.station_code;
        city = singleData.position_name;
        //cityArray.push(city);
        if (cityGeo[citycode]) {
        cityToData[citycode] = singleData;
        pushData('aqi', cityName[citycode], singleData.aqi);
        pushData('pm25', cityName[citycode], singleData.pm2_5);
        pushData('pm10', cityName[citycode], singleData.pm10);
        pushData('co', cityName[citycode], singleData.co);
        pushData('no2', cityName[citycode], singleData.no2);
        pushData('o3', cityName[citycode], singleData.o3);
        pushData('so2', cityName[citycode], singleData.so2);        
        geoCoord[cityName[citycode]] = cityGeo[citycode];
        }        
    }
    
    function sortData(a, b) {
        return a.value - b.value
    }
    data['aqi'].sort(sortData);
    data['pm25'].sort(sortData);
    data['pm10'].sort(sortData);
    data['co'].sort(sortData);
    data['no2'].sort(sortData);
    data['o3'].sort(sortData);
    data['so2'].sort(sortData);
    var all = data['aqi'].length-1;
    for(i = all;i>all-10;i--)
    {
    	top10AQI.push(data['aqi'][i]);
    }
    
    data.oriData = oriData;
    data.cityToData = cityToData;
    //data.cityArray = cityArray;
    data.geoCoord = geoCoord;
}


var eColorMap = {
    'aqi' : '#87cefa',
    'pm25' : '#ff7f50',
    'pm10' : '#da70d6',
    'co' : '#32cd32',
    'no2' : '#6495ed',
    'o3' : '#ff69b4',
    'so2' : '#87cefa',
    'week': '#87cefa',
    'month':'#ff7f50',
    'quarter':'#32cd32'
};

