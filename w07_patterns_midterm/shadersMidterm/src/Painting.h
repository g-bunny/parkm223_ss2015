//
//  Painting.h
//  shadersMidterm
//
//  Created by Miri Park on 10/28/15.
//
//

#include "ofMain.h"

class Painting{
public:
    Painting(float xStart, float xEnd, float yStart, float yEnd, int index);
    void draw();
    void update();
    
    float xStart, xEnd, yStart, yEnd;
    int index;
    ofShader shader;
    ofShader plainCanvas;
    ofEasyCam cam;
    ofBoxPrimitive box;
    
};