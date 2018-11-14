//ArrayList<Box> boxes = new ArrayList<Box>();

int centerPointX = 250;
int centerPointY = 250;

int circleRadius = 1;
int angleSteps = 10;

int lastSetPointX;
int lastSetPointY;

float cameraX = width/2.0;
float cameraY = height/2.0;
float cameraZ = (height/2.0) / tan(PI*30.0 / 180.0);

boolean showBox = true;

void setup() {
  

  size(500, 500, P3D);
  frameRate(100);
    
  // boxes.add(new Box(random(20, screenWidth1), random(20,screenHeight1), random(-20000, 0), random(0, 50)));
    
  
}

//void draw() {
   
//   fill(204, 102, 0);

//    drawCenter();
    
//    drawFirstPoint();
    
//    float theAngle = 10;
    
//    print (calculateOppositeSide(theAngle));
//}

int x = 0;
 void draw(){
   
  if(x<360){
  
    x+= 5;
  
  }else{
    
    circleRadius += 20;
    x = 0;
  }

  if(circleRadius > 250){
   
    circleRadius = 1;
    
    showBox = !showBox;
  }

  pushMatrix();
  translate(width/2,height/2);// bring zero point to the center 
  
  //point (sin(radians(x))*circleRadius,cos(radians(x))*circleRadius);
  
  translate(sin(radians(x))*circleRadius,cos(radians(x))*circleRadius);
  
  if(showBox){
   
    box(20);
  }else{
    
  sphere(20);
  
  }
  popMatrix();
  
  placeCamera();
}

void keyPressed() {  
  
  switch(key) {
    case 'w': 
      cameraY+=10;
      break;
    case 's': 
      cameraY-=10;
      break;
    case 'a': 
      cameraX+=10;
      break;
    case 'd': 
      cameraX-=10;
      break;
  }
  
}

void placeCamera(){
  
   camera(cameraX, cameraY, cameraZ, 100, 250, 0, 0, 1, 0);
}

void drawCenter(){
 
  point(centerPointX, centerPointY);
}

void drawFirstPoint(){
 
  point(centerPointX, centerPointY - circleRadius);

}

float calculateOppositeSide(float angle){
   
  float b = circleRadius;
  float c = circleRadius;
  return sqrt(((b * b) + ( c * c)) - (2 * b * c * cos( radians(angle))));
}
