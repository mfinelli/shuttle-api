var express = require('express');
var creds  = require('../config/twilio-cfg');
var twilio = require('twilio');
var client = twilio(creds.accountSid, creds.authToken);

// function to REQ for coordinates 
function send_locator_request(beacon){
	client.messages.create({
			to: beacon,
			from: creds.twilioNumber,
			body: "REQ GPS" 
		}, function(err, message){
			console.log(message.sid);
	});
}

// recursive function to handle GPS data, and ACK successful output
function receive_locator_response(beacon, attempts){
	//  if too many failed attempts.. 
	if (attempts == 0){
		// TODO: need to alert main app, possibly send warning to admin route
		return false;
	} else {
		var message = get_latest_message(beacon, Date.now());
		if (message !== "empty"){
			var geostamp = get_payload(message);

			// store in database
			// do a lookup for the location with the database ID 
			// that corresponds with geostamp.number above
			// then store this geostamp in the DB

			// send a positive Response message to the beacon
			client.messages.create({
				to: beacon,
				from: creds.twilioNumber,
				body: "RECV GPS TRUE"
			}, function(err,message){
				console.log(message.sid);
			});
		}
			// retry sending the language request 
		else{
			send_locator_request(beacon);
			setTimeout(receive_locator_response(beacon, attempts-1),2000);
		}
	}
}

// function to ACK connection request and store credentials
function receive_activation_sms(req,res){
	var resp = twilio.TwimlResponse();
	resp.message("BEACON ACTIVATED");
	res.writeHead(200, {'Content-Type':'text/xml'});
	res.end(resp.toString());
}

/************ AUXILIARY FUNCTIONS *******************/

// function to search & filter Twilio API for messages
function get_latest_message(recipient,timestamp){
	var filter_list = [];
	// get the list of SMS messages
	client.messages.list(function(err,data){
		data.messages.forEach(function(message){
			// if they are sent from the beacon within a timeperiod
			if((message.direction === "inbound") && (recipient === "+12403983014") &&
			  (Date.parse(message.date_sent) - timestamp < 4500)){
			  	// push them into a smaller messages queue
			  	filter_list.push(message);
			  }
		});
		// if there are messages, return the latest one, otherwise return "empty"
		return filter_list.length > 0 ? filter_list.sort(compare).shift : "empty";
	});
}

// compare 2 twilio message objects based on timestamp
function compare(a,b){
	return Date.parse(a.date_sent) - Date.parse(b.date_sent);
}

// function to deconstruct SMS packet for JSON payload
function get_payload(message){
	if(message === "empty")
		return false;
	else{
		// SMS body is actually a JSON
		var body = JSON.parse(message.body);
		var payload = {};
		payload.lat = body.lat;
		payload.lng = body.lng;
		payload.ts  = Date.parse(message.date_sent);
		
		if(message.direction === "inbound")
			payload.number = message.from;
		else
			payload.number = message.to;

		return payload;
	}
}

module.exports = {
	receive_activation_sms : receive_activation_sms,
	send_locator_request : send_locator_request,
	receive_locator_response : receive_locator_response
}
