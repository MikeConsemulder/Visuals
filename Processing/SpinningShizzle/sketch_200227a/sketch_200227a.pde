

int x = 960;
int y = 540;
int steps = 10;
int maxSize = 20;
int maxNumPoints = 2000;
int maxRadius = 500;

void setup() {
  frameRate(24);
   size(1920, 1080); 
}

void draw() {
  
  background(255);
    
  translate(x,y);
  float radius = maxRadius;
  
  while(radius > 0)
  {
    float numPoints = random(maxNumPoints) + 50;
    float angle = TWO_PI / numPoints;
    for(int i = 0; i < numPoints; i+= 10)
    {
      float randomSize = random(maxSize);
      fill(random(255), random(255), random(255));
      ellipse(radius * sin(angle * i), radius*cos(angle * i), randomSize, randomSize);
    }
    radius-= steps;
  } 
}
