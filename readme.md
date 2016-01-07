# pi-gpio tutorial for pijs.io

## Setup :

First install pi-gpio from npm. To use it through pijs.io, you have to install it globally, like this :

	sudo npm install -g pi-gpio

Then, install gpio-admin, a command line utility for controlling the gpio pins. pi-gpio will be using it behind the scenes.
([more details from the source](https://npmjs.org/package/pi-gpio))

	git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
	cd quick2wire-gpio-admin
	make
	sudo make install
	sudo adduser $USER gpio

Don't forget to logout after the installation, or gpio-admin won't work.

## Hello World :

The first thing you might want to do to start playing with electronics is make a LED shine on your breadboard.
It simply takes a LED and a 280ohm resistor. Connect one end of the LED to an available GPIO pin, the other to the resistor, and the resistor to the ground pin.

<img src="https://raw.github.com/boblemarin/pi-gpio-tutorial/master/1led_gpio_bb1.jpg" width="500"/>

The above image is taken from [this WiringPI tutorial](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/) by [Gordon Henderson](https://twitter.com/drogon). If you are just starting to play with eletronic components, it should be [a useful read that will help you to get started](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Lighting the LED will be accomplished by setting the pin in a state called HIGH. Digital pins, like those present on the RPI, have two distinct states, LOW or HIGH. They can be used in two different modes, INPUT and OUTPUT, depending if you want to read or write values. In our case, we will be using the OUTPUT mode, as we want to control the state of the LED.

Another thing to care for is the layout of the pins on the RPI. Only some of them are available, and their layout is not very linear. (insert reference to the wiringPI tutorial here).

The example code on the pi-gpio home page shows us how we can write a value in an output pin. We'll be using the pin 11, also known as GPIO0 according the RPI pins layout.

	var gpio = require("pi-gpio");

	gpio.open(11, "output", function(e) {
		gpio.write(11, 1, function(e){
			gpio.close(11);
		})
	});

Basically, you have to request an access to the pin (opening it) in output mode and write the value. You might also want to close the pin if you don't intend to use it anymore (or if any other process might want to access it later).

And that's it, you should see the light. Nothing can stop you from now on.


## Knight Rider :

![6 LEDS in action](https://raw.github.com/boblemarin/pi-gpio-tutorial/master/leds.gif)


Just for the fun, why don't you try to wire 6 leds and resistors ? Find 6 free GPIO pins on your board, and make a nice layout.

The following script should turn them on and off in sequence. Take that as a starting point and make your own light show !


	var gpio = require("pi-gpio");
	var pins = [11,12,13,15,16,18];
	var state = 0;
	var currentPin = 0;
	var interval = 100;


	openAllPins();
	setTimeout(togglePin,100);

	function openAllPins() 
	{
	  for(var i=0;i<pins.length;i++)
	  {
	     gpio.open(pins[i], "output");
	  }
	}

	function togglePin()
	{
	  // set the state of the current pin
	  gpio.write(pins[currentPin], state);

	  // find next pin (invert state if needed)
	  if ( ++currentPin >= pins.length ) 
	  {
	    currentPin = 0;
	    state = 1-state;
	  }

	  // repeat
	  setTimeout(togglePin,interval);
	}

	function closeAllPins() 
	{
	  for(var i=0;i<pins.length;i++)
	  {
	     gpio.close(pins[i]);
	  }
	}
