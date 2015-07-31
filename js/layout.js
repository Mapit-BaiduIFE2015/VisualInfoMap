
$(document).ready(function(){
	initalStatus();
	changeLayout();
});


function addBlueBar(element){
	$(element).on("click",function () {			
		$(element).removeClass('mark').addClass('nmark');
		$(this).each(function(){					
			$(this).removeClass('nmark').addClass('mark');
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
	$(".third .line").removeClass('nmark').addClass('mark');
	$(".third .quarter").removeClass('nmark').addClass('mark');
	$(".third .days").removeClass('nmark').addClass('mark');
	$("#layoutsix").css("background-color","#618CB7");
}

function changeLayout(){
	$("#layoutone").on("click",function(){
		styleReset();
		$(this).css("background-color","#618CB7");
		$(".second").hide();
		$(".third").hide();
		$(".first").hide().fadeIn(1000).css("height","710px");
		
	});
	$("#layouttwo").on("click",function(){
		styleReset();	
		$(this).css("background-color","#618CB7");	
		$(".third").hide();
		$(".second").hide().fadeIn(1000).css("width","90%").css("height","350px");
		$(".first").hide().fadeIn(1000).css("height","350px");		
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

	});

	$("#layoutsix").on("click",function(){
		styleReset();
		$(this).css("background-color","#618CB7");
		$(".first").hide().fadeIn(1000);
		$(".second").hide().fadeIn(1000).css("float","left");
		$(".third").hide().fadeIn(1000).css("float","right").css("margin-right","5%")
		.css("margin-left","0px");

	});
}

function styleReset () {
	//default css
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