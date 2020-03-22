import themidibus.*; //Import the library
MidiBus myBus; // The MidiBus

int x = 960;
int y = 540;
int steps = 10;
int maxSize = 20;
int maxNumPoints = 2000;
int maxRadius = 500;
int steps2 = 10;

int r = 0;
int g = 0;
int b = 0;

void setup() {
  
  frameRate(24);
  size(1920, 1080);
  background(255);

  MidiBus.list(); // List all available Midi devices on STDOUT. This will show each device's index and name.
  myBus = new MidiBus(this, 0, 3);
}

void draw() {

  translate(x,y);
  float radius = maxRadius;
  background(255);
  
  while(radius > 0)
  {
    float numPoints = maxNumPoints;
    float angle = TWO_PI / numPoints;
    for(int i = 0; i < numPoints; i+= steps2)
    {
      float randomSize = maxSize;
      fill(r, g, b);
      ellipse(radius * sin(angle * i), radius*cos(angle * i), randomSize, randomSize);
    }
    radius-= steps;
  } 
}

void noteOn(int channel, int pitch, int velocity) {

  println(channel, pitch, velocity);
}

void noteOff(int channel, int pitch, int velocity) {

  println(channel, pitch, velocity);
}

void controllerChange(int channel, int number, int value) {
    
    //values will be from 0  - 127
    //knobs 80 - 81 - 82 - 83 - 84 - 85 - 86 - 87
    if(number == 80) {

      steps = int(map(float(value), 0, 127, 1, 500));
    }
    
    if(number == 81) {
      
      maxSize = int(map(float(value), 0, 127, 1, 100));

    }
    
    if(number == 82) {
      
      maxNumPoints = int(map(float(value), 0, 127, 1, 2500));
    }
    
    if(number == 83) {
      
      maxRadius = int(map(float(value), 0, 127, 1, 1500));
    }
    
    if(number == 84) {
      
      steps2 = int(map(float(value), 0, 127, 1, 500));
    }
    
    if(number == 85) {
      
      r = int(map(float(value), 0, 127, 0, 255));
    }
    
    if(number == 86) {
      
      g = int(map(float(value), 0, 127, 0, 255));
    }
    
    if(number == 87) {
      
      b = int(map(float(value), 0, 127, 0, 255));
    }
    
    //filter 74
    println(channel, number, value);
}
