// This function takes an array of objects and sets each of them into a userlist item template
//By an array of objects we mean the data from our json file
function showContacts() {

	var output = "";
	$.ajax({
		url: 'data/history.json',
		type : 'GET',
		dataType: 'json',
	})
		.done(function (data) {
			console.log("success", data);
			for(var i=0;i<data.length;i++)
			{
				output += mt($("#historycell-template").html(), data[i]);
			}
			//alert(output);
			$(".historycell").append(output);
			//randomly pick a response message between 0 and 4
			/*var rand = Math.floor((Math.random() * 4));

			output += mt($("#contactcell-template").html(), data[rand]);
			
			setTimeout(function(){$(".msg").append(output);}, 5000);*/
			/*for(var i=0;i<data.length;i++)
			{
				output += mt($("#contactcell-template").html(), data[i]);
			}*/
			//$(".fricell").append(output);
		})
		.fail(function (data) {
			console.log("failure", data);
			/*output += mt($("#contactcell-template").html(), data[rand]);
			
			setTimeout(function(){$(".msg").append(output);}, 5000);*/
			//alert(data[0]);
			
		});


}
function showContact()
{
	$.ajax({
	type: 'GET',
	url: 'data/contact.json',
	//data: data,
	async: false,
	beforeSend: function (xhr) {
	if (xhr && xhr.overrideMimeType) {
	  xhr.overrideMimeType('application/json;charset=utf-8');
	}
	},
	dataType: 'json',
	success: function (data) {
		alert("!!!");
	//Do stuff with the JSON data
	}
	});
}
/*function showSentData(arr) {
	var output = "";
	for (var i in arr) {
		output += mt($("#chatsent-template").html(), arr[i]);
	}
	$(".msg").append(output)

	//We printed the message we sent so now print a fake response
	showReceivedData();
}
*/
// mustacheTemplate
// This expects a template string with mustaches like {{name}}
// It also expects an object with properties that match the template mustaches
var mt = function (template, data) {
	if (!template || !data) return template || '';
	for (var key in data) {
		if (data.hasOwnProperty(key) === false) continue;
		if(key=="record")
		{
			template = template.replace(RegExp('\{\{' + key + '}}', 'g'), data[key][0]);
		}else{
			template = template.replace(RegExp('\{\{' + key + '}}', 'g'), data[key]);
		}
	}
	return template;
}


$(function () {
	showContacts();
});
