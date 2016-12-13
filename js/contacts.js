// This function takes an array of objects and sets each of them into a userlist item template
//By an array of objects we mean the data from our json file
function showContacts() {

	var output = "";
	$.ajax({
		url: 'data/contact.json',
		type : 'GET',
		dataType: 'json',
	})
		.done(function (data) {
			console.log("success", data);
			for(var i=0;i<data.length;i++)
			{
				output += mt($("#contactcell-template").html(), data[i]);
			}
			//alert(output);
			$(".fricell").append(output);
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
		template = template.replace(RegExp('\{\{' + key + '}}', 'g'), data[key]);
	}
	return template;
}


$(function () {
	showContacts();
	//showContacts();
	/*$("#btn-chat").on('click', function () {
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

	});*/
	/*$("#btn-login").on('click', function () {
		//alert("login!");
		var user = $("#inputEmail").val();
		var pwd = $("#inputPassword").val();
		if(user && pwd){
			window.location.href="mainpage.html";
		}
		

	});*/
	/*nav click*/
	/*$('a[href="#navbar-more-show"], .navbar-more-overlay').on('click', function(event) {
		event.preventDefault();
		$('body').toggleClass('navbar-more-show');
		if ($('body').hasClass('navbar-more-show'))	{
			$('a[href="#navbar-more-show"]').closest('li').addClass('active');
		}else{
			$('a[href="#navbar-more-show"]').closest('li').removeClass('active');
		}
		return false;
	});*/
	
});
