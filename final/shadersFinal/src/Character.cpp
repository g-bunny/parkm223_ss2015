
//
//  Character.cpp
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "Character.h"

Character::Character(float x, float y, float z){
    location.x = x;
    location.y = y;
    location.z = z;
    this->timer = new Timer();
    normalGravity = ofVec3f(0, 70.0, 0);
    startingYpos = location.y;
    
    walk[0].loadImage("bunnySprite0.png");
    walk[1].loadImage("bunnySprite1.png");
    walk[2].loadImage("bunnySprite2.png");
    walk[3].loadImage("bunnySprite3.png");
    walk[4].loadImage("bunnySprite4.png");
    walk[5].loadImage("bunnySprite5.png");
    walk[6].loadImage("bunnySprite6.png");
    walk[7].loadImage("bunnySprite7.png");
    
    walkLeft[0].loadImage("bunnySpriteLeft0.png");
    walkLeft[1].loadImage("bunnySpriteLeft1.png");
    walkLeft[2].loadImage("bunnySpriteLeft2.png");
    walkLeft[3].loadImage("bunnySpriteLeft3.png");
    walkLeft[4].loadImage("bunnySpriteLeft4.png");
    walkLeft[5].loadImage("bunnySpriteLeft5.png");
    walkLeft[6].loadImage("bunnySpriteLeft6.png");
    walkLeft[7].loadImage("bunnySpriteLeft7.png");
    
    jumpingBunny.loadImage("jumpingBunny.png");
    //jumpingBunnyLeft.loadImage("jumpingBunnyLeft.png");
}

void Character::display(){
    if (justJumped != true){
        timer->start();
    }
    ofSetColor(255,255,255);
        if (ofGetFrameNum() % 7 == 0){
            imageIndex = (imageIndex + 1) % MAXIMAGES;
            location.x += movementSpeed;
            location.y += movementSpeedY;
                    }
        

            ofTranslate(0,0,location.z + displacementZ);
            ///////////////////right
            if (moveRight == true){
                movementSpeed = 7;
                if (justJumped == false) {
                    walk[imageIndex].draw(location.x, location.y, characterWidth, characterHeight);
                    lastMovedRight = true;
                    lastMovedLeft = false;
                }
                /////////////////////right + jump
                if (justJumped == true) {
                    afterJump = false;
                    lastMovedRight = true;
                    movementSpeed = 12;
                    jumpingBunny.draw(location.x, location.y, characterWidth + 15, characterHeight - 10);
                    timer->jumpedTime();
                    location.y = location.y + jumpForce +(normalGravity.y)*(timer->jumpTimer*timer->jumpTimer);
                    if (location.y >= startingYpos) {
                        justJumped = false;
                        afterJump = true;
                    }
                }
            }
            /////////////////////left
            if (moveLeft == true) {
                movementSpeed = -7;
                if (justJumped == false){
                    walkLeft[imageIndex].draw(location.x, location.y, characterWidth, characterHeight);
                    moveRight = false;
                    lastMovedRight = false;
                    lastMovedLeft = true;
                }
                if (justJumped == true){
                    afterJump = false;
                    lastMovedLeft = true;
                    movementSpeed = -12;
                    jumpingBunny.draw(location.x, location.y, characterWidth + 15, characterHeight - 10);
                    timer->jumpedTime();
                    location.y =location.y + jumpForce +(normalGravity.y)*(timer->jumpTimer*timer->jumpTimer);
                    if (location.y >= startingYpos) {
                        justJumped = false;
                        afterJump = true;
                    }
                }
            }
            /////////////////////standing still facing right
            if (moveRight == false && moveLeft == false && moveUp == false && moveDown == false && justJumped == false && lastMovedRight == true) {
                movementSpeed = 0;
                walk[0].draw(location.x, location.y, characterWidth, characterHeight);
            }
            //////standing still facing left
            if (moveRight == false && moveLeft == false && moveUp == false && moveDown == false && justJumped == false && lastMovedLeft == true) {
                movementSpeed = 0;
                walkLeft[0].draw(location.x, location.y, characterWidth, characterHeight);
            }
            /////////////////////standing still start
            if (moveRight == false && moveLeft == false && moveUp == false && moveDown == false && lastMovedRight == false && lastMovedLeft == false) {
                movementSpeed = 0;
                walkLeft[0].draw(location.x, location.y, characterWidth, characterHeight);
            }
            
            
            //////////JUMP
            ///facing right
            if (justJumped == true && lastMovedRight == true && moveRight == false) {
                afterJump = false;
                jumpingBunny.draw(location.x, location.y, characterWidth + 15, characterHeight - 10);
                timer->jumpedTime();
                location.y = location.y + jumpForce + (normalGravity.y)*(timer->jumpTimer * timer->jumpTimer);
                if (location.y >= startingYpos) {
                    justJumped = false;
                    afterJump = true;
                }
            }
            //////////JUMP
            ///facing left
            if (justJumped == true && lastMovedLeft == true && moveLeft == false){
                afterJump = false;
                jumpingBunny.draw(location.x, location.y, characterWidth + 15, characterHeight - 10);
                timer->jumpedTime();
                location.y = location.y + jumpForce + (normalGravity.y)*(timer->jumpTimer * timer->jumpTimer);
                if (location.y >= startingYpos) {
                    justJumped = false;
                    afterJump = true;
                }
            }
            if (afterJump == true) {
                cout << "working" << endl;
                timer->reset();
                location.y = startingYpos;
                timer->reset();
                walk[0].draw(location.x, location.y, characterWidth, characterHeight);
                justJumped = false;
                afterJump = false;
            }
        
        if (transported == true){
            location.y = 550;
            startingYpos = 550;
            currentYpos = 550;
            //        transported = false;
        }
    }


void Character::move(){
    if (moveRight == true){
        displacementX += movementSpeed;
        displacementY += movementSpeedY;
    }
    if (moveLeft == true){
        displacementX -= movementSpeed;
        displacementY -= movementSpeedY;
    }
}

void Character::jump(){
    if (jumped==true) {
        justJumped = true;
        jumped = false;
        timer->jumpedTime();
        //        if (location.y >= startingYpos){
        //            location.y = startingYpos;
        //        }
    }
    
}
