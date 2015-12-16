//
//  Timer.cpp
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "Timer.h"

Timer::Timer(){
}
void Timer::start(){
    initialTime = ofGetElapsedTimef();

}
void Timer::jumpedTime(){
    jumpTimer = ofGetElapsedTimef() - initialTime;
}
void Timer::reset(){
    initialTime = ofGetElapsedTimef();
}