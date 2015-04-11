var express = require('express');
var twilio = require('../lib/twilio');
var router = express.Router();


// activate a beacon
router.get('/activate', function(req,res){
	// go through twilio messages
	// find the most recent one that has the right text body
	// parse the json from it
	// create mongo beacon object from the metadata  
	// send the response that the beacon was created
	twilio.receive_activation_sms(req,res);
});

// get location from beacon
router.get('/:id', function(req,res){
	// do a lookup based on the id passed in	
	// find the associated phone number of the beacon associated with id
	// record timestamp 
	// send a message for location update for the beacon
	// wait 45 seconds
	// go through message list
	//	- filter list and get most recent response from beacon AFTER timestamp
	// if gotten, send SUCCESS message
	// else, assume failure, and send RETRY request
	// if 3 failure, terminate request and mark node as Failing 
});

// get location of all beacons
router.get('/all', function(req,res){
	// wrapper function that does the above function for all beacons
});

module.exports = router;