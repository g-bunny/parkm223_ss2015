
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
vec2 tile(vec2 st, float zoom){
    st *= zoom;
        if (mod(floor(st.x), 2.) == 0.){
        st = rotate2D(st, PI*.5);
    }
    return fract(st);
}
float ovalGradient(vec2 st, float radius, float xPos) {
    // return distance(st,vec2(0.5))/3.0;
    return smoothstep(radius- .1, radius + .9, 1. -length(st - .5));
}
float threadedEdges(vec2 st, float width){
    return 1.0 - smoothstep(0., 0.1, st.x) + smoothstep(0.9, 1.0, st.x);
}
vec3 canvasPattern(vec2 st, float width, float radius, float xPos){
    vec3 color = vec3(0.);
    st *= 100.;
    st.x *= .5;
    
    vec2 st_i = floor(st);

    if (mod(st_i.y,2.) == 1.) {
        st.x -= .5;
    }
    vec2 st_f = fract(st);
    color.r = 214.0/255.0;
    color.g = 206.0/255.0;
    color.b = 192.0/255.0;
    
    float pct = threadedEdges(st_f, width);
    pct += ovalGradient(st_f,radius, xPos);
    color += pct;

    return color;
}

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 0.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}

float circlePattern(vec2 st, float radius) {
    return  circle(st+vec2(0.,-.5), radius)+
            circle(st+vec2(0.,.5), radius)+
            circle(st+vec2(-.5,0.), radius)+
            circle(st+vec2(.5,0.), radius);
}
float splatter(vec2 st, float radius){
    
    st -= .5;
    float pct = smoothstep(radius, radius -.01, length(st));
    st.x -= .18;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st.x += .36;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st.y -= .15;
    st.x -= .09;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st.x -= .21;
    st.y += .03;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st += .3;
        pct += smoothstep(radius*.3, radius*.3 - .01, length(st));
    st += .1;
        pct += smoothstep(radius*.2, radius*.2 - .01, length(st));
    st += .05;
        pct += smoothstep(radius*.3, radius*.3 - .01, length(st));
    st.x +=.1;
        pct += smoothstep(radius*.2, radius*.2 - .01, length(st));
    return pct;
}

float proceduralSplatter(vec2 st, float radius, float numCircles){
    float pct = 0.;
    st.x -= .5;
    for (float i = 1.; i < numCircles; i++){
        st.y -=(.3 / (i+1.));
        pct +=smoothstep(radius * 1./i, radius * 1./i - .1, length(st));
    }
    return pct;
}

float splatterPattern(vec2 st, float radius){
    return splatter(st + vec2(0., -.1), radius + .1) +
            splatter(st + vec2(0., -.2), radius - .1) +
            splatter(st + vec2(-.1, 0.), radius + .2) +
            splatter(st + vec2(-.2, 0.), radius - .2) ;
}


float procSplatterPattern(vec2 st, float radius, float numCircles){
    return proceduralSplatter(st + vec2(0., -.1), radius + .05, 9.) +
            proceduralSplatter(st + vec2(0., -.2), radius - .05, 8.) +
            proceduralSplatter(st + vec2(-.1, 0.), radius + .1, 7.) +
            proceduralSplatter(st + vec2(-.2, 0.), radius - .1, 6.) ;
}
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec4 color = vec4(canvasPattern(st, .1, .5, .1), 1.0);

    vec2 grid = tile(st,3.);
    grid.x += .3;
    grid.y -= .52;
    color = mix(color, vec4(0.1,0.2,0.802, 1.0), procSplatterPattern(grid, .2, 13.));    

    vec2 grid1 = tile(st,2.);
    grid1.x += .10;
    grid1.y -= .10;
    color = mix(color, vec4(0.52,0.,0.102, 1.), proceduralSplatter(grid1, .2, 10.));    
    
    // vec2 grid2 = tile(st,4.);
    // grid2.y -= .61;
    // grid2.x -= .1;
    // color = mix(color, vec4(0.9,0.22,0.702, .9), procSplatterPattern(grid2, .1, 10.));
    
    vec2 grid3 = tile(st, 3.0);
    grid3 -= .2;
    color = mix(color, vec4(0.1, 0.3, 0.3, .9), proceduralSplatter(grid3, .2, 9.));

    vec2 grid4 = tile(st, 4.0);
    grid4.y -= .3;
    color = mix(color, vec4(0.2, 0.620, 0.8, 1.), proceduralSplatter(grid4, .1, 9.));

    vec2 grid5 = tile(st, 6.0);
    grid5.y -= .3;
    color = mix(color, vec4(0.1, 0.20, 0.99, 1.), proceduralSplatter(grid5, .1, 9.));

    vec2 grid6 = tile(st, 6.0);
    grid6.y -= .6;
    color = mix(color, vec4(0.8, 0.80, 0.09, 1.), procSplatterPattern(grid6, .02, 15.));

    vec2 grid7 = tile(st, 7.0);
    grid7.y -= .3;
    color = mix(color, vec4(0.2, 0.80, 0.09, 1.), proceduralSplatter(grid7, .1, 15.));

	gl_FragColor = color;
}