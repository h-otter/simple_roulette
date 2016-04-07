$(function(){
	var shuffleArray = function (arr) {
		var i, j, temp;
		arr = arr.slice();
		i = arr.length;
		if (i === 0) {
			return arr;
		}
		while (--i) {
			j = Math.floor(Math.random() * (i + 1));
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	};
	
	// get list
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","list.csv",false);
  xmlhttp.send(null);
	
	var csvData = new Array();
	var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
	var lines = xmlhttp.responseText.split(LF);
	for (var i = 1; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	
	var setRouletteValue = function(){
		csvData = shuffleArray(csvData);	
		var insert = "";
		for (var i = 0; i < csvData.length; i++){
			insert += '<div class="roulette_wrapper text-center h1">' + csvData[i][0] + '</div>'
		}
		$(roulette).append(insert);
	}
	setRouletteValue();

  // initialize!
	// roulette
	var images = $(roulette).find('div').remove();
	var imageCount = images.length;
	var imageHeight = images.eq(0).height();
	var totalHeight = imageCount * imageHeight;
	var runUpDistance = 2 * imageHeight;
	$(roulette).css({ 'height' : (imageHeight + 'px') });
	
	var winner = new Array();
	var roulette_options = {
		speed : 50,
		duration : 15,
		stopImageNumber : -1,
		startCallback : function() {
			console.log('start');
		},
		slowDownCallback : function() {
			console.log('slowDown');
		},
		stopCallback : function($stopElm) {
			console.log('stop');
			$('#student_num').text(csvData[$stopElm][0]);
			$('#department_num').text(csvData[$stopElm][1]);
			$('#student_name').text(csvData[$stopElm][2]);
			
			setTimeout(function(){
				inst.open();
			}, 1500);
		},
				
		$images: images,
		imageCount: imageCount,
		imageHeight: imageHeight,
		totalHeight: totalHeight,
		runUpDistance: runUpDistance
	}
	$('div.roulette').roulette(roulette_options);	
	$('.start').click(function(){
		$('div.roulette').roulette('start');	
	});
	$('.stop').click(function(){
		$('div.roulette').roulette('stop');	
	});
		$('.test').click(function(){
		inst.open();
	});
	
	
  // modal
 	var remodal_options = {
	  closeOnEscape: false ,
		closeOnOutsideClick: false
	};
	var inst = $('[data-remodal-id=a_result]').remodal(remodal_options);
	$(document).on('opened', '.remodal', function () {
		winner.push(csvData.splice($stopElm, 1));
		$(roulette).empty();
		setRouletteValue();
				
		roulette_options.duration = roulette_options.duration - 3 + Math.floor(Math.random() * 6);
		roulette_options.$images = $(roulette).find('div').remove();
		roulette_options.imageCount = roulette_options.$images.length;
		roulette_options.imageHeight = roulette_options.$images.eq(0).height();
		roulette_options.totalHeight = roulette_options.imageCount * roulette_options.imageHeight;
		roulette_options.runUpDistance = 2 * roulette_options.imageHeight;
		$(roulette).css({ 'height' : (roulette_options.imageHeight + 'px') });
			
		$('div.roulette').roulette('option', roulette_options);
		$('div.roulette').roulette('init', $('div.roulette'));
	});
	
});
