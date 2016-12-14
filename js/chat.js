function getPara(urlString){
   var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
   var res = {};
   var match;
   var key;
   var value;
   while (match = reg.exec(urlString)) {
      key = match[2];
      value = match[3] || '';
      res[key] = decodeURIComponent(value);
   };
   return res;
}
// This function takes an array of objects and sets each of them into a userlist item template
//By an array of objects we mean the data from our json file
function showReceivedData(uid) {

	var output = '<div class="col-xs-1 chat_re" ><img src="images/'+ uid +'.jpg" class="chats"/></div>';
	$.ajax({
		url: 'data/chat.json',
		dataType: 'json'
	})
		.done(function (data) {
			console.log("success", data);

			//randomly pick a response message between 0 and 4
			var rand = Math.floor((Math.random() * 4));

			output += mt($("#chatreceived-template").html(), data[rand]);
			
			setTimeout(function(){$(".msg").append(output);}, 3000);
		})
		.fail(function (data) {
			console.log("failure", data);
		});


}
function showSentData(arr,uid) {
	var output = "";
	for (var i in arr) {
		output += mt($("#chatsent-template").html(), arr[i]);
	}
	output += '<div class="col-xs-1 chat_re" ><img src="images/local.jpg" class="chats"/></div><div class="clear"></div>';
	$(".msg").append(output)

	//We printed the message we sent so now print a fake response
	showReceivedData(uid);
}
/*history show*/
function getMeRecord(uid)
{
	var sendStr = [
					{
						"message": sent_message,
						"user": "Me",
						"minutes": 1
					}
				];
	
}
function getFriRecord(uid) {

	var output = '';
	var senddatas = new Array();
	$.ajax({
		url: 'data/history.json',
		dataType: 'json'
	})
		.done(function (data) {
			console.log("success", data);

			//randomly pick a response message between 0 and 4
			//var rand = Math.floor((Math.random() * 4));
			for (var key in data) 
			{
				if(data[key]['uid'] == uid)
				{
					for(var j in data[key]['record'])
					{
						output += '<div class="col-xs-1 chat_re" ><img src="images/'+ uid +'.jpg" class="chats"/></div>'
						data[key]['message']=data[key]['record'][j];
						data[key]['minutes'] = j+2;
						output += mt($("#chatreceived-template").html(), data[key]);
						/*show send data*/
						var sendlib=["OK","I need time","I can think about it","I understand it","Me too"]
						senddatas['message'] = sendlib[Math.floor((Math.random() * (sendlib.length)))]; 
						senddatas['minutes'] = j+3; 
						output += mt($("#chatsent-template").html(), senddatas);
						output += '<div class="col-xs-1 chat_re" ><img src="images/local.jpg" class="chats"/></div><div class="clear"></div>';
						//output += '<div class="col-xs-1 chat_re" ><img src="images/'+ uid +'.jpg" class="chats"/></div>';
					}
				}
			}
			$(".msg").append(output);
			//output += mt($("#chatreceived-template").html(), data[rand]);
			
			//setTimeout(function(){$(".msg").append(output);}, 3000);
		})
		.fail(function (data) {
			console.log("failure", data);
		});


}
function historyShow(uid)
{
	getFriRecord(uid);
	
	
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
	var url = window.location.href;
	var result = getPara(url);
	if(result['flag'] ==1)
	{
		historyShow(result['uid']);
	}
	//alert(result['uid']);
	//alert(result['username']);
	$("#chattop").text(result['username']);
	$("#btn-chat").on('click', function () {
		var sent_message = $("#btn-input").val();
		var sentData = [
			{
				"message_id": 1,
				"message": sent_message,
				"user": "Me",
				"minutes": 1
			}
		];
		showSentData(sentData,result['uid']);

		//finally clear the input text 
		$("#btn-input").val("");

	});
	$("#back").on('click', function () {
		 window.history.go(-1);
	});
		
});
