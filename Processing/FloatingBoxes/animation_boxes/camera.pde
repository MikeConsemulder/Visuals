class Camera {
  
  float eyeX = 960;
  float eyeY = 560;
  float eyeZ = 500;
  float centerX = 960;
  float centerY = 560;
  float centerZ = 0;
  float upX = 0;
  float upY = 1;
  float upZ = 0;
  
  Camera(){
    
  }
  
  void initCamera(){
   
      camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
  }
  
  void modCameraPosition(){
  
  if(eyeX < 1500){
    
    eyeX += 1 ;
    
  };
  
  
  eyeY += 1;
  
  eyeZ -= 5;
  
  camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
}
}
