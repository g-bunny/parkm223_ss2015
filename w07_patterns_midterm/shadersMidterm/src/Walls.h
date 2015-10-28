//
//  Walls.h
//  shadersMidterm
//
//  Created by Miri Park on 10/28/15.
//
//

#include "ofMain.h"
#include "Painting.h"


class Walls{
public:
    Walls(ofColor frontColor, ofColor sideColor, ofColor topColor, int boxWidth, int boxHeight, int boxDepth);
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
    
    int xRotateState = 0;
    int yRotateState = 0;
    int zRotateState = 0;
    
    float rotatex = 0.0;
    float rotatey = 0.0;
    float rotatez = 0.0;

    Painting * firstPainting;
    Painting * firstDynamic;
    Painting * secPainting;
    Painting * thirdPainting;
    Painting * fourthPainting;
    Painting * fifthPainting;
    Painting * fifthDynamic;
    
    Painting * floor;

    ofEasyCam cam;

};