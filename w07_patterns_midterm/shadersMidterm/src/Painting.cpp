//
//  Painting.cpp
//  shadersMidterm
//
//  Created by Miri Park on 10/28/15.
//
//

#include "Painting.h"

Painting::Painting(float xStart, float xEnd, float yStart, float yEnd, float zStart, float zEnd, int index){
    this->xStart = xStart;
    this->xEnd = xEnd;
    this->yStart = yStart;
    this->yEnd = yEnd;
    this->zStart = zStart;
    this->zEnd = zEnd;
    
    this->index = index;
    
    if (index ==1){
        shader.load("", "patterns_attempt8PlsFunction4.frag");
    } else if (index ==3){
        shader.load("", "CoolPaintMarks3.frag");
    } else if (index ==2){
        shader.load("", "singleMark_rotated.frag");
    } else if (index == 4){
        shader.load("","strokesMonochrome.frag");
    } else if (index == 5){
        shader.load("","strokesGreenYellow.frag");
    } else if (index == -5){
        shader.load("","dynamicStrokesGreenYellow.frag");
    } else if (index == 10){
        shader.load("", "wood.frag");
    }
    plainCanvas.load("", "patterns_attempt8.frag");
}

void Painting::draw(){
//    cam.begin();
    
    if (index == 10){
            shader.begin();

        glBegin(GL_QUADS);
        glColor3f(1.,0.,0.);
        glTexCoord2f(0., 0.);
        glVertex3f(xStart, yEnd, zStart);
        
        glColor3f(1.,1.,0.);
        glTexCoord2f(0., 1.);
        glVertex3f(xStart,yEnd,zEnd);
        
        glColor3f(0.,1.,0.);
        glTexCoord2f(1., 1.);
        glVertex3f(xEnd,yEnd,zEnd);
        
        glColor3f(1.,0.,1.);
        glTexCoord2f(1., 0.);
        glVertex3f(xEnd,yEnd,zStart);
        glEnd();
            shader.end();
        
    }
    else {
    shader.begin();
    
    shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    //    shader.setUniform2f("u_mouse", mouseX / ofGetWidth(), mouseY / ofGetHeight());
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xStart, yStart, zStart);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xEnd,yStart,zStart);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xEnd,yEnd,zStart);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xStart,yEnd,zStart);
    glEnd();
    shader.end();
    
    //right side
    plainCanvas.begin();
    plainCanvas.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    plainCanvas.setUniform1f("u_time", ofGetElapsedTimef());
    
    if (index ==1){
        shader.begin();
    }
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xEnd, yEnd, zStart);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xEnd,yEnd,zEnd);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xEnd,yStart,zEnd);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xEnd,yStart,zStart);
    glEnd();
    
    if (index ==1){
        shader.end();
    }

    //left side
    if (index ==4){
        shader.begin();
    }
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xStart, yStart, zStart);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xStart,yStart,zEnd);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xStart,yEnd,zEnd);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xStart,yEnd,zStart);
    glEnd();
    if (index ==4){
        shader.end();
    }

    //    //bot side
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xEnd, yStart, zStart);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xEnd,yStart,zEnd);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xStart,yStart,zEnd);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xStart,yStart,zStart);
    glEnd();

    //    //top side
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xStart, yEnd, zStart);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xStart,yEnd,zEnd);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xEnd,yEnd,zEnd);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xEnd,yEnd,zStart);
    glEnd();
    plainCanvas.end();
}
//    cam.end();
}

void Painting::update(){
    
}