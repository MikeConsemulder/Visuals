int amountOfBoxes = 5000;

ArrayList<Box> boxes = new ArrayList<Box>();

float lastPositionX;
float lastPositionY;
float lastPositionZ;


int screenWidth1 = 1920;
int screenHeight1 = 1080;

Camera camera = new Camera();

void setup() {
  
  size(1920, 1080, P3D);
  ambientLight(102, 102, 102);
  camera.initCamera();
  
  for(int i = 0; i < amountOfBoxes; i++){
    
    boxes.add(new Box(random(20, screenWidth1), random(20,screenHeight1), random(-20000, 0), random(10, 50)));
    
  }
  
}

void draw() {
   background(0);
   stroke(153);
  
  camera.modCameraPosition();
  
  for (Box box : boxes) {
    
    translate(box.xPosition , box.yPosition, box.zPosition); 
    
    lastPositionX = box.xPosition;
    lastPositionY = box.yPosition;
    lastPositionZ = box.zPosition;
        
    box.display();
    
    translate(-lastPositionX, -lastPositionY, -lastPositionZ);
  }
}
