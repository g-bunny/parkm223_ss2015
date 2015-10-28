#include "ofApp.h"

void ofApp::setup(){
    ofBackground(235,235,235);
    ofEnableDepthTest();
    ofEnableAlphaBlending();
    //    shader.load("", "patterns_attempt8PlsFunction4.frag");
    //    plainCanvas.load("", "patterns_attempt8.frag");
    this->firstPainting = new Painting(-600., -200., -200., 200., 1);
    this->secPainting = new Painting(-100, 300, -200, 200, 2);
    this->thirdPainting = new Painting(400, 700, -150, 150, 3);
}


//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    firstPainting->draw();
    secPainting->draw();
    thirdPainting->draw();
}
//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

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
