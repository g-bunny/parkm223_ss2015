//
//  glitchSurface.h
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "ofMain.h"

class glitchSurface{
public:
    glitchSurface( float xStart, float xEnd, float yStart, float yEnd, float zStart, float zEnd, int index);
    void draw();
    void update();
    
    ofShader shader;
    ofShader bgShader;
    
    float xStart, xEnd, yStart, yEnd, zStart, zEnd;
    int index;
    int bgActiveGlitch = 0;

};