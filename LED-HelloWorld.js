var gpio = require("pi-gpio");
var pinID = 11;

// first, open the pin in output mode
gpio.open(pinID, "output", function(e) {
	// then set its state to HIGH
	gpio.write(pinID, 1, function(e){
		// and finally close the pin (but is it required ?)
		gpio.close(pinID);
	})
});

// note: there is error handling, too (the "e" argument ?)