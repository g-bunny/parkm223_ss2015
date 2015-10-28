#include "ofApp.h"

void ofApp::setup(){
    ofBackground(235,235,235);
    ofEnableDepthTest();
    ofEnableAlphaBlending();
    //    shader.load("", "patterns_attempt8PlsFunction4.frag");
    //    plainCanvas.load("", "patterns_attempt8.frag");
//    this->firstPainting = new Painting(-600., -200., -200., 200., 1);
//    this->secPainting = new Painting(-100, 200, -150, 150, 2);
//    this->thirdPainting = new Painting(300, 700, -200, 200, 3);
//    this->fourthPainting = new Painting(800, 1100, -150, 150, 4);
//    this->fifthPainting = new Painting(1200, 1600, -225, 225, 5);
    this->gallery = new Walls(wallColor,wallColor, wallColor, 1500, 900, 1000);

}


//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    gallery->draw();
//    firstPainting->draw();
//    secPainting->draw();
//    thirdPainting->draw();
//    fourthPainting->draw();
//    fifthPainting->draw();
}
//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    if (key == 'd'){
            gallery->flipRight = true;
    }
    if (key == 'a'){
            gallery->flipLeft = true;
    }
    if (key == 'w'){
            gallery->flipUp = true;
    }
    if (key == 's'){
            gallery->flipDown = true;
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
