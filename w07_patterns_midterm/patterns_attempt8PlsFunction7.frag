
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, float zoom){
    st *= zoom;
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
    for (float i = 0.; i < numCircles; i++){
        st.y -=(.3 / (i+1.));
        pct +=smoothstep(radius + 1./numCircles, radius - .01, length(st));
    }
    return pct;
}

float splatterPattern(vec2 st, float radius){
    return splatter(st + vec2(0., -.1), radius + .1) +
            splatter(st + vec2(0., -.2), radius - .1) +
            splatter(st + vec2(-.1, 0.), radius + .2) +
            splatter(st + vec2(-.2, 0.), radius - .2) ;
}


// float procSplatterPattern(vec2 st, float radius){
//     return proceduralSplatter(st + vec2(0., -.1), radius + .1, 9) +
//             proceduralSplatter(st + vec2(0., -.2), radius - .1, 8) +
//             proceduralSplatter(st + vec2(-.1, 0.), radius + .2, 7) +
//             proceduralSplatter(st + vec2(-.2, 0.), radius - .2, 6) ;
// }
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = canvasPattern(st, .1, .5, .1);
    
    vec2 grid2 = tile(st,3.);
    // grid2 = tile(st + vec2(cos(u_time),sin(u_time))*0.02 ,5.);
    color = mix(color, vec3(0.1,0.52,0.402), proceduralSplatter(grid2, .01, 9.));
    
    // vec2 grid3 = tile(st, 3.0);
    // color = mix(color, vec3(0.2, 0.7, 0.3), splatterPattern(grid3, .09));
	gl_FragColor = vec4(color,1.0);
}