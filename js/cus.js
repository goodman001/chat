/*get date*/
function getDay(day){  
	var today = new Date();  
	var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
	today.setTime(targetday_milliseconds);  
	var tYear = today.getFullYear();  
	var tMonth = today.getMonth();  
	var tDate = today.getDate();  
	tMonth = doHandleMonth(tMonth + 1);  
	tDate = doHandleMonth(tDate);
	var week = today.getDay();
	var strweek = "";
	/*weekday*/
	if (week == 0) {  
        strweek = "Sun";  
	} else if (week == 1) {  
		strweek = "Mon";  
	} else if (week == 2) {  
		strweek = "Tue";  
	} else if (week == 3) {  
		strweek = "Wed";   
	} else if (week == 4) {  
		strweek = "Thu";   
	} else if (week == 5) {  
		strweek = "Fri";   
	} else if (week == 6) {  
		strweek = "Sat";   
	}  
    var t = new Array(); 
	t["weekday"] = strweek;
	t['date'] = tDate;
	//return tYear+"-"+tMonth+"-"+tDate;
	return t;
}  
function doHandleMonth(month){  
	var m = month;  
	if(month.toString().length == 1){  
	  m = "0" + month;  
	}  
	return m;  
}  
/*get random event*/
function getEvent()
{
	var events=["Have a meeting","Have a reading","Go to sport","Play football","Play the piano"];
	var flag = Math.round((Math.random()) * (events.length-1));
	return events[flag];
	
	
}
/*show calendar*/
function showCalData() {
	var output = "";
	var arr = new Array(); 
	for(var i=3;i>=-10;i--)
	{
		var tmp = getDay(i);
		arr.push(tmp);
	}
	
	/*var arr = [
			{
				"weekday": 'Mon',
				"date": 12,
			}
		];*/
	for (var i in arr) {
		output += mt($("#calcell-template").html(), arr[i]);
		var uls = "";
		for(var j=0;j<=(Math.random()) * 5;j++){
			var timer = 9 + Math.round((Math.random()) * 10);
			var event_ = getEvent();
			uls += '<span><i class="fa fa-clock-o" aria-hidden="true"></i><strong>'+timer+':00:</strong></span><span> '+event_+'</span></br>'
		}
		
		
		output += '<div class="col-xs-9 right-cal">'+uls+'</div>';
	}
	$("#calmain").append(output)

	//We printed the message we sent so now print a fake response
	//showReceivedData();
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
	
	/*cal*/
	showCalData();
});
