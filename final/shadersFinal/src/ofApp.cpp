#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofBackground(255,255,255);
    ofEnableDepthTest();
    ofEnableAlphaBlending();
    ofDisableArbTex();
    
    this->firstFrame = new FrameShapes(ofGetWidth() * .25, ofGetHeight() * .25, 0, 1, lavender, lavender, red, 200, 200, 200, true);
    //this->secondFrame = new FrameShapes(ofGetWidth() * .5, ofGetHeight() * .25, 0, 3, lavender, blue, red, 200, 200, 200, true);
    this->secondFrame = new FrameShapes(ofGetWidth() * .5, ofGetHeight() * .25, 0, 2, lavender, blue, red, 200, 200, 200, false);
    this->thirdFrame = new FrameShapes(ofGetWidth() * .75, ofGetHeight() * .25, 0, 3, lavender, red, blue, 200, 200, 200, false);
    this->fourthFrame = new FrameShapes(ofGetWidth() * .5, ofGetHeight() * .75, 0, 4, blue, lavender, red, 800, 200, 200, false);
    
    this->bgFrame = new FrameShapes(ofGetWidth() * .5, ofGetHeight() * .5, -200, 100, white, white, white, 1384, 868, 100, false);
    
    this->blank1 = new BlankFrames(100, 100, -10, white, 100, 100, 10);
    
    this->one = new Character(376,201,201);

}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){


    bgFrame->draw();
    
    firstFrame->draw();
    firstFrame -> rotatable = true;
    firstFrame->rotateMe();
    
    secondFrame->draw();
    secondFrame -> rotatable = true;
    secondFrame->rotateMe();
    
    thirdFrame->draw();
    thirdFrame -> rotatable = true;
    thirdFrame->rotateMe();
    fourthFrame->draw();
    fourthFrame->rotateMe();
    
    blank1->draw();
    
    one->display();
    one->move();
    one->jump();
    
    cout <<"one is at: "<<one->location << endl;
    cout <<"bg glitch? " << bgFrame->frontFace->bgActiveGlitch << endl;
    if (one->location.x <320 || one->location.x >1034){
        bgFrame->frontFace->bgActiveGlitch = 1;
    } else if(one->location.x >446 && one->location.x < 565){
        bgFrame->frontFace->bgActiveGlitch = 1;
    } else if (one->location.x >740 && one->location.x < 859){
        bgFrame->frontFace->bgActiveGlitch = 1;
    } else {
        bgFrame->frontFace->bgActiveGlitch = 0;
    }
    
    if (one->location.x >320 || one->location.x <446){
        firstFrame->rotatable = true;
        secondFrame->rotatable = false;
        thirdFrame->rotatable = false;
    } else if(one->location.x >565 && one->location.x < 740){
        secondFrame->rotatable = true;
        firstFrame->rotatable = false;
        thirdFrame->rotatable = false;
    } else if (one->location.x >859 && one->location.x < 1034){
        thirdFrame->rotatable = true;
        secondFrame->rotatable = false;
        firstFrame->rotatable = false;
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if (key == OF_KEY_RIGHT){
        one->moveRight = true;
    }
    if (key == OF_KEY_LEFT){
        one->moveLeft = true;
     }
    if (key == OF_KEY_UP){
        one->moveUp = true;
    }
    if (key == OF_KEY_DOWN){
        one->moveDown = true;
    }
    if (key == OF_KEY_RIGHT_SHIFT){
        one->jumped = true;
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    if (key == 'd'){
        firstFrame->flipRight = true;
        secondFrame->flipRight = true;
        thirdFrame->flipRight = true;

    }
    if (key == 'a'){
        firstFrame->flipLeft = true;
        secondFrame->flipLeft = true;
        thirdFrame->flipLeft = true;

    }
    if (key == 'w'){
        firstFrame->flipUp = true;
        secondFrame->flipUp = true;
        thirdFrame->flipUp = true;

    }
    if (key == 's'){
        firstFrame->flipDown = true;
        secondFrame->flipDown = true;
        thirdFrame->flipDown = true;

    }
    
    if (key == OF_KEY_RIGHT){
        one->moveRight = false;
    }
    if (key == OF_KEY_LEFT){
        one->moveLeft = false;
        
    }
    if (key == OF_KEY_UP){
        one->moveUp = false;
    }
    if (key == OF_KEY_DOWN){
        one->moveDown = false;
    }
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
