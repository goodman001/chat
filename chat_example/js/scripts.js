// This function takes an array of objects and sets each of them into a userlist item template
//By an array of objects we mean the data from our json file
function showReceivedData() {

	var output = "";
	$.ajax({
		url: 'data/chat.json',
		dataType: 'json'
	})
		.done(function (data) {
			console.log("success", data);

			//randomly pick a response message between 0 and 4
			var rand = Math.floor((Math.random() * 4));

			output += mt($("#chatreceived-template").html(), data[rand]);
			
			setTimeout(function(){$(".msg").append(output);}, 5000);
		})
		.fail(function (data) {
			console.log("failure", data)
		});


}

function showSentData(arr) {
	var output = "";
	for (var i in arr) {
		output += mt($("#chatsent-template").html(), arr[i]);
	}
	$(".msg").append(output)

	//We printed the message we sent so now print a fake response
	showReceivedData();
}

// mustacheTemplate
// This expects a template string with mustaches like {{name}}
// It also expects an object with properties that match the template mustaches
var mt = function (template, data) {
	if (!template || !data) return template || '';
	for (var key in data) {
		if (data.hasOwnProperty(key) === false) continue;
		template = template.replace(RegExp('\{\{' + key + '}}', 'g'), data[key]);
	}
	return template;
}


$(function () {
	$("#btn-chat").on('click', function () {
		var sent_message = $("#btn-input").val();
		var sentData = [
			{
				"message_id": 1,
				"message": sent_message,
				"user": "Fred",
				"minutes": 51
			}
		];
		showSentData(sentData);

		//finally clear the input text 
		$("#btn-input").val("");

	});
});
