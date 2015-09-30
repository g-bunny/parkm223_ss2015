//all the colors of the rainbow are there. but i just don't know how to transition smoothly. help

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(1.0,1.0,0.0);
vec3 colorB = vec3(0.0,1.0,0.0);
vec3 colorC = vec3(1.0, 0.0, 1.0);
vec3 colorD = vec3(1.0, 0.0, 0.0);
vec3 colorE = vec3(0.0,0.0,1.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    
    pct.r = pct.g = sin(st.x*PI);
    pct.g = sin(st.x*PI);
    pct.g = sin(st.x*PI);

    if (st.x < .25){
        color = mix(colorD, colorA, pct* 3.0 + st.x/3.0);

    }
    if (st.x >.25 && st.x <.5){
                color = mix(colorA, colorB, pct/1.5);
    }
    if (st.x > .5 && st.x < .75){
        color = mix(colorB, colorE, pct);
        }
    if (st.x > .75){
        color = mix(colorE, colorC, 1.5);
    }
    // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    // color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}