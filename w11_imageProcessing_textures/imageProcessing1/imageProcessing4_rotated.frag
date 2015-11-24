#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

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

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(st.x,st.y,0.0,1.0);

    st = rotate2D(st, PI * .5);
    //float scale = u_tex0Resolution.x / u_tex0Resolution.y;
    st *= 2.;
    
    
    //u_tex0 = u_tex0 * scale;
    
    color = texture2D(u_tex0,st);

    gl_FragColor = color;
}