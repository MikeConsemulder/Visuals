
void setup() {
  

  size(500, 500, P3D);


  
  
}

 void draw(){
   
  placeCamera();
  drawFloor();

}

void keyPressed() {  
  
  //switch(key) {
  //  case 'w': 
  //    cameraY = cameraY + 10;
  //    break;
  //  case 's': 
  //    cameraY = cameraY - 10;
  //    break;
  //  case 'a': 
  //    cameraX = cameraX + 10;
  //    break;
  //  case 'd': 
  //    cameraX = cameraX - 10;
  //    break;
  //}
  
}

void placeCamera(){
   
  //camera(0, 0, 120.0, 50.0, 50.0, 0.0, 
   //    0.0, 1.0, 0.0);
   //print(cameraX);
   //camera(cameraX, cameraY, cameraZ, 100, 250, 0, 0, 1, 0);
}

void drawFloor(){
  
  rotateX(PI/3);
  rect(0, 500, 55, 55);
}
