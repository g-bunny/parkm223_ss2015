
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
  return  smoothstep( pct-0.01, pct, st.x) - smoothstep( pct, pct+0.01, st.x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float timeStuff = ((sin(u_time))/1.0);

    vec3 pct = vec3(st.x);
    
    pct.r = step(0.33, st.x);
    pct.g = smoothstep(0.4,timeStuff, st.x);
    pct.b = step(.50, st.x);

    color = mix(colorA,colorB,pct);

    gl_FragColor = vec4(color,1.0);
}