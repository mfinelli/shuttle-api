var express = require('express');
var creds  = require('../config/twilio-cfg');
var twilio = require('twilio');
var client = twilio(creds.accountSid, creds.authToken);

// function to ask coordinates 
function send_locator_request(reciever){
	client.messages.create({
			to: reciever,
			from: creds.twilioNumber,
			body: "REQUEST LOCATION" 
		}, function(err, message){
			console.log(message.sid);
	});
}

function receive_locator_response(){

}

function send_retry_request(receiver){

}



function receive_activation_sms(req,res){
	var resp = twilio.TwimlResponse();
	resp.message("BEACON ACTIVATED");
	res.writeHead(200, {'Content-Type':'text/xml'});

	console.log(resp.toString());

	res.end(resp.toString());
}

module.exports = {
	receive_activation_sms : receive_activation_sms,
	send_locator_request : send_locator_request,
	receive_locator_response : receive_locator_response
}
