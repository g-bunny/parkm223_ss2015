//
//  Walls.cpp
//  shadersMidterm
//
//  Created by Miri Park on 10/28/15.
//
//

#include "Walls.h"



Walls::Walls(ofColor frontColor, ofColor sideColor, ofColor topColor, int boxWidth, int boxHeight, int boxDepth){
    this->frontColor = frontColor;
    this->sideColor = sideColor;
    this->topColor = topColor;
    this->boxWidth = boxWidth;
    this->boxHeight = boxHeight;
    this->boxDepth = boxDepth;
    
    speedOfRotation = 4.0;
    faceFront = *new ofMesh();
    faceBack = *new ofMesh();
    faceTop = *new ofMesh();
    faceLeft = *new ofMesh();
    faceRight = *new ofMesh();
    faceLeft = *new ofMesh();
    
    linesFront = *new ofMesh();
    linesBack = *new ofMesh();
    linesTop = *new ofMesh();
    linesLeft = *new ofMesh();
    linesRight = *new ofMesh();
    linesLeft = *new ofMesh();
    
    linesFront.setMode(OF_PRIMITIVE_LINE_STRIP);
    linesBack.setMode(OF_PRIMITIVE_LINE_STRIP);
    linesLeft.setMode(OF_PRIMITIVE_LINE_STRIP);
    linesRight.setMode(OF_PRIMITIVE_LINE_STRIP);
    linesTop.setMode(OF_PRIMITIVE_LINE_STRIP);
    linesBot.setMode(OF_PRIMITIVE_LINE_STRIP);
    
    ofVec3f frontTopLeft (-boxWidth/2,-boxHeight/2, boxDepth/2);
    ofVec3f frontTopRight (boxWidth/2,-boxHeight/2, boxDepth/2);
    ofVec3f frontBotLeft (-boxWidth/2, boxHeight/2, boxDepth/2);
    ofVec3f frontBotRight (boxWidth/2, boxHeight/2, boxDepth/2);
    
    ofVec3f backBotRight(boxWidth/2, boxHeight/2, -boxDepth/2);
    ofVec3f backBotLeft(-boxWidth/2, boxHeight/2, -boxDepth/2);
    ofVec3f backTopLeft(- boxWidth/2, -boxHeight/2, -boxDepth/2);
    ofVec3f backTopRight(boxWidth/2, -boxHeight/2, -boxDepth/2);
    
    //    mesh.addVertex(frontTopLeft);
    //    mesh.addVertex(frontTopRight);
    //    mesh.addVertex(frontBotRight);
    //    mesh.addVertex(frontBotLeft);
    //    mesh.addVertex(frontTopLeft);
    //    mesh.addVertex(backTopLeft);
    //    mesh.addVertex(backBotLeft);
    //    mesh.addVertex(frontBotLeft);
    //    mesh.addVertex(frontBotRight);
    //    mesh.addVertex(backBotRight);
    //    mesh.addVertex(backBotLeft);
    //    mesh.addVertex(backTopLeft);
    //    mesh.addVertex(backTopRight);
    //    mesh.addVertex(backBotRight);
    //    mesh.addVertex(backTopRight);
    //    mesh.addVertex(frontTopRight);
    
    //front face
    faceFront.addVertex(frontTopLeft);
    faceFront.addVertex(frontBotLeft);
    faceFront.addVertex(frontTopRight);
    faceFront.addVertex(frontBotRight);
    faceFront.addVertex(frontTopRight);
    faceFront.addVertex(frontBotLeft);
    
    linesFront.addVertex(frontTopLeft);
    linesFront.addVertex(frontTopRight);
    linesFront.addVertex(frontBotRight);
    linesFront.addVertex(frontBotLeft);
    linesFront.addVertex(frontTopLeft);
    //top face
    faceTop.addVertex(frontTopLeft);
    faceTop.addVertex(frontTopRight);
    faceTop.addVertex(backTopRight);
    faceTop.addVertex(frontTopLeft);
    faceTop.addVertex(backTopLeft);
    faceTop.addVertex(backTopRight);
    
    linesTop.addVertex(frontTopLeft);
    linesTop.addVertex(frontTopRight);
    linesTop.addVertex(backTopRight);
    linesTop.addVertex(backTopLeft);
    linesTop.addVertex(frontTopLeft);
    //bot face
    faceBot.addVertex(frontBotLeft);
    faceBot.addVertex(frontBotRight);
    faceBot.addVertex(backBotRight);
    faceBot.addVertex(frontBotLeft);
    faceBot.addVertex(backBotLeft);
    faceBot.addVertex(backBotRight);
    
    linesBot.addVertex(frontBotRight);
    linesBot.addVertex(frontBotLeft);
    linesBot.addVertex(backBotLeft);
    linesBot.addVertex(backBotRight);
    linesBot.addVertex(frontBotRight);
    
    //back face
    faceBack.addVertex(backTopLeft);
    faceBack.addVertex(backBotLeft);
    faceBack.addVertex(backTopRight);
    faceBack.addVertex(backBotRight);
    faceBack.addVertex(backTopRight);
    faceBack.addVertex(backBotLeft);
    
    linesBack.addVertex(backBotRight);
    linesBack.addVertex(backBotLeft);
    linesBack.addVertex(backTopLeft);
    linesBack.addVertex(backTopRight);
    linesBack.addVertex(backBotRight);
    //right face
    faceRight.addVertex(frontTopRight);
    faceRight.addVertex(frontBotRight);
    faceRight.addVertex(backBotRight);
    faceRight.addVertex(frontTopRight);
    faceRight.addVertex(backTopRight);
    faceRight.addVertex(backBotRight);
    linesRight.addVertex(backBotRight);
    linesRight.addVertex(backTopRight);
    linesRight.addVertex(frontTopRight);
    linesRight.addVertex(frontBotRight);
    linesRight.addVertex(backBotRight);
    //left face
    faceLeft.addVertex(frontTopLeft);
    faceLeft.addVertex(frontBotLeft);
    faceLeft.addVertex(backBotLeft);
    faceLeft.addVertex(frontTopLeft);
    faceLeft.addVertex(backTopLeft);
    faceLeft.addVertex(backBotLeft);
    linesLeft.addVertex(backBotLeft);
    linesLeft.addVertex(backTopLeft);
    linesLeft.addVertex(frontTopLeft);
    linesLeft.addVertex(frontBotLeft);
    linesLeft.addVertex(backBotLeft);
    
    this->firstPainting = new Painting(-boxWidth/2 + 100, boxWidth/8 - 100, -boxHeight/2 + 100, boxHeight/2 - 100, -boxDepth/2 + 50, -boxDepth/2, 1);
//    this->secPainting = new Painting(-100, 200, -150, 150, 2);
//    this->thirdPainting = new Painting(300, 700, -200, 200, 3);
//    this->fourthPainting = new Painting(800, 1100, -150, 150, 4);
//    this->fifthPainting = new Painting(1200, 1600, -225, 225, 5);

    
}

void Walls::draw(){

    ofPushMatrix();
    ofTranslate(ofGetWidth()/2,ofGetHeight()/2);
    ofRotate(rotatey,0.0,1.0,0.0);
    ofRotate(rotatex,1.0,0.0,0.0);
    ofRotate(rotatez,0.0,0.0,1.0);
    
//    if (perspectiveMode == 1){
//        ofSetColor(frontColor);
//        faceBack.draw();
        ofSetColor(0,0,0);
        linesBack.draw();
    firstPainting->draw();

//        ofSetColor(topColor);
//        faceTop.draw();
        ofSetColor(0,0,0);
        linesTop.draw();
        
        ofSetColor(sideColor);
//        faceLeft.draw();
        ofSetColor(0,0,0);
        ofSetColor(sideColor);
//        faceRight.draw();
        ofSetColor(0,0,0);
    
        ofSetColor(topColor);
        faceBot.draw();
        ofSetColor(0,0,0);
        linesBot.draw();
    linesLeft.draw();
    linesRight.draw();


    
//        ofSetColor(frontColor);
//        faceFront.draw();
//        ofSetColor(0,0,0);
        linesFront.draw();
//    secPainting->draw();
//    thirdPainting->draw();
//    fourthPainting->draw();
//    fifthPainting->draw();

    ofPopMatrix();
    rotateMe();
    cam.end();
//
}

void Walls::rotateMe(){
    if (flipUp == true){
        if (xRotateState == 0){
            rotatex -= speedOfRotation;
            if (rotatex <= -90){
                rotatex = -90;
                flipUp = false;
                xRotateState = 1;
            }
        }
        else if (xRotateState == 1){
            rotatex -= speedOfRotation;
            if (rotatex <= -180){
                rotatex = -180;
                flipUp = false;
                xRotateState = 2;
            }
        }
        else if (xRotateState == 2){
            rotatex -= speedOfRotation;
            if (rotatex <= -270){
                rotatex = -270;
                flipUp = false;
                xRotateState = 3;
            }
        }
        else if (xRotateState == 3){
            rotatex -= speedOfRotation;
            if (rotatex <= -360){
                rotatex = 0;
                flipUp = false;
                xRotateState = 0;
            }
        }
    }
    if (flipDown == true){
        if (xRotateState ==0){
            rotatex += speedOfRotation;
            if(rotatex >=90){
                rotatex = -270;
                flipDown = false;
                xRotateState = 3;
            }
        }
        else if(xRotateState == 3){
            rotatex += speedOfRotation;
            if(rotatex >= -180){
                rotatex = -180;
                flipDown = false;
                xRotateState = 2;
            }
        }
        else if(xRotateState == 2){
            rotatex += speedOfRotation;
            if (rotatex >= -90){
                rotatex = -90;
                flipDown = false;
                xRotateState = 1;
            }
        }
        else if(xRotateState == 1){
            rotatex +=speedOfRotation;
            if (rotatex >=0){
                rotatex = 0;
                flipDown = false;
                xRotateState = 0;
            }
        }
    }
    if (flipLeft == true){
        if (yRotateState ==0){
            rotatey += speedOfRotation;
            if(rotatey >=90){
                rotatey = -270;
                flipLeft = false;
                yRotateState = 3;
            }
        }
        else if(yRotateState == 3){
            rotatey += speedOfRotation;
            if(rotatey >= -180){
                rotatey = -180;
                flipLeft = false;
                yRotateState = 2;
            }
        }
        else if(yRotateState == 2){
            rotatey += speedOfRotation;
            if (rotatey >= -90){
                rotatey = -90;
                flipLeft = false;
                yRotateState = 1;
            }
        }
        else if(yRotateState == 1){
            rotatey +=speedOfRotation;
            if (rotatey >=0){
                rotatey = 0;
                flipLeft = false;
                yRotateState = 0;
            }
        }
    }
    if (flipRight == true){
        if (yRotateState == 0){
            rotatey -= speedOfRotation;
            if (rotatey <= -90){
                rotatey = -90;
                flipRight = false;
                yRotateState = 1;
            }
        }
        else if (yRotateState == 1){
            rotatey -= speedOfRotation;
            if (rotatey <= -180){
                rotatey = -180;
                flipRight = false;
                yRotateState = 2;
            }
        }
        else if (yRotateState == 2){
            rotatey -= speedOfRotation;
            if (rotatey <= -270){
                rotatey = -270;
                flipRight = false;
                yRotateState = 3;
            }
        }
        else if (yRotateState == 3){
            rotatey -= speedOfRotation;
            if (rotatey <= -360){
                rotatey = 0;
                flipRight = false;
                yRotateState = 0;
            }
        }
    }
}

