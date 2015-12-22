#pragma once

#include "ofMain.h"
#include "FrameShapes.h"
#include "BlankFrames.h"
#include "Character.h"

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
    
    const ofColor lavender = ofColor(176,183,255); //0.69, 0.7176, 1.0
    const ofColor blue = ofColor(178,255,233); //0.698, 1.0, 0.9137
    const ofColor red = ofColor(242,105,105); // 0.949, 0.4118, 0.4118
    const ofColor white = ofColor(255,255,255);
    const ofColor black = ofColor(0);
    FrameShapes * firstFrame;
    FrameShapes * secondFrame;
    FrameShapes * thirdFrame;
    FrameShapes * fourthFrame;
    
    FrameShapes * bgFrame;
    BlankFrames * blank1;
    BlankFrames * blank2;
    BlankFrames * blank3;
    BlankFrames * blank4;
    
    Character * one;
		
//public: int bgActiveGlitch = 0;
};
