
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359


uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float curve(vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

float random(in float x){
    return fract(sin(x)*1e4);
}

float noise(float x){
    float i = floor(x);
    float f = fract(x);
    float y = random(i);
    //y = mix(random(i), random(i+1.0), f);
    y = mix(random(i), random(i+1.0),smoothstep(0., 1., f));
    return y;
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

float splatterPattern(vec2 st, float radius){
    return splatter(st + vec2(0., -.1), radius + .1) +
            splatter(st + vec2(0., -.2), radius - .1) +
            splatter(st + vec2(-.1, 0.), radius + .2) +
            splatter(st + vec2(-.2, 0.), radius - .2) ;
}
    
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x -= 0.2;
    vec3 color = vec3(0.);
    float freq = noise(u_time);
    float feed = 1.0 - pow(abs(sin(PI * st.x/2.0)),freq);
    float pct = noise(splatterPattern(st, feed));   

    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
