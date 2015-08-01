
// $(document).ready(function(){
// 	initalStatus();
// 	changeLayout();
// });


function addBlueBar(element){
	$(element).on("click",function () {			
		$(element).removeClass('mark').addClass('nmark');
		$(this).each(function(){					
			$(this).removeClass('nmark').addClass('mark');
			reDrawChart(element);
		});
	});

}

function initalStatus () {
	addBlueBar(".first .city");
	addBlueBar(".first .map");
	addBlueBar(".first .period");
	addBlueBar(".first .size");
	addBlueBar(".second .city");
	addBlueBar(".second .map");
	addBlueBar(".second .period");
	addBlueBar(".second .size");
	addBlueBar(".third .city");
	addBlueBar(".third .map");
	addBlueBar(".third .period");
	addBlueBar(".third .size");
	$(".first .beijing").removeClass('nmark').addClass('mark');
	$(".first .bar").removeClass('nmark').addClass('mark');
	$(".first .week").removeClass('nmark').addClass('mark');
	$(".first .peak").removeClass('nmark').addClass('mark');
	$(".second .shanghai").removeClass('nmark').addClass('mark');
	$(".second .line").removeClass('nmark').addClass('mark');
	$(".second .month").removeClass('nmark').addClass('mark');
	$(".second .average").removeClass('nmark').addClass('mark');
	$(".third .guangzhou").removeClass('nmark').addClass('mark');
	$(".third .bar").removeClass('nmark').addClass('mark');
	$(".third .quarter").removeClass('nmark').addClass('mark');
	$(".third .days").removeClass('nmark').addClass('mark');
	$("#layoutsix").css("background-color","#618CB7");
}

function changeLayout(){
	$("#layoutone").on("click",function(){
		styleReset();
		$(this).css("background-color","#618CB7");
		// $(".second").hide();
		// $(".third").hide();
		$(".second").hide();
		$(".third").hide();
		$(".first").hide().fadeIn(1000).css("height","710px");
		reDrawLayout();		
	});

	$("#layouttwo").on("click",function(){
		styleReset();	
		$(this).css("background-color","#618CB7");	
		$(".third").hide();
		$(".second").hide().fadeIn(1000).css("width","90%").css("height","350px");
		$(".first").hide().fadeIn(1000).css("height","350px");
		reDrawLayout();		
	});

	$("#layoutthree").on("click",function(){
		styleReset();
		$(this).css("background-color","#618CB7");
		$(".first").hide().fadeIn(1000).css({
			"width": "46%",
			"height": "710px",
			"display": "block",
			"float": "left",
			"margin-left": "40px"
								});
		$(".second").hide().fadeIn(1000).css({
			"height":"350px",
			"width":"46%",
			"margin-left":"30px",
			"float":"left"
		});
		$(".third").hide().fadeIn(1000).css({
			"height":"350px",
			"width":"46%",
			"margin-left":"30px",
			"float":"left",
			"margin-right":"20px"
		});
		reDrawLayout();
	});

	$("#layoutfour").on("click",function(){
		styleReset();
		$(this).css("background-color","#618CB7");
		$(".first").hide().fadeIn(1000).css({
			"width": "46%",
			"height": "710px",
			"display": "block",
			"float": "right",
			"margin-right": "50px"
								});
		$(".second").hide().fadeIn(1000).css({
			"height":"350px",
			"width":"44%",
			"margin-left":"40px",
			"float":"left"
		});
		$(".third").hide().fadeIn(1000).css({
			"height":"350px",
			"width":"44%",
			"margin-left":"40px",
			"float":"left",
			"margin-right":"0"
		});
		reDrawLayout();
	});

	$("#layoutfive").on("click",function(){
			styleReset();
			$(this).css("background-color","#618CB7");
			$(".first").hide().fadeIn(1000).css({
			"width": "46%",
			"height": "710px",
			"display": "block",
			"float": "left",
			"margin-left": "40px"
				});
			$(".second").hide().fadeIn(1000).css({
			"width": "46%",
			"height": "710px",
			"display": "block",
			"float": "right",
			"margin-left": "40px"
				});
			$(".third").hide();
			reDrawLayout();

	});

	$("#layoutsix").on("click",function(){
		styleReset();
		$(this).css("background-color","#618CB7");
		$(".first").hide().fadeIn(1000);
		$(".second").hide().fadeIn(1000).css("float","left");
		$(".third").hide().fadeIn(1000).css("float","right").css("margin-right","5%")
		.css("margin-left","0px");

		reDrawLayout();
	});

	
}

function styleReset () {
	// default css
/*
	.first{
	height: 400px;
	margin-top: 10px;
	border: 1px solid #A8B6C4;
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	box-shadow: 2px 2px 2px #BECEDE;
}

.second{
	height: 300px;
	width: 44%;
	display: block;
	float: left;
	margin-left: 5%;
	margin-right: 20px;
}
.third{
	height: 300px;
	width: 44%;
	display: block;
	float: right;
	margin-right: 5%;
}
 */
$(".first").hide().css({
	'height': '400px',		
	'width': '90%',
	'margin-left': 'auto',
	'margin-right':' auto',
	"clear":"both",
	"float":"none"
	
});

$(".second").hide().css({
	'height': '300px',
	'width': '44%',
	'display': 'block',
	'float': 'left',
	'margin-left': '5%',
	'margin-right': '20px',
	"float":"none"
});

$(".third").hide().css({
	'height': '300px',
	'width': '44%',
	'display': 'block',
	'float': 'right',
	'margin-right': '5%',
	"margin-left":'auto',
	"float":"none"	
});

$(".layout").css("background-color","#4A6C8D");

}

function reDrawLayout() {
		// myChart1.clear();
		// myChart2.clear();
		// myChart3.clear();
		window.onresize = myChart1.resize();	
		window.onresize = myChart2.resize();
		window.onresize = myChart3.resize();

		myChart1.clear();
		myChart2.clear();
		myChart3.clear();

		myChart1.showLoading({effect:'whirling',text:"稍等^_^"});
		myChart2.showLoading({effect:'whirling',text:"稍等^_^"});
		myChart3.showLoading({effect:'whirling',text:"稍等^_^"});

		setTimeout(drawSmooth,1000);

		function drawSmooth(){
				myChart1.hideLoading();                
                myChart1.setOption(chart1opts);
                myChart2.hideLoading();
                myChart2.setOption(chart2opts);
                myChart3.hideLoading();
                myChart3.setOption(chart3opts); 
		}		  
}


function reDrawChart (element) {
	var params = [];
	var classArray = element.split(" ");
	var chartSelected = classArray[0];
	var allParams = $(chartSelected +" "+ ".mark" );
	console.log(allParams);
	for(var i = 0;i<allParams.length;i++){
		params.push(allParams[i]["className"].split(" ")[1]);
	}
	console.log(chartSelected);
	console.log(params);

	var typeSelected = params[1];
	var citySelected = params[0];
	var periodSelected = params[2];
	var sizeSelected = params[3];
	var optsSelected;
	console.log(typeSelected);	
	
	if(typeSelected === "bar"){
		optsSelected = bar0(citySelected,periodSelected,sizeSelected);
	}
	if(typeSelected === "line"){
		optsSelected = line0(citySelected,periodSelected,sizeSelected);
	}

	console.log( optsSelected);

	if(chartSelected === '.first'){
	 myChart1.clear();
	 chart1opts = optsSelected;
	 myChart1.setOption(chart1opts);
	}

	if(chartSelected === '.second'){
	 myChart2.clear();
	 chart2opts = optsSelected;
	 myChart2.setOption(chart2opts);
	}

	if(chartSelected === '.third'){
	 myChart3.clear();
	 chart3opts = optsSelected;
	 myChart3.setOption(chart3opts);
	}
}

