
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
vec2 rotate2D(vec2 st, float _angle){
    st -= 0.5;
    st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * st;
    st += 0.5;
    return st;
}

float rect(vec2 st){
    float pct = (smoothstep(.2,.3,st.x) - smoothstep(.7, .8, st.x)) * (smoothstep(.2, .3, st.y) - smoothstep(.7, .8, st.y));
    return pct;
}
    
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.y -= .3;
    st.x -= .25;
    st*=2.;
    vec3 color = vec3(0.);
    float freq = noise(u_time);
    //st *= 1. -noise(freq);
    st = rotate2D(st, 2. *PI*freq);

    float feed = 1.0 - pow(abs(sin(PI * st.x/2.0)),freq);
    float pct = noise(rect(st));
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
