#pragma once

#include "ofMain.h"
//#include "Painting.h"
#include "Walls.h"

class ofApp : public ofBaseApp{
    
public:
    void setup();
    void update();
    void draw();
    
    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    //    ofShader shader;
    //    ofShader plainCanvas;
    //    ofEasyCam cam;
    //    ofBoxPrimitive box;
    float mouseX;
    float mouseY;
//    Painting * firstPainting;
//    Painting * secPainting;
//    Painting * thirdPainting;
//    Painting * fourthPainting;
//    Painting * fifthPainting;
    
    ofColor wallColor = ofColor(230,230,230);
    
    Walls * gallery;
};
