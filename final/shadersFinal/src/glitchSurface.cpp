//
//  glitchSurface.cpp
//  shadersFinal
//
//  Created by Miri Park on 12/16/15.
//
//

#include "glitchSurface.h"

glitchSurface::glitchSurface( float xStart, float xEnd, float yStart, float yEnd, float zStart, float zEnd, int index){
    this->xStart = xStart;
    this->xEnd = xEnd;
    this->yStart = yStart;
    this->yEnd = yEnd;
    this->zStart = zStart;
    this->yEnd = yEnd;
    this->index = index;
    
    if(index == 1){
        shader.load("", "shaders/circuitry17.frag");
        cout<<"shader 1 loaded"<<endl;
    }
    else if (index == 2){
        shader.load("", "shaders/circuitry15.frag");
        cout <<"shader 2 loaded"<<endl;
    }
    else if(index == 3){
        shader.load("", "shaders/circuitryCircles.frag");
        cout<<"shader 3 loaded"<<endl;

    } else if(index == 4){
        shader.load("", "shaders/circuitry7.frag");
        cout<<"shader 4 loaded"<<endl;

    }
    else if(index == 100){
        bgShader.load("", "shaders/white_glitch.frag");
        cout<<"shader 100 loaded"<<endl;
    }
}

void glitchSurface::draw(){

    if(index ==1 || index ==3 || index ==4){
        shader.begin();
        shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
        shader.setUniform1f("u_time", ofGetElapsedTimef());
    } else if( index ==2){
        shader.begin();
        shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
        shader.setUniform1f("u_time", ofGetElapsedTimef());
    }
    
    else if(index ==100){
        bgShader.begin();
        bgShader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
        bgShader.setUniform1f("u_time", ofGetElapsedTimef());
        bgShader.setUniform1i("activate", bgActiveGlitch);
    }
    
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
    
    if(index ==1 || index ==3 || index ==4){
        shader.end();
    } else if (index ==2){
        shader.end();
    }else if(index == 100){
        bgShader.end();
    }
    

}