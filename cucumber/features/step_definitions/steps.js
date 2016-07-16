var expect = require('chai').expect;
var assert = require('cucumber-assert'); // Does not give a stack trace
var VERBOSE = false;

module.exports = function () {
	
	this.World = require("../support/world.js").World;
	
	var _url;
	var _reply_body;
	var _reply_statusCode;
	var _authenticationToken;

	var module = this;
	var world = this.World;

	var host = process.env['API_SERVER_HOST'];
	var port = process.env['API_SERVER_PORT'];	
	var API_SERVER_URL = 'http://' + host + ':' + port;

	console.log('');
	console.log('API_SERVER_HOST=' + host);
	console.log('API_SERVER_PORT=' + port);
	console.log('');
	console.log('');


	/*
	 *	START OF STEP DEFINITIONS
	 */
	this.Given(/^the API server is running$/, function (callback) {
	  // Nothing to do here
	  callback();
	});

	this.When(/^I ping the server with name '(.*)'$/, function (param1, callback) {
		var name = param1;
		_url = API_SERVER_URL + '/echo/' + param1;
		if (_authenticationToken) _url += '?authenticationToken=' + _authenticationToken;
		this.GET(_url, callback, function(statusCode, json) {
			VERBOSE && console.log('    Returned. StatusCode=' + statusCode + ' and json=', json);
			_reply_statusCode = statusCode;
			_reply_body = json;
			_authenticationToken = json.token;
			callback();
		});
	});

	this.When(/^I ping the server with no name$/, function (callback) {
		_url = API_SERVER_URL + '/echo';
		if (_authenticationToken) _url += '?authenticationToken=' + _authenticationToken;
		this.GET(_url, callback, function(statusCode, json) {
			VERBOSE && console.log('    Returned. StatusCode=' + statusCode + ' and json=', json);
			_reply_statusCode = statusCode;
			_reply_body = json;
			_authenticationToken = json.token;
			callback();
		});
	});
	

	this.When(/^I ping the server with two names$/, function (callback) {
		_url = API_SERVER_URL + '/echo/param1/param2';
		if (_authenticationToken) _url += '?authenticationToken=' + _authenticationToken;
		this.GET(_url, callback, function(statusCode, json) {
			VERBOSE && console.log('    Returned. StatusCode=' + statusCode + ' and json=', json);
			_reply_statusCode = statusCode;
			_reply_body = json;
			_authenticationToken = json.token;
			callback();
		});
	});
	

	this.Then(/^the reply should contain name as '(.*)'$/, function (param1, callback) {
		var expectedName = param1;
		
		if (_reply_body.name != expectedName) {
			console.log()
			console.log('Url: ' + _url);
			console.log('Reply status code: ' + _reply_statusCode);
			console.log('Reply body: ', JSON.stringify(_reply_body, null, 4));
			console.log()
			return callback(new Error("Unexpected expected name \'" + _reply_body.name + '\'.'));
		}
		callback();
	});
	
	
	/**
	 *	Check the HTTP status code
	 */
	this.Then(/^the reply status code should be (\d+)$/, function (expectedStatusCode, callback) {

VERBOSE && console.log('POINT 2: _reply_statusCode:', _reply_statusCode);
VERBOSE && console.log('POINT 2: _reply_body', _reply_body);


		if (_reply_statusCode != expectedStatusCode) {
			console.log()
			console.log('Url: ' + _url);
			console.log('Reply status code: ' + _reply_statusCode);
			console.log('Reply body: ', _reply_body);
			console.log()
			var msg = "Expected status " + expectedStatusCode + " but got " + _reply_statusCode + ".";
			return callback(new Error(msg));
		}
		return callback();
	});
	
	this.Then(/^the error message should be '(.*)'$/, function(expectedErrorMessage, callback) {
		if (_reply_body.message != expectedErrorMessage) {
			console.log()
			console.log('Url: ' + _url);
			console.log('Reply status code: ' + _reply_statusCode);
			console.log('Reply body: ', _reply_body);
			console.log()
			var msg = "Expected error message '" + expectedErrorMessage + "' but got '" + _reply_body.message + "'.";
			return callback(new Error(msg));
		}
		return callback();
	});
	

	/*
	 *	END OF STEP DEFINITIONS
	 */
} // End of exports
