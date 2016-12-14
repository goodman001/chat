$(function () {

	$("#btn-login").on('click', function () {
		//alert("login!");
		var user = $("#inputEmail").val();
		var pwd = $("#inputPassword").val();
		if(user && pwd){
			window.location.href="mainpage.html";
		}
		

	});	
});