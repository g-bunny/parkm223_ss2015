//
//  BlankFrames.h
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "ofMain.h"

class BlankFrames{
public:
    BlankFrames(float xCenter, float yCenter, float zCenter, ofColor frontColor, int boxWidth, int boxHeight, int boxDepth);
    void draw();
    ofColor frontColor;

    int boxWidth, boxHeight, boxDepth;
//
//    ofMesh linesFront;
//    ofMesh linesBack;
//    ofMesh linesLeft;
//    ofMesh linesRight;
//    ofMesh linesTop;
//    ofMesh linesBot;
    
    ofMesh faceFront;
    ofMesh faceBack;
    ofMesh faceLeft;
    ofMesh faceRight;
    ofMesh faceTop;
    ofMesh faceBot;
    
//    bool flipUp = false;
//    bool flipDown = false;
//    bool flipRight = false;
//    bool flipLeft = false;
//    
//    bool rotatable;
    
//    int xRotateState = 0;
//    int yRotateState = 0;
//    int zRotateState = 0;
//    
    float rotatex = 0.0;
    float rotatey = 0.0;
    float rotatez = 0.0;
    
    float xCenter;
    float yCenter;
    float zCenter;
    
    int frameNum;
    
};

