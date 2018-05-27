// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//

//= require_self
//= require_tree ./channels

//(function() {
  //this.App || (this.App = {});

  //App.cable = ActionCable.createConsumer();

//}).call(this);



$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});


});

$("#cada_post_1").click(function() {
	console.log("click");
  // window.location = $(this).find("a").attr("href"); 
  // return false;
});


function funcion_click(post_path) {
	window.location.replace(post_path);
	// console.log(post_path)
}

