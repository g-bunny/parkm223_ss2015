//
//  BlankFrames.cpp
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "BlankFrames.h"

BlankFrames::BlankFrames(float xCenter, float yCenter, float zCenter, ofColor frontColor, int boxWidth, int boxHeight, int boxDepth){
    this->frontColor = frontColor;
    faceFront = *new ofMesh();
    faceBack = *new ofMesh();
    faceTop = *new ofMesh();
    faceLeft = *new ofMesh();
    faceRight = *new ofMesh();
    faceLeft = *new ofMesh();
    
    ofVec3f frontTopLeft (-boxWidth/2,-boxHeight/2, boxDepth/2);
    ofVec3f frontTopRight (boxWidth/2,-boxHeight/2, boxDepth/2);
    ofVec3f frontBotLeft (-boxWidth/2, boxHeight/2, boxDepth/2);
    ofVec3f frontBotRight (boxWidth/2, boxHeight/2, boxDepth/2);
    
    ofVec3f backBotRight(boxWidth/2, boxHeight/2, -boxDepth/2);
    ofVec3f backBotLeft(-boxWidth/2, boxHeight/2, -boxDepth/2);
    ofVec3f backTopLeft(- boxWidth/2, -boxHeight/2, -boxDepth/2);
    ofVec3f backTopRight(boxWidth/2, -boxHeight/2, -boxDepth/2);
    faceFront.addVertex(frontTopLeft);
    faceFront.addVertex(frontBotLeft);
    faceFront.addVertex(frontTopRight);
    faceFront.addVertex(frontBotRight);
    faceFront.addVertex(frontTopRight);
    faceFront.addVertex(frontBotLeft);
        //top face
    faceTop.addVertex(frontTopLeft);
    faceTop.addVertex(frontTopRight);
    faceTop.addVertex(backTopRight);
    faceTop.addVertex(frontTopLeft);
    faceTop.addVertex(backTopLeft);
    faceTop.addVertex(backTopRight);
        //bot face
    faceBot.addVertex(frontBotLeft);
    faceBot.addVertex(frontBotRight);
    faceBot.addVertex(backBotRight);
    faceBot.addVertex(frontBotLeft);
    faceBot.addVertex(backBotLeft);
    faceBot.addVertex(backBotRight);
    
    //back face
    faceBack.addVertex(backTopLeft);
    faceBack.addVertex(backBotLeft);
    faceBack.addVertex(backTopRight);
    faceBack.addVertex(backBotRight);
    faceBack.addVertex(backTopRight);
    faceBack.addVertex(backBotLeft);
    
    //right face
    faceRight.addVertex(frontTopRight);
    faceRight.addVertex(frontBotRight);
    faceRight.addVertex(backBotRight);
    faceRight.addVertex(frontTopRight);
    faceRight.addVertex(backTopRight);
    faceRight.addVertex(backBotRight);
    //left face
    faceLeft.addVertex(frontTopLeft);
    faceLeft.addVertex(frontBotLeft);
    faceLeft.addVertex(backBotLeft);
    faceLeft.addVertex(frontTopLeft);
    faceLeft.addVertex(backTopLeft);
    faceLeft.addVertex(backBotLeft);
    

}

void BlankFrames::draw(){
    ofPushMatrix();
    ofTranslate(xCenter,yCenter, zCenter);
    ofRotate(rotatey,0.0,1.0,0.0);
    ofRotate(rotatex,1.0,0.0,0.0);
    ofRotate(rotatez,0.0,0.0,1.0);

    ofSetColor(frontColor);
    faceFront.draw();
    faceLeft.draw();
    faceRight.draw();
    faceFront.draw();
    
    ofPopMatrix();
}

