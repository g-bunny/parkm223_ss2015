//
//  Character.h
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "ofMain.h"
#include "Timer.h"

#define MAXIMAGES 8



class Character{
public:
    Character(float x, float y, float z);
    void display();
    void move();
    void jump();
    
    ofImage walk[MAXIMAGES];
    ofImage walkLeft[MAXIMAGES];

    ofVec3f location;
    ofVec3f velocity;
    ofVec3f acceleration;
    
    int imageIndex = 0;
    
    float smallNumber = -150;
    float bigNumber = 150;
    
    float displacementX = 0;
    float displacementY = 0;
    float displacementZ = location.z;
    
    float zeroUpwards;
    
    float movementSpeed = 0;
    float movementSpeedY = 0;
    bool lastMovedRight = false;
    bool lastMovedLeft = false;
    bool afterJump = false;
    bool jumped = false;
    bool justJumped = false;
    
    float characterWidth = 60.0;
    float characterHeight = 120.0;
    
    //float startingXpos = smallNumber + characterWidth/2;
    float startingYpos = bigNumber - characterHeight/2;
    float startingZpos;
    
    bool moveRight = false;
    bool moveLeft = false;
    bool moveUp = false;
    bool moveDown = false;
    
    ofImage jumpingBunny;
    ofImage jumpingBunnyLeft;
    
    bool transported = false;
    
    int shapeMode; // 0 is rect, 1 is circle
    
    float currentYpos = startingYpos;
    
    ofVec3f normalGravity;
    float jumpForce = -7;
    
    Timer * timer;

    float moveForce;
    float gravityForce;

};