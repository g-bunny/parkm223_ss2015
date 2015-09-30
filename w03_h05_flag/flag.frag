//italian
//somehow i got a flag and i dont understand how...
//ethiopian? but the yellow stopped working
// i honestly dont understand...

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(1.0,0.0,0.0);
vec3 colorB = vec3(0.0,1.0,1.0);
// vec3 colorC = vec3(1.0, 1.0, 1.0);
// vec3 colorD = vec3(1.0, 0.0, 1.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    
    pct.r = step(0.33, st.y);
    pct.g = step(0.66, st.y);
    pct.b = step(.50, st.y);

    // if (st.x < .33){
    //     color = mix(colorA, colorB, pct*3.0);
    // }
    // if (st.x >.33 && st.x <.66){
    //     color = mix(colorB, colorC, pct* 3.0 + st.x/3.0);
    // }
    // if (st.x > .66){
    //     color = mix(colorC, colorD, pct);
    //     }
//B to C to A

    // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(colorA,colorB,pct);

    gl_FragColor = vec4(color,1.0);
}