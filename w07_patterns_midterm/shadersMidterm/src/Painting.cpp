//
//  Painting.cpp
//  shadersMidterm
//
//  Created by Miri Park on 10/28/15.
//
//

#include "Painting.h"

Painting::Painting(float xStart, float xEnd, float yStart, float yEnd, int index){
    this->xStart = xStart;
    this->xEnd = xEnd;
    this->yStart = yStart;
    this->yEnd = yEnd;
    this->index = index;
    
    if (index ==1){
        shader.load("", "patterns_attempt8PlsFunction4.frag");
    } else if (index ==2){
        shader.load("", "CoolPaintMarks3.frag");
    } else if (index ==3){
        shader.load("", "singleMark_rotated.frag");
    }
    plainCanvas.load("", "patterns_attempt8.frag");
}

void Painting::draw(){
    cam.begin();
    
    shader.begin();
    shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    //    shader.setUniform2f("u_mouse", mouseX / ofGetWidth(), mouseY / ofGetHeight());
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xStart, yStart, 0);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xEnd,yStart,0);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xEnd,yEnd,0);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xStart,yEnd,0);
    glEnd();
    shader.end();
    
    //right side
    plainCanvas.begin();
    plainCanvas.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    plainCanvas.setUniform1f("u_time", ofGetElapsedTimef());
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xEnd, yEnd, 0);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xEnd,yEnd,-50);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xEnd,yStart,-50);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xEnd,yStart,0);
    glEnd();

    //    //left side
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xStart, yStart, 0);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xStart,yStart,-50);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xStart,yEnd,-50);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xStart,yEnd,0);
    glEnd();

    //    //bot side
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xEnd, yStart, 0);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xEnd,yStart,-50);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xStart,yStart,-50);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xStart,yStart,0);
    glEnd();

    //    //top side
    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(0., 1.);
    glVertex3f(xStart, yEnd, 0);
    
    glColor3f(1.,1.,0.);
    glTexCoord2f(1., 1.);
    glVertex3f(xStart,yEnd,-50);
    
    glColor3f(0.,1.,0.);
    glTexCoord2f(1., 0.);
    glVertex3f(xEnd,yEnd,-50);
    
    glColor3f(1.,0.,1.);
    glTexCoord2f(0., 0.);
    glVertex3f(xEnd,yEnd,0);
    glEnd();
    plainCanvas.end();
    cam.end();
}

void Painting::update(){
    
}