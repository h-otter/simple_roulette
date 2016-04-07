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
	csvData = shuffleArray(csvData);	

	var insert = "";
	for (var i = 0; i < csvData.length; i++){
		insert += '<div class="roulette_wrapper text-center h1" id="' + i + '">' + csvData[i][0] + '</div>'
	}
	$(roulette).append(insert);
	
	$('.test').click(function(){
		inst.open();
	});
			
  // initialize!
	var images = $(roulette).find('div').remove();
	var imageCount = images.length;
	var imageHeight = images.eq(0).height();
	var totalHeight = imageCount * imageHeight;
	var runUpDistance = 2 * imageHeight;
	$(roulette).css({ 'height' : (imageHeight + 'px') });
	
	var winner = new Array();
	var option = {
		speed : 10,
		duration : 3,
		stopImageNumber : -1,
		startCallback : function() {
			console.log('start');
		},
		slowDownCallback : function() {
			console.log('slowDown');
		},
		stopCallback : function($stopElm) {
			console.log('stop');
			console.log($stopElm);
			// cahnge a_result with $stopElm
			// remove div $stopElm
			// shuffle div
			
			$('#student_num').text(csvData[$stopElm][0]);
			$('#department_num').text(csvData[$stopElm][1]);
			$('#student_name').text(csvData[$stopElm][2]);
			
			winner.push(csvData.splice($stopElm));
			setTimeout(function(){
				inst.open();
			}, 1000);
			$(roulette).find('div').eq($stopElm)[0].remove();			
		},
				
		$images: images,
		imageCount: imageCount,
		imageHeight: imageHeight,
		totalHeight: totalHeight,
		runUpDistance: runUpDistance
	}
	$('div.roulette').roulette(option);	
	$('.start').click(function(){
		$('div.roulette').roulette('start');	
	});

 	var remodal_options = {
	  closeOnEscape: false ,
		closeOnOutsideClick: false
	};
	var inst = $('[data-remodal-id=a_result]').remodal(remodal_options);			
	$(document).on('confirmation', '.remodal', function () {
		console.log('Confirmation button is clicked');
		
		option["duration"] = option["duration"] - 3 + Math.floor(Math.random() * 6);
		console.log(option["duration"]);
		console.log($('div.roulette'));
		
		// reset roulette
		// option["duration"] = 30 + Math.random() * 5
		// $('div.roulette').roulette(option);
	});
});
