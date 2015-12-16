//
//  FrameShapes.h
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "ofMain.h"
#include "glitchSurface.h"

class FrameShapes{
public:
    FrameShapes(float xCenter, float yCenter, float zCenter, int frameNum, ofColor frontColor, ofColor sideColor, ofColor topColor, int boxWidth, int boxHeight, int boxDepth, bool rotatable);
    void draw();
    void rotateMe();
    ofColor frontColor;
    ofColor sideColor;
    ofColor topColor;
    int boxWidth, boxHeight, boxDepth;
    float speedOfRotation;
    
    ofMesh linesFront;
    ofMesh linesBack;
    ofMesh linesLeft;
    ofMesh linesRight;
    ofMesh linesTop;
    ofMesh linesBot;
    
    ofMesh faceFront;
    ofMesh faceBack;
    ofMesh faceLeft;
    ofMesh faceRight;
    ofMesh faceTop;
    ofMesh faceBot;
    bool flipUp = false;
    bool flipDown = false;
    bool flipRight = false;
    bool flipLeft = false;
    
    bool rotatable;
    
    int xRotateState = 0;
    int yRotateState = 0;
    int zRotateState = 0;
    
    float rotatex = 0.0;
    float rotatey = 0.0;
    float rotatez = 0.0;
    
    float xCenter;
    float yCenter;
    float zCenter;
    
    int frameNum;
    
    glitchSurface * frontFace;
};

