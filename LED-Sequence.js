var gpio = require("pi-gpio");
var pins = [11,12,22,15,16,18];//tmp: 18 , 13=cassé
var state = 0;
var currentPin = 0;
var interval = 100;


openAllPins();
setTimeout(togglePin,100); // initial delay is a magic number, I haven't searched for anything better since it worked from the first time

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