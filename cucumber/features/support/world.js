var request = require('request');

var World = function(callback) {
	
	// set up code goes here
	var previous_interval = 0;

	/**
	 *	Call a URL, and fail this test unless SUCCESS is returned.
	 */
	this.GET = function GET(url, cucumber_callback, my_callback) {
		//console.log('GET ' + url);

		// https://github.com/mikeal/request
		var start = new Date();
		request(url, function (error, response, body) {
			previous_interval = new Date() - start;
			

			if (error) {
				return cucumber_callback(error);
			// } else if (response.statusCode != 200) {
			// 		        //console.log("Body is " + body);
			// 		        cucumber_callback(new Error("Unexpected status code " + response.statusCode));
			} else {

				// Normal return. Parse the JSON
//				console.log(body);
				try {
					var json = JSON.parse(body);
					//console.log("JSON is " + json);
					my_callback(response.statusCode, json);
				} catch (e) {
					console.log('Error parsing JSON reply:');
					console.log('url was: ' + url);
					console.log('reply is: ', body);
					console.log('--- end of reply ---')
					return cucumber_callback(e);
				}
			}

		});
	};


	/**
	 *	POST to a web service
	 */
	this.POST = function POST(url, json, cucumber_callback, my_callback) {

		// https://github.com/mikeal/request
//		console.log("POST, url=" + url + ", json=", json);
		request({
			method: 'POST',
			url: url,
			json: json
		}, function (error, response, body) {

			if (error) {
				console.log('\n\nError with POST ' + url);
				console.log('Error:', error);
				return cucumber_callback(error);
			} else if (response.statusCode == 500) {
				console.log('\n\nError with POST ' + url);
				console.log('500 Internal Server Error');
				console.log("Body is ", body);
				cucumber_callback(new Error("Internal error on server " + response.statusCode));
			} else {

				// Normal return. Should be a JSON object.
				my_callback(response.statusCode, body);
			}
		});
	};


	/**
	 *	PUT to a web service
	 */
	this.PUT = function PUT(url, json, cucumber_callback, my_callback) {

		// https://github.com/mikeal/request
//		console.log("POST, url=" + url + ", json=", json);
		request({
			method: 'PUT',
			url: url,
			json: json
		}, function (error, response, body) {

			if (error) {
				console.log('\n\nError with PUT ' + url);
				console.log('Error:', error);
				return cucumber_callback(error);
			} else if (response.statusCode == 500) {
				console.log('\n\nError with PUT ' + url);
				console.log('500 Internal Server Error');
		        console.log("Body is ", body);
		        cucumber_callback(new Error("Internal error on server " + response.statusCode));
			} else {

				// Normal return. Should be a JSON object.
				my_callback(response.statusCode, body);
			}
		});
	};




	/**
	 *	Send DEL to a web service
	 */
	this.DEL = function DEL(url, json, cucumber_callback, my_callback) {

		// https://github.com/mikeal/request
//		console.log("DEL, url=" + url);
		request({
			method: 'DELETE',
			url: url,
			json: json
		}, function (error, response, body) {

//			console.log("Back, error="+error, body);

			if (error) {
				console.log('\n\nError with DELETE ' + url);
				console.log('Error:', error);
				return cucumber_callback(error);
			} else if (response.statusCode == 500) {
				console.log('\n\nError with DELETE ' + url);
				console.log('500 Internal Server Error');
			    console.log("Body is ", body);
			    cucumber_callback(new Error("Internal error on server " + response.statusCode));
			} else {
				
				// Normal return
				my_callback(response.statusCode, body);
			}
		});
	};
	
	this.timeOfLastCall = function() {
		return previous_interval;
	};

	return callback(this);
};
exports.World = World;

