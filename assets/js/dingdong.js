$(document).ready(function(){
	"use strict";

	function failDoorBell(){
		$("#note").text("Sorry, door bell is broken...");
	}

	$("#doorbell").click(function(e){
		e.preventDefault();

		$("#note").text("Ringing...");

		/* global AWS */
		AWS.config.update({region: "us-east-1"});
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: "us-east-1:8ae0d1a8-54ab-4073-b092-b2c1d6a2972b"});

		var lambda = new AWS.Lambda({region: "us-east-1", apiVersion: "2015-03-31"});
		var pullParams = {
			FunctionName : "arn:aws:lambda:us-east-1:110820207274:function:dingdong",
			InvocationType : "RequestResponse",
			LogType : "None"
		};

		lambda.invoke(pullParams, function(error, data) {
			if (error) {
				// Fail
				console.log(error);
				failDoorBell();
			} else {
				console.log(data);
				// Extract error message
				try {
					if (data.Payload != null){
						// Fail
						$("#note").text("It just rang! Stop pressing it so fast!");
					} else {
						// Success
						$("#note").text("I'M COMING!");
					}
				} catch (e){
					// Fail
					console.log(e);
					failDoorBell();
				}
			}
		});

		return false;
	});
});
