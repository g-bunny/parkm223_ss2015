
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

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(float x){
    float i = floor(x);
    float f = fract(x);
    float y = random(i);
    //y = mix(random(i), random(i+1.0), f);
    y = mix(random(i), random(i+1.0),smoothstep(0., 1., f));
    return y;
}

float noise(vec2 st){
    vec2 i = floor(st);
    vec2 f = fract(st);
  //  float y = random(i);
    //y = mix(random(i), random(i+1.0), f);
    //y = mix(random(i), random(i+1.0),smoothstep(0., 1., f));
    //return y;
    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}
vec2 rotate2D(vec2 st, float _angle){
    st -= 0.5;
    st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * st;
    st += 0.5;
    return st;
}

float rect(vec2 st, float start, float end){
    float pct = (smoothstep(start,start + .1,st.x) - smoothstep(end - .1, end, st.x)) * (smoothstep(.2, .3, st.y) - smoothstep(.7, .8, st.y));
    return pct;
}
    
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    //st.y -= .3;
    //st.x -= .25;
    //st*=2.;
    st *= 30.;
    vec3 color = vec3(0.459, 0.247, 0.129);
    float freq = abs(sin(noise(u_time)));
    //st *= 1. -noise(freq);
    st = rotate2D(st, 2. *PI*1.5);

    //float feed = 1.0 - pow(abs(sin(PI * st.x/2.0)),1.0);
    st.x = noise(st);
    st.y = noise(st);
    st *= 2.;
    float pct = .3 * (rect(st, freq, freq*2.));
    st.y += abs(sin(freq));
    st.x += .2;
    float pct2 = .1 *(rect(st, freq, freq*.1));
    color += pct + pct2;
    
    
	gl_FragColor = vec4(color,1.0);
}
