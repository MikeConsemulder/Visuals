class Box {
  float xPosition;
  float yPosition;
  float zPosition;
  float boxSize;
  float rotateAngle = 0;
  boolean fillIt = false;
  float speed = random(2, 0.5);
  
  float boxSizeSpeed = random(0.005, 0.01);
  
  float red = random(0, 255);
  float green = random(0, 255);
  float blue = random(0, 255);
  
  // Contructor
  Box(float xPos, float yPos, float zPos, float size) {
    
    xPosition = xPos;
    yPosition = yPos;
    zPosition = zPos;
    
    boxSize = size;
  }
    
  void display(){
     
    
    rotateAngle = rotateAngle + 0.001;
    zPosition = zPosition + speed;
    
    if(boxSize < maxBoxSize){
      
    boxSize += boxSizeSpeed;
    }else{
     
    boxSize -= boxSizeSpeed;
    }
    
    shouldSwitchFill();
    
    if(fillIt){
    
      fill(red , green, blue); 
    
    }else{
      
      noFill();
    
    }
    box(boxSize);
  }
  
  boolean shouldSwitchFill(){
    
    if(random(0, 100) >= 90){
      
      fillIt = !fillIt;
      return true;
    }
    
    return false;
  }
  
}
