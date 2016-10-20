/* Main jQuery script */

$(document).ready(function() {
	$("body").append("<h1>jQuery, jQuery-UI, & AJAX</h1>");
	$("body").append("<button class='get-data-button'>Get Data</button>");
	$("body").append("<p>Hello lab7!</p>");
});

$(document).ready(function() {
	$("button").click(function() {
		$.ajax({
			url: "/fetch",
			type: "GET",
			data: {
				name: "jQuery-AJAX-lab7-data"
			}
		})
		.done(function(result) {
			console.log("AJAX request succeeded");
			$("p").html("<p> Data: " + result.content + "</p>");
		})
		.fail(function(xhr, status, errorThrown) {
			console.log("AJAX request failed...");
			$("p").html("<p> No data yet... </p>");
		})

	});
});