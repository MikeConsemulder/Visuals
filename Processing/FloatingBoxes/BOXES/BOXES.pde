int amountOfBoxes = 5000;
ArrayList<Box> boxes = new ArrayList<Box>();
float lastPositionX;
float lastPositionY;
float lastPositionZ;
int maxBoxSize = 100;

int screenWidth1 = 1920;
int screenHeight1 = 1080;

float eyeX = 960;
float eyeY = 560;
float eyeZ = 500;
float centerX = 960;
float centerY = 560;
float centerZ = 0;
float upX = 0;
float upY = 1;
float upZ = 0;

void setup() {
  
  size(1920, 1080, P3D);
  //directionalLight(126, 126, 126, 0, 0, -1);
  ambientLight(102, 102, 102);
  camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
  
  for(int i = 0; i < amountOfBoxes; i++){
    
    boxes.add(new Box(random(20, screenWidth1), random(20,screenHeight1), random(-20000, 0), random(0, 50)));
    
  }
  
}

void draw() {
   background(0);
   stroke(153);
   
   
  modCameraPosition();
  
  for (Box box : boxes) {
    
    translate(box.xPosition , box.yPosition, box.zPosition); 
    
    lastPositionX = box.xPosition;
    lastPositionY = box.yPosition;
    lastPositionZ = box.zPosition;
        
    box.display();
    
    translate(-lastPositionX, -lastPositionY, -lastPositionZ);
  }
}


void modCameraPosition(){
  
  if(eyeX < 1500){
    
    eyeX += 1 ;
    
  };
  
  
  eyeY += 1;
  
  eyeZ -= 5;
  //centerX = 960;
  //centerY = 560;
  //centerZ = 0;
  //upX = 0;
  //upY = 1;
  //upZ = 0;
  
  camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
}
