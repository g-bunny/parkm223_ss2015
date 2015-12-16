//
//  Timer.h
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "ofMain.h"

class Timer {
public:
    Timer();
    void start();
    void jumpedTime();
    void reset();
    
    float jumpTimer;
    float gameTimer;
    float levelTimer;
    float initialTime;
    float elapsedTime;
};